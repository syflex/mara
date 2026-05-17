/**
 * Generates MP3 audio for every (lessonId, audioId) declared in
 * src/lib/content/lessons via the ElevenLabs TTS API, writes files to
 * public/audio/{lessonId}/{audioId}.mp3, and updates audio-manifest.json.
 *
 * Idempotent: skips items already in the manifest AND already on disk.
 *
 * Usage:
 *   ELEVENLABS_API_KEY=sk_... pnpm audio:build
 *
 * Optional env:
 *   ELEVENLABS_VOICE_ID    — default: Aria (free-tier default voice).
 *                            Run `pnpm audio:voices` to list voices your
 *                            account can actually use.
 *   ELEVENLABS_MODEL_ID    — default: eleven_multilingual_v2 (handles Dutch)
 *   AUDIO_BUILD_DRY_RUN=1  — log what would be generated; make no API calls
 */

import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { LESSONS } from '../src/lib/content/lessons';
import type { Lesson, LessonSection } from '../src/lib/types';

const API_KEY = process.env.ELEVENLABS_API_KEY;
// Aria — one of the free-tier default voices. Library/premade voices like
// Rachel (21m00Tcm4TlvDq8ikWAM) now require a paid plan. Override via env
// after running `pnpm audio:voices` to see what your account can use.
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? '9BWtsMINqrJLrRacOk9x';
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID ?? 'eleven_multilingual_v2';
const DRY_RUN = process.env.AUDIO_BUILD_DRY_RUN === '1';

const ROOT = process.cwd();
const MANIFEST_PATH = join(ROOT, 'src/lib/content/audio-manifest.json');
const AUDIO_DIR = join(ROOT, 'public/audio');

type Manifest = Record<string, Record<string, true>>;

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
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
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

async function main() {
  if (!API_KEY && !DRY_RUN) {
    console.error(
      'Missing ELEVENLABS_API_KEY. Run with:\n' +
        '  ELEVENLABS_API_KEY=sk_... pnpm audio:build\n' +
        'Or do a dry run:\n' +
        '  AUDIO_BUILD_DRY_RUN=1 pnpm audio:build',
    );
    process.exit(1);
  }

  const manifest = await loadManifest();
  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const lesson of LESSONS) {
    const items = collectAudio(lesson);
    if (items.length === 0) continue;
    console.log(`\n${lesson.id} — ${items.length} audio item(s)`);

    for (const item of items) {
      const outPath = join(AUDIO_DIR, lesson.id, `${item.audioId}.mp3`);
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
          [item.audioId]: true,
        };
        generated++;
        // Persist after every successful write so a mid-run failure
        // doesn't lose progress already paid for.
        await saveManifest(manifest);
      } catch (err) {
        failed++;
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`    ✗ ${msg}`);
      }
    }
  }

  console.log(
    `\nDone. Generated ${generated}, skipped ${skipped}, failed ${failed}.`,
  );
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
