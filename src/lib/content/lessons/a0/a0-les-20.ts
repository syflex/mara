import type { Lesson } from '@/lib/types';

export const A0_LES_20: Lesson = {
  id: 'a0-les-20',
  track: 'beginner',
  level: 'A0',
  order: 20,
  titleNl: 'Review 2 — Les 11 t/m 19',
  titleEn: 'Review 2 — Lessons 11–19',
  estimatedMinutes: 15,
  coverage: ['§2.3', '§2.4', '§2.5', '§2.6', '§2.7', '§3.3', '§3.4', '§3.5'],
  prerequisites: ['a0-les-19'],
  sections: [
    {
      id: 'drill-1',
      type: 'drill',
      payload: {
        intro:
          'Twintig items door elkaar — vervoegingen van hebben, lidwoorden, meervouden, lichaamsdelen. Tempo niet belangrijk; precisie wel.',
        items: [
          // Hebben conjugation
          {
            kind: 'mc',
            promptNl: 'Ik ___ pijn.',
            choices: [
              { text: 'heb', correct: true },
              { text: 'hebt', correct: false },
              { text: 'heeft', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Hij ___ een huis.',
            choices: [
              { text: 'heeft', correct: true },
              { text: 'heb', correct: false },
              { text: 'hebben', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Wij ___ tijd.',
            choices: [
              { text: 'hebben', correct: true },
              { text: 'hebt', correct: false },
              { text: 'heeft', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Jij ___ honger?',
            choices: [
              { text: 'hebt', correct: true },
              { text: 'heb', correct: false },
              { text: 'heeft', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Zij ___ twee dochters.',
            choices: [
              { text: 'heeft', correct: true },
              { text: 'heb', correct: false },
              { text: 'hebben', correct: false },
            ],
          },
          // Articles
          {
            kind: 'mc',
            promptNl: '___ vader',
            choices: [
              { text: 'de', correct: true },
              { text: 'het', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '___ kind',
            choices: [
              { text: 'het', correct: true },
              { text: 'de', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '___ huis',
            choices: [
              { text: 'het', correct: true },
              { text: 'de', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '___ stad',
            choices: [
              { text: 'de', correct: true },
              { text: 'het', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '___ hoofd',
            choices: [
              { text: 'het', correct: true },
              { text: 'de', correct: false },
            ],
          },
          // Plurals (typed)
          {
            kind: 'typed',
            promptNl: 'boek',
            promptEn: '(book) → meervoud?',
            expected: 'boeken',
          },
          {
            kind: 'typed',
            promptNl: 'kind',
            promptEn: '(child) → meervoud?',
            expected: 'kinderen',
          },
          {
            kind: 'typed',
            promptNl: 'foto',
            promptEn: '(photo) → meervoud?',
            expected: "foto's",
          },
          {
            kind: 'typed',
            promptNl: 'hand',
            promptEn: '(hand) → meervoud?',
            expected: 'handen',
          },
          {
            kind: 'typed',
            promptNl: 'ei',
            promptEn: '(egg) → meervoud?',
            expected: 'eieren',
          },
          // Body parts from audio
          {
            kind: 'mc',
            audioId: 'rev-hoofd',
            audioText: 'hoofd',
            promptNl: 'Welk lichaamsdeel hoor je?',
            choices: [
              { text: 'hoofd', correct: true },
              { text: 'hand', correct: false },
              { text: 'voet', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'rev-rug',
            audioText: 'rug',
            promptNl: 'Welk lichaamsdeel hoor je?',
            choices: [
              { text: 'rug', correct: true },
              { text: 'buik', correct: false },
              { text: 'been', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'rev-neus',
            audioText: 'neus',
            promptNl: 'Welk lichaamsdeel hoor je?',
            choices: [
              { text: 'neus', correct: true },
              { text: 'mond', correct: false },
              { text: 'oor', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'rev-hand',
            audioText: 'hand',
            promptNl: 'Welk lichaamsdeel hoor je?',
            choices: [
              { text: 'hand', correct: true },
              { text: 'arm', correct: false },
              { text: 'voet', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'rev-hart',
            audioText: 'hart',
            promptNl: 'Welk lichaamsdeel hoor je?',
            choices: [
              { text: 'hart', correct: true },
              { text: 'hand', correct: false },
              { text: 'hoofd', correct: false },
            ],
          },
        ],
      },
    },
    {
      id: 'luisteren-1',
      type: 'luisteren',
      payload: {
        intro:
          'Iemand beschrijft zijn vader en het huis waar hij woont. Vier vragen — beluister meerdere keren als je wilt.',
        audioId: 'luisteren-review-vader-huis',
        transcriptNl: 'Mijn vader heet Jan. Hij is vijftig jaar oud. Hij woont in een groot huis in Amsterdam. Het huis heeft vier slaapkamers en een mooie tuin.',
        transcriptEn: 'My father is named Jan. He is fifty years old. He lives in a big house in Amsterdam. The house has four bedrooms and a beautiful garden.',
        questions: [
          {
            questionNl: 'Hoe heet de vader?',
            choices: ['Tom', 'Jan', 'Peter'],
            correctIndex: 1,
          },
          {
            questionNl: 'Hoe oud is hij?',
            choices: ['veertig', 'vijftig', 'zestig'],
            correctIndex: 1,
          },
          {
            questionNl: 'Waar woont hij?',
            choices: ['Rotterdam', 'Den Haag', 'Amsterdam'],
            correctIndex: 2,
          },
          {
            questionNl: 'Hoeveel slaapkamers heeft het huis?',
            choices: ['drie', 'vier', 'vijf'],
            correctIndex: 1,
          },
        ],
      },
    },
    {
      id: 'spreken-1',
      type: 'spreken',
      payload: {
        intro:
          'Zes zinnen over jezelf — een complete A0-zelfintroductie. Naam, leeftijd, familie, woonsituatie en gevoel vandaag. Beluister Anna als model, neem dan jezelf op met je eigen gegevens.',
        lines: [
          {
            id: 'l1',
            nl: 'Ik heet Anna en ik ben tweeëndertig jaar oud.',
            en: 'My name is Anna and I am 32 years old.',
            audioId: 'spreken-rev-l1',
          },
          {
            id: 'l2',
            nl: 'Mijn moeder heet Lisa en mijn vader heet Tom.',
            en: 'My mother is Lisa and my father is Tom.',
            audioId: 'spreken-rev-l2',
          },
          {
            id: 'l3',
            nl: 'Ik heb één broer en twee zussen.',
            en: 'I have one brother and two sisters.',
            audioId: 'spreken-rev-l3',
          },
          {
            id: 'l4',
            nl: 'Ik woon in een huis met drie slaapkamers.',
            en: 'I live in a house with three bedrooms.',
            audioId: 'spreken-rev-l4',
          },
          {
            id: 'l5',
            nl: 'Vandaag ben ik blij.',
            en: 'Today I am happy.',
            audioId: 'spreken-rev-l5',
          },
          {
            id: 'l6',
            nl: 'Ik ben niet moe en het gaat goed.',
            en: "I am not tired and I'm doing well.",
            audioId: 'spreken-rev-l6',
          },
        ],
      },
    },
    {
      id: 'schrijven-1',
      type: 'schrijven',
      payload: {
        intro:
          'Vijf zinnen die samen je ochtend beschrijven. Houd het simpel — gebruik alleen vocabulaire dat je tot nu toe hebt geleerd. Tijd, gevoel, familie, huis: kies wat past bij jouw ochtend.',
        items: [
          {
            promptEn: 'Write what time it is (an o\'clock or "half X" time).',
            expected: 'Het is half acht.',
            hint: 'gebruik "Het is [getal] uur" of "Het is half [getal]"',
          },
          {
            promptEn: 'Write whether you are hungry.',
            expected: 'Ik heb honger.',
            hint: 'gebruik "Ik heb honger" of "Ik heb geen honger"',
          },
          {
            promptEn: 'Write how you feel today (use "niet" if you want negative).',
            expected: 'Ik ben niet moe.',
            hint: 'gebruik blij / moe / ziek / niet …',
          },
          {
            promptEn: 'Write where one family member is in the house.',
            expected: 'Mijn moeder is in de keuken.',
            hint: 'gebruik "Mijn [familielid] is in de [kamer]"',
          },
          {
            promptEn: 'Write what day it is today.',
            expected: 'Vandaag is maandag.',
            hint: 'gebruik "Vandaag is [dag]"',
          },
        ],
      },
    },
  ],
};
