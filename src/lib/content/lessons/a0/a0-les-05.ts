import type { Lesson } from '@/lib/types';

export const A0_LES_05: Lesson = {
  id: 'a0-les-05',
  track: 'beginner',
  level: 'A0',
  order: 5,
  titleNl: 'Ik ben — jezelf voorstellen',
  titleEn: 'I am — introducing yourself',
  estimatedMinutes: 15,
  coverage: ['§3.2', '§2.2', '§4'],
  prerequisites: ['a0-les-04'],
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Zijn — het belangrijkste werkwoord' },
          {
            kind: 'paragraph',
            text: 'Zijn betekent "to be". Je gebruikt het voor identiteit ("Ik ben Anna"), eigenschappen ("Ik ben moe") en herkomst ("Wij zijn uit Nederland"). Het is onregelmatig — leren door herhaling.',
          },
          { kind: 'heading', text: 'De zeven vormen' },
          {
            kind: 'list',
            items: [
              'ik ben',
              'jij / je bent (informeel)',
              'u bent (formeel)',
              'hij / zij / het is',
              'wij / we zijn',
              'jullie zijn',
              'zij / ze zijn',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Patroon: "ben" alleen bij ik. "Bent" voor beide tweede personen (jij én u). "Is" alleen bij hij/zij/het. Alle meervouden zijn "zijn" — dezelfde vorm als de infinitief.',
          },
          { kind: 'heading', text: 'Jezelf voorstellen — drie templates' },
          {
            kind: 'list',
            items: [
              'Ik ben [naam]. — direct, kort.',
              'Ik heet [naam]. — "heten" = to be called.',
              'Mijn naam is [naam]. — formeler, vooral schriftelijk.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Voeg herkomst toe met "Ik kom uit [land]". Bijvoorbeeld: "Hallo, ik ben Anna. Ik kom uit Nederland."',
          },
        ],
      },
    },
    {
      id: 'conjugatie-1',
      type: 'conjugatie',
      payload: {
        intro:
          'Typ de juiste vorm van zijn voor elk voornaamwoord. De uitleg hierboven heeft alles wat je nodig hebt — bij twijfel, scroll terug.',
        infinitive: 'zijn',
        items: [
          {
            pronoun: 'ik',
            expected: 'ben',
            audioId: 'zijn-ik-ben',
            audioText: 'Ik ben.',
          },
          {
            pronoun: 'jij / je',
            expected: 'bent',
            audioId: 'zijn-jij-bent',
            audioText: 'Jij bent.',
          },
          {
            pronoun: 'u',
            expected: 'bent',
            audioId: 'zijn-u-bent',
            audioText: 'U bent.',
          },
          {
            pronoun: 'hij / zij / het',
            expected: 'is',
            audioId: 'zijn-hij-is',
            audioText: 'Hij is.',
          },
          {
            pronoun: 'wij / we',
            expected: 'zijn',
            audioId: 'zijn-wij-zijn',
            audioText: 'Wij zijn.',
          },
          {
            pronoun: 'jullie',
            expected: 'zijn',
            audioId: 'zijn-jullie-zijn',
            audioText: 'Jullie zijn.',
          },
          {
            pronoun: 'zij / ze (mv.)',
            expected: 'zijn',
            audioId: 'zijn-zij-zijn',
            audioText: 'Zij zijn.',
          },
        ],
      },
    },
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro:
          'Drie templates plus twee landen. "Heten" is een werkwoord ("to be called"); je hoort het als "ik heet" — over conjugatie van heten gaat het in een latere les.',
        words: [
          {
            nl: 'naam',
            en: 'name',
            gender: 'de',
            audioId: 'naam',
            exampleNl: 'Mijn naam is Anna.',
            exampleEn: 'My name is Anna.',
          },
          {
            nl: 'heten',
            en: 'to be called',
            audioId: 'heten',
            exampleNl: 'Ik heet Tom.',
            exampleEn: "I'm called Tom.",
          },
          {
            nl: 'ik kom uit',
            en: 'I come from',
            audioId: 'ik-kom-uit',
            exampleNl: 'Ik kom uit Nederland.',
            exampleEn: 'I come from the Netherlands.',
          },
          {
            nl: 'mijn naam is',
            en: 'my name is',
            audioId: 'mijn-naam-is',
            exampleNl: 'Mijn naam is Lisa.',
            exampleEn: 'My name is Lisa.',
          },
          {
            nl: 'Nederland',
            en: 'the Netherlands',
            audioId: 'nederland',
            exampleNl: 'Wij wonen in Nederland.',
            exampleEn: 'We live in the Netherlands.',
          },
          {
            nl: 'België',
            en: 'Belgium',
            audioId: 'belgie',
            exampleNl: 'Brussel ligt in België.',
            exampleEn: 'Brussels is in Belgium.',
          },
        ],
      },
    },
    {
      id: 'zinsbouw-1',
      type: 'zinsbouw',
      payload: {
        intro:
          'Tik de tegels in de juiste volgorde om de zin te bouwen. De punt aan het einde staat er al — let alleen op de woordvolgorde.',
        items: [
          {
            promptEn: 'I am Anna.',
            tiles: ['Ik', 'ben', 'Anna'],
            expected: 'Ik ben Anna',
          },
          {
            promptEn: "I'm called Peter.",
            tiles: ['Ik', 'heet', 'Peter'],
            expected: 'Ik heet Peter',
          },
          {
            promptEn: 'My name is Lisa.',
            tiles: ['Mijn', 'naam', 'is', 'Lisa'],
            expected: 'Mijn naam is Lisa',
          },
          {
            promptEn: 'I come from the Netherlands.',
            tiles: ['Ik', 'kom', 'uit', 'Nederland'],
            expected: 'Ik kom uit Nederland',
          },
          {
            promptEn: 'I come from Belgium.',
            tiles: ['Ik', 'kom', 'uit', 'België'],
            expected: 'Ik kom uit België',
          },
          {
            promptEn: 'She is Maria.',
            tiles: ['Zij', 'is', 'Maria'],
            expected: 'Zij is Maria',
          },
        ],
      },
    },
    {
      id: 'spreken-1',
      type: 'spreken',
      payload: {
        intro:
          'Stel jezelf voor — drie varianten van dezelfde basiszin. Beluister het model, neem dan jezelf op met je eigen naam en land. Drie keer is een mooie ritme: een neutrale, een informele, en een beleefde.',
        lines: [
          {
            id: 'l1',
            nl: 'Hallo, ik ben Anna. Ik kom uit Nederland.',
            en: "Hi, I'm Anna. I come from the Netherlands.",
            audioId: 'spreken-intro-anna',
          },
          {
            id: 'l2',
            nl: 'Hoi, mijn naam is Peter. Ik kom uit België.',
            en: "Hi, my name is Peter. I come from Belgium.",
            audioId: 'spreken-intro-peter',
          },
          {
            id: 'l3',
            nl: 'Goedemorgen, ik heet Lisa. Ik kom uit Nederland.',
            en: "Good morning, I'm Lisa. I come from the Netherlands.",
            audioId: 'spreken-intro-lisa',
          },
        ],
      },
    },
  ],
};
