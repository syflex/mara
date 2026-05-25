import type { Lesson } from '@/lib/types';

export const A0_LES_16: Lesson = {
  id: 'a0-les-16',
  track: 'beginner',
  level: 'A0',
  order: 16,
  titleNl: 'Hoe voel je je? — gevoelens',
  titleEn: 'How are you feeling? — emotions',
  estimatedMinutes: 13,
  coverage: ['§2.6', '§3.6'],
  prerequisites: ['a0-les-15'],
  reviewWords: [
    { nl: 'niet', en: 'not' },
    { nl: 'voelen', en: 'to feel' },
    { nl: 'erg', en: 'very', partOfSpeech: 'adverb' },
    { nl: 'een beetje', en: 'a little / a bit', partOfSpeech: 'phrase' },
  ],
  sections: [
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro:
          'Acht bijvoeglijke naamwoorden voor gevoelens. Sommige zijn tegenpolen: blij ↔ verdrietig, goed ↔ slecht. Geen lidwoord (het zijn adjectieven, geen zelfstandige naamwoorden).',
        words: [
          {
            nl: 'moe',
            en: 'tired',
            audioId: 'moe',
            exampleNl: 'Ik ben moe na de les.',
            exampleEn: 'I am tired after the lesson.',
          },
          {
            nl: 'ziek',
            en: 'sick / ill',
            audioId: 'ziek',
            exampleNl: 'Mijn broer is ziek vandaag.',
            exampleEn: 'My brother is sick today.',
          },
          {
            nl: 'blij',
            en: 'happy',
            audioId: 'blij',
            exampleNl: 'Ik ben blij om je te zien.',
            exampleEn: 'I am happy to see you.',
          },
          {
            nl: 'verdrietig',
            en: 'sad',
            audioId: 'verdrietig',
            exampleNl: 'Zij is verdrietig.',
            exampleEn: 'She is sad.',
          },
          {
            nl: 'boos',
            en: 'angry',
            audioId: 'boos',
            exampleNl: 'Hij is boos.',
            exampleEn: 'He is angry.',
          },
          {
            nl: 'bang',
            en: 'afraid / scared',
            audioId: 'bang',
            exampleNl: 'Het kind is bang.',
            exampleEn: 'The child is afraid.',
          },
          {
            nl: 'goed',
            en: 'good / well',
            audioId: 'goed-adj',
            exampleNl: 'Het gaat goed met mij.',
            exampleEn: "I'm doing well.",
          },
          {
            nl: 'slecht',
            en: 'bad / poorly',
            audioId: 'slecht',
            exampleNl: 'Vandaag voel ik me slecht.',
            exampleEn: 'I feel bad today.',
          },
        ],
      },
    },
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Niet — ontkennen met één woord' },
          {
            kind: 'paragraph',
            text: '"Niet" maakt van een bevestiging een ontkenning, net als "not" in het Engels. Plaats het ná het werkwoord — meestal tegen het einde van de zin, vóór het bijvoeglijk naamwoord.',
          },
          {
            kind: 'list',
            items: [
              'Ik ben moe. → Ik ben niet moe.',
              'Hij is ziek. → Hij is niet ziek.',
              'Zij is blij. → Zij is niet blij.',
              'Het gaat goed. → Het gaat niet goed.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Let op: voor zelfstandige naamwoorden gebruik je "geen", niet "niet". Bijvoorbeeld "Ik heb geen tijd" (niet "Ik heb niet tijd"). De volledige regels van niet/geen komen in Les 29 — voor nu is dit voldoende.',
          },
          { kind: 'heading', text: 'Hoe gaat het?' },
          {
            kind: 'paragraph',
            text: 'De standaardvraag bij ontmoeting. Antwoorden lopen van enthousiast tot eerlijk:',
          },
          {
            kind: 'list',
            items: [
              'Het gaat goed. — I\'m doing well.',
              'Het gaat. — So-so.',
              'Het gaat niet zo goed. — Not so well.',
              'Ik ben ziek/moe/verdrietig. — direct over je gevoel.',
            ],
          },
        ],
      },
    },
    {
      id: 'dialoog-1',
      type: 'mini-dialoog',
      payload: {
        intro:
          'Twee versies: tussen vrienden en bij een collega die je beleefd aanspreekt. Let op het werkwoord — bij "u" wordt "Hoe gaat het met u?" iets formeler.',
        scenes: [
          {
            id: 'informeel',
            titleNl: 'Op straat',
            titleEn: 'On the street',
            register: 'informeel',
            lines: [
              {
                id: 'l1',
                speaker: 'Anna',
                nl: 'Hoi, hoe gaat het?',
                en: 'Hi, how are you?',
                audioId: 'dialoog-gevoel-jij-l1',
              },
              {
                id: 'l2',
                speaker: 'Peter',
                nl: 'Het gaat goed. En jij?',
                en: "I'm doing well. And you?",
                audioId: 'dialoog-gevoel-jij-l2',
              },
              {
                id: 'l3',
                speaker: 'Anna',
                nl: 'Ik ben een beetje moe.',
                en: "I'm a bit tired.",
                audioId: 'dialoog-gevoel-jij-l3',
              },
            ],
          },
          {
            id: 'formeel',
            titleNl: 'Op kantoor',
            titleEn: 'At the office',
            register: 'formeel',
            lines: [
              {
                id: 'l1',
                speaker: 'Mevrouw De Vries',
                nl: 'Goedemorgen, hoe gaat het met u?',
                en: 'Good morning, how are you?',
                audioId: 'dialoog-gevoel-u-l1',
              },
              {
                id: 'l2',
                speaker: 'Meneer Jansen',
                nl: 'Niet zo goed, ik ben ziek.',
                en: "Not so well, I'm sick.",
                audioId: 'dialoog-gevoel-u-l2',
              },
              {
                id: 'l3',
                speaker: 'Mevrouw De Vries',
                nl: 'O, beterschap!',
                en: 'Oh, get well soon!',
                audioId: 'dialoog-gevoel-u-l3',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'schrijven-1',
      type: 'schrijven',
      payload: {
        intro:
          'Drie zinnen over jouw gevoel vandaag. Eén positief, één met "niet" (ontkenning), één over iemand anders. Vrij invullen — vergelijk met het model.',
        items: [
          {
            promptEn: 'Write something positive about how you feel today.',
            expected: 'Ik ben blij vandaag.',
            hint: 'gebruik blij / goed / niet moe',
          },
          {
            promptEn: 'Write a negative sentence using "niet".',
            expected: 'Ik ben niet ziek.',
            hint: 'plaats "niet" vóór het adjectief',
          },
          {
            promptEn: 'Write about how another person feels (he/she/family member).',
            expected: 'Mijn moeder is moe.',
            hint: 'gebruik hij/zij/mijn [familielid] + is + gevoel',
          },
        ],
      },
    },
  ],
};
