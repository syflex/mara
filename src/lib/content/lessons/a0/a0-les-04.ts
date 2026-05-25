import type { Lesson } from '@/lib/types';

export const A0_LES_04: Lesson = {
  id: 'a0-les-04',
  track: 'beginner',
  level: 'A0',
  order: 4,
  titleNl: 'Tweeklanken — vijf digrafen',
  titleEn: 'Digraphs — five Dutch diphthong spellings',
  estimatedMinutes: 14,
  coverage: ['§1.4'],
  prerequisites: ['a0-les-03'],
  sections: [
    {
      id: 'klanken-1',
      type: 'klanken',
      payload: {
        intro:
          'Vijf digrafen — twee letters, één klank. Twee paren klinken identiek maar worden verschillend geschreven: ij = ei, en ou = au. Onthoud per woord welke spelling hoort. Ui en eu zijn typisch Nederlands; geen Engels equivalent.',
        sounds: [
          {
            id: 'ij-ei',
            display: 'ij / ei',
            hint: 'Zelfde klank, twee spellingen. Onthoud per woord — geen regel.',
            examples: [
              { nl: 'ijs', en: 'ice', audioId: 'klank-ij-ijs' },
              { nl: 'klein', en: 'small', audioId: 'klank-ei-klein' },
            ],
          },
          {
            id: 'ui',
            display: 'ui',
            hint: 'Uniek Nederlands. Rond je lippen voor "oo" en zeg dan "ay".',
            examples: [
              { nl: 'huis', en: 'house', audioId: 'klank-ui-huis' },
            ],
          },
          {
            id: 'eu',
            display: 'eu',
            hint: 'Klinkt als Frans "feu" of Duits "ö". Tuit je lippen.',
            examples: [
              { nl: 'leuk', en: 'fun / nice', audioId: 'klank-eu-leuk' },
            ],
          },
          {
            id: 'oe',
            display: 'oe',
            hint: 'Klinkt als Engelse "oo" in "moon", iets korter. Nooit "uu".',
            examples: [
              { nl: 'boek', en: 'book', audioId: 'klank-oe-boek' },
            ],
          },
          {
            id: 'ou-au',
            display: 'ou / au',
            hint: 'Zelfde klank als Engelse "ow" in "now". "Au" is zeldzaam (saus, pauw).',
            examples: [
              { nl: 'koud', en: 'cold', audioId: 'klank-ou-koud' },
            ],
          },
        ],
      },
    },
    {
      id: 'drill-1',
      type: 'drill',
      payload: {
        intro:
          'Luister naar het woord en tik welk digraaf je hoort. Let op: ij en ei klinken hetzelfde — je moet het woord herkennen om te weten welke spelling hoort.',
        items: [
          {
            kind: 'mc',
            audioId: 'klank-ij-ijs',
            promptNl: 'Welk digraaf hoor je?',
            choices: [
              { text: 'ij', correct: true },
              { text: 'ei', correct: false },
              { text: 'ui', correct: false },
              { text: 'oe', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-ei-klein',
            promptNl: 'Welk digraaf hoor je?',
            choices: [
              { text: 'ij', correct: false },
              { text: 'ei', correct: true },
              { text: 'eu', correct: false },
              { text: 'ou', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-ui-huis',
            promptNl: 'Welk digraaf hoor je?',
            choices: [
              { text: 'ui', correct: true },
              { text: 'eu', correct: false },
              { text: 'oe', correct: false },
              { text: 'ij', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-eu-leuk',
            promptNl: 'Welk digraaf hoor je?',
            choices: [
              { text: 'eu', correct: true },
              { text: 'ui', correct: false },
              { text: 'oe', correct: false },
              { text: 'ou', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-oe-boek',
            promptNl: 'Welk digraaf hoor je?',
            choices: [
              { text: 'oe', correct: true },
              { text: 'eu', correct: false },
              { text: 'ou', correct: false },
              { text: 'ui', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-ou-koud',
            promptNl: 'Welk digraaf hoor je?',
            choices: [
              { text: 'ou', correct: true },
              { text: 'oe', correct: false },
              { text: 'eu', correct: false },
              { text: 'ij', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-ei-trein',
            audioText: 'trein',
            promptNl: 'Welk digraaf hoor je?',
            choices: [
              { text: 'ei', correct: true },
              { text: 'ij', correct: false },
              { text: 'ui', correct: false },
              { text: 'oe', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-ij-mijn',
            audioText: 'mijn',
            promptNl: 'Welk digraaf hoor je?',
            choices: [
              { text: 'ij', correct: true },
              { text: 'ei', correct: false },
              { text: 'eu', correct: false },
              { text: 'ou', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-ui-tuin',
            audioText: 'tuin',
            promptNl: 'Welk digraaf hoor je?',
            choices: [
              { text: 'ui', correct: true },
              { text: 'oe', correct: false },
              { text: 'eu', correct: false },
              { text: 'ei', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'klank-oe-goed',
            audioText: 'goed',
            promptNl: 'Welk digraaf hoor je?',
            choices: [
              { text: 'oe', correct: true },
              { text: 'ou', correct: false },
              { text: 'ui', correct: false },
              { text: 'eu', correct: false },
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
          'Lees elk ankerwoord hardop. Beluister eerst het model, neem dan jezelf op. Let op de typisch Nederlandse ui en eu — die vergen meer lipronding dan je in het Engels gewend bent.',
        lines: [
          { id: 'l1', nl: 'ijs', en: 'ice', audioId: 'klank-ij-ijs' },
          { id: 'l2', nl: 'klein', en: 'small', audioId: 'klank-ei-klein' },
          { id: 'l3', nl: 'huis', en: 'house', audioId: 'klank-ui-huis' },
          { id: 'l4', nl: 'leuk', en: 'nice', audioId: 'klank-eu-leuk' },
          { id: 'l5', nl: 'boek', en: 'book', audioId: 'klank-oe-boek' },
          { id: 'l6', nl: 'koud', en: 'cold', audioId: 'klank-ou-koud' },
        ],
      },
    },
    {
      id: 'luisteren-1',
      type: 'luisteren',
      payload: {
        intro:
          'Luister naar de zin. Daarin zitten vijf digrafen, één voor één. Identificeer ze in volgorde. Beluister meerdere keren als je wilt — het transcript is verstopt totdat je het vraagt.',
        audioId: 'luisteren-zin-digrafen',
        transcriptNl: 'Vandaag is mijn huis koud, maar het boek is leuk.',
        transcriptEn: 'Today my house is cold, but the book is nice.',
        questions: [
          {
            questionNl: 'Welke digraaf uit deze les hoor je het eerst?',
            choices: ['ij', 'ei', 'ui', 'eu', 'oe', 'ou'],
            correctIndex: 0,
          },
          {
            questionNl: 'Daarna?',
            choices: ['ij', 'ei', 'ui', 'eu', 'oe', 'ou'],
            correctIndex: 2,
          },
          {
            questionNl: 'Het derde digraaf?',
            choices: ['ij', 'ei', 'ui', 'eu', 'oe', 'ou'],
            correctIndex: 5,
          },
          {
            questionNl: 'Het vierde?',
            choices: ['ij', 'ei', 'ui', 'eu', 'oe', 'ou'],
            correctIndex: 4,
          },
          {
            questionNl: 'En de laatste klank?',
            choices: ['ij', 'ei', 'ui', 'eu', 'oe', 'ou'],
            correctIndex: 3,
          },
        ],
      },
    },
  ],
};
