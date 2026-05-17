import manifest from './content/audio-manifest.json';

// Manifest maps audioId → file extension (e.g. 'mp3', 'm4a'). The build
// script that generated each file decides the format; the runtime just
// needs to know which extension to fetch.
type Manifest = Record<string, Record<string, string>>;

const MANIFEST = manifest as Manifest;

export function hasAudio(lessonId: string, audioId: string): boolean {
  return !!MANIFEST[lessonId]?.[audioId];
}

export function audioUrl(lessonId: string, audioId: string): string {
  const ext = MANIFEST[lessonId]?.[audioId] ?? 'mp3';
  return `/audio/${lessonId}/${audioId}.${ext}`;
}
