/**
 * ★ PRIMARY audio generator. ★
 *
 * Generates MP3 audio for every (lessonId, audioId) declared in
 * `src/lib/content/lessons` via the ElevenLabs TTS API, writes files to
 * `public/audio/{lessonId}/{audioId}.mp3`, and updates `audio-manifest.json`.
 *
 * Idempotent: skips items already in the manifest AND present on disk.
 *
 * Usage:
 *   pnpm audio:build               # reads ELEVENLABS_API_KEY from .env.local
 *   AUDIO_BUILD_DRY_RUN=1 pnpm audio:build   # log what would run; no API calls
 *
 * Env (set in `.env.local` or shell — shell takes precedence):
 *   ELEVENLABS_API_KEY   — required.
 *   ELEVENLABS_VOICE_ID  — defaults to Aria (60CwgZt94Yf7yYIXMDDe). Run
 *                          `pnpm audio:voices` to see voices your key can use.
 *   ELEVENLABS_MODEL_ID  — defaults to eleven_flash_v2_5 (fast, cheap,
 *                          multilingual). eleven_multilingual_v2 is higher
 *                          quality but slower / more expensive.
 *
 * Use the macOS `say` fallback (`pnpm audio:build:say`) only for offline /
 * throwaway dev — quality is noticeably flatter.
 */

import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { loadEnvLocal } from './lib/env-local';
import { collectAllAudio } from './lib/audio-items';
import {
  AUDIO_DIR,
  loadManifest,
  saveManifest,
} from './lib/audio-manifest';

loadEnvLocal();

const API_KEY = process.env.ELEVENLABS_API_KEY;
// 60CwgZt94Yf7yYIXMDDe = Peter — native Dutch (nl-NL), male, professional
// narrator. Correct pronunciation for shipping content.
//
// ⚠️ FREE-TIER REALITY (as of late 2025): this voice is in the `professional`
// category and returns HTTP 402 (`paid_plan_required`) on free accounts.
// The 21 free `premade` voices are all English-default and would teach
// wrong Dutch pronunciation — they are NOT a workaround.
//
// To actually generate audio, you need at least the $5/mo Starter plan,
// or use the macOS `say` fallback (`pnpm audio:build:say`). Run
// `pnpm audio:voices` to see what your specific key can access.
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? '60CwgZt94Yf7yYIXMDDe';
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID ?? 'eleven_flash_v2_5';
// Generation-time playback speed. 1.0 is ElevenLabs default; A0 learners
// need clearly slower. Valid range on flash_v2_5: 0.7–1.2. The runtime ½×
// button is still available on top of this.
const SPEED = Number(process.env.ELEVENLABS_SPEED ?? '0.8');
const DRY_RUN = process.env.AUDIO_BUILD_DRY_RUN === '1';
const EXT = 'mp3';

async function tts(text: string): Promise<Buffer> {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY as string,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          speed: SPEED,
        },
      }),
    },
  );
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`TTS failed (${res.status}): ${body.slice(0, 200)}`);
  }
  const buf = await res.arrayBuffer();
  return Buffer.from(buf);
}

async function main() {
  if (!API_KEY && !DRY_RUN) {
    console.error(
      'Missing ELEVENLABS_API_KEY. Set it in .env.local or the shell:\n' +
        '  echo "ELEVENLABS_API_KEY=sk_..." >> .env.local\n' +
        '  pnpm audio:build\n' +
        'Or do a dry run:\n' +
        '  AUDIO_BUILD_DRY_RUN=1 pnpm audio:build',
    );
    process.exit(1);
  }

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
        const buf = await tts(item.text);
        await mkdir(dirname(outPath), { recursive: true });
        await writeFile(outPath, buf);
        manifest[lesson.id] = {
          ...manifest[lesson.id],
          [item.audioId]: EXT,
        };
        generated++;
        // Persist after every successful write so a mid-run failure doesn't
        // lose progress already paid for.
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
      `\nVoice: ${VOICE_ID}  Model: ${MODEL_ID}  Speed: ${SPEED}`,
  );
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
