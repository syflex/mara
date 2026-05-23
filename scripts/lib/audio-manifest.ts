/**
 * Read / write the audio manifest (src/lib/content/audio-manifest.json).
 *
 * Shape: `{ [lessonId]: { [audioId]: extension } }`. Runtime resolves audio
 * URLs from it; build scripts use it to skip items already generated.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export type Manifest = Record<string, Record<string, string>>;

const ROOT = process.cwd();
export const MANIFEST_PATH = join(ROOT, 'src/lib/content/audio-manifest.json');
export const AUDIO_DIR = join(ROOT, 'public/audio');

export async function loadManifest(): Promise<Manifest> {
  try {
    const raw = await readFile(MANIFEST_PATH, 'utf8');
    return JSON.parse(raw) as Manifest;
  } catch {
    return {};
  }
}

export async function saveManifest(m: Manifest): Promise<void> {
  await writeFile(MANIFEST_PATH, `${JSON.stringify(m, null, 2)}\n`);
}
