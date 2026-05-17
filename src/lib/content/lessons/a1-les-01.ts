import type { Lesson } from '@/lib/types';

export const LES_01: Lesson = {
  id: 'a1-les-01',
  level: 'A0-A1',
  order: 1,
  titleNl: 'Welkom — Hallo, dag, tot ziens',
  titleEn: 'Welcome — Hello, hi, goodbye',
  estimatedMinutes: 8,
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          {
            kind: 'heading',
            text: 'Greet someone in Dutch',
          },
          {
            kind: 'paragraph',
            text: "You'll learn 10 ways to say hello and goodbye — formal for strangers and older people, casual for friends.",
          },
        ],
      },
    },
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro:
          "Tap 🔊 to hear each word. Tip: the Dutch \"g\" is rougher than in English.",
        words: [
          {
            nl: 'hallo',
            en: 'hello',
            audioId: 'hallo',
            exampleNl: 'Hallo, hoe gaat het?',
            exampleEn: 'Hello, how are you?',
          },
          {
            nl: 'hoi',
            en: 'hi',
            formality: 'informeel',
            audioId: 'hoi',
            exampleNl: 'Hoi! Wat doe je?',
            exampleEn: 'Hi! What are you doing?',
          },
          {
            nl: 'dag',
            en: 'hi / bye',
            audioId: 'dag',
            exampleNl: 'Dag mevrouw.',
            exampleEn: 'Hello / goodbye, ma’am.',
          },
          {
            nl: 'goedemorgen',
            en: 'good morning',
            formality: 'formeel',
            audioId: 'goedemorgen',
            exampleNl: 'Goedemorgen! Slaap je goed?',
            exampleEn: 'Good morning! Did you sleep well?',
          },
          {
            nl: 'goedemiddag',
            en: 'good afternoon',
            formality: 'formeel',
            audioId: 'goedemiddag',
            exampleNl: 'Goedemiddag, kan ik u helpen?',
            exampleEn: 'Good afternoon, can I help you?',
          },
          {
            nl: 'goedenavond',
            en: 'good evening',
            formality: 'formeel',
            audioId: 'goedenavond',
            exampleNl: 'Goedenavond, welkom thuis.',
            exampleEn: 'Good evening, welcome home.',
          },
          {
            nl: 'goedenacht',
            en: 'good night',
            formality: 'formeel',
            audioId: 'goedenacht',
            exampleNl: 'Goedenacht, slaap lekker.',
            exampleEn: 'Good night, sleep well.',
          },
          {
            nl: 'tot ziens',
            en: 'goodbye',
            formality: 'formeel',
            audioId: 'tot-ziens',
            exampleNl: 'Tot ziens, fijne dag nog!',
            exampleEn: 'Goodbye, have a nice day!',
          },
          {
            nl: 'tot morgen',
            en: 'see you tomorrow',
            audioId: 'tot-morgen',
            exampleNl: 'Tot morgen op werk.',
            exampleEn: 'See you tomorrow at work.',
          },
          {
            nl: 'doei',
            en: 'bye',
            formality: 'informeel',
            audioId: 'doei',
            exampleNl: 'Doei, tot later!',
            exampleEn: 'Bye, see you later!',
          },
        ],
      },
    },
    {
      id: 'spreken-1',
      type: 'spreken',
      payload: {
        intro:
          'Spreek deze zinnen hardop. Luister eerst naar het model, neem dan jezelf op en vergelijk.',
        lines: [
          { id: 'l1', nl: 'Hallo.', en: 'Hello.', audioId: 'hallo' },
          {
            id: 'l2',
            nl: 'Goedemorgen!',
            en: 'Good morning!',
            audioId: 'goedemorgen',
          },
          {
            id: 'l3',
            nl: 'Hoi, hoe gaat het?',
            en: 'Hi, how are you?',
            audioId: 'spreken-hoi-hoe-gaat-het',
          },
          {
            id: 'l4',
            nl: 'Tot ziens, fijne dag!',
            en: 'Goodbye, have a nice day!',
            audioId: 'spreken-tot-ziens-fijne-dag',
          },
          { id: 'l5', nl: 'Doei!', en: 'Bye!', audioId: 'doei' },
        ],
      },
    },
  ],
};
