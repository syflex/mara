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

function dayKey(ts: number): string {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Consecutive days with at least one progress update, counting back from
 * today. If today has no activity yet, the streak counts back from
 * yesterday — so opening the app fresh in the morning doesn't show a
 * broken streak. Two empty days in a row breaks it.
 */
export function computeStreakDays(
  rows: LessonProgress[] | undefined,
  now: Date = new Date(),
): number {
  if (!rows || rows.length === 0) return 0;
  const activeDays = new Set(rows.map((p) => dayKey(p.updatedAt)));
  const probe = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (!activeDays.has(dayKey(probe.getTime()))) {
    probe.setDate(probe.getDate() - 1);
    if (!activeDays.has(dayKey(probe.getTime()))) return 0;
  }
  let streak = 0;
  while (activeDays.has(dayKey(probe.getTime()))) {
    streak++;
    probe.setDate(probe.getDate() - 1);
  }
  return streak;
}

/**
 * Most recently active lessons, sorted by updatedAt descending. Used by
 * the Vandaag "Recent" feed. Returns at most `limit` entries.
 */
export function recentLessons(
  rows: LessonProgress[] | undefined,
  limit = 3,
): { lesson: Lesson; progress: LessonProgress }[] {
  if (!rows || rows.length === 0) return [];
  return [...rows]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .map((p) => {
      const lesson = LESSONS.find((l) => l.id === p.lessonId);
      return lesson ? { lesson, progress: p } : null;
    })
    .filter((x): x is { lesson: Lesson; progress: LessonProgress } => x !== null)
    .slice(0, limit);
}

/** "Vandaag", "Gisteren", "Eergisteren", "N dagen geleden". */
export function relativeDayLabel(ts: number, now: Date = new Date()): string {
  const then = new Date(ts);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thenDay = new Date(then.getFullYear(), then.getMonth(), then.getDate());
  const days = Math.round((today.getTime() - thenDay.getTime()) / 86_400_000);
  if (days <= 0) return 'Vandaag';
  if (days === 1) return 'Gisteren';
  if (days === 2) return 'Eergisteren';
  return `${days} dagen geleden`;
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
