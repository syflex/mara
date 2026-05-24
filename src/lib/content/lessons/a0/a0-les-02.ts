import type { Lesson } from '@/lib/types';

export const A0_LES_02: Lesson = {
  id: 'a0-les-02',
  track: 'beginner',
  level: 'A0',
  order: 2,
  titleNl: 'Het alfabet — spel je naam',
  titleEn: 'The alphabet — spell your name',
  estimatedMinutes: 13,
  coverage: ['§1.1', '§1.2', '§4'],
  prerequisites: ['a0-les-01'],
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          {
            kind: 'heading',
            text: 'Het Nederlandse alfabet',
          },
          {
            kind: 'paragraph',
            text: 'Same 26 letters as English — different names. You only need to recognise the names, not memorise all 26 perfectly. The handful that trip up English speakers are the focus of this lesson.',
          },
          {
            kind: 'heading',
            text: 'Lastige klanken',
          },
          {
            kind: 'list',
            items: [
              'g — a rough, throaty sound. Think clearing your throat softly. "Gouda", "goed".',
              'ch — same throaty sound as g. "lachen" (to laugh), "nacht" (night).',
              'sch — an "s" immediately followed by the throaty g. "school", "Scheveningen".',
              'ij — counts as one letter in spelling, sounds like English "eye". "ijs" (ice), "tijd" (time).',
              'j — sounds like the English "y" in "yes", never like "j" in "jam". "ja", "jij".',
              'y — called "ypsilon" or "Griekse y". Mostly in loanwords: "yoghurt", "baby".',
            ],
          },
          {
            kind: 'heading',
            text: 'Waarom dit nu?',
          },
          {
            kind: 'paragraph',
            text: 'Spelling your name aloud is the first thing you do at every gemeente window, doctor’s reception, and supermarkt klantenservice. The phrases "spelt u dat?" and "kunt u dat herhalen?" come up daily.',
          },
        ],
      },
    },
    {
      id: 'klanken-1',
      type: 'klanken',
      payload: {
        intro:
          'Tik op een klank om voorbeelden te horen. Deze vijf klanken zijn de grootste struikelblokken voor Engelstaligen.',
        sounds: [
          {
            id: 'g',
            display: 'g',
            hint: 'Hard, throaty — like clearing your throat softly.',
            examples: [
              { nl: 'gas', en: 'gas', audioId: 'klank-g-gas' },
              { nl: 'goed', en: 'good', audioId: 'klank-g-goed' },
              { nl: 'Gouda', en: 'Gouda (city / cheese)', audioId: 'klank-g-gouda' },
            ],
          },
          {
            id: 'ch',
            display: 'ch',
            hint: 'Same throaty sound as g — different spelling.',
            examples: [
              { nl: 'lachen', en: 'to laugh', audioId: 'klank-ch-lachen' },
              { nl: 'nacht', en: 'night', audioId: 'klank-ch-nacht' },
              { nl: 'acht', en: 'eight', audioId: 'klank-ch-acht' },
            ],
          },
          {
            id: 'sch',
            display: 'sch',
            hint: 'An "s" plus the throaty g. The famous Scheveningen test.',
            examples: [
              { nl: 'school', en: 'school', audioId: 'klank-sch-school' },
              { nl: 'schip', en: 'ship', audioId: 'klank-sch-schip' },
              { nl: 'Scheveningen', en: 'Scheveningen (district)', audioId: 'klank-sch-scheveningen' },
            ],
          },
          {
            id: 'ij',
            display: 'ij',
            hint: 'One sound, written as two letters — sounds like English "eye".',
            examples: [
              { nl: 'ijs', en: 'ice / ice cream', audioId: 'klank-ij-ijs' },
              { nl: 'tijd', en: 'time', audioId: 'klank-ij-tijd' },
              { nl: 'wij', en: 'we', audioId: 'klank-ij-wij' },
            ],
          },
          {
            id: 'j',
            display: 'j',
            hint: 'Always like English "y" in "yes" — never like "j" in "jam".',
            examples: [
              { nl: 'ja', en: 'yes', audioId: 'klank-j-ja' },
              { nl: 'jij', en: 'you (informal)', audioId: 'klank-j-jij' },
              { nl: 'jasje', en: 'small jacket', audioId: 'klank-j-jasje' },
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
          'Oefen de zinnen die je elke keer hoort bij een balie. Luister naar het model, neem jezelf op, vergelijk. Voor de laatste twee: spel daarna jouw eigen naam hardop.',
        lines: [
          {
            id: 'l1',
            nl: 'Hoe heet u?',
            en: 'What’s your name? (formal)',
            audioId: 'spreken-hoe-heet-u',
          },
          {
            id: 'l2',
            nl: 'Hoe heet je?',
            en: 'What’s your name? (informal)',
            audioId: 'spreken-hoe-heet-je',
          },
          {
            id: 'l3',
            nl: 'Spelt u dat alstublieft?',
            en: 'Could you spell that, please? (formal)',
            audioId: 'spreken-spelt-u-dat',
          },
          {
            id: 'l4',
            nl: 'Hoe schrijf je dat?',
            en: 'How do you write that? (informal)',
            audioId: 'spreken-hoe-schrijf-je',
          },
          {
            id: 'l5',
            nl: 'Kunt u dat herhalen alstublieft?',
            en: 'Could you repeat that please?',
            audioId: 'spreken-kunt-u-herhalen',
          },
          {
            id: 'l6',
            nl: 'Mijn naam is Maria. M, A, R, I, A.',
            en: 'My name is Maria. M, A, R, I, A.',
            audioId: 'spreken-mijn-naam-maria',
          },
        ],
      },
    },
    {
      id: 'mini-dialoog-1',
      type: 'mini-dialoog',
      payload: {
        intro:
          'Twee scènes: eerst informeel met een nieuwe collega, dan formeel bij de balie van de gemeente.',
        scenes: [
          {
            id: 'peer',
            titleNl: 'Nieuwe collega',
            titleEn: 'New colleague',
            register: 'informeel',
            lines: [
              {
                id: 'p1',
                speaker: 'A',
                nl: 'Hoi, ik ben Sam. Hoe heet jij?',
                en: 'Hi, I’m Sam. What’s your name?',
                audioId: 'dialoog-spell-peer-1',
              },
              {
                id: 'p2',
                speaker: 'B',
                nl: 'Ik heet Yusuf.',
                en: 'I’m Yusuf.',
                audioId: 'dialoog-spell-peer-2',
              },
              {
                id: 'p3',
                speaker: 'A',
                nl: 'Sorry, hoe schrijf je dat?',
                en: 'Sorry, how do you write that?',
                audioId: 'dialoog-spell-peer-3',
              },
              {
                id: 'p4',
                speaker: 'B',
                nl: 'Y, U, S, U, F. Yusuf.',
                en: 'Y, U, S, U, F. Yusuf.',
                audioId: 'dialoog-spell-peer-4',
              },
            ],
          },
          {
            id: 'gemeente',
            titleNl: 'Bij de balie',
            titleEn: 'At the gemeente counter',
            register: 'formeel',
            lines: [
              {
                id: 'g1',
                speaker: 'Medewerker',
                nl: 'Goedemorgen, hoe heet u?',
                en: 'Good morning, what’s your name?',
                audioId: 'dialoog-spell-gemeente-1',
              },
              {
                id: 'g2',
                speaker: 'Klant',
                nl: 'Ik ben mevrouw De Vries.',
                en: 'I’m Mrs. De Vries.',
                audioId: 'dialoog-spell-gemeente-2',
              },
              {
                id: 'g3',
                speaker: 'Medewerker',
                nl: 'Spelt u dat alstublieft?',
                en: 'Could you spell that, please?',
                audioId: 'dialoog-spell-gemeente-3',
              },
              {
                id: 'g4',
                speaker: 'Klant',
                nl: 'D, E, V, R, I, E, S.',
                en: 'D, E, V, R, I, E, S.',
                audioId: 'dialoog-spell-gemeente-4',
              },
            ],
          },
        ],
      },
    },
  ],
};
