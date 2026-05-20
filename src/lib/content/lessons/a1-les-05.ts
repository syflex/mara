import type { Lesson } from '@/lib/types';

export const LES_05: Lesson = {
  id: 'a1-les-05',
  track: 'beginner',
  level: 'A0',
  order: 5,
  titleNl: 'Cijfers 0–10',
  titleEn: 'Numbers 0–10',
  estimatedMinutes: 8,
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Numbers zero to ten' },
          {
            kind: 'paragraph',
            text: 'Numbers show up everywhere — your phone, your age, the time, prices. Get the first eleven into reflex.',
          },
        ],
      },
    },
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro: 'Listen and repeat. Try counting up and back down without looking.',
        words: [
          { nl: 'nul', en: 'zero', audioId: 'nul' },
          { nl: 'een', en: 'one', audioId: 'een' },
          { nl: 'twee', en: 'two', audioId: 'twee' },
          { nl: 'drie', en: 'three', audioId: 'drie' },
          { nl: 'vier', en: 'four', audioId: 'vier' },
          { nl: 'vijf', en: 'five', audioId: 'vijf' },
          { nl: 'zes', en: 'six', audioId: 'zes' },
          { nl: 'zeven', en: 'seven', audioId: 'zeven' },
          { nl: 'acht', en: 'eight', audioId: 'acht' },
          { nl: 'negen', en: 'nine', audioId: 'negen' },
          { nl: 'tien', en: 'ten', audioId: 'tien' },
        ],
      },
    },
    {
      id: 'spreken-1',
      type: 'spreken',
      payload: {
        intro: 'Use the numbers in short, everyday sentences.',
        lines: [
          {
            id: 's1',
            nl: 'Ik heb één huis.',
            en: 'I have one house.',
            audioId: 's-1',
          },
          {
            id: 's2',
            nl: 'Ik heb twee broers.',
            en: 'I have two brothers.',
            audioId: 's-2',
          },
          {
            id: 's3',
            nl: 'Vijf en vijf is tien.',
            en: 'Five and five is ten.',
            audioId: 's-3',
          },
          {
            id: 's4',
            nl: 'Ik kom om zes uur.',
            en: "I'm coming at six o'clock.",
            audioId: 's-4',
          },
          {
            id: 's5',
            nl: 'Tot zeven uur.',
            en: "Until seven o'clock.",
            audioId: 's-5',
          },
        ],
      },
    },
  ],
};
