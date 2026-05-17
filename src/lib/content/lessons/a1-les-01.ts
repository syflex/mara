import type { Lesson } from '@/lib/types';

export const LES_01: Lesson = {
  id: 'a1-les-01',
  level: 'A0-A1',
  order: 1,
  titleNl: 'Welkom — Hallo, dag, tot ziens',
  titleEn: 'Welcome — Hello, hi, goodbye',
  estimatedMinutes: 8,
  sections: [
    { id: 'intro', type: 'uitleg', payload: {} },
    { id: 'woorden-1', type: 'woorden', payload: {} },
    { id: 'spreken-1', type: 'spreken', payload: {} },
  ],
};
