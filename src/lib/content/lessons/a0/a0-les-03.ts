import type { Lesson } from '@/lib/types';

export const A0_LES_03: Lesson = {
  id: 'a0-les-03',
  track: 'beginner',
  level: 'A0',
  order: 3,
  titleNl: 'Kort vs lang — vijf klinkerparen',
  titleEn: 'Short vs long — five vowel pairs',
  estimatedMinutes: 12,
  coverage: ['§1.3'],
  prerequisites: ['a0-les-02'],
  sections: [
    {
      id: 'klanken-1',
      type: 'klanken',
      payload: {
        intro:
          'De regel: één klinker = kort, dubbele klinker = lang. Op het einde van een lettergreep wordt één klinker ook lang ("ja", "zo"). Beluister de 5 paren — de tweede klank klinkt altijd langer en helderder.',
        sounds: [
          {
            id: 'a-aa',
            display: 'a / aa',
            hint: 'Kort "a" als in "man"; lang "aa" als in "maan".',
            examples: [
              { nl: 'man', en: 'man', audioId: 'klank-a-man' },
              { nl: 'maan', en: 'moon', audioId: 'klank-aa-maan' },
            ],
          },
          {
            id: 'e-ee',
            display: 'e / ee',
            hint: 'Kort "e" als in "bed"; lang "ee" als in "been".',
            examples: [
              { nl: 'bed', en: 'bed', audioId: 'klank-e-bed' },
              { nl: 'been', en: 'leg / bone', audioId: 'klank-ee-been' },
            ],
          },
          {
            id: 'i-ie',
            display: 'i / ie',
            hint: 'Kort "i" als in "kind"; lang wordt "ie" gespeld, nooit "ii".',
            examples: [
              { nl: 'kind', en: 'child', audioId: 'klank-i-kind' },
              { nl: 'kies', en: 'molar (tooth)', audioId: 'klank-ie-kies' },
            ],
          },
          {
            id: 'o-oo',
            display: 'o / oo',
            hint: 'Kort "o" als in "pot"; lang "oo" als in "poot".',
            examples: [
              { nl: 'pot', en: 'pot / jar', audioId: 'klank-o-pot' },
              { nl: 'poot', en: 'paw / leg', audioId: 'klank-oo-poot' },
            ],
          },
          {
            id: 'u-uu',
            display: 'u / uu',
            hint: 'Kort "u" als in "bus"; lang "uu" als in "muur".',
            examples: [
              { nl: 'bus', en: 'bus', audioId: 'klank-u-bus' },
              { nl: 'muur', en: 'wall', audioId: 'klank-uu-muur' },
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
          'Tien items, één per klank uit de klanken-sectie. Luister kort, tik de spelling die je hoort. Eerste tik telt.',
        items: [
          {
            kind: 'mc',
            audioId: 'klank-a-man',
            promptNl: 'Welk woord hoor je?',
            choices: [
              { text: 'man', correct: true },
              { text: 'maan', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-aa-maan',
            promptNl: 'Welk woord hoor je?',
            choices: [
              { text: 'man', correct: false },
              { text: 'maan', correct: true },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-e-bed',
            promptNl: 'Welk woord hoor je?',
            choices: [
              { text: 'bed', correct: true },
              { text: 'been', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-ee-been',
            promptNl: 'Welk woord hoor je?',
            choices: [
              { text: 'bed', correct: false },
              { text: 'been', correct: true },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-i-kind',
            promptNl: 'Welk woord hoor je?',
            choices: [
              { text: 'kind', correct: true },
              { text: 'kies', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-ie-kies',
            promptNl: 'Welk woord hoor je?',
            choices: [
              { text: 'kind', correct: false },
              { text: 'kies', correct: true },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-o-pot',
            promptNl: 'Welk woord hoor je?',
            choices: [
              { text: 'pot', correct: true },
              { text: 'poot', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-oo-poot',
            promptNl: 'Welk woord hoor je?',
            choices: [
              { text: 'pot', correct: false },
              { text: 'poot', correct: true },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-u-bus',
            promptNl: 'Welk woord hoor je?',
            choices: [
              { text: 'bus', correct: true },
              { text: 'muur', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-uu-muur',
            promptNl: 'Welk woord hoor je?',
            choices: [
              { text: 'bus', correct: false },
              { text: 'muur', correct: true },
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
          'Lees elk paar hardop. Maak het verschil duidelijk hoorbaar — de lange klank duurt merkbaar langer dan de korte.',
        lines: [
          {
            id: 'l1',
            nl: 'man, maan.',
            en: 'man, moon.',
            audioId: 'spreken-paar-a',
          },
          {
            id: 'l2',
            nl: 'bed, been.',
            en: 'bed, leg.',
            audioId: 'spreken-paar-e',
          },
          {
            id: 'l3',
            nl: 'kind, kies.',
            en: 'child, molar.',
            audioId: 'spreken-paar-i',
          },
          {
            id: 'l4',
            nl: 'pot, poot.',
            en: 'pot, paw.',
            audioId: 'spreken-paar-o',
          },
          {
            id: 'l5',
            nl: 'bus, muur.',
            en: 'bus, wall.',
            audioId: 'spreken-paar-u',
          },
        ],
      },
    },
  ],
};
