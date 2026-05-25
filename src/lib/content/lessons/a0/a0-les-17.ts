import type { Lesson } from '@/lib/types';

export const A0_LES_17: Lesson = {
  id: 'a0-les-17',
  track: 'beginner',
  level: 'A0',
  order: 17,
  titleNl: 'Tijd & datum — dagen, maanden, seizoenen',
  titleEn: 'Time & date — days, months, seasons',
  estimatedMinutes: 16,
  coverage: ['§2.4'],
  prerequisites: ['a0-les-16'],
  reviewWords: [
    { nl: 'vandaag', en: 'today' },
  ],
  sections: [
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro:
          'Zeven dagen en vier seizoenen — twee rijen die je vaak nodig hebt. De dagen schrijf je met een kleine letter (anders dan Engels), de seizoenen ook. Begin in Nederland: de week begint op maandag, niet op zondag.',
        words: [
          { nl: 'maandag', en: 'Monday', audioId: 'maandag' },
          { nl: 'dinsdag', en: 'Tuesday', audioId: 'dinsdag' },
          { nl: 'woensdag', en: 'Wednesday', audioId: 'woensdag' },
          { nl: 'donderdag', en: 'Thursday', audioId: 'donderdag' },
          { nl: 'vrijdag', en: 'Friday', audioId: 'vrijdag' },
          { nl: 'zaterdag', en: 'Saturday', audioId: 'zaterdag' },
          { nl: 'zondag', en: 'Sunday', audioId: 'zondag' },
          {
            nl: 'lente',
            en: 'spring',
            gender: 'de',
            audioId: 'lente',
            exampleNl: 'In de lente is het warm.',
            exampleEn: 'In spring it is warm.',
          },
          {
            nl: 'zomer',
            en: 'summer',
            gender: 'de',
            audioId: 'zomer',
            exampleNl: 'In de zomer ga ik op vakantie.',
            exampleEn: 'In summer I go on holiday.',
          },
          {
            nl: 'herfst',
            en: 'autumn / fall',
            gender: 'de',
            audioId: 'herfst',
            exampleNl: 'In de herfst is het koud.',
            exampleEn: 'In autumn it is cold.',
          },
          {
            nl: 'winter',
            en: 'winter',
            gender: 'de',
            audioId: 'winter',
            exampleNl: 'In de winter sneeuwt het.',
            exampleEn: 'In winter it snows.',
          },
        ],
      },
    },
    {
      id: 'woorden-2',
      type: 'woorden',
      payload: {
        intro:
          'Twaalf maanden. Klein geschreven (geen hoofdletter). Veel klinken hetzelfde als in het Engels — januari, april, juni — een paar wijken af: februari (één i meer), maart (geen rch zoals "March"), augustus.',
        words: [
          { nl: 'januari', en: 'January', audioId: 'januari' },
          { nl: 'februari', en: 'February', audioId: 'februari' },
          { nl: 'maart', en: 'March', audioId: 'maart' },
          { nl: 'april', en: 'April', audioId: 'april' },
          { nl: 'mei', en: 'May', audioId: 'mei' },
          { nl: 'juni', en: 'June', audioId: 'juni' },
          { nl: 'juli', en: 'July', audioId: 'juli' },
          { nl: 'augustus', en: 'August', audioId: 'augustus' },
          { nl: 'september', en: 'September', audioId: 'september' },
          { nl: 'oktober', en: 'October', audioId: 'oktober' },
          { nl: 'november', en: 'November', audioId: 'november' },
          { nl: 'december', en: 'December', audioId: 'december' },
        ],
      },
    },
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Datum — ordinalen herkennen' },
          {
            kind: 'paragraph',
            text: 'In het Nederlands gebruik je voor datums een ordinaal (ranggetal): "3 maart" lees je als "de derde maart". In tekst zie je het cijfer; in gesprek hoor je de ordinaal. Op A0 hoef je ze nog niet zelf te produceren — alleen herkennen.',
          },
          {
            kind: 'list',
            items: [
              '1e — eerste',
              '2e — tweede',
              '3e — derde (onregelmatig)',
              '4e — vierde',
              '5e — vijfde',
              '6e — zesde',
              '7e — zevende',
              '8e — achtste (onregelmatig, niet "achtde")',
              '9e — negende',
              '10e — tiende',
              '11e — elfde',
              '12e — twaalfde',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Patroon: bij 1–19 komt er "-de" achter het getal (vier-de, tien-de). Vanaf 20 wordt het "-ste" (twintig-ste). De drie buitenbeentjes: eerste, derde, achtste. Voor nu: leer er drie te herkennen — eerste, tweede, derde.',
          },
          { kind: 'heading', text: 'Volledige datum' },
          {
            kind: 'paragraph',
            text: 'Volgorde: dag → datum → maand → jaar. "Vandaag is maandag, de tiende januari." In datums kun je ook informeel "Vandaag is tien januari" zeggen — beide bestaan, ordinaal klinkt netter.',
          },
        ],
      },
    },
    {
      id: 'drill-1',
      type: 'drill',
      payload: {
        intro:
          'Tien items door elkaar — dagen, maanden en seizoenen. Luister en tik wat je hoort.',
        items: [
          {
            kind: 'mc',
            audioId: 'maandag',
            promptNl: 'Welke dag hoor je?',
            choices: [
              { text: 'maandag', correct: true },
              { text: 'dinsdag', correct: false },
              { text: 'zondag', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'vrijdag',
            promptNl: 'Welke dag hoor je?',
            choices: [
              { text: 'vrijdag', correct: true },
              { text: 'donderdag', correct: false },
              { text: 'woensdag', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'zondag',
            promptNl: 'Welke dag hoor je?',
            choices: [
              { text: 'zondag', correct: true },
              { text: 'zaterdag', correct: false },
              { text: 'donderdag', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'januari',
            promptNl: 'Welke maand hoor je?',
            choices: [
              { text: 'januari', correct: true },
              { text: 'februari', correct: false },
              { text: 'juni', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'mei',
            promptNl: 'Welke maand hoor je?',
            choices: [
              { text: 'mei', correct: true },
              { text: 'maart', correct: false },
              { text: 'juli', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'september',
            promptNl: 'Welke maand hoor je?',
            choices: [
              { text: 'september', correct: true },
              { text: 'oktober', correct: false },
              { text: 'november', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'december',
            promptNl: 'Welke maand hoor je?',
            choices: [
              { text: 'december', correct: true },
              { text: 'augustus', correct: false },
              { text: 'februari', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'lente',
            promptNl: 'Welk seizoen hoor je?',
            choices: [
              { text: 'lente', correct: true },
              { text: 'zomer', correct: false },
              { text: 'herfst', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'winter',
            promptNl: 'Welk seizoen hoor je?',
            choices: [
              { text: 'winter', correct: true },
              { text: 'zomer', correct: false },
              { text: 'lente', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'oktober',
            promptNl: 'Welke maand hoor je?',
            choices: [
              { text: 'oktober', correct: true },
              { text: 'augustus', correct: false },
              { text: 'december', correct: false },
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
          'Twee modelzinnen. Vervang de dag, datum en seizoen door wat vandaag echt is. Schrijfwijze: ordinaal eerst (de tiende), dan maand (januari). Bij het seizoen voeg je gewoon "Het is" toe.',
        lines: [
          {
            id: 'l1',
            nl: 'Vandaag is maandag, de tiende januari.',
            en: 'Today is Monday, the 10th of January.',
            audioId: 'spreken-datum-vandaag',
          },
          {
            id: 'l2',
            nl: 'Het is winter.',
            en: 'It is winter.',
            audioId: 'spreken-datum-seizoen',
          },
        ],
      },
    },
  ],
};
