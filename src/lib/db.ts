import Dexie, { type Table } from 'dexie';
import type { VocabCard, LessonProgress } from './types';

export class DutchDB extends Dexie {
  vocab!: Table<VocabCard, string>;
  lessonProgress!: Table<LessonProgress, string>;

  constructor() {
    super('dutch-app');
    // Version history is kept intact so existing users' DBs upgrade cleanly.
    // Don't rewrite older versions — append.
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
    // v3: drop the post-A1 / out-of-scope tables introduced in v1. Empty
    // string drops the index; `null` removes the table entirely. Existing
    // rows in those tables are deleted on upgrade.
    this.version(3).stores({
      knmQuestions: null,
      decks: null,
      flashcards: null,
      speakingPrompts: null,
      speakingAttempts: null,
      examSessions: null,
    });
  }
}

export const db = new DutchDB();
