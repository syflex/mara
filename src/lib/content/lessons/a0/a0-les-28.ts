import type { Lesson } from '@/lib/types';

export const A0_LES_28: Lesson = {
  id: 'a0-les-28',
  track: 'beginner',
  level: 'A0',
  order: 28,
  titleNl: 'Vraagwoorden — alle acht',
  titleEn: 'Question words — all eight',
  estimatedMinutes: 13,
  coverage: ['§2.13', '§3.7'],
  prerequisites: ['a0-les-27'],
  sections: [
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro:
          'Acht vraagwoorden. Vier ken je uit eerdere lessen (wie/wat/hoe/waar) — vier zijn nieuw (wanneer/waarom/hoeveel/welk). "Welk" gebruik je vóór "het"-woorden, "welke" vóór "de"-woorden en alle meervouden.',
        words: [
          { nl: 'wie', en: 'who', audioId: 'wie-28', exampleNl: 'Wie ben jij?', exampleEn: 'Who are you?' },
          { nl: 'wat', en: 'what', audioId: 'wat-28', exampleNl: 'Wat is dat?', exampleEn: 'What is that?' },
          { nl: 'hoe', en: 'how', audioId: 'hoe-28', exampleNl: 'Hoe heet je?', exampleEn: 'How are you called? (= What is your name?)' },
          { nl: 'waar', en: 'where', audioId: 'waar', exampleNl: 'Waar woon je?', exampleEn: 'Where do you live?' },
          { nl: 'wanneer', en: 'when', audioId: 'wanneer', exampleNl: 'Wanneer kom je?', exampleEn: 'When are you coming?' },
          { nl: 'waarom', en: 'why', audioId: 'waarom', exampleNl: 'Waarom ben je moe?', exampleEn: 'Why are you tired?' },
          { nl: 'hoeveel', en: 'how many / how much', audioId: 'hoeveel', exampleNl: 'Hoeveel kinderen heb je?', exampleEn: 'How many children do you have?' },
          {
            nl: 'welk',
            en: 'which (with het-words)',
            audioId: 'welk',
            exampleNl: 'Welk boek is van jou?',
            exampleEn: 'Which book is yours?',
          },
          {
            nl: 'welke',
            en: 'which (with de-words and all plurals)',
            audioId: 'welke',
            exampleNl: 'Welke stad is dit?',
            exampleEn: 'Which city is this?',
          },
        ],
      },
    },
    {
      id: 'drill-1',
      type: 'drill',
      payload: {
        intro:
          'Tien items. Bij elk vraagwoord verwacht je een bepaald soort antwoord — een tijd, een plaats, een aantal. Tik de juiste categorie.',
        items: [
          {
            kind: 'mc',
            promptNl: 'Wanneer?',
            choices: [
              { text: 'tijd', correct: true },
              { text: 'plaats', correct: false },
              { text: 'persoon', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Waar?',
            choices: [
              { text: 'plaats', correct: true },
              { text: 'ding', correct: false },
              { text: 'getal', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Wie?',
            choices: [
              { text: 'persoon', correct: true },
              { text: 'plaats', correct: false },
              { text: 'tijd', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Wat?',
            choices: [
              { text: 'ding', correct: true },
              { text: 'plaats', correct: false },
              { text: 'persoon', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Hoeveel?',
            choices: [
              { text: 'getal', correct: true },
              { text: 'tijd', correct: false },
              { text: 'plaats', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Waarom?',
            choices: [
              { text: 'reden', correct: true },
              { text: 'tijd', correct: false },
              { text: 'plaats', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Hoe?',
            choices: [
              { text: 'manier', correct: true },
              { text: 'persoon', correct: false },
              { text: 'getal', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Welk boek?',
            choices: [
              { text: 'keuze (het-woord)', correct: true },
              { text: 'tijd', correct: false },
              { text: 'aantal', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Welke stad?',
            choices: [
              { text: 'keuze (de-woord)', correct: true },
              { text: 'manier', correct: false },
              { text: 'reden', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: '"Om acht uur." — bij welk vraagwoord past dit antwoord?',
            choices: [
              { text: 'wanneer', correct: true },
              { text: 'waar', correct: false },
              { text: 'hoeveel', correct: false },
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
          'Bouw zeven vragen. Vraagwoord op plek 1, werkwoord op plek 2, daarna de rest. Let bij "welk/welke" op het lidwoord van het zelfstandig naamwoord dat erna komt.',
        items: [
          {
            promptEn: 'What is your name?',
            tiles: ['Wat', 'is', 'jouw', 'naam'],
            expected: 'Wat is jouw naam',
          },
          {
            promptEn: 'Where do you live?',
            tiles: ['Waar', 'woon', 'je'],
            expected: 'Waar woon je',
          },
          {
            promptEn: 'When do you come?',
            tiles: ['Wanneer', 'kom', 'je'],
            expected: 'Wanneer kom je',
          },
          {
            promptEn: 'Why are you tired?',
            tiles: ['Waarom', 'ben', 'je', 'moe'],
            expected: 'Waarom ben je moe',
          },
          {
            promptEn: 'How many brothers do you have?',
            tiles: ['Hoeveel', 'broers', 'heb', 'je'],
            expected: 'Hoeveel broers heb je',
          },
          {
            promptEn: 'Which book? (het boek)',
            tiles: ['Welk', 'boek'],
            expected: 'Welk boek',
          },
          {
            promptEn: 'Which city? (de stad)',
            tiles: ['Welke', 'stad'],
            expected: 'Welke stad',
          },
        ],
      },
    },
    {
      id: 'dialoog-1',
      type: 'mini-dialoog',
      payload: {
        intro:
          'Twee scenes: vrienden die elkaar leren kennen, en een ambtenaar die formulier-vragen stelt. Eén keer wordt elk vraagwoord gebruikt.',
        scenes: [
          {
            id: 'informeel',
            titleNl: 'Twee vrienden',
            titleEn: 'Two friends',
            register: 'informeel',
            lines: [
              {
                id: 'l1',
                speaker: 'Anna',
                nl: 'Hoe heet je?',
                en: 'What is your name?',
                audioId: 'dialoog-vraag-jij-l1',
              },
              {
                id: 'l2',
                speaker: 'Tom',
                nl: 'Ik heet Tom. Waar kom jij vandaan?',
                en: 'I am Tom. Where are you from?',
                audioId: 'dialoog-vraag-jij-l2',
              },
              {
                id: 'l3',
                speaker: 'Anna',
                nl: 'Ik kom uit Nederland. Hoeveel broers en zussen heb jij?',
                en: 'I come from the Netherlands. How many siblings do you have?',
                audioId: 'dialoog-vraag-jij-l3',
              },
              {
                id: 'l4',
                speaker: 'Tom',
                nl: 'Eén broer. Wanneer ben je jarig?',
                en: 'One brother. When is your birthday?',
                audioId: 'dialoog-vraag-jij-l4',
              },
            ],
          },
          {
            id: 'formeel',
            titleNl: 'Bij de gemeente',
            titleEn: 'At the town hall',
            register: 'formeel',
            lines: [
              {
                id: 'l1',
                speaker: 'Ambtenaar',
                nl: 'Wie bent u?',
                en: 'Who are you?',
                audioId: 'dialoog-vraag-u-l1',
              },
              {
                id: 'l2',
                speaker: 'Klant',
                nl: 'Ik ben mevrouw De Vries.',
                en: 'I am Mrs. De Vries.',
                audioId: 'dialoog-vraag-u-l2',
              },
              {
                id: 'l3',
                speaker: 'Ambtenaar',
                nl: 'Wat is uw adres?',
                en: 'What is your address?',
                audioId: 'dialoog-vraag-u-l3',
              },
              {
                id: 'l4',
                speaker: 'Klant',
                nl: 'Hoofdstraat twaalf, Den Haag.',
                en: 'Main Street 12, The Hague.',
                audioId: 'dialoog-vraag-u-l4',
              },
              {
                id: 'l5',
                speaker: 'Ambtenaar',
                nl: 'Waarom bent u hier?',
                en: 'Why are you here?',
                audioId: 'dialoog-vraag-u-l5',
              },
            ],
          },
        ],
      },
    },
  ],
};
