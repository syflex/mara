import { db } from './db';
import { LESSONS } from './content/lessons';
import type { Lesson, LessonProgress } from './types';

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
}
