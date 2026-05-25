import type { Lesson } from '@/lib/types';

export const A0_LES_29: Lesson = {
  id: 'a0-les-29',
  track: 'beginner',
  level: 'A0',
  order: 29,
  titleNl: 'Niet vs geen — volledig',
  titleEn: 'Niet vs geen — full rules',
  estimatedMinutes: 13,
  coverage: ['§3.6'],
  prerequisites: ['a0-les-28'],
  reviewWords: [
    { nl: 'geen', en: 'no / not a / not any' },
    { nl: 'wel', en: 'do / yes (affirmation; opposite of niet)' },
  ],
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'De regel — kies tussen geen en niet' },
          {
            kind: 'paragraph',
            text: 'Het Nederlands heeft twee ontkenningen. De keuze is mechanisch: kijk wat je ontkent.',
          },
          { kind: 'heading', text: 'Gebruik "geen" wanneer:' },
          {
            kind: 'list',
            items: [
              'Vóór een zelfstandig naamwoord met "een": Ik heb een boek → Ik heb geen boek.',
              'Vóór een zelfstandig naamwoord zonder lidwoord (stof, abstract): Ik heb tijd → Ik heb geen tijd.',
              'Vóór een meervoud zonder lidwoord: Wij hebben kinderen → Wij hebben geen kinderen.',
            ],
          },
          { kind: 'heading', text: 'Gebruik "niet" wanneer:' },
          {
            kind: 'list',
            items: [
              'Vóór een adjectief: Ik ben moe → Ik ben niet moe.',
              'Vóór een werkwoord (aan het eind van de zin): Ik werk → Ik werk niet.',
              'Vóór een bepaald lidwoord (de / het): Dit is het boek → Dit is niet het boek.',
              'Vóór een eigennaam: Hij is Tom → Hij is niet Tom.',
              'Vóór een voorzetsel: Ik woon in Den Haag → Ik woon niet in Den Haag.',
            ],
          },
          { kind: 'heading', text: 'De truc — vraag jezelf' },
          {
            kind: 'paragraph',
            text: 'Ontken je een onbepaalde noun (een / geen lidwoord)? → geen. Anders → niet. Bij twijfel: probeer "een" toe te voegen. Als "een" werkt, dan moet de ontkenning "geen" zijn.',
          },
          { kind: 'heading', text: 'En "wel"?' },
          {
            kind: 'paragraph',
            text: '"Wel" is het tegenovergestelde van "niet" — een nadrukkelijk "ja, wél". Vooral bij tegenspraak: "Hij is niet moe, maar zij is wel moe." Geen aparte regels — gebruik gewoon waar "niet" zou staan.',
          },
        ],
      },
    },
    {
      id: 'drill-1',
      type: 'drill',
      payload: {
        intro:
          'Vijftien items. Kies "niet" of "geen" voor elke zin. Tip bij twijfel: kun je er "een" tussen zetten? Dan is het "geen".',
        items: [
          {
            kind: 'mc',
            promptNl: 'Ik heb ___ tijd.',
            choices: [
              { text: 'geen', correct: true },
              { text: 'niet', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Ik ben ___ moe.',
            choices: [
              { text: 'niet', correct: true },
              { text: 'geen', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Hij heeft ___ broer.',
            choices: [
              { text: 'geen', correct: true },
              { text: 'niet', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Zij werkt ___.',
            choices: [
              { text: 'niet', correct: true },
              { text: 'geen', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Wij hebben ___ honger.',
            choices: [
              { text: 'geen', correct: true },
              { text: 'niet', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Het boek is ___ mooi.',
            choices: [
              { text: 'niet', correct: true },
              { text: 'geen', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Ik woon ___ in Amsterdam.',
            choices: [
              { text: 'niet', correct: true },
              { text: 'geen', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Hij eet ___ vlees.',
            choices: [
              { text: 'geen', correct: true },
              { text: 'niet', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Dit is ___ de juiste man.',
            choices: [
              { text: 'niet', correct: true },
              { text: 'geen', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Mijn dochter heeft ___ kinderen.',
            choices: [
              { text: 'geen', correct: true },
              { text: 'niet', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'De stoel is ___ rood.',
            choices: [
              { text: 'niet', correct: true },
              { text: 'geen', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Ik drink ___ koffie.',
            choices: [
              { text: 'geen', correct: true },
              { text: 'niet', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Hij is ___ ziek.',
            choices: [
              { text: 'niet', correct: true },
              { text: 'geen', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Wij hebben ___ vader. (we have a father, but you negate it)',
            choices: [
              { text: 'geen', correct: true },
              { text: 'niet', correct: false },
            ],
          },
          {
            kind: 'mc',
            promptNl: 'Ik kom ___ uit Spanje.',
            choices: [
              { text: 'niet', correct: true },
              { text: 'geen', correct: false },
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
          'Bouw acht negatieve zinnen. De tegels bevatten zowel "niet" als "geen" — kies de juiste én plaats hem op de goede plek.',
        items: [
          {
            promptEn: "I am not tired.",
            tiles: ['Ik', 'ben', 'niet', 'moe'],
            expected: 'Ik ben niet moe',
          },
          {
            promptEn: "I do not have time.",
            tiles: ['Ik', 'heb', 'geen', 'tijd'],
            expected: 'Ik heb geen tijd',
          },
          {
            promptEn: "He is not sick.",
            tiles: ['Hij', 'is', 'niet', 'ziek'],
            expected: 'Hij is niet ziek',
          },
          {
            promptEn: "We have no children.",
            tiles: ['Wij', 'hebben', 'geen', 'kinderen'],
            expected: 'Wij hebben geen kinderen',
          },
          {
            promptEn: "I do not drink coffee.",
            tiles: ['Ik', 'drink', 'geen', 'koffie'],
            expected: 'Ik drink geen koffie',
          },
          {
            promptEn: "The book is not big.",
            tiles: ['Het', 'boek', 'is', 'niet', 'groot'],
            expected: 'Het boek is niet groot',
          },
          {
            promptEn: "She does not work.",
            tiles: ['Zij', 'werkt', 'niet'],
            expected: 'Zij werkt niet',
          },
          {
            promptEn: "I do not live in Belgium.",
            tiles: ['Ik', 'woon', 'niet', 'in', 'België'],
            expected: 'Ik woon niet in België',
          },
        ],
      },
    },
    {
      id: 'schrijven-1',
      type: 'schrijven',
      payload: {
        intro:
          'Schrijf vier zin-paren — eerst de positieve versie, daarna de negatieve. Beslis bij elke negatie: niet of geen?',
        items: [
          {
            promptEn: "Negate: 'Ik heb honger.'",
            expected: 'Ik heb geen honger.',
            hint: '"honger" is zonder lidwoord → geen',
          },
          {
            promptEn: "Negate: 'De stoel is groot.'",
            expected: 'De stoel is niet groot.',
            hint: '"groot" is een adjectief → niet',
          },
          {
            promptEn: "Negate: 'Hij komt uit Nederland.'",
            expected: 'Hij komt niet uit Nederland.',
            hint: 'voorzetsel "uit" volgt → niet',
          },
          {
            promptEn: "Negate: 'Ik heb een vraag.'",
            expected: 'Ik heb geen vraag.',
            hint: '"een" + noun → geen vervangt "een"',
          },
        ],
      },
    },
  ],
};
