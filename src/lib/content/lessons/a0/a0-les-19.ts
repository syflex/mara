import type { Lesson } from '@/lib/types';

export const A0_LES_19: Lesson = {
  id: 'a0-les-19',
  track: 'beginner',
  level: 'A0',
  order: 19,
  titleNl: 'Mijn huis — kamers',
  titleEn: 'My house — rooms',
  estimatedMinutes: 12,
  coverage: ['§2.7'],
  prerequisites: ['a0-les-18'],
  sections: [
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro:
          'Acht woorden voor "thuis". Huis is "het", maar bijna alle kamers zijn "de" — alleen woon-/slaap-/badkamer hebben dezelfde regel (kamer = de). Tuin = de (de buitenruimte).',
        words: [
          {
            nl: 'huis',
            en: 'house',
            gender: 'het',
            audioId: 'huis',
            exampleNl: 'Mijn huis is in Amsterdam.',
            exampleEn: 'My house is in Amsterdam.',
          },
          {
            nl: 'kamer',
            en: 'room',
            gender: 'de',
            audioId: 'kamer',
            exampleNl: 'Mijn huis heeft vier kamers.',
            exampleEn: 'My house has four rooms.',
          },
          {
            nl: 'woonkamer',
            en: 'living room',
            gender: 'de',
            audioId: 'woonkamer',
            exampleNl: 'De woonkamer is groot.',
            exampleEn: 'The living room is big.',
          },
          {
            nl: 'slaapkamer',
            en: 'bedroom',
            gender: 'de',
            audioId: 'slaapkamer',
            exampleNl: 'Ik heb twee slaapkamers.',
            exampleEn: 'I have two bedrooms.',
          },
          {
            nl: 'keuken',
            en: 'kitchen',
            gender: 'de',
            audioId: 'keuken',
            exampleNl: 'Mijn moeder is in de keuken.',
            exampleEn: 'My mother is in the kitchen.',
          },
          {
            nl: 'badkamer',
            en: 'bathroom',
            gender: 'de',
            audioId: 'badkamer',
            exampleNl: 'De badkamer is klein.',
            exampleEn: 'The bathroom is small.',
          },
          {
            nl: 'wc',
            en: 'toilet',
            gender: 'de',
            audioId: 'wc',
            exampleNl: 'Waar is de wc?',
            exampleEn: 'Where is the toilet?',
          },
          {
            nl: 'tuin',
            en: 'garden',
            gender: 'de',
            audioId: 'tuin-huis',
            exampleNl: 'De tuin is mooi in de zomer.',
            exampleEn: 'The garden is beautiful in summer.',
          },
        ],
      },
    },
    {
      id: 'luisteren-1',
      type: 'luisteren',
      payload: {
        intro:
          'Iemand beschrijft zijn huis kort. Beluister en beantwoord twee vragen. Tip: tel mee hoeveel slaapkamers er genoemd worden.',
        audioId: 'luisteren-huis-beschrijving',
        transcriptNl: 'Mijn huis heeft een woonkamer, twee slaapkamers en een keuken. Er is ook een tuin.',
        transcriptEn: 'My house has a living room, two bedrooms and a kitchen. There is also a garden.',
        questions: [
          {
            questionNl: 'Hoeveel slaapkamers heeft het huis?',
            choices: ['één', 'twee', 'drie'],
            correctIndex: 1,
          },
          {
            questionNl: 'Heeft het huis een tuin?',
            choices: ['ja', 'nee'],
            correctIndex: 0,
          },
        ],
      },
    },
    {
      id: 'spreken-1',
      type: 'spreken',
      payload: {
        intro:
          'Drie zinnen over jouw huis. Beluister het model, vervang de cijfers en kamers door wat past bij jouw situatie.',
        lines: [
          {
            id: 'l1',
            nl: 'Ik heb een huis met drie kamers.',
            en: 'I have a house with three rooms.',
            audioId: 'spreken-huis-l1',
          },
          {
            id: 'l2',
            nl: 'Ik heb een woonkamer, een slaapkamer en een keuken.',
            en: 'I have a living room, a bedroom and a kitchen.',
            audioId: 'spreken-huis-l2',
          },
          {
            id: 'l3',
            nl: 'Mijn huis heeft ook een badkamer en een wc.',
            en: 'My house also has a bathroom and a toilet.',
            audioId: 'spreken-huis-l3',
          },
        ],
      },
    },
  ],
};
