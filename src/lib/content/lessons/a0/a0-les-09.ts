import type { Lesson } from '@/lib/types';

export const A0_LES_09: Lesson = {
  id: 'a0-les-09',
  track: 'beginner',
  level: 'A0',
  order: 9,
  titleNl: 'Waar woon je? — plaats en herkomst',
  titleEn: 'Where do you live? — place and origin',
  estimatedMinutes: 13,
  coverage: ['§2.2', '§2.12', '§4'],
  prerequisites: ['a0-les-08'],
  reviewWords: [
    { nl: 'woon', en: 'live (ik-form)' },
    { nl: 'woont', en: 'lives / live (hij/zij/u-form)' },
    { nl: 'kom', en: 'come (ik-form)' },
    { nl: 'komt', en: 'comes / come (hij/zij/u-form)' },
  ],
  sections: [
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro:
          'Twee plaatswerkwoorden — wonen (waar je leeft) en komen (van waar je vandaan komt) — plus de voorzetsels in en uit. Drie plaatsnamen (stad, straat, adres) ronden af.',
        words: [
          {
            nl: 'wonen',
            en: 'to live (reside)',
            audioId: 'wonen',
            exampleNl: 'Ik woon in Amsterdam.',
            exampleEn: 'I live in Amsterdam.',
          },
          {
            nl: 'komen',
            en: 'to come',
            audioId: 'komen',
            exampleNl: 'Ik kom uit België.',
            exampleEn: 'I come from Belgium.',
          },
          {
            nl: 'in',
            en: 'in',
            audioId: 'in',
            exampleNl: 'Ik woon in Rotterdam.',
            exampleEn: 'I live in Rotterdam.',
          },
          {
            nl: 'uit',
            en: 'from / out of',
            audioId: 'uit',
            exampleNl: 'Ik kom uit Nederland.',
            exampleEn: 'I come from the Netherlands.',
          },
          {
            nl: 'stad',
            en: 'city',
            gender: 'de',
            audioId: 'stad',
            exampleNl: 'Amsterdam is een grote stad.',
            exampleEn: 'Amsterdam is a big city.',
          },
          {
            nl: 'straat',
            en: 'street',
            gender: 'de',
            audioId: 'straat',
            exampleNl: 'Ik woon in de Hoofdstraat.',
            exampleEn: 'I live on the Main Street.',
          },
          {
            nl: 'adres',
            en: 'address',
            gender: 'het',
            audioId: 'adres',
            exampleNl: 'Mijn adres is Hoofdstraat 12.',
            exampleEn: 'My address is Main Street 12.',
          },
        ],
      },
    },
    {
      id: 'zinsbouw-1',
      type: 'zinsbouw',
      payload: {
        intro:
          'Bouw zes zinnen met "wonen + in" of "komen + uit". Let goed op de werkwoordvorm: bij hij/zij/het komt er een -t achter (woont, komt); bij wij/jullie/zij gebruiken we de infinitief (wonen, komen).',
        items: [
          {
            promptEn: 'I live in Amsterdam.',
            tiles: ['Ik', 'woon', 'in', 'Amsterdam'],
            expected: 'Ik woon in Amsterdam',
          },
          {
            promptEn: 'I come from Belgium.',
            tiles: ['Ik', 'kom', 'uit', 'België'],
            expected: 'Ik kom uit België',
          },
          {
            promptEn: 'She lives in Rotterdam.',
            tiles: ['Zij', 'woont', 'in', 'Rotterdam'],
            expected: 'Zij woont in Rotterdam',
          },
          {
            promptEn: 'He comes from the Netherlands.',
            tiles: ['Hij', 'komt', 'uit', 'Nederland'],
            expected: 'Hij komt uit Nederland',
          },
          {
            promptEn: 'I live on Hoofdstraat. (English "on" → Dutch "in")',
            tiles: ['Ik', 'woon', 'in', 'de', 'Hoofdstraat'],
            expected: 'Ik woon in de Hoofdstraat',
          },
          {
            promptEn: 'Where do you live?',
            tiles: ['Waar', 'woon', 'je'],
            expected: 'Waar woon je',
          },
        ],
      },
    },
    {
      id: 'dialoog-1',
      type: 'mini-dialoog',
      payload: {
        intro:
          'Twee versies van dezelfde vraag: eerst tussen vrienden, daarna bij een loket. Let op het werkwoord: "Waar woon je?" → "Waar woont u?" (extra -t in het formele register).',
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
                nl: 'Waar woon je?',
                en: 'Where do you live?',
                audioId: 'vraag-waar-woon-je',
              },
              {
                id: 'l2',
                speaker: 'Peter',
                nl: 'Ik woon in Rotterdam. En jij?',
                en: 'I live in Rotterdam. And you?',
                audioId: 'dialoog-woon-jij-l2',
              },
              {
                id: 'l3',
                speaker: 'Anna',
                nl: 'Ik woon in Amsterdam. Waar kom je vandaan?',
                en: 'I live in Amsterdam. Where are you from?',
                audioId: 'dialoog-woon-jij-l3',
              },
              {
                id: 'l4',
                speaker: 'Peter',
                nl: 'Ik kom uit België.',
                en: 'I come from Belgium.',
                audioId: 'dialoog-woon-jij-l4',
              },
            ],
          },
          {
            id: 'formeel',
            titleNl: 'Bij de gemeente',
            titleEn: 'At the town hall',
            register: 'formeel',
            lines: [
              {
                id: 'l1',
                speaker: 'Ambtenaar',
                nl: 'Waar woont u?',
                en: 'Where do you live?',
                audioId: 'vraag-waar-woont-u',
              },
              {
                id: 'l2',
                speaker: 'U',
                nl: 'Ik woon in Den Haag.',
                en: 'I live in The Hague.',
                audioId: 'dialoog-woon-u-l2',
              },
              {
                id: 'l3',
                speaker: 'Ambtenaar',
                nl: 'Wat is uw adres?',
                en: 'What is your address?',
                audioId: 'vraag-wat-is-uw-adres',
              },
              {
                id: 'l4',
                speaker: 'U',
                nl: 'Mijn adres is Hoofdstraat twaalf, Den Haag.',
                en: 'My address is Main Street 12, The Hague.',
                audioId: 'dialoog-woon-u-l4',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'schrijven-1',
      type: 'schrijven',
      payload: {
        intro:
          'Drie zinnen over jezelf. Geen goed/fout — je antwoord wordt na inzending vergeleken met een modelzin. Vul je echte naam, stad en land in.',
        items: [
          {
            promptEn: 'Write your name in Dutch (e.g. "My name is …").',
            expected: 'Ik heet Anna. / Mijn naam is Anna.',
            hint: 'gebruik "Ik heet …" of "Mijn naam is …"',
          },
          {
            promptEn: 'Write where you live (city).',
            expected: 'Ik woon in Amsterdam.',
            hint: 'gebruik "Ik woon in [stad]"',
          },
          {
            promptEn: 'Write where you come from (country).',
            expected: 'Ik kom uit Nederland.',
            hint: 'gebruik "Ik kom uit [land]"',
          },
        ],
      },
    },
  ],
};
