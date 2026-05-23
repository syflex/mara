export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'article'
  | 'preposition'
  | 'conjunction'
  | 'numeral'
  | 'phrase';

export type Level = 'A0' | 'A1' | 'A2' | 'B1';

export type TrackId = 'beginner' | 'inburgering';

export const TRACKS: { id: TrackId; label: string; targetLevel: Level }[] = [
  { id: 'beginner', label: 'Beginner Dutch', targetLevel: 'A1' },
  { id: 'inburgering', label: 'Inburgering A2', targetLevel: 'A2' },
];

export type SrsCardState = 'new' | 'learning' | 'review' | 'relearning';

export interface SrsState {
  due: number;
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  state: SrsCardState;
  lastReview?: number;
}

export interface VocabCard {
  id: string;
  dutch: string;
  english: string;
  partOfSpeech: PartOfSpeech;
  gender?: 'de' | 'het';
  plural?: string;
  pastSingular?: string;
  pastParticiple?: string;
  auxiliary?: 'hebben' | 'zijn';
  exampleNl?: string;
  exampleEn?: string;
  level: Level;
  notes?: string;
  source: 'official-a2' | 'starter' | 'custom' | 'lesson';
  lessonId?: string;
  audioId?: string;
  srs: SrsState;
  createdAt: number;
}

export type SrsRating = 1 | 2 | 3 | 4;
export const SRS_RATING = {
  AGAIN: 1 as const,
  HARD: 2 as const,
  GOOD: 3 as const,
  EASY: 4 as const,
};

// Identifiers for inline SVG diagrams an uitleg block can reference.
// Registry lives in src/components/lesson/uitleg-figures/index.ts.
// Add a new id here and a matching component to the registry to extend.
export type UitlegFigureId = 'je-u-register';

export type UitlegBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'figure'; figureId: UitlegFigureId };

export interface UitlegPayload {
  blocks: UitlegBlock[];
}

export interface Woord {
  nl: string;
  en: string;
  gender?: 'de' | 'het';
  formality?: 'informeel' | 'formeel';
  audioId?: string;
  imageUrl?: string;
  exampleNl?: string;
  exampleEn?: string;
}

export interface WoordenPayload {
  intro?: string;
  words: Woord[];
}

export interface SprekenLine {
  id: string;
  nl: string;
  en?: string;
  audioId?: string;
}

export interface SprekenPayload {
  intro?: string;
  lines: SprekenLine[];
}

export interface KlankExample {
  nl: string;
  en?: string;
  audioId?: string;
}

export interface KlankSound {
  id: string;
  display: string;
  hint?: string;
  examples: KlankExample[];
}

export interface KlankenPayload {
  intro?: string;
  sounds: KlankSound[];
}

export interface MiniDialoogLine {
  id: string;
  speaker: string;
  nl: string;
  en?: string;
  audioId?: string;
}

export interface MiniDialoogScene {
  id: string;
  titleNl: string;
  titleEn?: string;
  register: 'informeel' | 'formeel';
  lines: MiniDialoogLine[];
}

export interface MiniDialoogPayload {
  intro?: string;
  scenes: MiniDialoogScene[];
}

export type LessonSection =
  | { id: string; type: 'uitleg'; payload: UitlegPayload }
  | { id: string; type: 'woorden'; payload: WoordenPayload }
  | { id: string; type: 'spreken'; payload: SprekenPayload }
  | { id: string; type: 'klanken'; payload: KlankenPayload }
  | { id: string; type: 'mini-dialoog'; payload: MiniDialoogPayload }
  | {
      id: string;
      type: Exclude<
        SectionType,
        'uitleg' | 'woorden' | 'spreken' | 'klanken' | 'mini-dialoog'
      >;
      payload: unknown;
    };

export interface Lesson {
  id: string;
  track: TrackId;
  level: Level;
  order: number;
  titleNl: string;
  titleEn: string;
  estimatedMinutes: number;
  // Back-references to syllabus sections covered (e.g. ['§2.1', '§3.1', '§4']).
  // Empty array allowed for legacy/placeholder lessons not yet remapped to the
  // A0 syllabus. See A0/LESSONS_A0.md.
  coverage: string[];
  sections: LessonSection[];
  prerequisites?: string[];
}

export interface LessonProgress {
  lessonId: string;
  startedAt: number;
  completedAt?: number;
  sectionIdsCompleted: string[];
  updatedAt: number;
}
