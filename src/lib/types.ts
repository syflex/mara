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
  partOfSpeech?: PartOfSpeech;
  gender?: 'de' | 'het';
  formality?: 'informeel' | 'formeel';
  // Optional stable disambiguator for homographs that need separate SRS cards
  // despite sharing the same Dutch surface form.
  srsKey?: string;
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

// --- Payload shapes for the section types not yet implemented as components.
// These exist so lesson data is typecheckable in advance of the component
// build. Refine as each section is implemented.

export interface DeHetItem {
  nl: string;
  gender: 'de' | 'het';
  en?: string;
}

export interface DeHetPayload {
  intro?: string;
  items: DeHetItem[];
}

export interface ConjugatieItem {
  pronoun: string; // "ik", "jij/je", "u", "hij/zij/het", "wij", "jullie", "zij"
  expected: string; // "ben", "bent", "is", …
  acceptVariants?: string[];
  hint?: string;
  // Optional: play the full pronoun+form (e.g. "ik ben") as a model.
  // audioText is the TTS source — usually pronoun + ' ' + expected.
  audioId?: string;
  audioText?: string;
}

export interface ConjugatiePayload {
  intro?: string;
  infinitive: string; // "zijn", "hebben"
  items: ConjugatieItem[];
}

export type DrillItem =
  | {
      kind: 'mc';
      // promptNl optional — audio-prompted drills can render without text.
      promptNl?: string;
      promptEn?: string;
      // Audio-prompted MC: tap the choice matching what you hear.
      //   audioId  — references an audio clip in this lesson's audio set
      //   audioText — TTS source; only needed if no other section in the
      //               same lesson already declares this audioId. The audio
      //               walker dedupes across sections, so klanken examples
      //               can be reused by drill items without re-declaring.
      audioId?: string;
      audioText?: string;
      choices: { text: string; correct: boolean }[];
    }
  | {
      kind: 'typed';
      promptNl: string;
      promptEn?: string;
      expected: string;
      acceptVariants?: string[];
      // Audio-dictation drills: play a clip, learner types what they hear.
      audioId?: string;
      audioText?: string;
    };

export interface DrillPayload {
  intro?: string;
  items: DrillItem[];
}

export interface ZinsbouwItem {
  promptEn: string;
  tiles: string[];
  expected: string;
  acceptVariants?: string[];
}

export interface ZinsbouwPayload {
  intro?: string;
  items: ZinsbouwItem[];
}

export interface LuisterenQuestion {
  questionNl: string;
  questionEn?: string;
  choices?: string[];
  correctIndex?: number; // for MC
  expected?: string; // for typed
}

export interface LuisterenPayload {
  intro?: string;
  audioId: string; // audio clip for this section
  transcriptNl: string;
  transcriptEn?: string;
  questions: LuisterenQuestion[];
}

export interface SchrijvenItem {
  promptEn: string;
  // Shown to the learner as the model after they submit. Schrijven is
  // open-write — no string matching, so a one-of-many template like
  // "Ik heet Anna. / Mijn naam is Anna." is valid here too.
  expected: string;
  hint?: string;
}

export interface SchrijvenPayload {
  intro?: string;
  items: SchrijvenItem[];
}

// --- Single source of truth: payloads keyed by section type. SectionType and
// LessonSection are derived from this; the section registry validates that
// each key has a component (or is explicitly marked unimplemented).

export interface SectionPayloadMap {
  uitleg: UitlegPayload;
  klanken: KlankenPayload;
  woorden: WoordenPayload;
  'de-het': DeHetPayload;
  conjugatie: ConjugatiePayload;
  drill: DrillPayload;
  zinsbouw: ZinsbouwPayload;
  luisteren: LuisterenPayload;
  spreken: SprekenPayload;
  'mini-dialoog': MiniDialoogPayload;
  schrijven: SchrijvenPayload;
}

export type SectionType = keyof SectionPayloadMap;

export type LessonSection = {
  [K in SectionType]: { id: string; type: K; payload: SectionPayloadMap[K] };
}[SectionType];

// Props every section component receives. K narrows `payload` to the right
// shape — components write `SectionProps<'woorden'>` and get full type safety.
export interface SectionProps<K extends SectionType> {
  lessonId: string;
  sectionId: string;
  payload: SectionPayloadMap[K];
  onCompletionChange?: (completion: SectionCompletion) => void;
}

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
  // Words/forms intentionally taught outside a visible `woorden` section
  // that should still enter SRS after lesson completion.
  reviewWords?: Woord[];
  prerequisites?: string[];
}

export interface LessonProgress {
  lessonId: string;
  startedAt: number;
  completedAt?: number;
  sectionIdsCompleted: string[];
  updatedAt: number;
}

export interface LessonSectionResult {
  id: string;
  lessonId: string;
  sectionId: string;
  sectionType: SectionType;
  completedAt: number;
  updatedAt: number;
  score?: number;
  total?: number;
  evidence?: string;
}

export interface WritingAttempt {
  id: string;
  cardId?: string;
  lessonId: string;
  sectionId: string;
  itemIndex: number;
  promptEn: string;
  answer: string;
  expected: string;
  submittedAt: number;
}

export interface ListeningAttempt {
  id: string;
  cardId?: string;
  lessonId: string;
  sectionId: string;
  questionIndex: number;
  questionNl: string;
  answer: string;
  expected: string;
  correct: boolean;
  submittedAt: number;
}

export type PracticeReviewKind = 'writing' | 'listening';

export interface PracticeReviewCard {
  id: string;
  kind: PracticeReviewKind;
  lessonId: string;
  sectionId: string;
  itemIndex: number;
  prompt: string;
  promptEn?: string;
  expected: string;
  choices?: string[];
  audioId?: string;
  transcriptNl?: string;
  transcriptEn?: string;
  srs: SrsState;
  createdAt: number;
  updatedAt: number;
  lastAttemptId?: string;
}

export interface SpeakingAttempt {
  id: string;
  lessonId: string;
  sectionId: string;
  lineId: string;
  lineNl: string;
  blob: Blob;
  mimeType: string;
  durationMs: number;
  recordedAt: number;
}

export interface SectionCompletion {
  isComplete: boolean;
  score?: number;
  total?: number;
  evidence?: string;
}
