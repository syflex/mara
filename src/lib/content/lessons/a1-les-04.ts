import type { Lesson } from '@/lib/types';

export const LES_04: Lesson = {
  id: 'a1-les-04',
  level: 'A0-A1',
  order: 4,
  titleNl: 'Wonen — waar woon jij?',
  titleEn: 'Living — where do you live?',
  estimatedMinutes: 7,
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Say where you live' },
          {
            kind: 'paragraph',
            text: 'Use "ik woon in..." to name your city, neighbourhood, or country. "Jij woont" is the same verb for "you".',
          },
        ],
      },
    },
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro: 'Seven words for places and where they sit.',
        words: [
          {
            nl: 'woon',
            en: 'live (I/you)',
            audioId: 'woon',
            exampleNl: 'Ik woon in Amsterdam.',
            exampleEn: 'I live in Amsterdam.',
          },
          {
            nl: 'woont',
            en: 'lives (he/she)',
            audioId: 'woont',
            exampleNl: 'Zij woont in Utrecht.',
            exampleEn: 'She lives in Utrecht.',
          },
          {
            nl: 'Nederland',
            en: 'the Netherlands',
            audioId: 'nederland',
          },
          {
            nl: 'stad',
            en: 'city',
            gender: 'de',
            audioId: 'stad',
          },
          {
            nl: 'huis',
            en: 'house',
            gender: 'het',
            audioId: 'huis',
          },
          {
            nl: 'straat',
            en: 'street',
            gender: 'de',
            audioId: 'straat',
          },
          {
            nl: 'in',
            en: 'in',
            audioId: 'in',
          },
        ],
      },
    },
    {
      id: 'spreken-1',
      type: 'spreken',
      payload: {
        intro: 'Say each sentence aloud. Swap in your own city if you want.',
        lines: [
          {
            id: 's1',
            nl: 'Ik woon in Nederland.',
            en: 'I live in the Netherlands.',
            audioId: 's-1',
          },
          {
            id: 's2',
            nl: 'Ik woon in een grote stad.',
            en: 'I live in a big city.',
            audioId: 's-2',
          },
          {
            id: 's3',
            nl: 'Mijn huis is klein.',
            en: 'My house is small.',
            audioId: 's-3',
          },
          {
            id: 's4',
            nl: 'Waar woon jij?',
            en: 'Where do you live?',
            audioId: 's-4',
          },
          {
            id: 's5',
            nl: 'Zij woont in Utrecht.',
            en: 'She lives in Utrecht.',
            audioId: 's-5',
          },
        ],
      },
    },
  ],
};
