# MARA A0-A1 Plan

This plan focuses on the first learning track for MARA: helping a total beginner move from A0 to A1 before starting heavier Inburgering A2 exam practice.

The product should feel like a daily beginner Dutch course, not a collection of disconnected drills.

## Core Learning Philosophy

A0-A1 is lesson-first, not drill-first.

A total beginner should meet a concept inside a lesson before the app asks them to review it with SRS. This means:

- lesson content introduces new words, sounds, and sentence patterns
- immediate practice reinforces the new material
- only completed lesson material enters review
- A1-A2 can be more drill-first later because the learner will already have a base

This is an important product rule:

```txt
Teach first.
Practice immediately.
Review later.
```

## Goal

Build an A0-A1 track that helps the learner:

- understand basic Dutch sounds, words, and short sentences
- build daily study habits
- learn practical vocabulary with spaced repetition
- speak simple sentences aloud
- write basic personal sentences
- prepare gently for later A1-A2 Inburgering practice

## Track Structure

The app should have two learning tracks:

- A0-A1 Beginner
- A1-A2 Inburgering

A0-A1 is the priority now. A1-A2 can stay visible but secondary.

The track should be mostly linear:

- lessons unlock in order
- the home page picks the next unfinished lesson
- free-browse is allowed below the daily plan for extra study

Example:

```txt
MARA

[A0-A1 Beginner] [A1-A2 Inburgering]

Vandaag
Day 1: Ik leer Nederlands

1. Watch: A0-A1 lesson 1
2. Learn: 8 words
3. Practice: 4 sentences
4. Speak: "Mijn naam is..."
5. Review: 5 words
```

## Product Principle

The app should open directly into useful study work. No onboarding.

For a total beginner, the app should decide what comes next and show a clear daily task list.

Bad flow:

```txt
Choose your goals
Choose your level
Choose your interests
Choose your exam date
```

Better flow:

```txt
Vandaag
Start Day 1
```

## Current App Base

The existing scaffold already has:

- Next.js app structure
- local-first storage with IndexedDB and Dexie
- SRS helper using `ts-fsrs`
- starter vocab seed data
- starter KNM seed data
- KNM drill screen
- placeholder vocab and flashcard screens
- home page with drill cards

Important existing files:

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/vocab/page.tsx`
- `src/app/knm/page.tsx`
- `src/lib/types.ts`
- `src/lib/db.ts`
- `src/lib/srs.ts`
- `src/lib/seed/vocab-starter.ts`
- `src/lib/seed/knm-starter.ts`
- `src/lib/seed/index.ts`

## Implementation Architecture Decisions

These decisions come from comparing this plan with the stronger implementation architecture in `PLAN_A0_A1.md`.

### Static Lesson Content

Lesson content should live in TypeScript files, not in IndexedDB.

Recommended structure:

```txt
src/lib/content/lessons/a0-a1-les-01.ts
src/lib/content/lessons/a0-a1-les-02.ts
src/lib/content/lessons/index.ts
```

Why:

- content is versioned in git
- lesson files are easy to review and edit
- the app does not need to migrate static curriculum content in browser storage
- IndexedDB can stay focused on user state

Dexie should store:

- lesson progress
- vocab SRS state
- speaking attempts
- writing attempts
- exam or mock sessions later

Dexie should not be the source of truth for the curriculum itself.

### Lesson Section Runtime

Each lesson should be a list of typed sections rendered by reusable React components.

Core section types:

```ts
export type SectionType =
  | 'uitleg'
  | 'klanken'
  | 'woorden'
  | 'de-het'
  | 'conjugatie'
  | 'drill'
  | 'zinsbouw'
  | 'luisteren'
  | 'spreken'
  | 'mini-dialoog'
  | 'schrijven';
```

Suggested lesson shape:

```ts
export interface LessonSection {
  id: string;
  type: SectionType;
  payload: unknown;
}

export interface Lesson {
  id: string;
  track: 'A0-A1';
  order: number;
  titleNl: string;
  titleEn?: string;
  estimatedMinutes: number;
  sections: LessonSection[];
  prerequisites?: string[];
}

export interface LessonProgress {
  lessonId: string;
  startedAt?: number;
  completedAt?: number;
  sectionsCompleted: string[];
  bestScore?: number;
}
```

This avoids building one custom page per lesson.

### Lesson-First SRS

Vocabulary should not appear in `Woordreview` until the learner has completed the lesson that introduced it.

Flow:

```txt
Lesson introduces "ik", "jij", "naam"
Learner completes lesson
Words are added to SRS review
Tomorrow, they appear in Woordreview
```

This means the current starter vocab should eventually be replaced by lesson-linked vocab.

### Build-Time Audio

Dutch learning needs audio early, especially for pronunciation and listening.

Decision:

- generate or add MP3 files at build/content-authoring time
- store them in `public/audio`
- play local files at runtime
- avoid runtime TTS API calls

Recommended structure:

```txt
scripts/build-audio.ts
src/lib/content/audio-manifest.json
public/audio/a0-a1-les-01/hallo.mp3
public/audio/a0-a1-les-01/mijn-naam-is.mp3
```

Why:

- works offline
- no cost per playback
- faster playback
- easier to cache as a PWA later

The first version can also use manually added MP3 files. The important architecture decision is that runtime playback should use local audio assets.

### Scaffold Cleanup

During A0-A1 work:

- `/knm` should be visible as future A1-A2 content, but not pushed as today's work
- `/flashcards` should remain secondary until the core lesson loop works
- `/vocab` should become `Woordreview`
- `VOCAB_SEEDS` should eventually be retired in favor of lesson-linked words

## A0-A1 Feature Plan

### 1. Today Screen

Replace the current "pick a drill" home screen with a daily plan.

Example:

```txt
Vandaag

A0-A1 Beginner
Day 3 of 120

Today's focus:
Questions and answers

[Start Today's Lesson]

Due review
12 words
3 sentences

Progress
Words learned: 24 / 600
Lessons completed: 2 / 80
Speaking practice: 1 day streak
```

Why this matters:

- beginners need direction
- it reduces decision fatigue
- it makes the app feel like a course
- it creates a daily habit

Implementation notes:

- `src/app/page.tsx` becomes the main Today screen
- keep quick links to Woordreview, KNM, and future tracks lower on the page
- show A0-A1 as the active track
- show A1-A2 as available later or secondary
- choose the next unfinished lesson automatically

### 2. Lesson Path

Create an ordered A0-A1 path.

Example:

```txt
A0-A1 Path

Unit 1: First Dutch
✓ Lesson 1: Hallo, mijn naam is...
✓ Lesson 2: Ik spreek Nederlands
○ Lesson 3: Wat is jouw naam?
○ Lesson 4: Waar kom je vandaan?

Unit 2: Numbers, Time, Dates
○ Numbers 0-20
○ Days of the week
○ Months and dates

Unit 3: Daily Life
○ At home
○ At the shop
○ At the doctor
```

Suggested first units:

1. First Dutch
2. Letters, Words, and Sentences
3. Names and Introductions
4. Numbers 0-100
5. Days, Months, and Time
6. Family and People
7. Home and Objects
8. Food and Shopping
9. Transport and Places
10. Health and Appointments
11. Work and School
12. Simple Past and Daily Stories

Implementation notes:

- add lesson types to `src/lib/types.ts`
- store lesson content as static TypeScript files in `src/lib/content/lessons`
- aggregate lesson content in `src/lib/content/lessons/index.ts`
- add a `lessonProgress` table to Dexie
- add `/lessen` and `/lessen/[id]` routes

### 3. Lesson Detail Page

Each lesson should use the same repeatable study loop.

Example:

```txt
Lesson 1: Hallo, mijn naam is...

Video
[Embedded YouTube lesson]

Words
- ik = I
- jij = you
- naam = name
- Nederlands = Dutch
- leren = to learn

Sentences
- Mijn naam is Sam.
- Ik leer Nederlands.
- Ik woon in Nederland.

Practice
[Start vocabulary]
[Build sentences]
[Speak aloud]
[Write 1 sentence]
```

Why this matters:

- the YouTube lesson becomes part of a structured learning loop
- the learner watches, practices, speaks, writes, and reviews
- every lesson has a predictable shape

Implementation notes:

- do not copy YouTube content or transcripts unless licensing allows it
- store the YouTube URL or embed ID as a resource link
- connect lesson IDs to vocab cards and sentence prompts
- render each lesson with reusable section components

### 3a. Lesson Section Components

Build reusable components for each kind of learning activity.

Initial components:

- `uitleg`: short explanation, usually markdown or simple rich text
- `woorden`: intro vocabulary tiles, no SRS rating yet
- `spreken`: record, play back, compare with model audio, self-rate

Next components:

- `klanken`: tap sound tiles and example words
- `de-het`: choose the correct article
- `conjugatie`: type the correct verb form
- `drill`: generic multiple choice or typed answer
- `luisteren`: audio with 2-3 comprehension questions
- `mini-dialoog`: scripted back-and-forth speaking practice
- `zinsbouw`: arrange words into correct Dutch word order

Why this matters:

- the curriculum can scale without custom code per lesson
- each section type can improve over time
- new lessons become mostly content work

### 4. Vocabulary SRS / Woordreview

The existing SRS system should become the first serious review engine.

For A0-A1, vocabulary should be practical and ordered by lesson.

Important rule:

```txt
Words are introduced in lessons first.
Words enter SRS only after the lesson is completed.
```

Example card:

```txt
het woord

Meaning:
the word

Example:
Ik leer een woord.

[Again] [Hard] [Good] [Easy]
```

Suggested model changes:

```ts
type Level = 'A0' | 'A1' | 'A2' | 'B1';

interface VocabCard {
  lessonId?: string;
  track?: 'A0-A1' | 'A1-A2';
  introducedByLessonId?: string;
}
```

High-impact A0-A1 vocab groups:

- pronouns: ik, jij, hij, zij, wij
- basic verbs: zijn, hebben, wonen, komen, leren, spreken
- question words: wie, wat, waar, wanneer, hoe
- numbers
- days and months
- family
- home
- food
- transport
- health
- work and school

Implementation notes:

- rename the user-facing `/vocab` experience to `Woordreview`
- show only due words from completed lessons
- avoid showing A2 words in A0-A1 review
- keep the existing SRS helper, but change what enters the queue

### 5. Pronunciation / Klanken

Add pronunciation early, before too much vocabulary piles up.

High-impact early sound groups:

- `ij` / `ei`
- `ui`
- `eu`
- `oe`
- `g`
- `sch`

Example:

```txt
Klanken

[ ij ] [ ei ] [ ui ] [ eu ]
[ oe ] [ g  ] [ sch ]

Selected: ui
- huis
- muis
- buiten
```

Why this matters:

- Dutch sounds are difficult for many beginners
- listening improves faster when the learner can hear sound differences
- speaking practice becomes less intimidating

### 6. De/Het Trainer

Add a small article trainer once the learner has seen enough nouns.

Example:

```txt
___ huis

[de] [het]

Correct:
het huis
```

Why this matters:

- `de` and `het` are high-frequency and hard to infer
- article practice should be attached to nouns the learner already knows
- this can become a fast daily drill later

### 7. Conjugation Trainer

Add verb-form practice after `zijn`, `hebben`, and regular present-tense verbs are introduced.

Example:

```txt
wij (werken)

[________]

Correct:
wij werken
```

Why this matters:

- beginners need repeated practice with verb forms
- it prepares the learner for speaking and writing
- typed answers are useful before full writing tasks

### 8. Sentence Builder

This should be a major A0-A1 feature because Dutch word order is hard for beginners.

Example:

```txt
Build the sentence:

I live in the Netherlands.

[woon] [Ik] [Nederland] [in]

Answer:
Ik woon in Nederland.
```

Question types:

- arrange words into a sentence
- choose the missing word
- translate short sentence to Dutch
- match Dutch sentence to English meaning

Suggested first sentence patterns:

- Ik ben ...
- Ik heet ...
- Mijn naam is ...
- Ik kom uit ...
- Ik woon in ...
- Ik leer Nederlands.
- Ik heb een vraag.
- Waar woon jij?
- Wat is jouw naam?

Implementation notes:

- create `SentencePrompt` type
- define sentence prompts inside static lesson content
- later connect sentence prompts to SRS

### 9. Speaking Practice

For A0-A1, keep speaking simple first.

Example:

```txt
Say this aloud:

Mijn naam is David.
Ik kom uit Nigeria.
Ik woon in Amsterdam.

[Record]
[Play My Voice]
[Again] [Good]
```

Early speaking should focus on:

- repeating useful sentences
- answering simple personal questions
- building confidence
- hearing your own voice

Later, add speech-to-text checking.

Implementation notes:

- start with browser audio recording
- store attempts locally in IndexedDB
- reuse the existing `SpeakingPrompt` and `SpeakingAttempt` types if possible
- add `/speaking` route later
- include model audio when possible

### 10. Writing Practice

Start very small.

Example:

```txt
Write in Dutch:

My name is David.

[________________]

Good answer:
Mijn naam is David.
```

Then grow into:

```txt
Write 3 sentences about yourself.
```

Early writing prompts:

- My name is ...
- I live in ...
- I come from ...
- I learn Dutch.
- I have a question.
- Today is Monday.
- I go to school.
- I have an appointment.

Implementation notes:

- do not require AI feedback in the first version
- start with simple model answers
- later add typo-tolerant checking and AI feedback

### 11. Listening Mini Checks

Use short audio or video snippets.

Example:

```txt
Listen:

"Ik woon in Utrecht."

Question:
Where does the person live?

[A] Amsterdam
[B] Utrecht
[C] Rotterdam
```

Listening should train understanding enough to answer, not full translation.

Implementation notes:

- first version can use text-to-speech or linked video segments
- later add recorded native audio
- keep the language very simple in A0-A1

### 12. Mini-Dialogues

Mini-dialogues should appear after the learner has enough basic sentences.

Example:

```txt
Bij de bakker

Bakker:
Goedemorgen, wat wil je hebben?

Jij:
[Record]

Model:
Een bruin brood graag.
```

Good early situations:

- introducing yourself
- asking someone's name
- buying bread
- asking where something is
- calling the doctor

### 13. Review Screen

Create one combined review queue for the day.

Example:

```txt
Review Today

Vocabulary: 8 due
Sentences: 4 due
Listening: 2 due
Speaking: 1 due

[Start 10-minute review]
```

Why this matters:

- spaced repetition is one of the highest-impact features
- review should feel like a daily ritual
- the learner should not need to decide which deck matters

Implementation notes:

- start with vocab only
- add sentences later
- add speaking/writing review after those features exist

### 14. Progress Screen

Keep progress simple and useful.

Example:

```txt
A0-A1 Progress

Foundation Dutch: 18%
Vocabulary: 42 / 600 words
Sentence patterns: 6 / 80
Speaking confidence: beginner
Listening confidence: beginner

Next goal:
Finish Unit 1
```

Do not overbuild analytics at the beginning.

Useful progress numbers:

- lessons completed
- words introduced
- words learned
- sentence patterns practiced
- days studied
- current unit

## Resource Strategy

The screenshot shows a useful A1 YouTube playlist by `juf m NT2`.

Use it as:

- a linked or embedded external lesson resource
- a source of lesson themes
- inspiration for beginner sequencing

Do not copy the video or full transcript unless the license allows it.

Best use inside the app:

```txt
Watch lesson
Learn 8-12 words
Practice 3-5 sentences
Speak aloud
Write one sentence
Review tomorrow
```

## MVP Build Order

Each step should produce something usable. Build a small vertical slice first, then scale the content.

### Step 1: Lesson Runtime Skeleton

- add `/lessen` route
- add lesson list
- add `/lessen/[id]` viewer
- define static `Lesson` and `LessonSection` types
- create static content folder
- add Dexie `lessonProgress` table
- track started/completed lesson state
- keep content minimal for the skeleton

### Step 2: First Vertical Slice

- implement `uitleg`, `woorden`, and `spreken` sections
- author Lesson 1 fully
- make the learner able to complete Lesson 1
- add introduced words to review after completion
- rename `/vocab` UI to `Woordreview`

### Step 3: Today Screen

- replace current drill grid with Today
- select the next unfinished lesson
- show due Woordreview count
- show A0-A1 as active
- keep A1-A2/KNM visible but secondary

### Step 4: Audio Foundation

- add local `AudioPlayer` component
- add `public/audio` folder structure
- add audio manifest shape
- add manual or generated audio for Lesson 1
- decide later whether to automate with `scripts/build-audio.ts`

### Step 5: Klanken

- implement `klanken` section
- author lessons for Dutch sounds
- include local audio examples where possible

### Step 6: Core Drills

- implement `drill`
- implement `de-het`
- implement `conjugatie`
- author number, article, and verb lessons

### Step 7: Listening And Dialogues

- implement `luisteren`
- implement `mini-dialoog`
- add short practical situations
- use local audio when possible

### Step 8: Sentence Builder

- implement `zinsbouw`
- focus first on simple main clauses
- later add V2 and inversion

### Step 9: Progress

- track completed lessons
- track words introduced and reviewed
- add progress screen
- add simple daily streak

### Step 10: Expand Content

- expand from the first vertical slice to 20 A0-A1 lessons
- author content gradually
- adjust lesson shape based on what actually works while studying

## First 7 Lessons

### Day 1: Hallo

Goal: say who you are.

Words:

- ik
- jij
- hallo
- naam
- mijn
- is
- Nederlands
- leer

Sentences:

- Hallo.
- Mijn naam is David.
- Ik leer Nederlands.

Practice:

- repeat the sentences aloud
- write your name sentence

### Day 2: Ik Ben

Goal: use `ik ben`.

Words:

- ben
- moe
- goed
- ziek
- blij
- vandaag

Sentences:

- Ik ben David.
- Ik ben moe.
- Ik ben ziek.
- Ik ben blij.

### Day 3: Questions

Goal: ask and answer simple questions.

Words:

- wie
- wat
- waar
- hoe
- jouw
- vraag

Sentences:

- Wat is jouw naam?
- Waar woon jij?
- Hoe gaat het?
- Ik heb een vraag.

### Day 4: Wonen

Goal: say where you live.

Words:

- woon
- woont
- Nederland
- stad
- huis
- in

Sentences:

- Ik woon in Nederland.
- Ik woon in Amsterdam.
- Mijn huis is klein.

### Day 5: Numbers 0-10

Goal: understand simple numbers.

Words:

- nul
- een
- twee
- drie
- vier
- vijf
- zes
- zeven
- acht
- negen
- tien

Sentences:

- Ik heb twee boeken.
- Ik heb een pen.

### Day 6: Objects

Goal: name simple classroom objects.

Words:

- de pen
- het boek
- het papier
- de tafel
- de stoel
- de tas

Sentences:

- Dit is een pen.
- Ik heb een boek.
- Het boek is groot.

### Day 7: Review

Goal: review the first week.

Practice:

- vocabulary review
- sentence builder
- speaking review
- write 3 sentences about yourself

Example writing:

```txt
Mijn naam is David.
Ik woon in Nederland.
Ik leer Nederlands.
```

## Definition Of Done For A0-A1 MVP

The first A0-A1 MVP is good enough when:

- the app opens to Today
- the learner can choose A0-A1
- there is an ordered lesson path
- at least 7 beginner lessons are authored as static content
- each lesson has words and sentences
- Woordreview works with SRS
- words enter Woordreview only after lesson completion
- the learner can complete one daily lesson loop
- progress shows basic completion

## Not In Scope Yet

Do not build these until the core loop works:

- social/community features
- leaderboards
- avatars
- complex gamification
- paid plans
- full AI tutor
- complete A2 mock exam engine
- advanced analytics

These can come later, but they do not matter as much as the beginner learning loop.
