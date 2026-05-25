import type { Lesson } from '@/lib/types';
import { A0_LES_01 } from './a0/a0-les-01';
import { A0_LES_02 } from './a0/a0-les-02';
import { A0_LES_03 } from './a0/a0-les-03';
import { A0_LES_04 } from './a0/a0-les-04';
import { A0_LES_05 } from './a0/a0-les-05';
import { A0_LES_06 } from './a0/a0-les-06';
import { A0_LES_07 } from './a0/a0-les-07';
import { A0_LES_08 } from './a0/a0-les-08';
import { A0_LES_09 } from './a0/a0-les-09';
import { A0_LES_10 } from './a0/a0-les-10';
import { A0_LES_11 } from './a0/a0-les-11';
import { A0_LES_12 } from './a0/a0-les-12';
import { A0_LES_13 } from './a0/a0-les-13';
import { A0_LES_14 } from './a0/a0-les-14';
import { A0_LES_15 } from './a0/a0-les-15';
import { A0_LES_16 } from './a0/a0-les-16';
import { A0_LES_17 } from './a0/a0-les-17';
import { A0_LES_18 } from './a0/a0-les-18';
import { A0_LES_19 } from './a0/a0-les-19';
import { A0_LES_20 } from './a0/a0-les-20';
import { A0_LES_21 } from './a0/a0-les-21';
import { A0_LES_22 } from './a0/a0-les-22';
import { A0_LES_23 } from './a0/a0-les-23';
import { A0_LES_24 } from './a0/a0-les-24';
import { A0_LES_25 } from './a0/a0-les-25';
import { A0_LES_26 } from './a0/a0-les-26';
import { A0_LES_27 } from './a0/a0-les-27';
import { A0_LES_28 } from './a0/a0-les-28';
import { A0_LES_29 } from './a0/a0-les-29';
import { A0_LES_30 } from './a0/a0-les-30';

export const LESSONS: readonly Lesson[] = [
  A0_LES_01,
  A0_LES_02,
  A0_LES_03,
  A0_LES_04,
  A0_LES_05,
  A0_LES_06,
  A0_LES_07,
  A0_LES_08,
  A0_LES_09,
  A0_LES_10,
  A0_LES_11,
  A0_LES_12,
  A0_LES_13,
  A0_LES_14,
  A0_LES_15,
  A0_LES_16,
  A0_LES_17,
  A0_LES_18,
  A0_LES_19,
  A0_LES_20,
  A0_LES_21,
  A0_LES_22,
  A0_LES_23,
  A0_LES_24,
  A0_LES_25,
  A0_LES_26,
  A0_LES_27,
  A0_LES_28,
  A0_LES_29,
  A0_LES_30,
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
