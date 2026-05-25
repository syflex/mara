import type { Lesson } from '@/lib/types';

export const A0_LES_24: Lesson = {
  id: 'a0-les-24',
  track: 'beginner',
  level: 'A0',
  order: 24,
  titleNl: 'Kleuren',
  titleEn: 'Colors',
  estimatedMinutes: 12,
  coverage: ['§2.9'],
  prerequisites: ['a0-les-23'],
  sections: [
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro:
          'Elf basiskleuren. Geen lidwoord (kleuren zijn adjectieven). Op A0 gebruik je ze alleen predicatief — "de stoel is wit" — niet vóór het zelfstandig naamwoord. De verbuiging "de witte stoel" leer je in A1.',
        words: [
          { nl: 'rood', en: 'red', audioId: 'rood' },
          { nl: 'blauw', en: 'blue', audioId: 'blauw' },
          { nl: 'geel', en: 'yellow', audioId: 'geel' },
          { nl: 'groen', en: 'green', audioId: 'groen' },
          { nl: 'wit', en: 'white', audioId: 'wit' },
          { nl: 'zwart', en: 'black', audioId: 'zwart' },
          { nl: 'bruin', en: 'brown', audioId: 'bruin' },
          { nl: 'grijs', en: 'gray', audioId: 'grijs' },
          { nl: 'oranje', en: 'orange', audioId: 'oranje' },
          { nl: 'paars', en: 'purple', audioId: 'paars' },
          { nl: 'roze', en: 'pink', audioId: 'roze' },
        ],
      },
    },
    {
      id: 'drill-1',
      type: 'drill',
      payload: {
        intro:
          'Tien items. Je ziet een gekleurd blokje (of een korte beschrijving) en kiest de juiste Nederlandse kleur.',
        items: [
          {
            kind: 'mc',
            promptNl: '🟥',
            promptEn: 'Welke kleur?',
            choices: [
              { text: 'rood', correct: true },
              { text: 'blauw', correct: false },
              { text: 'geel', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '🟦',
            promptEn: 'Welke kleur?',
            choices: [
              { text: 'blauw', correct: true },
              { text: 'paars', correct: false },
              { text: 'groen', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '🟨',
            promptEn: 'Welke kleur?',
            choices: [
              { text: 'geel', correct: true },
              { text: 'oranje', correct: false },
              { text: 'wit', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '🟩',
            promptEn: 'Welke kleur?',
            choices: [
              { text: 'groen', correct: true },
              { text: 'blauw', correct: false },
              { text: 'geel', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '⬜',
            promptEn: 'Welke kleur?',
            choices: [
              { text: 'wit', correct: true },
              { text: 'grijs', correct: false },
              { text: 'geel', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '⬛',
            promptEn: 'Welke kleur?',
            choices: [
              { text: 'zwart', correct: true },
              { text: 'bruin', correct: false },
              { text: 'paars', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '🟫',
            promptEn: 'Welke kleur?',
            choices: [
              { text: 'bruin', correct: true },
              { text: 'zwart', correct: false },
              { text: 'oranje', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '🟧',
            promptEn: 'Welke kleur?',
            choices: [
              { text: 'oranje', correct: true },
              { text: 'rood', correct: false },
              { text: 'geel', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '🟪',
            promptEn: 'Welke kleur?',
            choices: [
              { text: 'paars', correct: true },
              { text: 'blauw', correct: false },
              { text: 'roze', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'De lucht op een regenachtige dag',
            promptEn: 'The sky on a rainy day',
            choices: [
              { text: 'grijs', correct: true },
              { text: 'blauw', correct: false },
              { text: 'wit', correct: false },
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
          'Vier zinnen waarin je voorwerpen uit Les 21 beschrijft met een kleur. Predicatief — kleur staat ná "is". Vervang de kleuren door wat in jouw eigen kamer past.',
        lines: [
          {
            id: 'l1',
            nl: 'De stoel is wit.',
            en: 'The chair is white.',
            audioId: 'spreken-kleur-stoel',
          },
          {
            id: 'l2',
            nl: 'De lamp is geel.',
            en: 'The lamp is yellow.',
            audioId: 'spreken-kleur-lamp',
          },
          {
            id: 'l3',
            nl: 'Het bed is bruin.',
            en: 'The bed is brown.',
            audioId: 'spreken-kleur-bed',
          },
          {
            id: 'l4',
            nl: 'Mijn tas is zwart.',
            en: 'My bag is black.',
            audioId: 'spreken-kleur-tas',
          },
        ],
      },
    },
  ],
};
