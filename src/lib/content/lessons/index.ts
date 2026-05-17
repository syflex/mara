import type { Lesson } from '@/lib/types';
import { LES_01 } from './a1-les-01';
import { LES_02 } from './a1-les-02';

export const LESSONS: readonly Lesson[] = [LES_01, LES_02].sort(
  (a, b) => a.order - b.order,
);

export const LESSONS_BY_ID: ReadonlyMap<string, Lesson> = new Map(
  LESSONS.map((l) => [l.id, l]),
);

export function getLesson(id: string): Lesson | undefined {
  return LESSONS_BY_ID.get(id);
}

export function getLessonByOrder(order: number): Lesson | undefined {
  return LESSONS.find((l) => l.order === order);
}
