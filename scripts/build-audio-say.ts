/**
 * Generates .m4a (AAC) audio for every (lessonId, audioId) declared in the
 * lessons, using the built-in macOS `say` command. No API key, no cost,
 * works fully offline. Quality is OK but flatter than ElevenLabs.
 *
 * Requires macOS with a Dutch voice installed:
 *   System Settings → Accessibility → Spoken Content → System Voice
 *   → Manage Voices → Dutch (Netherlands) → Xander
 *
 * Usage:
 *   pnpm audio:build:say
 *
 * Optional env:
 *   SAY_VOICE              — default: Xander (Dutch, NL). Try Ellen for BE.
 *   SAY_RATE               — words per minute (default voice default — try 160
 *                            for A0 pacing).
 *   AUDIO_BUILD_DRY_RUN=1  — log what would be generated; no `say` calls.
 */

import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { promisify } from 'node:util';
import { LESSONS } from '../src/lib/content/lessons';
import type { Lesson, LessonSection } from '../src/lib/types';

const execFileP = promisify(execFile);

const VOICE = process.env.SAY_VOICE ?? 'Xander';
const RATE = process.env.SAY_RATE;
const DRY_RUN = process.env.AUDIO_BUILD_DRY_RUN === '1';
// WAV is the only audio format every browser plays without codec surprises.
// 16-bit PCM mono at 22050Hz ≈ 44KB/sec — plenty for speech, ~5x larger
// than AAC. Still tiny in absolute terms (a Les 1 build is ~600KB).
const EXT = 'wav';
const SAMPLE_RATE = '22050';

const ROOT = process.cwd();
const MANIFEST_PATH = join(ROOT, 'src/lib/content/audio-manifest.json');
const AUDIO_DIR = join(ROOT, 'public/audio');

type Manifest = Record<string, Record<string, string>>;

interface AudioItem {
  lessonId: string;
  audioId: string;
  text: string;
}

function itemsFromSection(
  section: LessonSection,
): { audioId: string; text: string }[] {
  switch (section.type) {
    case 'woorden':
      return section.payload.words
        .filter((w) => w.audioId)
        .map((w) => ({ audioId: w.audioId as string, text: w.nl }));
    case 'spreken':
      return section.payload.lines
        .filter((l) => l.audioId)
        .map((l) => ({ audioId: l.audioId as string, text: l.nl }));
    default:
      return [];
  }
}

function collectAudio(lesson: Lesson): AudioItem[] {
  const items: AudioItem[] = [];
  const seen = new Set<string>();
  for (const section of lesson.sections) {
    for (const item of itemsFromSection(section)) {
      if (seen.has(item.audioId)) continue;
      seen.add(item.audioId);
      items.push({
        lessonId: lesson.id,
        audioId: item.audioId,
        text: item.text,
      });
    }
  }
  return items;
}

async function ttsViaSay(text: string, outPath: string): Promise<void> {
  const args: string[] = ['-v', VOICE];
  if (RATE) args.push('-r', RATE);
  args.push(
    '--file-format=WAVE',
    `--data-format=LEI16@${SAMPLE_RATE}`,
    '-o',
    outPath,
    text,
  );
  await execFileP('say', args);
}

async function loadManifest(): Promise<Manifest> {
  try {
    const raw = await readFile(MANIFEST_PATH, 'utf8');
    return JSON.parse(raw) as Manifest;
  } catch {
    return {};
  }
}

async function saveManifest(m: Manifest): Promise<void> {
  await writeFile(MANIFEST_PATH, `${JSON.stringify(m, null, 2)}\n`);
}

async function checkVoice(): Promise<void> {
  try {
    const { stdout } = await execFileP('say', ['-v', '?']);
    if (!stdout.includes(VOICE)) {
      console.error(
        `Voice "${VOICE}" not installed. Install via System Settings →` +
          ' Accessibility → Spoken Content → System Voice → Manage Voices,' +
          ' or set SAY_VOICE to one that is installed.',
      );
      process.exit(1);
    }
  } catch (err) {
    console.error('`say` command failed — are you on macOS?');
    throw err;
  }
}

async function main() {
  if (!DRY_RUN) await checkVoice();

  const manifest = await loadManifest();
  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const lesson of LESSONS) {
    const items = collectAudio(lesson);
    if (items.length === 0) continue;
    console.log(`\n${lesson.id} — ${items.length} audio item(s)`);

    for (const item of items) {
      const outPath = join(AUDIO_DIR, lesson.id, `${item.audioId}.${EXT}`);
      const inManifest = !!manifest[lesson.id]?.[item.audioId];
      if (inManifest && existsSync(outPath)) {
        skipped++;
        continue;
      }

      console.log(`  → ${item.audioId}  "${item.text}"`);
      if (DRY_RUN) {
        generated++;
        continue;
      }

      try {
        await mkdir(dirname(outPath), { recursive: true });
        await ttsViaSay(item.text, outPath);
        manifest[lesson.id] = {
          ...manifest[lesson.id],
          [item.audioId]: EXT,
        };
        generated++;
        await saveManifest(manifest);
      } catch (err) {
        failed++;
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`    ✗ ${msg}`);
      }
    }
  }

  console.log(
    `\nDone. Generated ${generated}, skipped ${skipped}, failed ${failed}.` +
      `\nVoice: ${VOICE}${RATE ? ` @ ${RATE} wpm` : ''}`,
  );
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
