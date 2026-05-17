import type { Lesson } from '@/lib/types';

export const LES_06: Lesson = {
  id: 'a1-les-06',
  level: 'A0-A1',
  order: 6,
  titleNl: 'Voorwerpen — de en het',
  titleEn: 'Objects — de and het',
  estimatedMinutes: 7,
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Things around you' },
          {
            kind: 'paragraph',
            text: 'Every Dutch noun carries an article — either "de" or "het". There\'s no easy rule; you learn each one with its article. Six common objects to start.',
          },
        ],
      },
    },
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro: 'Listen to the article and the noun together — that pairing is the unit you remember.',
        words: [
          {
            nl: 'pen',
            en: 'pen',
            gender: 'de',
            audioId: 'de-pen',
            exampleNl: 'Dit is een pen.',
            exampleEn: 'This is a pen.',
          },
          {
            nl: 'boek',
            en: 'book',
            gender: 'het',
            audioId: 'het-boek',
            exampleNl: 'Het boek is groot.',
            exampleEn: 'The book is big.',
          },
          {
            nl: 'papier',
            en: 'paper',
            gender: 'het',
            audioId: 'het-papier',
          },
          {
            nl: 'tafel',
            en: 'table',
            gender: 'de',
            audioId: 'de-tafel',
          },
          {
            nl: 'stoel',
            en: 'chair',
            gender: 'de',
            audioId: 'de-stoel',
          },
          {
            nl: 'tas',
            en: 'bag',
            gender: 'de',
            audioId: 'de-tas',
            exampleNl: 'Mijn tas is zwaar.',
            exampleEn: 'My bag is heavy.',
          },
        ],
      },
    },
    {
      id: 'spreken-1',
      type: 'spreken',
      payload: {
        intro: 'Say each line. Pay attention to the article.',
        lines: [
          {
            id: 's1',
            nl: 'Dit is een pen.',
            en: 'This is a pen.',
            audioId: 's-1',
          },
          {
            id: 's2',
            nl: 'Ik heb een boek.',
            en: 'I have a book.',
            audioId: 's-2',
          },
          {
            id: 's3',
            nl: 'Het boek is groot.',
            en: 'The book is big.',
            audioId: 's-3',
          },
          {
            id: 's4',
            nl: 'De tafel is bruin.',
            en: 'The table is brown.',
            audioId: 's-4',
          },
          {
            id: 's5',
            nl: 'Mijn tas is zwaar.',
            en: 'My bag is heavy.',
            audioId: 's-5',
          },
        ],
      },
    },
  ],
};
