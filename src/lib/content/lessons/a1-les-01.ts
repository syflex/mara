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
      id: 'intro',
      type: 'uitleg',
      payload: {
        blocks: [
          {
            kind: 'heading',
            text: 'Welkom bij je eerste Nederlandse les.',
          },
          {
            kind: 'paragraph',
            text: 'In deze les leer je de meestgebruikte Nederlandse begroetingen. Begroetingen zijn de eerste woorden die je elke dag hoort in Nederland — in de winkel, op straat en op je werk.',
          },
          {
            kind: 'heading',
            text: 'Formeel en informeel',
          },
          {
            kind: 'paragraph',
            text: 'Het Nederlands maakt onderscheid tussen formele en informele begroetingen. Bij vreemden, collega’s en oudere mensen gebruik je formele woorden zoals "goedemorgen" of "tot ziens". Bij vrienden en familie gebruik je informele woorden zoals "hoi" of "doei".',
          },
          {
            kind: 'heading',
            text: 'Tips voor uitspraak',
          },
          {
            kind: 'list',
            items: [
              'De Nederlandse "g" klinkt rauwer dan in het Engels — denk aan "goedemorgen".',
              'De "ij" in "ziens" klinkt als "ay" in het Engelse "say".',
              'Druk op de 🔊 knop bij elk woord om de uitspraak te horen.',
            ],
          },
        ],
      },
    },
    {
      id: 'woorden',
      type: 'woorden',
      payload: {
        intro:
          'Tien begroetingen. Druk op 🔊 om de uitspraak te horen, en lees het voorbeeld om te zien hoe je het woord gebruikt.',
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
            en: 'hi (informal)',
            audioId: 'hoi',
            exampleNl: 'Hoi! Wat doe je?',
            exampleEn: 'Hi! What are you doing?',
          },
          {
            nl: 'dag',
            en: 'hi / bye',
            audioId: 'dag',
            exampleNl: 'Dag mevrouw.',
            exampleEn: 'Hello / goodbye, madam.',
          },
          {
            nl: 'goedemorgen',
            en: 'good morning',
            audioId: 'goedemorgen',
            exampleNl: 'Goedemorgen! Slaap je goed?',
            exampleEn: 'Good morning! Did you sleep well?',
          },
          {
            nl: 'goedemiddag',
            en: 'good afternoon',
            audioId: 'goedemiddag',
            exampleNl: 'Goedemiddag, kan ik u helpen?',
            exampleEn: 'Good afternoon, can I help you?',
          },
          {
            nl: 'goedenavond',
            en: 'good evening',
            audioId: 'goedenavond',
            exampleNl: 'Goedenavond, welkom thuis.',
            exampleEn: 'Good evening, welcome home.',
          },
          {
            nl: 'goedenacht',
            en: 'good night',
            audioId: 'goedenacht',
            exampleNl: 'Goedenacht, slaap lekker.',
            exampleEn: 'Good night, sleep well.',
          },
          {
            nl: 'tot ziens',
            en: 'goodbye (formal)',
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
            en: 'bye (informal)',
            audioId: 'doei',
            exampleNl: 'Doei, tot later!',
            exampleEn: 'Bye, see you later!',
          },
        ],
      },
    },
    {
      id: 'spreken',
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
