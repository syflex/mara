import type { Lesson } from '@/lib/types';

export const A0_LES_12: Lesson = {
  id: 'a0-les-12',
  track: 'beginner',
  level: 'A0',
  order: 12,
  titleNl: 'De en het — lidwoorden en aanwijzingen',
  titleEn: 'De and het — articles and demonstratives',
  estimatedMinutes: 14,
  coverage: ['§3.4', '§2.11'],
  prerequisites: ['a0-les-11'],
  sections: [
    {
      id: 'uitleg-1',
      type: 'uitleg',
      payload: {
        blocks: [
          { kind: 'heading', text: 'Elk zelfstandig naamwoord heeft een vast lidwoord' },
          {
            kind: 'paragraph',
            text: 'In het Nederlands is élk zelfstandig naamwoord óf een "de"-woord óf een "het"-woord. Je kunt het niet horen, niet ruiken en niet altijd raden — leer daarom elk nieuw woord meteen mét zijn lidwoord. "Boek" onthoud je dus als "het boek", "stad" als "de stad".',
          },
          { kind: 'heading', text: 'Vier vuistregels' },
          {
            kind: 'list',
            items: [
              'Ongeveer 75% van de woorden is "de". Bij twijfel: gok "de" — vaker goed dan fout.',
              'Alle meervouden zijn "de": de boeken, de huizen — ook van een "het"-woord.',
              'Verkleinwoorden (-je, -tje, -pje) zijn altijd "het": het boekje, het huisje, het kopje.',
              'Woorden op -ing, -heid, -ie, -teit zijn bijna altijd "de": de koning, de waarheid.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Er zijn veel uitzonderingen, dus de echte oplossing blijft: leer elk woord met zijn lidwoord. De vuistregels zijn voor gokken, niet voor zekerheid.',
          },
          { kind: 'heading', text: 'Dit / dat / deze / die' },
          {
            kind: 'paragraph',
            text: 'Aanwijzende voornaamwoorden ("this/that") veranderen met het lidwoord. Bij "het"-woorden gebruik je dit (dichtbij) of dat (verder weg). Bij "de"-woorden wordt het deze of die. Hetzelfde patroon, andere woorden.',
          },
          {
            kind: 'list',
            items: [
              '"het" + dichtbij = dit: dit boek, dit jaar, dit adres',
              '"het" + ver weg = dat: dat boek, dat jaar, dat adres',
              '"de" + dichtbij = deze: deze stad, deze meneer, deze straat',
              '"de" + ver weg = die: die stad, die meneer, die straat',
            ],
          },
          {
            kind: 'paragraph',
            text: 'Geheugentruc: bij "de" → "deze/die" (beide met de korte e); bij "het" → "dit/dat" (beide met de korte i/a, geen e). Het lidwoord en het aanwijswoord delen letterkleur.',
          },
        ],
      },
    },
    {
      id: 'de-het-1',
      type: 'de-het',
      payload: {
        intro:
          'Veertien zelfstandige naamwoorden uit eerdere lessen, in willekeurige volgorde. Tik op "de" of "het". Bij fout zie je het juiste lidwoord — onthoud per woord.',
        items: [
          { nl: 'meneer', gender: 'de', en: 'sir / man' },
          { nl: 'mevrouw', gender: 'de', en: 'madam / woman' },
          { nl: 'naam', gender: 'de', en: 'name' },
          { nl: 'stad', gender: 'de', en: 'city' },
          { nl: 'straat', gender: 'de', en: 'street' },
          { nl: 'honger', gender: 'de', en: 'hunger' },
          { nl: 'dorst', gender: 'de', en: 'thirst' },
          { nl: 'pijn', gender: 'de', en: 'pain' },
          { nl: 'tijd', gender: 'de', en: 'time' },
          { nl: 'jaar', gender: 'het', en: 'year' },
          { nl: 'telefoonnummer', gender: 'het', en: 'phone number' },
          { nl: 'adres', gender: 'het', en: 'address' },
          { nl: 'boek', gender: 'het', en: 'book' },
          { nl: 'huis', gender: 'het', en: 'house' },
        ],
      },
    },
    {
      id: 'woorden-1',
      type: 'woorden',
      payload: {
        intro:
          'Vier aanwijzende voornaamwoorden — dit/dat voor "het", deze/die voor "de". Lees elk voorbeeld hardop en let op de combinatie van lidwoordkleur + afstand.',
        words: [
          {
            nl: 'dit',
            en: 'this (with "het" nouns)',
            audioId: 'dit',
            exampleNl: 'Dit jaar heb ik tijd.',
            exampleEn: 'This year I have time.',
          },
          {
            nl: 'dat',
            en: 'that (with "het" nouns)',
            audioId: 'dat',
            exampleNl: 'Dat adres is hier.',
            exampleEn: 'That address is here.',
          },
          {
            nl: 'deze',
            en: 'this (with "de" nouns)',
            audioId: 'deze',
            exampleNl: 'Deze stad is in Nederland.',
            exampleEn: 'This city is in the Netherlands.',
          },
          {
            nl: 'die',
            en: 'that (with "de" nouns)',
            audioId: 'die',
            exampleNl: 'Die meneer komt uit België.',
            exampleEn: 'That man comes from Belgium.',
          },
        ],
      },
    },
    {
      id: 'schrijven-1',
      type: 'schrijven',
      payload: {
        intro:
          'Vijf zinnen waarin je een aanwijswoord combineert met een zelfstandig naamwoord en een werkwoord. Geen goed/fout — vergelijk je antwoord met het model. Let op: aanwijswoord moet bij het lidwoord van het naamwoord passen.',
        items: [
          {
            promptEn: "Say: 'This year I have time.' (het jaar)",
            expected: 'Dit jaar heb ik tijd.',
            hint: 'jaar = het → dit',
          },
          {
            promptEn: "Say: 'This city is in the Netherlands.' (de stad)",
            expected: 'Deze stad is in Nederland.',
            hint: 'stad = de → deze',
          },
          {
            promptEn: "Say: 'That man comes from Belgium.' (de meneer)",
            expected: 'Die meneer komt uit België.',
            hint: 'meneer = de → die',
          },
          {
            promptEn: "Say: 'That address is here.' (het adres)",
            expected: 'Dat adres is hier.',
            hint: 'adres = het → dat',
          },
          {
            promptEn: "Say: 'This book is nice.' (het boek)",
            expected: 'Dit boek is leuk.',
            hint: 'boek = het → dit',
          },
        ],
      },
    },
  ],
};
