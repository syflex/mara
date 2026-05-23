import type { Lesson } from '@/lib/types';

export const A0_LES_01: Lesson = {
  id: 'a0-les-01',
  track: 'beginner',
  level: 'A0',
  order: 1,
  titleNl: 'Welkom — hallo, dag, tot ziens',
  titleEn: 'Welcome — hello, hi, goodbye',
  estimatedMinutes: 12,
  coverage: ['§2.1', '§3.1', '§4'],
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          {
            kind: 'heading',
            text: 'Hallo of goedemorgen?',
          },
          {
            kind: 'paragraph',
            text: 'Dutch greetings come in two registers. Informal for friends, family, kids, and peers; formal for strangers, older people, and professionals (dokter, gemeente, supermarkt clerk).',
          },
          {
            kind: 'heading',
            text: 'Quick rule of thumb',
          },
          {
            kind: 'list',
            items: [
              'Friend, family, child → informal (hoi, doei)',
              'Stranger, dokter, gemeente clerk → formal (goedemorgen, dag meneer / mevrouw)',
              'When in doubt, slightly formal is safer — most Dutch will switch you to je once they’ve introduced themselves',
            ],
          },
          {
            kind: 'figure',
            figureId: 'je-u-register',
          },
          {
            kind: 'heading',
            text: 'Why both from day one',
          },
          {
            kind: 'paragraph',
            text: 'You’ll hear formal Dutch every time you visit a shop, dokter, or gemeente. Learning u alongside je costs almost nothing extra and saves embarrassment later.',
          },
        ],
      },
    },
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro:
          'Tap 🔊 to hear each greeting. Watch for the formality tag — informal vs formal makes a real difference in Dutch.',
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
            nl: 'doei',
            en: 'bye',
            formality: 'informeel',
            audioId: 'doei',
            exampleNl: 'Doei, tot later!',
            exampleEn: 'Bye, see you later!',
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
            nl: 'meneer',
            en: 'sir',
            gender: 'de',
            formality: 'formeel',
            audioId: 'meneer',
            exampleNl: 'Dag meneer, kan ik u helpen?',
            exampleEn: 'Hello sir, can I help you?',
          },
          {
            nl: 'mevrouw',
            en: 'ma’am',
            gender: 'de',
            formality: 'formeel',
            audioId: 'mevrouw',
            exampleNl: 'Goedemorgen mevrouw De Vries.',
            exampleEn: 'Good morning, Mrs. De Vries.',
          },
        ],
      },
    },
    {
      id: 'mini-dialoog-1',
      type: 'mini-dialoog',
      payload: {
        intro:
          'Twee korte scènes — eerst informeel met een leeftijdsgenoot, dan formeel bij de balie.',
        scenes: [
          {
            id: 'peer',
            titleNl: 'Met een leeftijdsgenoot',
            titleEn: 'With a peer',
            register: 'informeel',
            lines: [
              {
                id: 'p1',
                speaker: 'A',
                nl: 'Hoi! Hoe heet je?',
                en: 'Hi! What’s your name?',
                audioId: 'dialoog-peer-1',
              },
              {
                id: 'p2',
                speaker: 'B',
                nl: 'Ik heet Sam. En jij?',
                en: 'I’m Sam. And you?',
                audioId: 'dialoog-peer-2',
              },
              {
                id: 'p3',
                speaker: 'A',
                nl: 'Ik ben Maria. Doei!',
                en: 'I’m Maria. Bye!',
                audioId: 'dialoog-peer-3',
              },
            ],
          },
          {
            id: 'clerk',
            titleNl: 'Bij de balie',
            titleEn: 'At the counter',
            register: 'formeel',
            lines: [
              {
                id: 'c1',
                speaker: 'Klant',
                nl: 'Goedemorgen mevrouw.',
                en: 'Good morning, ma’am.',
                audioId: 'dialoog-clerk-1',
              },
              {
                id: 'c2',
                speaker: 'Medewerker',
                nl: 'Goedemorgen meneer. Kan ik u helpen?',
                en: 'Good morning, sir. Can I help you?',
                audioId: 'dialoog-clerk-2',
              },
              {
                id: 'c3',
                speaker: 'Klant',
                nl: 'Ja, alstublieft. Tot ziens.',
                en: 'Yes, please. Goodbye.',
                audioId: 'dialoog-clerk-3',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'spreken-1',
      type: 'spreken',
      payload: {
        intro:
          'Oefen beide registers. Luister naar het model, neem jezelf op, en vergelijk.',
        lines: [
          {
            id: 'l1',
            nl: 'Hoi, hoe gaat het?',
            en: 'Hi, how are you?',
            audioId: 'spreken-hoi-hoe-gaat-het',
          },
          {
            id: 'l2',
            nl: 'Goedemorgen mevrouw.',
            en: 'Good morning, ma’am.',
            audioId: 'spreken-goedemorgen-mevrouw',
          },
          {
            id: 'l3',
            nl: 'Dag meneer.',
            en: 'Hello, sir.',
            audioId: 'spreken-dag-meneer',
          },
          {
            id: 'l4',
            nl: 'Tot ziens, fijne dag!',
            en: 'Goodbye, have a nice day!',
            audioId: 'spreken-tot-ziens-fijne-dag',
          },
          {
            id: 'l5',
            nl: 'Doei, tot morgen!',
            en: 'Bye, see you tomorrow!',
            audioId: 'spreken-doei-tot-morgen',
          },
        ],
      },
    },
  ],
};
