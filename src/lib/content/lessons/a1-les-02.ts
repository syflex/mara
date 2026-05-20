import type { Lesson } from '@/lib/types';

export const LES_02: Lesson = {
  id: 'a1-les-02',
  track: 'beginner',
  level: 'A0',
  order: 2,
  titleNl: 'Ik ben — hoe voel je je?',
  titleEn: "I am — how do you feel?",
  estimatedMinutes: 7,
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Say how you feel' },
          {
            kind: 'paragraph',
            text: "\"Ik ben\" means \"I am\". Combine it with a state word and you have your first proper Dutch sentence: Ik ben moe.",
          },
        ],
      },
    },
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro: 'Eight building blocks for your first sentences.',
        words: [
          { nl: 'ik', en: 'I', audioId: 'ik' },
          { nl: 'ben', en: 'am', audioId: 'ben' },
          {
            nl: 'moe',
            en: 'tired',
            audioId: 'moe',
            exampleNl: 'Ik ben moe.',
            exampleEn: 'I am tired.',
          },
          {
            nl: 'goed',
            en: 'good / well',
            audioId: 'goed',
            exampleNl: 'Het gaat goed.',
            exampleEn: "It's going well.",
          },
          {
            nl: 'ziek',
            en: 'sick',
            audioId: 'ziek',
            exampleNl: 'Ik ben ziek vandaag.',
            exampleEn: "I'm sick today.",
          },
          {
            nl: 'blij',
            en: 'happy',
            audioId: 'blij',
            exampleNl: 'Ik ben blij!',
            exampleEn: "I'm happy!",
          },
          { nl: 'vandaag', en: 'today', audioId: 'vandaag' },
          { nl: 'niet', en: 'not', audioId: 'niet' },
        ],
      },
    },
    {
      id: 'spreken-1',
      type: 'spreken',
      payload: {
        intro: 'Speak each line aloud. Record yourself and compare.',
        lines: [
          { id: 's1', nl: 'Ik ben moe.', en: 'I am tired.', audioId: 's-1' },
          { id: 's2', nl: 'Ik ben goed.', en: 'I am well.', audioId: 's-2' },
          {
            id: 's3',
            nl: 'Ik ben ziek vandaag.',
            en: 'I am sick today.',
            audioId: 's-3',
          },
          {
            id: 's4',
            nl: 'Ik ben niet moe.',
            en: 'I am not tired.',
            audioId: 's-4',
          },
          { id: 's5', nl: 'Ik ben blij!', en: 'I am happy!', audioId: 's-5' },
        ],
      },
    },
  ],
};
