export type KnmTheme =
  | 'werk-inkomen'
  | 'wonen'
  | 'gezondheidszorg'
  | 'onderwijs'
  | 'rechten-plichten'
  | 'geschiedenis'
  | 'politiek'
  | 'geografie'
  | 'dagelijks-leven'
  | 'cultuur';

export const KNM_THEMES: { id: KnmTheme; nl: string; en: string }[] = [
  { id: 'werk-inkomen', nl: 'Werk en inkomen', en: 'Work and income' },
  { id: 'wonen', nl: 'Wonen', en: 'Housing' },
  { id: 'gezondheidszorg', nl: 'Gezondheidszorg', en: 'Healthcare' },
  { id: 'onderwijs', nl: 'Onderwijs', en: 'Education' },
  { id: 'rechten-plichten', nl: 'Rechten en plichten', en: 'Rights and duties' },
  { id: 'geschiedenis', nl: 'Geschiedenis', en: 'History' },
  { id: 'politiek', nl: 'Politiek', en: 'Politics' },
  { id: 'geografie', nl: 'Geografie', en: 'Geography' },
  { id: 'dagelijks-leven', nl: 'Dagelijks leven', en: 'Daily life' },
  { id: 'cultuur', nl: 'Cultuur', en: 'Culture' },
];

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

export type Level = 'A1' | 'A2' | 'B1';

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

export interface KnmQuestion {
  id: string;
  theme: KnmTheme;
  questionNl: string;
  questionEn?: string;
  choices: { nl: string; en?: string }[];
  correctIndex: number;
  explanationNl?: string;
  explanationEn?: string;
  source?: string;
  srs: SrsState;
  createdAt: number;
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
  theme?: KnmTheme;
  level: Level;
  notes?: string;
  source: 'official-a2' | 'starter' | 'custom';
  srs: SrsState;
  createdAt: number;
}

export interface CustomDeck {
  id: string;
  name: string;
  description?: string;
  color?: string;
  createdAt: number;
}

export interface CustomFlashcard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  tags?: string[];
  imageUrl?: string;
  audioFrontUrl?: string;
  audioBackUrl?: string;
  srs: SrsState;
  createdAt: number;
}

export type SpeakingFormat =
  | 'video-response'
  | 'one-picture'
  | 'two-picture-choose'
  | 'three-picture-tell';

export interface SpeakingPrompt {
  id: string;
  format: SpeakingFormat;
  promptNl: string;
  promptEn?: string;
  imageUrls?: string[];
  videoUrl?: string;
  expectedSeconds: number;
  modelAnswerNl?: string;
  createdAt: number;
}

export interface SpeakingAttempt {
  id: string;
  promptId: string;
  audioBlob: Blob;
  durationSeconds: number;
  selfRating?: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  recordedAt: number;
}

export type ExamComponent = 'lezen' | 'luisteren' | 'spreken' | 'schrijven' | 'knm';

export interface ExamSession {
  id: string;
  componentType: ExamComponent | 'full-mock';
  startedAt: number;
  completedAt?: number;
  durationSeconds: number;
  scoreCorrect: number;
  scoreTotal: number;
  responses: ExamResponse[];
}

export interface ExamResponse {
  questionId: string;
  componentType: ExamComponent;
  userAnswer: string | number;
  correct?: boolean;
  timeSpentSeconds: number;
}

export type SrsRating = 1 | 2 | 3 | 4;
export const SRS_RATING = {
  AGAIN: 1 as const,
  HARD: 2 as const,
  GOOD: 3 as const,
  EASY: 4 as const,
};

export type SectionType =
  | 'uitleg'
  | 'klanken'
  | 'woorden'
  | 'de-het'
  | 'conjugatie'
  | 'drill'
  | 'zinsbouw'
  | 'luisteren'
  | 'spreken'
  | 'mini-dialoog'
  | 'schrijven';

export interface LessonSection {
  id: string;
  type: SectionType;
  payload: unknown;
}

export interface Lesson {
  id: string;
  level: 'A0-A1';
  order: number;
  titleNl: string;
  titleEn: string;
  estimatedMinutes: number;
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
