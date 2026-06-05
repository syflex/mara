import type { VerderKijken } from '@/lib/types';

/**
 * "Verder kijken" — the external video for each A0 lesson, the in-app surface
 * for the daily loop's "Listen" leg. Source of truth is A0/LESSONS_A0.md
 * (kept in sync by hand); this map is merged onto each Lesson in
 * `src/lib/content/lessons/index.ts`. Les 20 is a review consolidation with
 * no video, so it has no entry.
 *
 * Creators: Kim = "Learn Dutch with Kim / Dutchies to be"; Bart = Bart de Pau
 * (learndutch.org); juf M = NT2 met juf M.
 */
export const VERDER_KIJKEN: Record<string, VerderKijken[]> = {
  'a0-les-01': [
    { title: 'Dutch Greetings', creator: 'Kim', url: 'https://www.youtube.com/watch?v=jzTUo7efsow' },
  ],
  'a0-les-02': [
    {
      title: 'NT2 A1 les 11 — uitspraak alfabet, naam spellen',
      creator: 'juf M',
      url: 'https://www.youtube.com/watch?v=Vzmff7dGad0',
    },
    {
      title: 'Dutch Sounds & The Alphabet',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=_AjSb2CSoT8',
    },
  ],
  'a0-les-03': [
    {
      title: 'NT2 A1 les 9 — kort/lang U UU E EE O OO A AA',
      creator: 'juf M',
      url: 'https://www.youtube.com/watch?v=HtIYa6oY9SA',
    },
  ],
  'a0-les-04': [
    {
      title: 'NT2 A1 les 12 — IE OE EI IJ tweetekenklanken',
      creator: 'juf M',
      url: 'https://www.youtube.com/watch?v=z0gbbX9ZQK0',
    },
    { title: 'NT2 12.04 — ui / eu', creator: 'juf M', url: 'https://www.youtube.com/watch?v=IJBU8MxW5MA' },
  ],
  'a0-les-05': [
    {
      title: 'Introducing Yourself in Dutch',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=ISzH9QI0Bn8',
    },
  ],
  'a0-les-06': [
    {
      title: 'Dutch Question Words (Vraagwoorden)',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=BBe9vCH0T7o',
    },
  ],
  'a0-les-07': [
    { title: 'Numbers in Dutch', creator: 'Kim', url: 'https://www.youtube.com/watch?v=rXXHBhkhoqA' },
  ],
  'a0-les-08': [
    {
      title: 'Lesson 07 — How to count in Dutch',
      creator: 'Bart',
      url: 'https://www.learndutch.org/lessons/how-to-count-in-dutch/',
    },
  ],
  'a0-les-09': [
    {
      title: 'Where are you from & Where do you live?',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=omqnwN7k_OM',
    },
  ],
  'a0-les-10': [
    {
      title: 'Dutch STORY for BEGINNERS — Wie ben ik?',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=wZrA_nkLGqE',
    },
  ],
  'a0-les-11': [
    {
      title: 'HEBBEN & ZIJN in Dutch',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=35qyPfFZh70',
    },
  ],
  'a0-les-12': [
    {
      title: 'The articles DE, HET and EEN',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=2Za8N7Klz1U',
    },
  ],
  'a0-les-13': [
    {
      title: 'Plurals in Dutch (Meervoud)',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=cf750IOi75o',
    },
  ],
  'a0-les-14': [
    {
      title: 'Dutch Personal Pronouns + family',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=hR9qHBek8y8',
    },
  ],
  'a0-les-15': [
    {
      title: 'Lesson 16 — Body parts in Dutch',
      creator: 'Bart',
      url: 'https://www.learndutch.org/lessons/body-parts-in-dutch/',
    },
  ],
  'a0-les-16': [
    { title: 'Hoe gaat het?', creator: 'Kim', url: 'https://www.youtube.com/watch?v=ZCZEg4PHtHs' },
  ],
  'a0-les-17': [
    {
      title: 'Weekdays + months + seasons',
      creator: 'Bart',
      url: 'https://www.learndutch.org/lessons/weekdays-months-seasons-in-dutch/',
    },
  ],
  'a0-les-18': [
    {
      title: 'Telling time in Dutch',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=I1eUmisbLOQ',
    },
  ],
  'a0-les-19': [
    {
      title: 'NT2 les 27 — het huis, de woonkamer, de muur, de zolder',
      creator: 'juf M',
      url: 'https://www.youtube.com/watch?v=FalKIG8dGbQ',
    },
  ],
  // a0-les-20: REVIEW 2 — no verder kijken (review consolidation).
  'a0-les-21': [
    {
      title: 'Prepositions in Dutch (Voorzetsels)',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=llsJtRu5stI',
    },
    {
      title: 'NT2 les 33 — woonkamer detail',
      creator: 'juf M',
      url: 'https://www.youtube.com/watch?v=4sPPcLzGIII',
    },
  ],
  'a0-les-22': [
    {
      title: 'Order in a Cafe or Restaurant',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=FoIRbGXTeCM',
    },
  ],
  'a0-les-23': [
    {
      title: 'Grocery shopping (Boodschappen doen)',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=ZBHyyYUmj14',
    },
  ],
  'a0-les-24': [
    {
      title: 'Lesson 35 — Colours in Dutch',
      creator: 'Bart',
      url: 'https://www.learndutch.org/lessons/colours-in-dutch/',
    },
  ],
  'a0-les-25': [
    {
      title: 'Dutch Adjectives You Should Know',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=2DjBQayso08',
    },
  ],
  'a0-les-26': [
    {
      title: 'Conjugating Dutch Verbs & Spelling',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=UFLrX3cyioc',
    },
  ],
  'a0-les-27': [
    {
      title: 'Lesson 11 — Prepositions',
      creator: 'Bart',
      url: 'https://www.learndutch.org/lessons/prepositions-in-dutch/',
    },
  ],
  'a0-les-28': [
    {
      title: 'Dutch Question Words (Vraagwoorden)',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=BBe9vCH0T7o',
    },
  ],
  'a0-les-29': [
    { title: 'NIET en GEEN', creator: 'Kim', url: 'https://www.youtube.com/watch?v=GvSlC_ZhPxs' },
  ],
  'a0-les-30': [
    {
      title: 'Learn DUTCH in 60 minutes (NT2 A1 crash review)',
      creator: 'Kim',
      url: 'https://www.youtube.com/watch?v=g8Q1tpX1asc',
    },
  ],
};
