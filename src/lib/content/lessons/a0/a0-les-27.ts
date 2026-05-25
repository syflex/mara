import type { Lesson } from '@/lib/types';

export const A0_LES_27: Lesson = {
  id: 'a0-les-27',
  track: 'beginner',
  level: 'A0',
  order: 27,
  titleNl: 'Voorzetsels — de volledige set',
  titleEn: 'Prepositions — the full set',
  estimatedMinutes: 14,
  coverage: ['§2.12'],
  prerequisites: ['a0-les-26'],
  // Eleven nieuwe voorzetsels. De andere vier (in, op, onder, naast) staan al
  // in SRS uit Les 09 en Les 21.
  reviewWords: [
    { nl: 'aan', en: 'on / at (vertical)' },
    { nl: 'naar', en: 'to / towards' },
    { nl: 'van', en: 'of / from' },
    { nl: 'bij', en: 'at / near / with' },
    { nl: 'met', en: 'with' },
    { nl: 'voor', en: 'for / in front of / before' },
    { nl: 'na', en: 'after' },
    { nl: 'tot', en: 'until / up to' },
    { nl: 'om', en: 'at (time) / around' },
    { nl: 'boven', en: 'above' },
    { nl: 'tussen', en: 'between' },
  ],
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Drie groepen voorzetsels' },
          {
            kind: 'paragraph',
            text: 'Voorzetsels in het Nederlands zijn klein maar lastig — ze hebben vaak meer dan één betekenis en passen niet altijd 1-op-1 op het Engels. Verdeel ze in drie groepen om ze beter te onthouden.',
          },
          { kind: 'heading', text: '1. Ruimtelijk — waar iets is' },
          {
            kind: 'list',
            items: [
              'in — binnenin: "in de tas"',
              'op — bovenop: "op de tafel"',
              'onder — eronder: "onder de stoel"',
              'naast — ernaast: "naast het bed"',
              'tussen — ertussen: "tussen de boeken"',
              'boven — erboven: "boven de tafel" (niet aanrakend)',
              'aan — eraan vastzittend: "aan de muur"',
            ],
          },
          { kind: 'heading', text: '2. Richting — beweging ergens heen of vandaan' },
          {
            kind: 'list',
            items: [
              'naar — ergens heen: "Ik ga naar school"',
              'van — ergens vandaan: "Ik kom van mijn werk"',
              'uit — uit iets vandaan: "Ik kom uit Spanje" (review)',
              'tot — tot een grens: "Open tot vijf uur"',
            ],
          },
          { kind: 'heading', text: '3. Vaste combinaties — bij werkwoord of tijd' },
          {
            kind: 'list',
            items: [
              'met — samen / instrument: "met mijn vriend", "met de pen"',
              'voor — bestemming / tijd: "voor mij", "voor acht uur"',
              'na — tijd: "na de les"',
              'om — kloktijd: "om vijf uur"',
              'bij — locatie ruwweg: "bij de winkel", "bij ons"',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Veel voorzetsels passen in meerdere groepen — "voor" is ruimtelijk én tijd, "aan" is ruimtelijk én vast bij werkwoord ("denken aan"). De beste manier om ze te leren is per zin, niet als losse vertaling.',
          },
        ],
      },
    },
    {
      id: 'drill-1',
      type: 'drill',
      payload: {
        intro:
          'Twaalf zinnen met een blanco. Kies het juiste voorzetsel. Mix van ruimtelijk, richting en vaste combinatie.',
        items: [
          {
            kind: 'mc',
            promptNl: 'Ik ga ___ school.',
            choices: [
              { text: 'naar', correct: true },
              { text: 'aan', correct: false },
              { text: 'van', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Het boek ligt ___ de tafel.',
            choices: [
              { text: 'op', correct: true },
              { text: 'aan', correct: false },
              { text: 'boven', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Ik praat ___ mijn vriend.',
            choices: [
              { text: 'met', correct: true },
              { text: 'bij', correct: false },
              { text: 'aan', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'De les begint ___ acht uur.',
            choices: [
              { text: 'om', correct: true },
              { text: 'op', correct: false },
              { text: 'bij', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Ik werk ___ de winkel.',
            choices: [
              { text: 'bij', correct: true },
              { text: 'met', correct: false },
              { text: 'aan', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'De lamp hangt ___ de tafel.',
            choices: [
              { text: 'boven', correct: true },
              { text: 'tussen', correct: false },
              { text: 'naast', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Ik blijf hier ___ half drie.',
            choices: [
              { text: 'tot', correct: true },
              { text: 'om', correct: false },
              { text: 'voor', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Hij komt ___ Spanje.',
            choices: [
              { text: 'uit', correct: true },
              { text: 'van', correct: false },
              { text: 'bij', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Het glas staat ___ de tafel en de bank.',
            choices: [
              { text: 'tussen', correct: true },
              { text: 'op', correct: false },
              { text: 'naast', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Wij eten ___ de les.',
            choices: [
              { text: 'na', correct: true },
              { text: 'voor', correct: false },
              { text: 'om', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'De foto hangt ___ de muur.',
            choices: [
              { text: 'aan', correct: true },
              { text: 'op', correct: false },
              { text: 'in', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Deze koffie is ___ jou.',
            choices: [
              { text: 'voor', correct: true },
              { text: 'aan', correct: false },
              { text: 'bij', correct: false },
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
          'Acht zinnen met voorzetselgroepen. Sleep de tegels in de juiste volgorde. Het Nederlands volgt onderwerp + werkwoord + voorzetselgroep — net als Engels, maar de voorzetsels zelf kunnen verrassen.',
        items: [
          {
            promptEn: 'I go to the shop.',
            tiles: ['Ik', 'ga', 'naar', 'de', 'winkel'],
            expected: 'Ik ga naar de winkel',
          },
          {
            promptEn: 'The book is on the table.',
            tiles: ['Het', 'boek', 'is', 'op', 'de', 'tafel'],
            expected: 'Het boek is op de tafel',
          },
          {
            promptEn: 'I talk with my friend.',
            tiles: ['Ik', 'praat', 'met', 'mijn', 'vriend'],
            expected: 'Ik praat met mijn vriend',
          },
          {
            promptEn: 'I come at eight o\'clock.',
            tiles: ['Ik', 'kom', 'om', 'acht', 'uur'],
            expected: 'Ik kom om acht uur',
          },
          {
            promptEn: 'He works at the shop.',
            tiles: ['Hij', 'werkt', 'bij', 'de', 'winkel'],
            expected: 'Hij werkt bij de winkel',
          },
          {
            promptEn: 'We go home.',
            tiles: ['Wij', 'gaan', 'naar', 'huis'],
            expected: 'Wij gaan naar huis',
          },
          {
            promptEn: 'The lamp is above the table.',
            tiles: ['De', 'lamp', 'is', 'boven', 'de', 'tafel'],
            expected: 'De lamp is boven de tafel',
          },
          {
            promptEn: 'I come from the Netherlands.',
            tiles: ['Ik', 'kom', 'uit', 'Nederland'],
            expected: 'Ik kom uit Nederland',
          },
        ],
      },
    },
    {
      id: 'luisteren-1',
      type: 'luisteren',
      payload: {
        intro:
          'Iemand vertelt over de dag. Drie vragen over de voorzetsels die je hoort — let goed op naar/met/om.',
        audioId: 'luisteren-voorzetsels-dag',
        transcriptNl: 'Vandaag ga ik naar de winkel. Daarna ga ik met mijn vriend naar het café. Om vijf uur ben ik weer thuis.',
        transcriptEn: 'Today I go to the shop. Then I go with my friend to the café. At five o\'clock I am back home.',
        questions: [
          {
            questionNl: 'Waar gaat de spreker eerst naartoe?',
            choices: ['winkel', 'café', 'thuis'],
            correctIndex: 0,
          },
          {
            questionNl: 'Met wie gaat hij naar het café?',
            choices: ['met zijn moeder', 'met zijn vriend', 'met zijn broer'],
            correctIndex: 1,
          },
          {
            questionNl: 'Hoe laat is hij thuis?',
            choices: ['drie uur', 'vijf uur', 'zeven uur'],
            correctIndex: 1,
          },
        ],
      },
    },
  ],
};
