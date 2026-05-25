import type { Lesson } from '@/lib/types';

export const A0_LES_18: Lesson = {
  id: 'a0-les-18',
  track: 'beginner',
  level: 'A0',
  order: 18,
  titleNl: 'Hoe laat is het? — klokkijken',
  titleEn: 'What time is it? — telling time',
  estimatedMinutes: 13,
  coverage: ['§2.4'],
  prerequisites: ['a0-les-17'],
  reviewWords: [
    { nl: 'uur', en: 'hour / o\'clock', gender: 'het' },
    { nl: 'half', en: 'half (used in time)' },
    { nl: 'kwart', en: 'quarter (used in time)' },
  ],
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Hele uren' },
          {
            kind: 'paragraph',
            text: 'Voor hele uren zeg je "Het is [getal] uur". Niet "het is [getal]" — het woordje "uur" blijft erbij. Bij 1 uur en 12 uur klinkt het soms vreemd Engels-gewend, maar het patroon is hetzelfde.',
          },
          {
            kind: 'list',
            items: [
              '1:00 — Het is één uur.',
              '2:00 — Het is twee uur.',
              '9:00 — Het is negen uur.',
              '12:00 — Het is twaalf uur (\'s middags of \'s nachts — context).',
            ],
          },
          { kind: 'heading', text: 'Half — de grote valkuil' },
          {
            kind: 'paragraph',
            text: 'Dit is dé klassieke fout voor Engels­taligen. "Half twee" betekent NIET 2:30 — het betekent 1:30. Reden: in het Nederlands kijk je vooruit naar het volgende hele uur. "Half twee" = "half weg richting twee" = 1:30. Trek dus mentaal één uur af van wat je hoort.',
          },
          {
            kind: 'list',
            items: [
              '1:30 — Het is half twee. (halfway to 2)',
              '2:30 — Het is half drie. (halfway to 3)',
              '8:30 — Het is half negen. (halfway to 9)',
              '12:30 — Het is half één.',
            ],
          },
          { kind: 'heading', text: 'Kwart over / kwart voor (herkenning)' },
          {
            kind: 'paragraph',
            text: '"Kwart over twee" = 2:15 (a quarter past two). "Kwart voor drie" = 2:45 (a quarter to three). Op A0 hoef je deze nog niet zelf te zeggen — alleen herkennen als je ze hoort.',
          },
          {
            kind: 'list',
            items: [
              '2:15 — Het is kwart over twee.',
              '2:45 — Het is kwart voor drie.',
              '5:15 — Het is kwart over vijf.',
              '5:45 — Het is kwart voor zes.',
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
          'Tien items: luister naar de tijd en tik welke digitale klok past. Let extra op "half" — telt vanuit het volgende uur.',
        items: [
          {
            kind: 'mc',
            audioId: 'tijd-1-uur',
            audioText: 'Het is één uur.',
            promptNl: 'Welke klok hoor je?',
            choices: [
              { text: '1:00', correct: true },
              { text: '2:00', correct: false },
              { text: '13:00', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'tijd-2-uur',
            audioText: 'Het is twee uur.',
            promptNl: 'Welke klok hoor je?',
            choices: [
              { text: '2:00', correct: true },
              { text: '12:00', correct: false },
              { text: '1:00', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'tijd-3-uur',
            audioText: 'Het is drie uur.',
            promptNl: 'Welke klok hoor je?',
            choices: [
              { text: '3:00', correct: true },
              { text: '4:00', correct: false },
              { text: '1:30', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'tijd-half-2',
            audioText: 'Het is half twee.',
            promptNl: 'Welke klok hoor je?',
            choices: [
              { text: '1:30', correct: true },
              { text: '2:30', correct: false },
              { text: '2:00', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'tijd-half-3',
            audioText: 'Het is half drie.',
            promptNl: 'Welke klok hoor je?',
            choices: [
              { text: '2:30', correct: true },
              { text: '3:30', correct: false },
              { text: '3:00', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'tijd-half-9',
            audioText: 'Het is half negen.',
            promptNl: 'Welke klok hoor je?',
            choices: [
              { text: '8:30', correct: true },
              { text: '9:30', correct: false },
              { text: '9:00', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'tijd-5-uur',
            audioText: 'Het is vijf uur.',
            promptNl: 'Welke klok hoor je?',
            choices: [
              { text: '5:00', correct: true },
              { text: '6:00', correct: false },
              { text: '4:30', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'tijd-half-12',
            audioText: 'Het is half twaalf.',
            promptNl: 'Welke klok hoor je?',
            choices: [
              { text: '11:30', correct: true },
              { text: '12:30', correct: false },
              { text: '11:00', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'tijd-10-uur',
            audioText: 'Het is tien uur.',
            promptNl: 'Welke klok hoor je?',
            choices: [
              { text: '10:00', correct: true },
              { text: '11:00', correct: false },
              { text: '9:30', correct: false },
            ],
          },
          {
            kind: 'mc',
            audioId: 'tijd-half-1',
            audioText: 'Het is half één.',
            promptNl: 'Welke klok hoor je?',
            choices: [
              { text: '12:30', correct: true },
              { text: '1:30', correct: false },
              { text: '1:00', correct: false },
            ],
          },
        ],
      },
    },
    {
      id: 'luisteren-1',
      type: 'luisteren',
      payload: {
        intro:
          'Een korte boodschap met twee tijden — nu en wanneer de les begint. Beluister, beantwoord twee vragen.',
        audioId: 'luisteren-tijd-les',
        transcriptNl: 'Goedemorgen. Het is nu kwart over acht. Mijn les begint om half negen.',
        transcriptEn: "Good morning. It's now 8:15. My class starts at 8:30.",
        questions: [
          {
            questionNl: 'Hoe laat is het nu?',
            choices: ['8:00', '8:15', '8:30'],
            correctIndex: 1,
          },
          {
            questionNl: 'Hoe laat begint de les?',
            choices: ['8:00', '8:30', '9:00'],
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
          'Korte vraag-antwoord op straat. Veel voorkomende uitwisseling — kun je waarschijnlijk dagelijks gebruiken in Nederland.',
        scenes: [
          {
            id: 'op-straat',
            titleNl: 'Op straat',
            titleEn: 'On the street',
            register: 'informeel',
            lines: [
              {
                id: 'l1',
                speaker: 'Anna',
                nl: 'Hoe laat is het?',
                en: 'What time is it?',
                audioId: 'dialoog-tijd-l1',
              },
              {
                id: 'l2',
                speaker: 'Peter',
                nl: 'Het is half drie.',
                en: "It's 2:30.",
                audioId: 'dialoog-tijd-l2',
              },
              {
                id: 'l3',
                speaker: 'Anna',
                nl: 'Bedankt!',
                en: 'Thanks!',
                audioId: 'dialoog-tijd-l3',
              },
            ],
          },
        ],
      },
    },
  ],
};
