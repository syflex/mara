import type { Lesson } from '@/lib/types';

export const A0_LES_06: Lesson = {
  id: 'a0-les-06',
  track: 'beginner',
  level: 'A0',
  order: 6,
  titleNl: 'Wie ben je? — vragen stellen',
  titleEn: 'Who are you? — asking identity questions',
  estimatedMinutes: 13,
  coverage: ['§2.13', '§3.7', '§4'],
  prerequisites: ['a0-les-05'],
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Vraagwoorden — wie, wat, hoe' },
          {
            kind: 'paragraph',
            text: 'Drie kernvraagwoorden: wie (persoon), wat (ding of informatie), hoe (manier of in vaste zinnen zoals "hoe heet je?"). Het vraagwoord staat altijd vooraan.',
          },
          { kind: 'heading', text: 'Inversie — werkwoord op plek 2' },
          {
            kind: 'paragraph',
            text: 'In een vraag wisselen werkwoord en onderwerp van plek. "Jij heet Anna" (statement) wordt "Hoe heet jij?" (vraag) — vraagwoord eerst, dan werkwoord, dan onderwerp. Bij "je" verdwijnt de -t van het werkwoord: "Hoe heet je?", niet "Hoe heett je?".',
          },
          { kind: 'heading', text: 'Drie kernvragen' },
          {
            kind: 'list',
            items: [
              'Hoe heet je? / Hoe heet u? — What is your name?',
              'Wie ben jij? — Who are you?',
              'Waar kom je vandaan? / Waar komt u vandaan? — Where are you from?',
            ],
          },
          { kind: 'heading', text: 'Jij / je vs. u — register' },
          {
            kind: 'paragraph',
            text: '"Jij" en "je" zijn allebei informeel (zelfde betekenis; "jij" is iets nadrukkelijker). "U" is beleefd/formeel — vergelijkbaar met "vous" in Frans of "Sie" in Duits. Bij vreemden, oudere mensen of in zakelijk contact: kies u.',
          },
          {
            kind: 'figure',
            figureId: 'je-u-register',
          },
          { kind: 'heading', text: 'Bezittelijk — jouw / uw' },
          {
            kind: 'paragraph',
            text: '"Jouw" = your (informeel). "Uw" = your (formeel). Klein woord, groot verschil in toon: "Wat is jouw naam?" tegen een vriend; "Wat is uw naam?" tegen een ambtenaar bij de gemeente.',
          },
        ],
      },
    },
    {
      id: 'drill-1',
      type: 'drill',
      payload: {
        intro:
          'Acht items. Lees of luister de vraag en tik het antwoord dat past. Let op het register — sommige vragen zijn formeel.',
        items: [
          {
            kind: 'mc',
            audioId: 'vraag-hoe-heet-je',
            audioText: 'Hoe heet je?',
            promptNl: 'Hoe heet je?',
            choices: [
              { text: 'Ik heet Anna.', correct: true },
              { text: 'Ik woon in Den Haag.', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'vraag-waar-kom-je-vandaan',
            audioText: 'Waar kom je vandaan?',
            promptNl: 'Waar kom je vandaan?',
            choices: [
              { text: 'Ik kom uit België.', correct: true },
              { text: 'Mijn naam is Peter.', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'vraag-wat-is-jouw-naam',
            audioText: 'Wat is jouw naam?',
            promptNl: 'Wat is jouw naam?',
            choices: [
              { text: 'Mijn naam is Lisa.', correct: true },
              { text: 'Ik kom uit Amsterdam.', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'vraag-hoe-heet-u',
            audioText: 'Hoe heet u?',
            promptNl: 'Hoe heet u?',
            choices: [
              { text: 'Ik heet meneer Jansen.', correct: true },
              { text: 'Ik ben uit Spanje.', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'vraag-wie-ben-jij',
            audioText: 'Wie ben jij?',
            promptNl: 'Wie ben jij?',
            choices: [
              { text: 'Ik ben Tom.', correct: true },
              { text: 'Dat is een boek.', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'vraag-wat-is-uw-naam',
            audioText: 'Wat is uw naam?',
            promptNl: 'Wat is uw naam?',
            choices: [
              { text: 'Mijn naam is Maria de Vries.', correct: true },
              { text: 'Ik woon in Rotterdam.', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'vraag-wie-bent-u',
            audioText: 'Wie bent u?',
            promptNl: 'Wie bent u?',
            choices: [
              { text: 'Ik ben meneer De Vries.', correct: true },
              { text: 'Ik woon in Den Haag.', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'vraag-waar-komt-u-vandaan',
            audioText: 'Waar komt u vandaan?',
            promptNl: 'Waar komt u vandaan?',
            choices: [
              { text: 'Ik kom uit Nederland.', correct: true },
              { text: 'Ik ben Tom.', correct: false },
            ],
          },
        ],
      },
    },
    {
      id: 'dialoog-1',
      type: 'mini-dialoog',
      payload: {
        intro:
          'Twee scenes met dezelfde inhoud — eerst informeel met "je/jij", daarna formeel met "u". Let op hoe het werkwoord soms verandert (kom → komt, jouw → uw).',
        scenes: [
          {
            id: 'informeel',
            titleNl: 'Op een feestje',
            titleEn: 'At a party',
            register: 'informeel',
            lines: [
              {
                id: 'l1',
                speaker: 'Anna',
                nl: 'Hoe heet je?',
                en: "What's your name?",
                audioId: 'vraag-hoe-heet-je',
              },
              {
                id: 'l2',
                speaker: 'Peter',
                nl: 'Ik heet Peter. En jij?',
                en: "I'm Peter. And you?",
                audioId: 'dialoog-jij-l2',
              },
              {
                id: 'l3',
                speaker: 'Anna',
                nl: 'Ik ben Anna. Waar kom je vandaan?',
                en: "I'm Anna. Where are you from?",
                audioId: 'dialoog-jij-l3',
              },
              {
                id: 'l4',
                speaker: 'Peter',
                nl: 'Ik kom uit België.',
                en: 'I come from Belgium.',
                audioId: 'dialoog-jij-l4',
              },
            ],
          },
          {
            id: 'formeel',
            titleNl: 'Bij de balie',
            titleEn: 'At reception',
            register: 'formeel',
            lines: [
              {
                id: 'l1',
                speaker: 'Mevrouw De Vries',
                nl: 'Goedemorgen. Hoe heet u?',
                en: 'Good morning. What is your name?',
                audioId: 'dialoog-u-l1',
              },
              {
                id: 'l2',
                speaker: 'Meneer Jansen',
                nl: 'Mijn naam is Tom Jansen. En u?',
                en: "My name is Tom Jansen. And you?",
                audioId: 'dialoog-u-l2',
              },
              {
                id: 'l3',
                speaker: 'Mevrouw De Vries',
                nl: 'Ik heet Lisa de Vries. Waar komt u vandaan?',
                en: "I'm Lisa de Vries. Where are you from?",
                audioId: 'dialoog-u-l3',
              },
              {
                id: 'l4',
                speaker: 'Meneer Jansen',
                nl: 'Ik kom uit Nederland.',
                en: 'I come from the Netherlands.',
                audioId: 'dialoog-u-l4',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'spreken-1',
      type: 'spreken',
      payload: {
        intro:
          'Eerst drie vragen, dan drie antwoorden. Beluister het model, neem jezelf op. Vervang de namen en het land door je eigen gegevens — dit is jouw zelfintroductie-script voor in het wild.',
        lines: [
          {
            id: 'l1',
            nl: 'Hoe heet je?',
            en: "What's your name? (informal)",
            audioId: 'vraag-hoe-heet-je',
          },
          {
            id: 'l2',
            nl: 'Hoe heet u?',
            en: 'What is your name? (formal)',
            audioId: 'vraag-hoe-heet-u',
          },
          {
            id: 'l3',
            nl: 'Waar kom je vandaan?',
            en: 'Where are you from?',
            audioId: 'vraag-waar-kom-je-vandaan',
          },
          {
            id: 'l4',
            nl: 'Ik heet Anna.',
            en: "I'm Anna.",
            audioId: 'spreken-ans-ik-heet',
          },
          {
            id: 'l5',
            nl: 'Mijn naam is Tom Jansen.',
            en: 'My name is Tom Jansen.',
            audioId: 'spreken-ans-mijn-naam',
          },
          {
            id: 'l6',
            nl: 'Ik kom uit Nederland.',
            en: 'I come from the Netherlands.',
            audioId: 'dialoog-u-l4',
          },
        ],
      },
    },
  ],
};
