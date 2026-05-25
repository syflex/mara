import type { Lesson } from '@/lib/types';

export const A0_LES_25: Lesson = {
  id: 'a0-les-25',
  track: 'beginner',
  level: 'A0',
  order: 25,
  titleNl: 'Bijvoeglijke naamwoorden — adjectieven',
  titleEn: 'Adjectives',
  estimatedMinutes: 14,
  coverage: ['§2.9'],
  prerequisites: ['a0-les-24'],
  sections: [
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro:
          'Tweeëntwintig adjectieven in tegenparen. Een paar ken je al uit eerdere lessen (oud, goed, slecht, warm, koud, leuk) — die zijn hier bedoeld als anker voor de nieuwe. Geen lidwoord (adjectieven zijn geen zelfstandige naamwoorden).',
        words: [
          { nl: 'groot', en: 'big', audioId: 'groot', exampleNl: 'Het huis is groot.', exampleEn: 'The house is big.' },
          { nl: 'klein', en: 'small', audioId: 'klein', exampleNl: 'De baby is klein.', exampleEn: 'The baby is small.' },
          { nl: 'oud', en: 'old', audioId: 'oud-adj', exampleNl: 'Mijn opa is oud.', exampleEn: 'My grandfather is old.' },
          { nl: 'jong', en: 'young', audioId: 'jong', exampleNl: 'Mijn zus is jong.', exampleEn: 'My sister is young.' },
          { nl: 'nieuw', en: 'new', audioId: 'nieuw', exampleNl: 'Mijn boek is nieuw.', exampleEn: 'My book is new.' },
          { nl: 'lang', en: 'long / tall', audioId: 'lang', exampleNl: 'Zij heeft lang haar.', exampleEn: 'She has long hair.' },
          { nl: 'kort', en: 'short', audioId: 'kort', exampleNl: 'De les is kort.', exampleEn: 'The lesson is short.' },
          { nl: 'hoog', en: 'high', audioId: 'hoog', exampleNl: 'De berg is hoog.', exampleEn: 'The mountain is high.' },
          { nl: 'laag', en: 'low', audioId: 'laag', exampleNl: 'De tafel is laag.', exampleEn: 'The table is low.' },
          { nl: 'mooi', en: 'beautiful', audioId: 'mooi', exampleNl: 'De tuin is mooi.', exampleEn: 'The garden is beautiful.' },
          { nl: 'lelijk', en: 'ugly', audioId: 'lelijk', exampleNl: 'Dat is lelijk!', exampleEn: "That is ugly!" },
          { nl: 'goed', en: 'good', audioId: 'goed-25', exampleNl: 'Het eten is goed.', exampleEn: 'The food is good.' },
          { nl: 'slecht', en: 'bad', audioId: 'slecht-25', exampleNl: 'Het weer is slecht.', exampleEn: 'The weather is bad.' },
          { nl: 'leuk', en: 'fun / nice', audioId: 'leuk-adj', exampleNl: 'Deze les is leuk.', exampleEn: 'This lesson is fun.' },
          { nl: 'makkelijk', en: 'easy', audioId: 'makkelijk', exampleNl: 'Nederlands is makkelijk!', exampleEn: 'Dutch is easy!' },
          { nl: 'moeilijk', en: 'difficult', audioId: 'moeilijk', exampleNl: 'De vraag is moeilijk.', exampleEn: 'The question is difficult.' },
          { nl: 'snel', en: 'fast', audioId: 'snel', exampleNl: 'De trein is snel.', exampleEn: 'The train is fast.' },
          { nl: 'langzaam', en: 'slow', audioId: 'langzaam', exampleNl: 'Mijn opa loopt langzaam.', exampleEn: 'My grandfather walks slowly.' },
          { nl: 'warm', en: 'warm', audioId: 'warm-25', exampleNl: 'De koffie is warm.', exampleEn: 'The coffee is warm.' },
          { nl: 'koud', en: 'cold', audioId: 'koud-25', exampleNl: 'De winter is koud.', exampleEn: 'Winter is cold.' },
          { nl: 'heet', en: 'hot', audioId: 'heet', exampleNl: 'De soep is heet!', exampleEn: 'The soup is hot!' },
          { nl: 'koel', en: 'cool', audioId: 'koel', exampleNl: 'Het bier is koel.', exampleEn: 'The beer is cool.' },
        ],
      },
    },
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Predicatief — adjectief ná het werkwoord' },
          {
            kind: 'paragraph',
            text: 'Op A0 gebruik je adjectieven alleen predicatief: het adjectief staat ná "is" of "zijn", niet vóór een zelfstandig naamwoord. "De man is groot" ✓ — eenvoudig en altijd correct, geen verbuiging.',
          },
          {
            kind: 'list',
            items: [
              'Het huis is groot. ✓',
              'De koffie is warm. ✓',
              'Mijn moeder is jong. ✓',
              'Het weer is slecht. ✓',
            ],
          },
          { kind: 'heading', text: 'Attributief — komt in A1' },
          {
            kind: 'paragraph',
            text: 'De vorm "de grote man" (adjectief vóór noun) heet attributief. Daar krijgt het adjectief soms een -e: "de grote man", "het grote huis", "een groot huis" (de regel met -e/geen -e is precies wat A1 leert). Voor nu: vermijd attributief, gebruik altijd "is + adjectief". Veel minder fouten.',
          },
        ],
      },
    },
    {
      id: 'drill-1',
      type: 'drill',
      payload: {
        intro:
          'Twaalf items — kies bij elk adjectief de tegenpool. De keuzes komen uit de woordenlijst. Eerste tik telt.',
        items: [
          {
            kind: 'mc',
            promptNl: 'groot ↔ ?',
            choices: [
              { text: 'klein', correct: true },
              { text: 'kort', correct: false },
              { text: 'koud', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'klein ↔ ?',
            choices: [
              { text: 'groot', correct: true },
              { text: 'laag', correct: false },
              { text: 'lelijk', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'oud ↔ ?',
            choices: [
              { text: 'jong', correct: true },
              { text: 'nieuw', correct: false },
              { text: 'klein', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'nieuw ↔ ?',
            choices: [
              { text: 'oud', correct: true },
              { text: 'jong', correct: false },
              { text: 'kort', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'lang ↔ ?',
            choices: [
              { text: 'kort', correct: true },
              { text: 'klein', correct: false },
              { text: 'laag', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'hoog ↔ ?',
            choices: [
              { text: 'laag', correct: true },
              { text: 'kort', correct: false },
              { text: 'klein', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'mooi ↔ ?',
            choices: [
              { text: 'lelijk', correct: true },
              { text: 'slecht', correct: false },
              { text: 'oud', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'goed ↔ ?',
            choices: [
              { text: 'slecht', correct: true },
              { text: 'lelijk', correct: false },
              { text: 'moeilijk', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'makkelijk ↔ ?',
            choices: [
              { text: 'moeilijk', correct: true },
              { text: 'slecht', correct: false },
              { text: 'langzaam', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'snel ↔ ?',
            choices: [
              { text: 'langzaam', correct: true },
              { text: 'kort', correct: false },
              { text: 'laag', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'warm ↔ ?',
            choices: [
              { text: 'koud', correct: true },
              { text: 'koel', correct: false },
              { text: 'heet', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'heet ↔ ?',
            choices: [
              { text: 'koel', correct: true },
              { text: 'koud', correct: false },
              { text: 'warm', correct: false },
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
          'Vier zinnen met adjectief + zelfstandig naamwoord + "is". Houd het simpel — predicatief is altijd veilig. Pak een voorwerp of persoon uit een eerdere les.',
        items: [
          {
            promptEn: "Say: 'The house is big.'",
            expected: 'Het huis is groot.',
            hint: '[lidwoord] [noun] is [adjectief]',
          },
          {
            promptEn: "Say: 'The coffee is hot.'",
            expected: 'De koffie is heet.',
            hint: 'koffie = de',
          },
          {
            promptEn: "Say: 'My grandfather is old.'",
            expected: 'Mijn opa is oud.',
            hint: 'Mijn [familie] is [adjectief]',
          },
          {
            promptEn: "Say: 'This lesson is easy.' (use 'deze' for de-lesson)",
            expected: 'Deze les is makkelijk.',
            hint: 'les = de → deze',
          },
        ],
      },
    },
  ],
};
