import manifest from './content/audio-manifest.json';

type Manifest = Record<string, Record<string, true>>;

const MANIFEST = manifest as Manifest;

export function hasAudio(lessonId: string, audioId: string): boolean {
  return !!MANIFEST[lessonId]?.[audioId];
}

export function audioUrl(lessonId: string, audioId: string): string {
  return `/audio/${lessonId}/${audioId}.mp3`;
}
