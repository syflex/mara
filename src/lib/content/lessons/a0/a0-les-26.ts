import type { Lesson } from '@/lib/types';

export const A0_LES_26: Lesson = {
  id: 'a0-les-26',
  track: 'beginner',
  level: 'A0',
  order: 26,
  titleNl: 'Top 25 werkwoorden',
  titleEn: 'Top 25 verbs',
  estimatedMinutes: 15,
  coverage: ['§2.10'],
  prerequisites: ['a0-les-25'],
  sections: [
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro:
          'Vijfentwintig hoogfrequente werkwoorden. De vier die je al kent (zijn, hebben, heten, wonen) staan er ter herhaling. Op A0 herken je de infinitief en gebruik je de ik-vorm — de volledige vervoeging komt in A1.',
        words: [
          { nl: 'doen', en: 'to do', audioId: 'doen', exampleNl: 'Ik doe boodschappen.', exampleEn: 'I do groceries. (ik doe)' },
          { nl: 'gaan', en: 'to go', audioId: 'gaan', exampleNl: 'Ik ga naar de winkel.', exampleEn: 'I go to the shop. (ik ga)' },
          { nl: 'komen', en: 'to come', audioId: 'komen-26', exampleNl: 'Ik kom uit Nederland.', exampleEn: 'I come from the Netherlands. (ik kom)' },
          { nl: 'zien', en: 'to see', audioId: 'zien', exampleNl: 'Ik zie mijn vader.', exampleEn: 'I see my father. (ik zie)' },
          { nl: 'willen', en: 'to want', audioId: 'willen', exampleNl: 'Ik wil koffie.', exampleEn: 'I want coffee. (ik wil)' },
          { nl: 'kunnen', en: 'can / to be able to', audioId: 'kunnen', exampleNl: 'Ik kan Nederlands.', exampleEn: 'I can speak Dutch. (ik kan)' },
          { nl: 'moeten', en: 'must / to have to', audioId: 'moeten', exampleNl: 'Ik moet werken.', exampleEn: 'I have to work. (ik moet)' },
          { nl: 'mogen', en: 'may / to be allowed', audioId: 'mogen', exampleNl: 'Ik mag dat doen.', exampleEn: 'I am allowed to do that. (ik mag)' },
          { nl: 'weten', en: 'to know (fact)', audioId: 'weten', exampleNl: 'Ik weet het niet.', exampleEn: "I don't know. (ik weet)" },
          { nl: 'zeggen', en: 'to say', audioId: 'zeggen', exampleNl: 'Ik zeg "hallo".', exampleEn: 'I say "hello". (ik zeg)' },
          { nl: 'maken', en: 'to make', audioId: 'maken', exampleNl: 'Ik maak een foto.', exampleEn: 'I take a photo. (ik maak)' },
          { nl: 'geven', en: 'to give', audioId: 'geven', exampleNl: 'Ik geef een boek.', exampleEn: 'I give a book. (ik geef)' },
          { nl: 'nemen', en: 'to take', audioId: 'nemen', exampleNl: 'Ik neem koffie.', exampleEn: 'I take coffee. (ik neem)' },
          { nl: 'spreken', en: 'to speak', audioId: 'spreken', exampleNl: 'Ik spreek Engels.', exampleEn: 'I speak English. (ik spreek)' },
          { nl: 'praten', en: 'to talk', audioId: 'praten', exampleNl: 'Ik praat met mijn vriend.', exampleEn: 'I talk with my friend. (ik praat)' },
          { nl: 'luisteren', en: 'to listen', audioId: 'luisteren-verb', exampleNl: 'Ik luister naar muziek.', exampleEn: 'I listen to music. (ik luister)' },
          { nl: 'kijken', en: 'to look / watch', audioId: 'kijken', exampleNl: 'Ik kijk televisie.', exampleEn: 'I watch TV. (ik kijk)' },
          { nl: 'lezen', en: 'to read', audioId: 'lezen', exampleNl: 'Ik lees een boek.', exampleEn: 'I read a book. (ik lees)' },
          { nl: 'schrijven', en: 'to write', audioId: 'schrijven', exampleNl: 'Ik schrijf een brief.', exampleEn: 'I write a letter. (ik schrijf)' },
          { nl: 'leren', en: 'to learn', audioId: 'leren', exampleNl: 'Ik leer Nederlands.', exampleEn: 'I learn Dutch. (ik leer)' },
          { nl: 'werken', en: 'to work', audioId: 'werken', exampleNl: 'Ik werk in de keuken.', exampleEn: 'I work in the kitchen. (ik werk)' },
          { nl: 'zijn', en: 'to be (review)', audioId: 'zijn-verb', exampleNl: 'Ik ben thuis.', exampleEn: 'I am home. (ik ben)' },
          { nl: 'hebben', en: 'to have (review)', audioId: 'hebben-verb', exampleNl: 'Ik heb tijd.', exampleEn: 'I have time. (ik heb)' },
          { nl: 'heten', en: 'to be called (review)', audioId: 'heten-26', exampleNl: 'Ik heet Anna.', exampleEn: 'I am called Anna. (ik heet)' },
          { nl: 'wonen', en: 'to live (review)', audioId: 'wonen-26', exampleNl: 'Ik woon in Amsterdam.', exampleEn: 'I live in Amsterdam. (ik woon)' },
        ],
      },
    },
    {
      id: 'drill-1',
      type: 'drill',
      payload: {
        intro:
          'Tien items. Je hoort een ik-vorm (zoals "ik ga") en tikt de infinitief (gaan). Tip: de meeste werkwoorden volgen het patroon ik-vorm + -en = infinitief.',
        items: [
          {
            kind: 'mc',
            audioId: 'ik-doe',
            audioText: 'ik doe',
            promptNl: 'Welke infinitief?',
            choices: [
              { text: 'doen', correct: true },
              { text: 'gaan', correct: false },
              { text: 'zien', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'ik-ga',
            audioText: 'ik ga',
            promptNl: 'Welke infinitief?',
            choices: [
              { text: 'gaan', correct: true },
              { text: 'doen', correct: false },
              { text: 'komen', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'ik-zie',
            audioText: 'ik zie',
            promptNl: 'Welke infinitief?',
            choices: [
              { text: 'zien', correct: true },
              { text: 'kijken', correct: false },
              { text: 'weten', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'ik-wil',
            audioText: 'ik wil',
            promptNl: 'Welke infinitief?',
            choices: [
              { text: 'willen', correct: true },
              { text: 'kunnen', correct: false },
              { text: 'moeten', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'ik-kan',
            audioText: 'ik kan',
            promptNl: 'Welke infinitief?',
            choices: [
              { text: 'kunnen', correct: true },
              { text: 'mogen', correct: false },
              { text: 'weten', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'ik-moet',
            audioText: 'ik moet',
            promptNl: 'Welke infinitief?',
            choices: [
              { text: 'moeten', correct: true },
              { text: 'willen', correct: false },
              { text: 'mogen', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'ik-mag',
            audioText: 'ik mag',
            promptNl: 'Welke infinitief?',
            choices: [
              { text: 'mogen', correct: true },
              { text: 'kunnen', correct: false },
              { text: 'moeten', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'ik-weet',
            audioText: 'ik weet',
            promptNl: 'Welke infinitief?',
            choices: [
              { text: 'weten', correct: true },
              { text: 'zien', correct: false },
              { text: 'zeggen', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'ik-zeg',
            audioText: 'ik zeg',
            promptNl: 'Welke infinitief?',
            choices: [
              { text: 'zeggen', correct: true },
              { text: 'praten', correct: false },
              { text: 'spreken', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'ik-maak',
            audioText: 'ik maak',
            promptNl: 'Welke infinitief?',
            choices: [
              { text: 'maken', correct: true },
              { text: 'nemen', correct: false },
              { text: 'doen', correct: false },
            ],
          },
        ],
      },
    },
    {
      id: 'zinsbouw-1',
      type: 'zinsbouw',
      payload: {
        intro:
          'Zes zinnen met ik-vorm + lijdend voorwerp uit eerdere lessen. Gewoon werkwoord op plek 2, daarna het object.',
        items: [
          {
            promptEn: 'I drink coffee.',
            tiles: ['Ik', 'drink', 'koffie'],
            expected: 'Ik drink koffie',
          },
          {
            promptEn: 'I eat bread.',
            tiles: ['Ik', 'eet', 'brood'],
            expected: 'Ik eet brood',
          },
          {
            promptEn: 'I read a book.',
            tiles: ['Ik', 'lees', 'een', 'boek'],
            expected: 'Ik lees een boek',
          },
          {
            promptEn: 'I work in the kitchen.',
            tiles: ['Ik', 'werk', 'in', 'de', 'keuken'],
            expected: 'Ik werk in de keuken',
          },
          {
            promptEn: 'I see my father.',
            tiles: ['Ik', 'zie', 'mijn', 'vader'],
            expected: 'Ik zie mijn vader',
          },
          {
            promptEn: 'I cook fish.',
            tiles: ['Ik', 'kook', 'vis'],
            expected: 'Ik kook vis',
          },
        ],
      },
    },
    {
      id: 'schrijven-1',
      type: 'schrijven',
      payload: {
        intro:
          'Vijf zinnen over wat jij vandaag doet. Gebruik telkens "Ik [werkwoord-ik-vorm] …". Vergelijk daarna met het model.',
        items: [
          {
            promptEn: 'Write what you eat today.',
            expected: 'Ik eet brood met kaas.',
            hint: 'Ik eet …',
          },
          {
            promptEn: 'Write what you drink.',
            expected: 'Ik drink koffie.',
            hint: 'Ik drink …',
          },
          {
            promptEn: 'Write what you read.',
            expected: 'Ik lees een boek.',
            hint: 'Ik lees …',
          },
          {
            promptEn: 'Write what you write or learn.',
            expected: 'Ik leer Nederlands.',
            hint: 'Ik leer / Ik schrijf …',
          },
          {
            promptEn: 'Write where you work.',
            expected: 'Ik werk in de keuken.',
            hint: 'Ik werk in / bij …',
          },
        ],
      },
    },
  ],
};
