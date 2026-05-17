import { db } from './db';
import { LESSONS } from './content/lessons';
import { newSrsState } from './srs';
import type { Lesson, LessonProgress, VocabCard, Woord } from './types';

export function isLessonComplete(progress: LessonProgress | undefined): boolean {
  return !!progress?.completedAt;
}

export function isSectionComplete(
  progress: LessonProgress | undefined,
  sectionId: string,
): boolean {
  return !!progress?.sectionIdsCompleted.includes(sectionId);
}

export function isLessonUnlocked(
  lesson: Lesson,
  progressByLesson: Map<string, LessonProgress>,
): boolean {
  if (lesson.prerequisites?.length) {
    return lesson.prerequisites.every((id) =>
      isLessonComplete(progressByLesson.get(id)),
    );
  }
  const prev = LESSONS.find((l) => l.order === lesson.order - 1);
  if (!prev) return true;
  return isLessonComplete(progressByLesson.get(prev.id));
}

export function nextUnfinishedLesson(
  progressByLesson: Map<string, LessonProgress>,
): Lesson | null {
  for (const lesson of LESSONS) {
    if (!isLessonComplete(progressByLesson.get(lesson.id))) return lesson;
  }
  return null;
}

export function completionStats(
  progressByLesson: Map<string, LessonProgress>,
): { completed: number; total: number } {
  let completed = 0;
  for (const lesson of LESSONS) {
    if (isLessonComplete(progressByLesson.get(lesson.id))) completed++;
  }
  return { completed, total: LESSONS.length };
}

export function indexProgress(
  rows: LessonProgress[] | undefined,
): Map<string, LessonProgress> {
  return new Map((rows ?? []).map((p) => [p.lessonId, p]));
}

export async function ensureLessonStarted(lessonId: string): Promise<void> {
  const existing = await db.lessonProgress.get(lessonId);
  if (existing) return;
  const now = Date.now();
  await db.lessonProgress.put({
    lessonId,
    startedAt: now,
    sectionIdsCompleted: [],
    updatedAt: now,
  });
}

export async function markSectionComplete(
  lessonId: string,
  sectionId: string,
): Promise<void> {
  const now = Date.now();
  const existing = await db.lessonProgress.get(lessonId);
  const completed = new Set(existing?.sectionIdsCompleted ?? []);
  completed.add(sectionId);
  await db.lessonProgress.put({
    lessonId,
    startedAt: existing?.startedAt ?? now,
    completedAt: existing?.completedAt,
    sectionIdsCompleted: [...completed],
    updatedAt: now,
  });
}

export async function markLessonComplete(lessonId: string): Promise<void> {
  const now = Date.now();
  const existing = await db.lessonProgress.get(lessonId);
  await db.lessonProgress.put({
    lessonId,
    startedAt: existing?.startedAt ?? now,
    completedAt: existing?.completedAt ?? now,
    sectionIdsCompleted: existing?.sectionIdsCompleted ?? [],
    updatedAt: now,
  });
  const lesson = LESSONS.find((l) => l.id === lessonId);
  if (lesson) await importLessonVocab(lesson);
}

function vocabIdFor(nl: string): string {
  const slug = nl
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `vocab:${slug}`;
}

function woordToVocabCard(word: Woord, lesson: Lesson): VocabCard {
  return {
    id: vocabIdFor(word.nl),
    dutch: word.nl,
    english: word.en,
    partOfSpeech: word.gender ? 'noun' : 'phrase',
    gender: word.gender,
    exampleNl: word.exampleNl,
    exampleEn: word.exampleEn,
    level: 'A0',
    source: 'lesson',
    lessonId: lesson.id,
    audioId: word.audioId,
    srs: newSrsState(),
    createdAt: Date.now(),
  };
}

function collectWoorden(lesson: Lesson): Woord[] {
  const out: Woord[] = [];
  for (const section of lesson.sections) {
    if (section.type === 'woorden') out.push(...section.payload.words);
  }
  return out;
}

/** Idempotent: words already in db.vocab are skipped by id. */
export async function importLessonVocab(lesson: Lesson): Promise<number> {
  const words = collectWoorden(lesson);
  if (words.length === 0) return 0;
  const ids = words.map((w) => vocabIdFor(w.nl));
  const existing = await db.vocab.bulkGet(ids);
  const toAdd: VocabCard[] = [];
  words.forEach((w, i) => {
    if (!existing[i]) toAdd.push(woordToVocabCard(w, lesson));
  });
  if (toAdd.length > 0) await db.vocab.bulkAdd(toAdd);
  return toAdd.length;
}

/**
 * Walks every completed lesson and ensures its words are in db.vocab.
 * Safe to call on every app load (idempotent). Lets users who completed
 * lessons before this hookup existed still get their vocab populated.
 */
export async function backfillLessonVocab(): Promise<void> {
  const completed = await db.lessonProgress
    .where('completedAt')
    .above(0)
    .toArray();
  for (const p of completed) {
    const lesson = LESSONS.find((l) => l.id === p.lessonId);
    if (lesson) await importLessonVocab(lesson);
  }
}
