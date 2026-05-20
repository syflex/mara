import type { Lesson } from '@/lib/types';

export const LES_03: Lesson = {
  id: 'a1-les-03',
  track: 'beginner',
  level: 'A0',
  order: 3,
  titleNl: 'Vragen — wie, wat, waar',
  titleEn: 'Questions — who, what, where',
  estimatedMinutes: 7,
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Ask simple questions' },
          {
            kind: 'paragraph',
            text: 'Six question words cover almost everything you need to ask in everyday Dutch.',
          },
        ],
      },
    },
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro: 'Question words — drill them into reflex.',
        words: [
          { nl: 'wie', en: 'who', audioId: 'wie' },
          { nl: 'wat', en: 'what', audioId: 'wat' },
          { nl: 'waar', en: 'where', audioId: 'waar' },
          { nl: 'hoe', en: 'how', audioId: 'hoe' },
          { nl: 'wanneer', en: 'when', audioId: 'wanneer' },
          {
            nl: 'jouw',
            en: 'your',
            audioId: 'jouw',
            formality: 'informeel',
          },
          {
            nl: 'vraag',
            en: 'question',
            gender: 'de',
            audioId: 'vraag',
            exampleNl: 'Ik heb een vraag.',
            exampleEn: 'I have a question.',
          },
        ],
      },
    },
    {
      id: 'spreken-1',
      type: 'spreken',
      payload: {
        intro: 'Practise the everyday questions.',
        lines: [
          {
            id: 's1',
            nl: 'Wat is jouw naam?',
            en: 'What is your name?',
            audioId: 's-1',
          },
          {
            id: 's2',
            nl: 'Waar woon jij?',
            en: 'Where do you live?',
            audioId: 's-2',
          },
          {
            id: 's3',
            nl: 'Hoe gaat het?',
            en: 'How is it going?',
            audioId: 's-3',
          },
          {
            id: 's4',
            nl: 'Wanneer kom je?',
            en: 'When are you coming?',
            audioId: 's-4',
          },
          {
            id: 's5',
            nl: 'Ik heb een vraag.',
            en: 'I have a question.',
            audioId: 's-5',
          },
        ],
      },
    },
  ],
};
