import Dexie, { type Table } from 'dexie';
import type {
  KnmQuestion,
  VocabCard,
  CustomDeck,
  CustomFlashcard,
  SpeakingPrompt,
  SpeakingAttempt,
  ExamSession,
  LessonProgress,
} from './types';

export class DutchDB extends Dexie {
  knmQuestions!: Table<KnmQuestion, string>;
  vocab!: Table<VocabCard, string>;
  decks!: Table<CustomDeck, string>;
  flashcards!: Table<CustomFlashcard, string>;
  speakingPrompts!: Table<SpeakingPrompt, string>;
  speakingAttempts!: Table<SpeakingAttempt, string>;
  examSessions!: Table<ExamSession, string>;
  lessonProgress!: Table<LessonProgress, string>;

  constructor() {
    super('dutch-app');
    this.version(1).stores({
      knmQuestions: 'id, theme, srs.due, createdAt',
      vocab: 'id, level, theme, source, srs.due, createdAt',
      decks: 'id, createdAt',
      flashcards: 'id, deckId, srs.due, createdAt',
      speakingPrompts: 'id, format, createdAt',
      speakingAttempts: 'id, promptId, recordedAt',
      examSessions: 'id, componentType, startedAt',
    });
    this.version(2).stores({
      lessonProgress: 'lessonId, completedAt, updatedAt',
    });
  }
}

export const db = new DutchDB();
