import type { Lesson } from '@/lib/types';

export const LES_07: Lesson = {
  id: 'a1-les-07',
  level: 'A0-A1',
  order: 7,
  titleNl: 'Familie',
  titleEn: 'Family',
  estimatedMinutes: 7,
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Talk about your family' },
          {
            kind: 'paragraph',
            text: 'Six core words for family. Combine them with "mijn" (my) to talk about your own — "mijn moeder", "mijn broer".',
          },
        ],
      },
    },
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro: 'Six relations. All "de" — Dutch family nouns mostly are.',
        words: [
          {
            nl: 'vader',
            en: 'father',
            gender: 'de',
            audioId: 'de-vader',
            exampleNl: 'Mijn vader is in Nigeria.',
            exampleEn: 'My father is in Nigeria.',
          },
          {
            nl: 'moeder',
            en: 'mother',
            gender: 'de',
            audioId: 'de-moeder',
            exampleNl: 'Mijn moeder heet Anna.',
            exampleEn: 'My mother is called Anna.',
          },
          {
            nl: 'broer',
            en: 'brother',
            gender: 'de',
            audioId: 'de-broer',
          },
          {
            nl: 'zus',
            en: 'sister',
            gender: 'de',
            audioId: 'de-zus',
          },
          {
            nl: 'kind',
            en: 'child',
            gender: 'het',
            audioId: 'het-kind',
          },
          {
            nl: 'familie',
            en: 'family',
            gender: 'de',
            audioId: 'de-familie',
            exampleNl: 'Wij zijn een grote familie.',
            exampleEn: 'We are a big family.',
          },
        ],
      },
    },
    {
      id: 'spreken-1',
      type: 'spreken',
      payload: {
        intro: 'Talk about your own family — swap in real names if you like.',
        lines: [
          {
            id: 's1',
            nl: 'Mijn moeder heet Anna.',
            en: 'My mother is called Anna.',
            audioId: 's-1',
          },
          {
            id: 's2',
            nl: 'Ik heb één broer.',
            en: 'I have one brother.',
            audioId: 's-2',
          },
          {
            id: 's3',
            nl: 'Mijn zus woont in Amsterdam.',
            en: 'My sister lives in Amsterdam.',
            audioId: 's-3',
          },
          {
            id: 's4',
            nl: 'Wij zijn een grote familie.',
            en: 'We are a big family.',
            audioId: 's-4',
          },
          {
            id: 's5',
            nl: 'Mijn vader is moe.',
            en: 'My father is tired.',
            audioId: 's-5',
          },
        ],
      },
    },
  ],
};
