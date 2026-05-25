import type { Lesson } from '@/lib/types';

export const A0_LES_13: Lesson = {
  id: 'a0-les-13',
  track: 'beginner',
  level: 'A0',
  order: 13,
  titleNl: 'Meervoud — meer dan één',
  titleEn: 'Plurals — more than one',
  estimatedMinutes: 13,
  coverage: ['§3.5'],
  prerequisites: ['a0-les-12'],
  // Pattern-anchor lemmas — taught through uitleg + drill + luisteren, no
  // woorden section. Still belong in SRS so the learner can recall them.
  reviewWords: [
    { nl: 'koe', en: 'cow', gender: 'de' },
    { nl: 'ei', en: 'egg', gender: 'het' },
    { nl: 'foto', en: 'photo', gender: 'de' },
  ],
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Vier patronen voor het meervoud' },
          {
            kind: 'paragraph',
            text: 'Anders dan in het Engels (gewoon -s) heeft het Nederlands vier hoofdpatronen voor meervoud. De meeste woorden krijgen -en. Maar er zijn drie andere groepen — leer ze als patronen, niet als losse uitzonderingen.',
          },
          { kind: 'heading', text: '1. -en (verreweg de meeste)' },
          {
            kind: 'list',
            items: [
              'boek → boeken',
              'tafel → tafels (zie -s hieronder)',
              'pijn → pijnen',
              'jaar → jaren (één a — schrijfregel: open lettergreep)',
            ],
          },
          { kind: 'heading', text: '2. -s (na -el, -en, -er, -em en leenwoorden)' },
          {
            kind: 'list',
            items: [
              'telefoonnummer → telefoonnummers',
              'tafel → tafels',
              'mevrouwen klinkt raar — daarom soms ook "mevrouwen" met -en, maar -s na korte uitgangen blijft veilig',
              'computer → computers (leenwoord uit Engels)',
            ],
          },
          { kind: 'heading', text: "3. -'s (na klinker waar -s onduidelijk zou zijn)" },
          {
            kind: 'list',
            items: [
              "foto → foto's",
              "baby → baby's",
              "auto → auto's",
              'Apostrof voorkomt dat je "fotos" leest als "fo-tos".',
            ],
          },
          { kind: 'heading', text: '4. Onregelmatigen — uit het hoofd leren' },
          {
            kind: 'list',
            items: [
              'ei → eieren (+eren)',
              'kind → kinderen (+eren)',
              'stad → steden (klinker verandert + -en)',
              'koe → koeien (+ien)',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Belangrijke regel: alle meervouden zijn "de", ook van een "het"-woord. Het kind → de kinderen. Het ei → de eieren. Onthoud dit voor Les 14 (familie).',
          },
        ],
      },
    },
    {
      id: 'drill-1',
      type: 'drill',
      payload: {
        intro:
          'Twaalf woorden uit eerdere lessen plus de patroon-ankers. Je ziet het enkelvoud, typ het meervoud. Bij twijfel: scroll terug naar de uitleg.',
        items: [
          {
            kind: 'typed',
            promptNl: 'boek',
            promptEn: '(book) → meervoud?',
            expected: 'boeken',
          },
          {
            kind: 'typed',
            promptNl: 'mevrouw',
            promptEn: '(madam) → meervoud?',
            expected: 'mevrouwen',
          },
          {
            kind: 'typed',
            promptNl: 'pijn',
            promptEn: '(pain) → meervoud?',
            expected: 'pijnen',
          },
          {
            kind: 'typed',
            promptNl: 'tijd',
            promptEn: '(time) → meervoud?',
            expected: 'tijden',
          },
          {
            kind: 'typed',
            promptNl: 'telefoonnummer',
            promptEn: '(phone number) → meervoud?',
            expected: 'telefoonnummers',
          },
          {
            kind: 'typed',
            promptNl: 'foto',
            promptEn: '(photo) → meervoud?',
            expected: "foto's",
          },
          {
            kind: 'typed',
            promptNl: 'baby',
            promptEn: '(baby) → meervoud?',
            expected: "baby's",
          },
          {
            kind: 'typed',
            promptNl: 'kind',
            promptEn: '(child) → meervoud?',
            expected: 'kinderen',
          },
          {
            kind: 'typed',
            promptNl: 'ei',
            promptEn: '(egg) → meervoud?',
            expected: 'eieren',
          },
          {
            kind: 'typed',
            promptNl: 'stad',
            promptEn: '(city) → meervoud?',
            expected: 'steden',
          },
          {
            kind: 'typed',
            promptNl: 'koe',
            promptEn: '(cow) → meervoud?',
            expected: 'koeien',
          },
          {
            kind: 'typed',
            promptNl: 'jaar',
            promptEn: '(year) → meervoud?',
            expected: 'jaren',
          },
        ],
      },
    },
    {
      id: 'luisteren-1',
      type: 'luisteren',
      payload: {
        intro:
          'Luister naar de zin met drie meervouden. Tel hoeveel van elk. Beluister meerdere keren — het transcript blijft verstopt tot je het opvraagt.',
        audioId: 'luisteren-meervoud-tellen',
        transcriptNl: 'Ik heb drie boeken, twee foto\'s en vijf eieren.',
        transcriptEn: 'I have three books, two photos and five eggs.',
        questions: [
          {
            questionNl: 'Hoeveel boeken?',
            choices: ['twee', 'drie', 'vier'],
            correctIndex: 1,
          },
          {
            questionNl: "Hoeveel foto's?",
            choices: ['twee', 'drie', 'vijf'],
            correctIndex: 0,
          },
          {
            questionNl: 'Hoeveel eieren?',
            choices: ['drie', 'vier', 'vijf'],
            correctIndex: 2,
          },
        ],
      },
    },
    {
      id: 'schrijven-1',
      type: 'schrijven',
      payload: {
        intro:
          'Vier zinnen met meervouden in een echte context. Gebruik de vormen uit de drill — onthoud welk patroon hoort bij welk woord.',
        items: [
          {
            promptEn: "Say: 'I have two books.'",
            expected: 'Ik heb twee boeken.',
            hint: 'boek → boeken (-en)',
          },
          {
            promptEn: "Say: 'She has three photos.'",
            expected: "Zij heeft drie foto's.",
            hint: "foto → foto's (-'s)",
          },
          {
            promptEn: "Say: 'We have four eggs.'",
            expected: 'Wij hebben vier eieren.',
            hint: 'ei → eieren (onregelmatig)',
          },
          {
            promptEn: "Say: 'He has two children.'",
            expected: 'Hij heeft twee kinderen.',
            hint: 'kind → kinderen (onregelmatig)',
          },
        ],
      },
    },
  ],
};
