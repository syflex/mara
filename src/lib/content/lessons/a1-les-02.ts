import type { Lesson } from '@/lib/types';

export const LES_02: Lesson = {
  id: 'a1-les-02',
  level: 'A0-A1',
  order: 2,
  titleNl: 'Klanken 1 — ij / ei / ui',
  titleEn: 'Sounds 1 — ij / ei / ui',
  estimatedMinutes: 6,
  sections: [
    { id: 'klanken-1', type: 'klanken', payload: {} },
    { id: 'woorden-1', type: 'woorden', payload: { words: [] } },
  ],
};
