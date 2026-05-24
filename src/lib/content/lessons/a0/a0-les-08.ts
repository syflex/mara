import type { Lesson } from '@/lib/types';

export const A0_LES_08: Lesson = {
  id: 'a0-les-08',
  track: 'beginner',
  level: 'A0',
  order: 8,
  titleNl: 'Cijfers 20–100, telefoon & leeftijd',
  titleEn: 'Numbers 20–100, phone & age',
  estimatedMinutes: 17,
  coverage: ['§2.3', '§2.2', '§4'],
  prerequisites: ['a0-les-07'],
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Tienvouden — 20 t/m 100' },
          {
            kind: 'paragraph',
            text: 'De tientallen volgen geen perfect patroon — er zijn een paar lastige (tachtig in plaats van "achttig", zeventig in plaats van "zeventig"). Leer ze als een rij. Honderd is het ronde getal aan het eind.',
          },
          {
            kind: 'list',
            items: [
              '20 — twintig',
              '30 — dertig',
              '40 — veertig',
              '50 — vijftig',
              '60 — zestig',
              '70 — zeventig',
              '80 — tachtig (let op: niet "achttig")',
              '90 — negentig',
              '100 — honderd',
            ],
          },
          { kind: 'heading', text: 'Omgekeerde samenstelling' },
          {
            kind: 'paragraph',
            text: 'Tussen 21 en 99 spreek je het kleine getal eerst, dan "en", dan het tiental. Eén woord, geen spaties. Voorbeeld: 21 = eenentwintig (één + en + twintig), niet "twintigeneen". Dit is omgekeerd t.o.v. Engels (twenty-one) — let goed op.',
          },
          {
            kind: 'list',
            items: [
              '21 = eenentwintig (1 + en + 20)',
              '34 = vierendertig (4 + en + 30)',
              '68 = achtenzestig (8 + en + 60)',
              '95 = vijfennegentig (5 + en + 90)',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Trema-tip: bij "twee" en "drie" plak je een trema (¨) op de e als er een "en" volgt: tweeëntwintig (22), drieëndertig (33). Dat voorkomt dat je "ee" of "eee" gaat lezen.',
          },
        ],
      },
    },
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro:
          'De tienvouden plus drie nieuwe woorden voor leeftijd en telefoon. Twintig kennen we al (Les 07) — die staat er niet meer bij. Tik op de luidspreker bij elk woord.',
        words: [
          { nl: 'dertig', en: '30', audioId: 'num-dertig' },
          { nl: 'veertig', en: '40', audioId: 'num-veertig' },
          { nl: 'vijftig', en: '50', audioId: 'num-vijftig' },
          { nl: 'zestig', en: '60', audioId: 'num-zestig' },
          { nl: 'zeventig', en: '70', audioId: 'num-zeventig' },
          { nl: 'tachtig', en: '80', audioId: 'num-tachtig' },
          { nl: 'negentig', en: '90', audioId: 'num-negentig' },
          { nl: 'honderd', en: '100', audioId: 'num-honderd' },
          {
            nl: 'oud',
            en: 'old',
            audioId: 'oud',
            exampleNl: 'Ik ben drieëndertig jaar oud.',
            exampleEn: 'I am thirty-three years old.',
          },
          {
            nl: 'jaar',
            en: 'year',
            gender: 'het',
            audioId: 'jaar',
            exampleNl: 'Ik ben twintig jaar.',
            exampleEn: 'I am twenty years old.',
          },
          {
            nl: 'telefoonnummer',
            en: 'phone number',
            gender: 'het',
            audioId: 'telefoonnummer',
            exampleNl: 'Wat is uw telefoonnummer?',
            exampleEn: 'What is your phone number?',
          },
        ],
      },
    },
    {
      id: 'drill-1',
      type: 'drill',
      payload: {
        intro:
          'Audio-dictee, harder dan Les 07: je hoort een samengesteld getal (zoals "vierenveertig") en typt de twee cijfers (44). Tien items.',
        items: [
          {
            kind: 'typed',
            audioId: 'num-eenentwintig',
            audioText: 'eenentwintig',
            promptNl: 'Welk getal hoor je?',
            expected: '21',
          },
          {
            kind: 'typed',
            audioId: 'num-drieentwintig',
            audioText: 'drieëntwintig',
            promptNl: 'Welk getal hoor je?',
            expected: '23',
          },
          {
            kind: 'typed',
            audioId: 'num-vierendertig',
            audioText: 'vierendertig',
            promptNl: 'Welk getal hoor je?',
            expected: '34',
          },
          {
            kind: 'typed',
            audioId: 'num-zevenenveertig',
            audioText: 'zevenenveertig',
            promptNl: 'Welk getal hoor je?',
            expected: '47',
          },
          {
            kind: 'typed',
            audioId: 'num-tweeenvijftig',
            audioText: 'tweeënvijftig',
            promptNl: 'Welk getal hoor je?',
            expected: '52',
          },
          {
            kind: 'typed',
            audioId: 'num-achtenzestig',
            audioText: 'achtenzestig',
            promptNl: 'Welk getal hoor je?',
            expected: '68',
          },
          {
            kind: 'typed',
            audioId: 'num-negenenzeventig',
            audioText: 'negenenzeventig',
            promptNl: 'Welk getal hoor je?',
            expected: '79',
          },
          {
            kind: 'typed',
            audioId: 'num-drieentachtig',
            audioText: 'drieëntachtig',
            promptNl: 'Welk getal hoor je?',
            expected: '83',
          },
          {
            kind: 'typed',
            audioId: 'num-vijfennegentig',
            audioText: 'vijfennegentig',
            promptNl: 'Welk getal hoor je?',
            expected: '95',
          },
          {
            kind: 'typed',
            audioId: 'num-honderd',
            promptNl: 'Welk getal hoor je?',
            expected: '100',
          },
        ],
      },
    },
    {
      id: 'spreken-1',
      type: 'spreken',
      payload: {
        intro:
          'Je telefoonnummer hardop. Twee stijlen: eerst cijfer voor cijfer (formeel, duidelijk), daarna in paren (informeel, sneller). Beluister het model, vervang dan de cijfers door je eigen nummer.',
        lines: [
          {
            id: 'l1',
            nl: 'Mijn telefoonnummer is nul-zes-één-twee-drie-vier-vijf-zes-zeven-acht.',
            en: 'My phone number is 06-12345678 (digit by digit).',
            audioId: 'spreken-tel-digits',
          },
          {
            id: 'l2',
            nl: 'Nul-zes, twaalf, drieënveertig, zesenvijftig, achtenzeventig.',
            en: '06 12 43 56 78 (in pairs).',
            audioId: 'spreken-tel-paren',
          },
        ],
      },
    },
    {
      id: 'dialoog-1',
      type: 'mini-dialoog',
      payload: {
        intro:
          'Bij de balie van de gemeente. Een ambtenaar vraagt je telefoonnummer en je leeftijd — beleefd, dus alles in "u". Let op de inversie: "Hoe oud bent u?" (niet "Hoe u oud bent?").',
        scenes: [
          {
            id: 'gemeente',
            titleNl: 'Bij de gemeente',
            titleEn: 'At the town hall',
            register: 'formeel',
            lines: [
              {
                id: 'l1',
                speaker: 'Ambtenaar',
                nl: 'Goedemorgen. Wat is uw telefoonnummer?',
                en: 'Good morning. What is your phone number?',
                audioId: 'dialoog-gem-l1',
              },
              {
                id: 'l2',
                speaker: 'U',
                nl: 'Mijn telefoonnummer is nul-zes-één-twee-drie-vier-vijf-zes-zeven-acht.',
                en: 'My phone number is 06-12345678.',
                audioId: 'spreken-tel-digits',
              },
              {
                id: 'l3',
                speaker: 'Ambtenaar',
                nl: 'En hoe oud bent u?',
                en: 'And how old are you?',
                audioId: 'dialoog-gem-l3',
              },
              {
                id: 'l4',
                speaker: 'U',
                nl: 'Ik ben drieëndertig jaar.',
                en: 'I am thirty-three years old.',
                audioId: 'dialoog-gem-l4',
              },
              {
                id: 'l5',
                speaker: 'Ambtenaar',
                nl: 'Dank u wel.',
                en: 'Thank you.',
                audioId: 'dialoog-gem-l5',
              },
            ],
          },
        ],
      },
    },
  ],
};
