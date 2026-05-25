import type { Lesson } from '@/lib/types';

export const A0_LES_11: Lesson = {
  id: 'a0-les-11',
  track: 'beginner',
  level: 'A0',
  order: 11,
  titleNl: 'Ik heb — hebben en gevoelens',
  titleEn: 'I have — hebben and how you feel',
  estimatedMinutes: 15,
  coverage: ['§3.3', '§2.6'],
  prerequisites: ['a0-les-10'],
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Hebben — bezit én gevoel' },
          {
            kind: 'paragraph',
            text: 'Hebben is het tweede belangrijkste werkwoord, na zijn. Je gebruikt het voor bezit ("Ik heb een auto") en — anders dan in het Engels — voor gevoelens en behoeftes: "Ik heb honger" (niet "Ik ben hongerig"). Onthoud het patroon: gevoel = hebben, niet zijn.',
          },
          { kind: 'heading', text: 'De zeven vormen' },
          {
            kind: 'list',
            items: [
              'ik heb',
              'jij / je hebt (informeel)',
              'u hebt (formeel; "u heeft" mag ook, klinkt deftiger)',
              'hij / zij / het heeft',
              'wij / we hebben',
              'jullie hebben',
              'zij / ze hebben',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Patroon: "heb" alleen bij ik. "Hebt" voor jij én u (informeel + formeel tweede persoon). "Heeft" alleen bij hij/zij/het. Meervouden en infinitief = "hebben".',
          },
          { kind: 'heading', text: 'Gevoel zeg je met hebben' },
          {
            kind: 'paragraph',
            text: 'Hongerig, dorstig, pijnlijk — zulke bijvoeglijke vormen bestaan in het Nederlands wél, maar in dagelijkse taal zeg je het met hebben + zelfstandig naamwoord. Bij temperatuur komt er nog "het" tussen: "Ik heb het koud" (niet "Ik ben koud" — dat betekent dat jij koud aanvoelt aan iemand anders).',
          },
          {
            kind: 'list',
            items: [
              'Ik heb honger. — I am hungry.',
              'Ik heb dorst. — I am thirsty.',
              'Ik heb pijn. — I am in pain / It hurts.',
              'Ik heb tijd. — I have time / I am available.',
              'Ik heb het koud. — I am cold. (let op: "het" erbij)',
              'Ik heb het warm. — I am hot/warm. (idem)',
            ],
          },
        ],
      },
    },
    {
      id: 'conjugatie-1',
      type: 'conjugatie',
      payload: {
        intro:
          'Typ de juiste vorm van hebben voor elk voornaamwoord. Net als bij zijn: kort patroon, leren door herhalen.',
        infinitive: 'hebben',
        items: [
          {
            pronoun: 'ik',
            expected: 'heb',
            audioId: 'hebben-ik-heb',
            audioText: 'Ik heb.',
          },
          {
            pronoun: 'jij / je',
            expected: 'hebt',
            audioId: 'hebben-jij-hebt',
            audioText: 'Jij hebt.',
          },
          {
            pronoun: 'u',
            expected: 'hebt',
            hint: 'standaard; "u heeft" is ook goed',
            audioId: 'hebben-u-hebt',
            audioText: 'U hebt.',
          },
          {
            pronoun: 'hij / zij / het',
            expected: 'heeft',
            audioId: 'hebben-hij-heeft',
            audioText: 'Hij heeft.',
          },
          {
            pronoun: 'wij / we',
            expected: 'hebben',
            audioId: 'hebben-wij-hebben',
            audioText: 'Wij hebben.',
          },
          {
            pronoun: 'jullie',
            expected: 'hebben',
            audioId: 'hebben-jullie-hebben',
            audioText: 'Jullie hebben.',
          },
          {
            pronoun: 'zij / ze (mv.)',
            expected: 'hebben',
            audioId: 'hebben-zij-hebben',
            audioText: 'Zij hebben.',
          },
        ],
      },
    },
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro:
          'Vier "de"-zelfstandige naamwoorden voor behoeftes en twee bijvoeglijke naamwoorden voor temperatuur. Bij koud en warm zit altijd "het" tussen — vergelijk de voorbeeldzinnen.',
        words: [
          {
            nl: 'honger',
            en: 'hunger',
            gender: 'de',
            audioId: 'honger',
            exampleNl: 'Ik heb honger.',
            exampleEn: 'I am hungry.',
          },
          {
            nl: 'dorst',
            en: 'thirst',
            gender: 'de',
            audioId: 'dorst',
            exampleNl: 'Ik heb dorst.',
            exampleEn: 'I am thirsty.',
          },
          {
            nl: 'pijn',
            en: 'pain',
            gender: 'de',
            audioId: 'pijn',
            exampleNl: 'Ik heb pijn.',
            exampleEn: 'I am in pain.',
          },
          {
            nl: 'tijd',
            en: 'time',
            gender: 'de',
            audioId: 'tijd',
            exampleNl: 'Ik heb tijd.',
            exampleEn: 'I have time.',
          },
          {
            nl: 'koud',
            en: 'cold',
            audioId: 'koud',
            exampleNl: 'Ik heb het koud.',
            exampleEn: 'I am cold.',
          },
          {
            nl: 'warm',
            en: 'warm / hot',
            audioId: 'warm',
            exampleNl: 'Ik heb het warm.',
            exampleEn: 'I am hot.',
          },
        ],
      },
    },
    {
      id: 'spreken-1',
      type: 'spreken',
      payload: {
        intro:
          'Zes gevoelszinnen hardop. Beluister het model, neem dan jezelf op. Goede uitspraak-check: de korte uu-klank in "tijd", en de "het" bij koud/warm — die hoor je vaak ingeslikt ("Ik heb \'t koud").',
        lines: [
          {
            id: 'l1',
            nl: 'Ik heb honger.',
            en: 'I am hungry.',
            audioId: 'spreken-staat-honger',
          },
          {
            id: 'l2',
            nl: 'Ik heb dorst.',
            en: 'I am thirsty.',
            audioId: 'spreken-staat-dorst',
          },
          {
            id: 'l3',
            nl: 'Ik heb pijn.',
            en: 'I am in pain.',
            audioId: 'spreken-staat-pijn',
          },
          {
            id: 'l4',
            nl: 'Ik heb tijd.',
            en: 'I have time.',
            audioId: 'spreken-staat-tijd',
          },
          {
            id: 'l5',
            nl: 'Ik heb het koud.',
            en: 'I am cold.',
            audioId: 'spreken-staat-koud',
          },
          {
            id: 'l6',
            nl: 'Ik heb het warm.',
            en: 'I am hot.',
            audioId: 'spreken-staat-warm',
          },
        ],
      },
    },
    {
      id: 'dialoog-1',
      type: 'mini-dialoog',
      payload: {
        intro:
          'Iemand merkt iets aan je en biedt hulp. Standaard situatie tussen vrienden — let op "Heb je …?" (inversie, het werkwoord op plek 1) en het korte antwoord met "Ja, ik heb …".',
        scenes: [
          {
            id: 'aanbieden',
            titleNl: 'Even pauze',
            titleEn: 'Quick break',
            register: 'informeel',
            lines: [
              {
                id: 'l1',
                speaker: 'Anna',
                nl: 'Heb je dorst?',
                en: 'Are you thirsty?',
                audioId: 'dialoog-staat-l1',
              },
              {
                id: 'l2',
                speaker: 'Peter',
                nl: 'Ja, ik heb dorst.',
                en: 'Yes, I am thirsty.',
                audioId: 'dialoog-staat-l2',
              },
              {
                id: 'l3',
                speaker: 'Anna',
                nl: 'Hier is water.',
                en: "Here's water.",
                audioId: 'dialoog-staat-l3',
              },
              {
                id: 'l4',
                speaker: 'Peter',
                nl: 'Dank je.',
                en: 'Thanks.',
                audioId: 'dialoog-staat-l4',
              },
            ],
          },
        ],
      },
    },
  ],
};
