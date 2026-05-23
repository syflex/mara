/**
 * ⚠️  TESTING FALLBACK — prefer `pnpm audio:build` (ElevenLabs).
 *
 * Generates speech via the built-in macOS `say` command. No API key, no cost,
 * fully offline. Quality is noticeably flatter than ElevenLabs and the
 * Xander voice has limited prosody — fine for local iteration, NOT what
 * shipping content should sound like. Use this only when:
 *
 *   • You don't have ELEVENLABS_API_KEY available (offline / no account)
 *   • You're sanity-checking a new lesson and don't want to spend credits
 *   • You're on a CI machine where curl-to-ElevenLabs is blocked
 *
 * Output: WAV (16-bit PCM mono 22050Hz) — universal browser support, ~44KB/s.
 *
 * Requires macOS with a Dutch voice installed:
 *   System Settings → Accessibility → Spoken Content → System Voice →
 *   Manage Voices → Dutch (Netherlands) → Xander
 *
 * Usage:
 *   pnpm audio:build:say
 *
 * Optional env:
 *   SAY_VOICE              — default: Xander (NL). Try Ellen for BE.
 *   SAY_RATE               — words per minute (try 160 for A0 pacing).
 *   AUDIO_BUILD_DRY_RUN=1  — log what would be generated; no `say` calls.
 */

import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { promisify } from 'node:util';
import { collectAllAudio } from './lib/audio-items';
import {
  AUDIO_DIR,
  loadManifest,
  saveManifest,
} from './lib/audio-manifest';

const execFileP = promisify(execFile);

const VOICE = process.env.SAY_VOICE ?? 'Xander';
const RATE = process.env.SAY_RATE;
const DRY_RUN = process.env.AUDIO_BUILD_DRY_RUN === '1';
const EXT = 'wav';
const SAMPLE_RATE = '22050';

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
  console.log(
    '\n⚠️  Running TESTING FALLBACK (macOS `say`). For shipping audio,' +
      ' use `pnpm audio:build` instead.\n',
  );

  if (!DRY_RUN) await checkVoice();

  const manifest = await loadManifest();
  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const { lesson, items } of collectAllAudio()) {
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
