import type { Lesson } from '@/lib/types';

export const A0_LES_07: Lesson = {
  id: 'a0-les-07',
  track: 'beginner',
  level: 'A0',
  order: 7,
  titleNl: 'Cijfers 0–20',
  titleEn: 'Numbers 0–20',
  estimatedMinutes: 16,
  coverage: ['§2.3', '§3.7'],
  prerequisites: ['a0-les-06'],
  sections: [
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro:
          'Nul tot en met tien — de basis. De eerste vier zijn klein maar onregelmatig (één is wat anders dan een lidwoord; meer daarover later). Tik op de luidspreker bij elk woord.',
        words: [
          { nl: 'nul', en: '0', audioId: 'num-nul' },
          { nl: 'één', en: '1', audioId: 'num-een' },
          { nl: 'twee', en: '2', audioId: 'num-twee' },
          { nl: 'drie', en: '3', audioId: 'num-drie' },
          { nl: 'vier', en: '4', audioId: 'num-vier' },
          { nl: 'vijf', en: '5', audioId: 'num-vijf' },
          { nl: 'zes', en: '6', audioId: 'num-zes' },
          { nl: 'zeven', en: '7', audioId: 'num-zeven' },
          { nl: 'acht', en: '8', audioId: 'num-acht' },
          { nl: 'negen', en: '9', audioId: 'num-negen' },
          { nl: 'tien', en: '10', audioId: 'num-tien' },
        ],
      },
    },
    {
      id: 'woorden-2',
      type: 'woorden',
      payload: {
        intro:
          'Elf en twaalf zijn buitenbeentjes — leer ze als losse woorden. Vanaf dertien volgt de -tien familie. Let op: dertien (niet "drie-tien") en veertien (niet "vier-tien"). De rest volgt: vijftien, zestien, zeventien, achttien, negentien, twintig.',
        words: [
          { nl: 'elf', en: '11', audioId: 'num-elf' },
          { nl: 'twaalf', en: '12', audioId: 'num-twaalf' },
          { nl: 'dertien', en: '13', audioId: 'num-dertien' },
          { nl: 'veertien', en: '14', audioId: 'num-veertien' },
          { nl: 'vijftien', en: '15', audioId: 'num-vijftien' },
          { nl: 'zestien', en: '16', audioId: 'num-zestien' },
          { nl: 'zeventien', en: '17', audioId: 'num-zeventien' },
          { nl: 'achttien', en: '18', audioId: 'num-achttien' },
          { nl: 'negentien', en: '19', audioId: 'num-negentien' },
          { nl: 'twintig', en: '20', audioId: 'num-twintig' },
        ],
      },
    },
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Ja-of-nee vragen — inversie' },
          {
            kind: 'paragraph',
            text: 'Een werkwoord op plek 1 maakt een ja-of-nee vraag: "Is het zes?", "Heet je Anna?", "Kom je uit België?". Het werkwoord en het onderwerp wisselen — dat is inversie. Het antwoord begint met "Ja, …" of "Nee, …" en herhaalt vaak het cijfer of woord.',
          },
          {
            kind: 'list',
            items: [
              'Vraag: Is het zes? → Antwoord: Ja, het is zes.',
              'Vraag: Is het tien? → Antwoord: Nee, het is vijf. (als het cijfer 5 is)',
            ],
          },
        ],
      },
    },
    {
      id: 'drill-1',
      type: 'drill',
      payload: {
        intro:
          'Audio-dictee. Luister naar het getal en typ het als cijfer (bijvoorbeeld: hoor je "zeven", typ je 7). Tien items, in willekeurige volgorde.',
        items: [
          {
            kind: 'typed',
            audioId: 'num-zeven',
            promptNl: 'Welk getal hoor je?',
            expected: '7',
          },
          {
            kind: 'typed',
            audioId: 'num-drie',
            promptNl: 'Welk getal hoor je?',
            expected: '3',
          },
          {
            kind: 'typed',
            audioId: 'num-dertien',
            promptNl: 'Welk getal hoor je?',
            expected: '13',
          },
          {
            kind: 'typed',
            audioId: 'num-twintig',
            promptNl: 'Welk getal hoor je?',
            expected: '20',
          },
          {
            kind: 'typed',
            audioId: 'num-acht',
            promptNl: 'Welk getal hoor je?',
            expected: '8',
          },
          {
            kind: 'typed',
            audioId: 'num-veertien',
            promptNl: 'Welk getal hoor je?',
            expected: '14',
          },
          {
            kind: 'typed',
            audioId: 'num-nul',
            promptNl: 'Welk getal hoor je?',
            expected: '0',
          },
          {
            kind: 'typed',
            audioId: 'num-vijf',
            promptNl: 'Welk getal hoor je?',
            expected: '5',
          },
          {
            kind: 'typed',
            audioId: 'num-negentien',
            promptNl: 'Welk getal hoor je?',
            expected: '19',
          },
          {
            kind: 'typed',
            audioId: 'num-elf',
            promptNl: 'Welk getal hoor je?',
            expected: '11',
          },
        ],
      },
    },
    {
      id: 'drill-2',
      type: 'drill',
      payload: {
        intro:
          'Ja-of-nee oefening. Onder elk item zie je het echte cijfer; daarna hoor je een ja-of-nee vraag. Klopt de vraag? Kies dan "Ja, …"; klopt het niet, kies "Nee, …".',
        items: [
          {
            kind: 'mc',
            audioId: 'jn-is-het-zes',
            audioText: 'Is het zes?',
            promptNl: 'Het cijfer is 6.',
            choices: [
              { text: 'Ja, het is zes.', correct: true },
              { text: 'Nee, het is zeven.', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'jn-is-het-zes',
            promptNl: 'Het cijfer is 5.',
            choices: [
              { text: 'Nee, het is vijf.', correct: true },
              { text: 'Ja, het is zes.', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'jn-is-het-tien',
            audioText: 'Is het tien?',
            promptNl: 'Het cijfer is 10.',
            choices: [
              { text: 'Ja, het is tien.', correct: true },
              { text: 'Nee, het is elf.', correct: false },
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
          'Tel hardop mee. Eerst nul tot tien, daarna elf tot twintig. Beluister het model, neem dan jezelf op. Belangrijkste check: dertien en veertien — de meeste leerders glijden hier uit naar "drie-tien" / "vier-tien".',
        lines: [
          {
            id: 'l1',
            nl: 'nul, één, twee, drie, vier, vijf, zes, zeven, acht, negen, tien.',
            en: '0–10',
            audioId: 'tel-0-tot-10',
          },
          {
            id: 'l2',
            nl: 'elf, twaalf, dertien, veertien, vijftien, zestien, zeventien, achttien, negentien, twintig.',
            en: '11–20',
            audioId: 'tel-11-tot-20',
          },
        ],
      },
    },
  ],
};
