import type { Lesson } from '@/lib/types';

export const A0_LES_23: Lesson = {
  id: 'a0-les-23',
  track: 'beginner',
  level: 'A0',
  order: 23,
  titleNl: 'Boodschappen — eten en winkel',
  titleEn: 'Groceries — food and shopping',
  estimatedMinutes: 13,
  coverage: ['§2.8', '§4'],
  prerequisites: ['a0-les-22'],
  sections: [
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro:
          'Tien voedselwoorden plus drie veelgebruikte tafelfrasen. Groente is "de" (verzamelnaam); fruit en vlees zijn "het". De drie frasen (eet smakelijk, lekker, proost) hoor je dagelijks aan tafel.',
        words: [
          {
            nl: 'groente',
            en: 'vegetables',
            gender: 'de',
            audioId: 'groente',
            exampleNl: 'Ik eet veel groente.',
            exampleEn: 'I eat a lot of vegetables.',
          },
          {
            nl: 'fruit',
            en: 'fruit',
            gender: 'het',
            audioId: 'fruit',
            exampleNl: 'Fruit is gezond.',
            exampleEn: 'Fruit is healthy.',
          },
          {
            nl: 'appel',
            en: 'apple',
            gender: 'de',
            audioId: 'appel',
            exampleNl: 'Een appel per dag.',
            exampleEn: 'An apple a day.',
          },
          {
            nl: 'banaan',
            en: 'banana',
            gender: 'de',
            audioId: 'banaan',
            exampleNl: 'Mijn dochter eet een banaan.',
            exampleEn: 'My daughter eats a banana.',
          },
          {
            nl: 'aardappel',
            en: 'potato',
            gender: 'de',
            audioId: 'aardappel',
            exampleNl: 'Aardappelen met groente.',
            exampleEn: 'Potatoes with vegetables.',
          },
          {
            nl: 'rijst',
            en: 'rice',
            gender: 'de',
            audioId: 'rijst',
            exampleNl: 'Ik eet rijst met vis.',
            exampleEn: 'I eat rice with fish.',
          },
          {
            nl: 'pasta',
            en: 'pasta',
            gender: 'de',
            audioId: 'pasta',
            exampleNl: 'Pasta met kaas, lekker!',
            exampleEn: 'Pasta with cheese, yum!',
          },
          {
            nl: 'vlees',
            en: 'meat',
            gender: 'het',
            audioId: 'vlees',
            exampleNl: 'Eet je vlees?',
            exampleEn: 'Do you eat meat?',
          },
          {
            nl: 'vis',
            en: 'fish',
            gender: 'de',
            audioId: 'vis',
            exampleNl: 'Vis op vrijdag.',
            exampleEn: 'Fish on Friday.',
          },
          {
            nl: 'soep',
            en: 'soup',
            gender: 'de',
            audioId: 'soep',
            exampleNl: 'Soep met brood.',
            exampleEn: 'Soup with bread.',
          },
          {
            nl: 'koken',
            en: 'to cook',
            audioId: 'koken',
            exampleNl: 'Mijn vader kookt vandaag.',
            exampleEn: 'My father is cooking today.',
          },
          {
            nl: 'eet smakelijk',
            en: 'enjoy your meal',
            audioId: 'eet-smakelijk',
            exampleNl: 'Eet smakelijk!',
            exampleEn: 'Enjoy your meal!',
          },
          {
            nl: 'lekker',
            en: 'tasty / nice',
            audioId: 'lekker',
            exampleNl: 'De soep is lekker.',
            exampleEn: 'The soup is tasty.',
          },
          {
            nl: 'proost',
            en: 'cheers',
            audioId: 'proost',
            exampleNl: 'Proost!',
            exampleEn: 'Cheers!',
          },
        ],
      },
    },
    {
      id: 'luisteren-1',
      type: 'luisteren',
      payload: {
        intro:
          'Iemand somt op wat ze gaat kopen. Beluister en beantwoord drie vragen. Tip: focus op het type product (drank, brood, fruit) bij elke vraag.',
        audioId: 'luisteren-boodschappen',
        transcriptNl: 'Ik ga naar de winkel. Ik koop brood, kaas, vier appels en een fles wijn.',
        transcriptEn: 'I am going to the shop. I am buying bread, cheese, four apples and a bottle of wine.',
        questions: [
          {
            questionNl: 'Koopt zij brood?',
            choices: ['ja', 'nee'],
            correctIndex: 0,
          },
          {
            questionNl: 'Welk fruit koopt zij?',
            choices: ['bananen', 'appels', 'sinaasappels'],
            correctIndex: 1,
          },
          {
            questionNl: 'Welke drank koopt zij?',
            choices: ['bier', 'wijn', 'koffie'],
            correctIndex: 1,
          },
        ],
      },
    },
    {
      id: 'dialoog-1',
      type: 'mini-dialoog',
      payload: {
        intro:
          'Aan de kassa of bij het versgroenteschap. Standaard supermarkt-uitwisseling — alles met "u" want je kent de medewerker niet.',
        scenes: [
          {
            id: 'supermarkt',
            titleNl: 'In de supermarkt',
            titleEn: 'At the supermarket',
            register: 'formeel',
            lines: [
              {
                id: 'l1',
                speaker: 'Klant',
                nl: 'Goedendag. Heeft u appels?',
                en: 'Good day. Do you have apples?',
                audioId: 'dialoog-super-l1',
              },
              {
                id: 'l2',
                speaker: 'Medewerker',
                nl: 'Ja, daar liggen ze.',
                en: 'Yes, they are over there.',
                audioId: 'dialoog-super-l2',
              },
              {
                id: 'l3',
                speaker: 'Klant',
                nl: 'Wat kost een kilo aardappelen?',
                en: 'How much is a kilo of potatoes?',
                audioId: 'dialoog-super-l3',
              },
              {
                id: 'l4',
                speaker: 'Medewerker',
                nl: 'Twee euro vijftig.',
                en: 'Two euros fifty.',
                audioId: 'dialoog-super-l4',
              },
              {
                id: 'l5',
                speaker: 'Klant',
                nl: 'Dank u wel.',
                en: 'Thank you very much.',
                audioId: 'dialoog-super-l5',
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
          'Schrijf vijf regels voor je boodschappenlijst. Vermeld hoeveelheid waar nodig (twee appels, een kilo aardappelen). Vrij invullen — vergelijk met het model.',
        items: [
          {
            promptEn: "Write 'bread and cheese' as a list line.",
            expected: 'brood en kaas',
            hint: 'gewoon de items, geen lidwoorden',
          },
          {
            promptEn: "Write 'two apples'.",
            expected: 'twee appels',
            hint: 'getal + meervoud',
          },
          {
            promptEn: "Write 'wine and water'.",
            expected: 'wijn en water',
            hint: 'twee dranken',
          },
          {
            promptEn: "Write 'a kilo of potatoes'.",
            expected: 'een kilo aardappelen',
            hint: 'een kilo + meervoud',
          },
          {
            promptEn: "Write 'rice and pasta'.",
            expected: 'rijst en pasta',
            hint: 'twee koolhydraten',
          },
        ],
      },
    },
  ],
};
