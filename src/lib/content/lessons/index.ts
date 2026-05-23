import type { Lesson } from '@/lib/types';
import { A0_LES_01 } from './a0/a0-les-01';

export const LESSONS: readonly Lesson[] = [A0_LES_01].sort(
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
