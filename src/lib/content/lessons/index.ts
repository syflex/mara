import type { Lesson } from '@/lib/types';
import { LES_01 } from './a1-les-01';
import { LES_02 } from './a1-les-02';
import { LES_03 } from './a1-les-03';
import { LES_04 } from './a1-les-04';
import { LES_05 } from './a1-les-05';
import { LES_06 } from './a1-les-06';
import { LES_07 } from './a1-les-07';

export const LESSONS: readonly Lesson[] = [
  LES_01,
  LES_02,
  LES_03,
  LES_04,
  LES_05,
  LES_06,
  LES_07,
].sort((a, b) => a.order - b.order);

export const LESSONS_BY_ID: ReadonlyMap<string, Lesson> = new Map(
  LESSONS.map((l) => [l.id, l]),
);

export function getLesson(id: string): Lesson | undefined {
  return LESSONS_BY_ID.get(id);
}

export function getLessonByOrder(order: number): Lesson | undefined {
  return LESSONS.find((l) => l.order === order);
}
