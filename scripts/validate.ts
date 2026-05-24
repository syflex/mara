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

interface Issue {
  lesson: string;
  kind: 'unimplemented-section' | 'missing-manifest' | 'missing-file';
  detail: string;
}

const SKIP_FILES = process.env.SKIP_AUDIO_FILE_CHECK === '1';

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

async function main() {
  const issues = [
    ...validateSectionsImplemented(),
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
