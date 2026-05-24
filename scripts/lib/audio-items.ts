/**
 * Walks lessons and yields the audio items declared in their sections.
 *
 * Both audio backends (ElevenLabs, primary; macOS `say`, testing fallback)
 * share this. When you add a new section type that carries TTS text, extend
 * `itemsFromSection` here once — not in each script.
 */

import { LESSONS } from '../../src/lib/content/lessons';
import type { Lesson, LessonSection } from '../../src/lib/types';

export interface AudioItem {
  lessonId: string;
  audioId: string;
  text: string;
}

export function itemsFromSection(
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
    case 'mini-dialoog':
      return section.payload.scenes.flatMap((scene) =>
        scene.lines
          .filter((l) => l.audioId)
          .map((l) => ({ audioId: l.audioId as string, text: l.nl })),
      );
    case 'klanken':
      return section.payload.sounds.flatMap((sound) =>
        sound.examples
          .filter((ex) => ex.audioId)
          .map((ex) => ({ audioId: ex.audioId as string, text: ex.nl })),
      );
    case 'drill':
      // Only contribute audio for mc items that declare BOTH id and text.
      // Items that reference an audioId already covered by a klanken/etc.
      // section dedupe via `collectAudio`'s seen-set and shouldn't repeat
      // their text here.
      return section.payload.items.flatMap((item) =>
        item.kind === 'mc' && item.audioId && item.audioText
          ? [{ audioId: item.audioId, text: item.audioText }]
          : [],
      );
    case 'luisteren':
      // Single clip per section; the transcript is the TTS source.
      return [
        {
          audioId: section.payload.audioId,
          text: section.payload.transcriptNl,
        },
      ];
    default:
      return [];
  }
}

export function collectAudio(lesson: Lesson): AudioItem[] {
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

export function collectAllAudio(): { lesson: Lesson; items: AudioItem[] }[] {
  return LESSONS.map((lesson) => ({ lesson, items: collectAudio(lesson) }));
}
