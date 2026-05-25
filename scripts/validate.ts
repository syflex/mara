/**
 * Lesson-content health check. Fails loudly if:
 *   1. A lesson section uses a SectionType that has no registered component
 *      (i.e. would render as PlaceholderSection — a "not implemented" card
 *      that should never ship to a learner).
 *   2. A lesson references an audioId that isn't in the manifest, or whose
 *      file isn't on disk.
 *
 * Wired as `prebuild` in package.json so `npm run build` cannot succeed
 * with a broken lesson. Run manually any time with `npm run validate`.
 *
 * Audio-on-disk is checked permissively: if SKIP_AUDIO_FILE_CHECK=1, we
 * only verify manifest entries (useful right after authoring a lesson,
 * before running `audio:build`).
 */

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { LESSONS } from '../src/lib/content/lessons';
import { collectAudio } from './lib/audio-items';
import { AUDIO_DIR, loadManifest } from './lib/audio-manifest';
import { SECTION_REGISTRY } from '../src/components/lesson/sections/registry';
import type { Lesson, Woord } from '../src/lib/types';

interface RequiredActiveVocab {
  nl: string;
  enPattern?: RegExp;
}

interface Issue {
  lesson: string;
  kind:
    | 'unimplemented-section'
    | 'missing-manifest'
    | 'missing-file'
    | 'missing-active-vocab';
  detail: string;
}

const SKIP_FILES = process.env.SKIP_AUDIO_FILE_CHECK === '1';

const REQUIRED_ACTIVE_VOCAB: Record<string, RequiredActiveVocab[]> = {
  '§2.1 Groeten & beleefdheid': [
    'hallo',
    'hoi',
    'dag',
    'goedemorgen',
    'goedemiddag',
    'goedenavond',
    'goedenacht',
    'tot ziens',
    'tot morgen',
    'doei',
    'alstublieft',
    'alsjeblieft',
    'dank u wel',
    'dank je wel',
    'graag gedaan',
    'sorry',
    'pardon',
    'meneer',
    'mevrouw',
  ].map((nl) => ({ nl })),
  '§2.2 Personalia': [
    'naam',
    'heten',
    'ik ben',
    'wonen',
    'komen',
    'oud',
    'jaar',
    'land',
    'stad',
    'straat',
    'adres',
    'telefoonnummer',
    'spreken',
    'beetje',
    'Nederlands',
    'Engels',
    'Nederland',
    'België',
    'nationaliteit',
    'werk',
    'student',
    'leraar',
    'lerares',
  ].map((nl) => ({ nl })),
  '§2.4 Tijd & datum': [
    'maandag',
    'dinsdag',
    'woensdag',
    'donderdag',
    'vrijdag',
    'zaterdag',
    'zondag',
    'januari',
    'februari',
    'maart',
    'april',
    'mei',
    'juni',
    'juli',
    'augustus',
    'september',
    'oktober',
    'november',
    'december',
    'lente',
    'zomer',
    'herfst',
    'winter',
    'vandaag',
    'gisteren',
    'morgen',
    'eergisteren',
    'overmorgen',
    'nu',
    'straks',
    'later',
    'vroeg',
    'laat',
    'ochtend',
    'middag',
    'avond',
    'nacht',
    'vannacht',
    'vanochtend',
    'vanavond',
    'uur',
    'half',
    'kwart',
  ].map((nl) => ({ nl })),
  '§2.11 Kleine woordjes': [
    'ik',
    'jij',
    'je',
    'hij',
    'zij',
    'ze',
    'het',
    'wij',
    'we',
    'jullie',
    'u',
    'mijn',
    'jouw',
    { nl: 'zijn', enPattern: /\bhis\b/i },
    { nl: 'haar', enPattern: /\bher\b/i },
    'ons',
    'onze',
    'hun',
    'ja',
    'nee',
    'niet',
    'geen',
    'wel',
    'en',
    'of',
    'maar',
    'want',
    'dus',
    'ook',
    'de',
    'een',
    'dit',
    'dat',
    'deze',
    'die',
    'veel',
    'weinig',
    'alle',
    'sommige',
    'een paar',
    'heel',
    'erg',
    'een beetje',
    'zeer',
  ].map((item) => (typeof item === 'string' ? { nl: item } : item)),
};

function validateSectionsImplemented(): Issue[] {
  const issues: Issue[] = [];
  for (const lesson of LESSONS) {
    for (const section of lesson.sections) {
      const entry = SECTION_REGISTRY[section.type];
      if (!entry.component) {
        issues.push({
          lesson: lesson.id,
          kind: 'unimplemented-section',
          detail: `section '${section.id}' uses type '${section.type}' which has no renderer (would show PlaceholderSection)`,
        });
      }
    }
  }
  return issues;
}

async function validateAudioResolves(): Promise<Issue[]> {
  const manifest = await loadManifest();
  const issues: Issue[] = [];
  for (const lesson of LESSONS) {
    const lessonManifest = manifest[lesson.id] ?? {};
    for (const item of collectAudio(lesson)) {
      const ext = lessonManifest[item.audioId];
      if (!ext) {
        issues.push({
          lesson: lesson.id,
          kind: 'missing-manifest',
          detail: `audioId '${item.audioId}' (text: "${item.text}") not in manifest — run \`npm run audio:build\``,
        });
        continue;
      }
      if (SKIP_FILES) continue;
      const path = join(AUDIO_DIR, lesson.id, `${item.audioId}.${ext}`);
      if (!existsSync(path)) {
        issues.push({
          lesson: lesson.id,
          kind: 'missing-file',
          detail: `audioId '${item.audioId}' in manifest but file absent on disk (${path})`,
        });
      }
    }
  }
  return issues;
}

function collectActiveWords(lesson: Lesson): Woord[] {
  const out: Woord[] = [...(lesson.reviewWords ?? [])];
  for (const section of lesson.sections) {
    if (section.type === 'woorden') out.push(...section.payload.words);
  }
  return out;
}

function matchesRequired(word: Woord, required: RequiredActiveVocab): boolean {
  if (word.nl.toLowerCase() !== required.nl.toLowerCase()) return false;
  return required.enPattern ? required.enPattern.test(word.en) : true;
}

function validateRequiredActiveVocab(): Issue[] {
  const activeWords = LESSONS.flatMap((lesson) => collectActiveWords(lesson));
  const issues: Issue[] = [];

  for (const [section, requiredItems] of Object.entries(REQUIRED_ACTIVE_VOCAB)) {
    for (const required of requiredItems) {
      if (activeWords.some((word) => matchesRequired(word, required))) continue;
      issues.push({
        lesson: 'A0',
        kind: 'missing-active-vocab',
        detail: `${section}: '${required.nl}' is required by the syllabus but is not in a woorden section or reviewWords`,
      });
    }
  }

  return issues;
}

async function main() {
  const issues = [
    ...validateSectionsImplemented(),
    ...validateRequiredActiveVocab(),
    ...(await validateAudioResolves()),
  ];

  if (issues.length === 0) {
    const summary = `✓ ${LESSONS.length} lesson(s), all sections implemented, all audio resolves${SKIP_FILES ? ' (manifest only)' : ''}.`;
    console.log(summary);
    return;
  }

  const byLesson = new Map<string, Issue[]>();
  for (const i of issues) {
    if (!byLesson.has(i.lesson)) byLesson.set(i.lesson, []);
    byLesson.get(i.lesson)!.push(i);
  }
  console.error(`✗ ${issues.length} issue(s) across ${byLesson.size} lesson(s):\n`);
  for (const [lesson, list] of byLesson) {
    console.error(`  ${lesson}`);
    for (const i of list) console.error(`    [${i.kind}] ${i.detail}`);
  }
  process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
