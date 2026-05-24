import type { Lesson } from '@/lib/types';
import { A0_LES_01 } from './a0/a0-les-01';
import { A0_LES_02 } from './a0/a0-les-02';
import { A0_LES_03 } from './a0/a0-les-03';
import { A0_LES_04 } from './a0/a0-les-04';
import { A0_LES_05 } from './a0/a0-les-05';
import { A0_LES_06 } from './a0/a0-les-06';

export const LESSONS: readonly Lesson[] = [
  A0_LES_01,
  A0_LES_02,
  A0_LES_03,
  A0_LES_04,
  A0_LES_05,
  A0_LES_06,
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
