# A0 → A1 Plan

Working doc. Built incrementally; tick off the **Build order** section as we go.

---

## Philosophy

A0→A1 is **lesson-first**, not drill-first. You can't SRS a concept you've never seen.
A1→A2 (the existing scaffold's KNM bank + A2 word list + speaking + mock) is drill-first and slots in *after* this phase.

Modeled loosely on the juf-M-NT2 NT2 progression: short sequential lessons, each introducing 1–2 new pieces and reinforcing immediately.

---

## Decisions made 2026-05-17

- **Audio:** Pre-recorded MP3s generated at build time via a free TTS API (ElevenLabs free tier or Google Cloud TTS). Bundled into `public/audio/`. No runtime API calls — works offline, no cost per play.
- **Structure:** Linear curriculum (Les 1 → Les 20, unlocked sequentially) **+** a daily plan on the home page that picks today's lesson for you. Free-browse below the daily plan lets you do more on days you want extra.

---

## Curriculum — 20 lessons, ~8 weeks

| # | Title | Sections |
|---|-------|----------|
| 1 | Welkom — Hallo, dag, tot ziens | uitleg · woorden(10) · spreken |
| 2 | Klanken 1 — ij / ei / ui | klanken · woorden(8) |
| 3 | Klanken 2 — eu / oe / g / sch | klanken · woorden(8) |
| 4 | Wie ben jij? — ik heet, ik kom uit | uitleg · woorden · spreken |
| 5 | Cijfers 0–20 | uitleg · drill · luisteren |
| 6 | Cijfers 20–100, telefoon, leeftijd | drill · luisteren · spreken |
| 7 | De/het — eerste 20 zelfstandige nw. | uitleg · de-het-drill |
| 8 | Zijn & hebben (present) | uitleg · conjugatie-drill |
| 9 | Familie — vader, moeder, broer | woorden · de-het · spreken("vertel over je familie") |
| 10 | Dagen, maanden, datum | drill · luisteren |
| 11 | Tijd — hoe laat is het? | uitleg · drill · luisteren |
| 12 | Regelmatige werkwoorden present | uitleg · conjugatie-drill |
| 13 | Wonen — huis, kamer, straat | woorden · de-het · luisteren |
| 14 | In de stad — winkel, straat, links/rechts | woorden · spreken("vraag de weg") |
| 15 | Eten & drinken | woorden · mini-dialoog("bij de bakker") |
| 16 | Bij de dokter | woorden · luisteren · mini-dialoog |
| 17 | Werk — wat doe jij? | woorden · spreken |
| 18 | Bezittelijke vnw — mijn, jouw, zijn, haar | uitleg · drill |
| 19 | V2 woordvolgorde — inversie | uitleg · zinsbouw-drill |
| 20 | A1 mock — 30 vragen mixed | mixed-review |

After Les 20 → solid A1 → transition to A1→A2 phase (KNM bank, A2 word list, speaking prompts, mock exam).

---

## Section types

Reusable across lessons. Each is a self-contained React component fed a typed payload.

| Type | What it does |
|------|--------------|
| `uitleg` | Markdown explanation, no grading |
| `klanken` | Sound tiles (tap to hear + example words) |
| `woorden` | Intro vocab tiles (no SRS yet — vocab enters SRS after a lesson is completed) |
| `de-het` | Article drill: see noun → tap `de` or `het` |
| `conjugatie` | See pronoun + infinitive → type the form |
| `drill` | Generic MC / typed answer |
| `zinsbouw` | Drag word tiles to build sentences (V2 / inversion practice) |
| `luisteren` | Audio + transcript + 2–3 comprehension Qs |
| `spreken` | Record → playback next to model audio → self-rate |
| `mini-dialoog` | Scripted back-and-forth (bakery, doctor, neighbor) |
| `schrijven` | Type a Dutch sentence from an English prompt → compare against model answer (typo-tolerant) |

---

## Data model additions (`src/lib/types.ts`)

```ts
export type SectionType =
  | 'uitleg' | 'klanken' | 'woorden' | 'de-het' | 'conjugatie'
  | 'drill' | 'zinsbouw' | 'luisteren' | 'spreken' | 'mini-dialoog'
  | 'schrijven';

export interface LessonSection {
  type: SectionType;
  payload: unknown; // narrowed per type in the renderer
}

export interface Lesson {
  id: string;            // 'a1-les-04'
  level: 'A0-A1';
  order: number;
  titleNl: string;
  titleEn: string;
  estimatedMinutes: number;
  sections: LessonSection[];
  prerequisites?: string[]; // ['a1-les-03']
}

export interface LessonProgress {
  lessonId: string;
  startedAt?: number;
  completedAt?: number;
  sectionsCompleted: number;
  bestScore?: number;
}
```

Lessons live in `src/lib/content/lessons/a1-les-XX.ts`, one file each, aggregated in `lessons/index.ts`. Static TS — no DB writes for content.
Lesson **progress** lives in Dexie alongside SRS state.

---

## Audio pipeline

```
scripts/build-audio.ts          # Node script, run manually: pnpm audio:build
   ↓ reads
src/lib/content/lessons/*.ts    # each lesson declares its audio lines
   ↓ calls
ElevenLabs API (free tier ~10k chars/mo) or Google Cloud TTS
   ↓ writes
public/audio/{lesson-id}/{line-id}.mp3
   ↓ tracked in
src/lib/content/audio-manifest.json   # committed; prevents re-generation
```

Adding a lesson = edit a TS file → `pnpm audio:build` → commit. Runtime just plays files from `/audio/`. PWA caches them → works offline.

---

## Build order

Each step is independently shippable. Sized so half a step fits in an evening and still leaves time to study Dutch.

- [x] **Step 1 — Lesson runtime + Today home.** `/lessen` route, lesson list, lesson viewer that walks sections, progress in Dexie. **Home page = Today:** picks next unfinished lesson + shows one-line progress (`Les 3/20 · 12 woorden due`). No content yet — placeholder lesson. The home shape is set from day one. *(1 day)*
- [x] **Step 2 — Audio build script + manifest + `<AudioPlayer>` component.** Generate Les 1 audio as the smoke test. Two providers wired up: ElevenLabs (paid, MP3) via `pnpm audio:build`, and macOS `say` (free, WAV) via `pnpm audio:build:say`. Manifest stores extension per file so both formats coexist. *(half day)*
- [x] **Step 3 — Section components: `uitleg` + `woorden` + `spreken`.** Author Les 1 fully. End-to-end vertical slice — proves the whole pattern works before scaling. *(1 day)*
- [ ] **Step 4 — `klanken` component.** Author Les 2 + Les 3. *(half day — mostly content)*
- [ ] **Step 5 — `drill` + `de-het` + `conjugatie` components.** Author Les 5–8. *(1 day code + 1 day content)*
- [ ] **Step 6 — `luisteren` + `mini-dialoog` components.** Author Les 6, 10, 13, 15, 16. *(1 day)*
- [ ] **Step 7 — `zinsbouw` component.** Author Les 19. *(half day)*
- [ ] **Step 8 — `schrijven` component.** Type Dutch from English prompt → compare against model answer (case + punctuation tolerant, simple typo tolerance). Add 2–4 writing prompts to each authored lesson where it fits. Inburgering A2 has a Schrijven exam — start the muscle now. *(half day code + content as you go)*
- [ ] **Step 9 — Unified daily Review queue.** One `/review` screen merging due vocab + due `schrijven` + due `luisteren` checks. One button on Today: *"Start 10-min review."* The product win is the ritual, not the algorithm. *(half day)*
- [ ] **Step 10 — Author remaining content** (Les 9, 11, 12, 14, 17, 18, 20). Spread out — author each lesson the day before you study it. *(ongoing)*

> Authoring tip for step 8: don't sprint the content upfront. Author each lesson the night before you study it. Lessons authored later benefit from what you learned earlier, and you avoid wasted work if you restructure things.

---

## Scaffold cleanup (do during Step 1)

- `/knm` — disabled on home grid until A1→A2 phase.
- `/flashcards` (custom decks) — disabled until A1→A2.
- `/vocab` — rename to **Woordreview**; auto-populates only with words from completed lessons. Retire `VOCAB_SEEDS`.

---

## UI sketches

### Klanken
```
┌─────────────────────────────────┐
│  Klanken                        │
│  ─────────────────────────────  │
│  [ ij ] [ ei ] [ ui ] [ eu ]    │
│  [ oe ] [ ou ] [ au ] [ aa ]    │
│  [ g  ] [ ch ] [ sch] [ ng ]    │
│                                 │
│  Selected: ui  🔊               │
│   • huis  🔊                    │
│   • muis  🔊                    │
│   • buiten 🔊                   │
└─────────────────────────────────┘
```

### Tijd drill
```
┌─────────────────────────────────┐
│  Hoe laat is het?               │
│      ┌─────┐                    │
│      │ 7:45│   🔊               │
│      └─────┘                    │
│  ◯ kwart voor acht              │
│  ◯ kwart over zeven             │
│  ◯ half acht                    │
│  ◯ tien voor acht               │
└─────────────────────────────────┘
```

### De/Het trainer
```
┌─────────────────────────────────┐
│  ___ huis                       │
│                                 │
│       [ de ]    [ het ]         │
│                                 │
│  Streak: 7 ▎ Today: 24/30       │
└─────────────────────────────────┘
```

### Conjugatie
```
┌─────────────────────────────────┐
│   wij (werken)                  │
│   ┌─────────────────┐           │
│   │ _____           │           │
│   └─────────────────┘           │
│   [ Check ]                     │
│                                 │
│   Hint: regular -en verb        │
└─────────────────────────────────┘
```

### Zinsbouw
```
┌─────────────────────────────────┐
│  Build: "Tomorrow I go to work" │
│                                 │
│   [ ga ] [ Morgen ] [ ik ]      │
│   [ naar ] [ werk ]             │
│                                 │
│  Your answer:                   │
│   ┌────────────────────────┐    │
│   │ Morgen ga ik ...       │    │
│   └────────────────────────┘    │
└─────────────────────────────────┘
```

### Luisteren
```
┌─────────────────────────────────┐
│  ▶ Les 4 — Wie ben jij?  3:57   │
│  ────────────────────           │
│  Transcript ▽                   │
│   "Hallo, ik heet Maria.        │
│    Ik kom uit Spanje..."        │
│                                 │
│  Vragen:                        │
│   1. Hoe heet zij?              │
│   2. Waar komt zij vandaan?     │
└─────────────────────────────────┘
```

### Mini-dialoog (Spreken)
```
┌─────────────────────────────────┐
│  Bij de bakker                  │
│  ─────────────────────────────  │
│  Bakker: "Goedemorgen, wat      │
│           wil je hebben?"       │
│                                 │
│  Jij:  🎙 [ Hold to record ]    │
│                                 │
│  Model: 🔊  "Een bruin brood    │
│              graag."            │
└─────────────────────────────────┘
```

---

## Definition of done — A0→A1 MVP

Stop adding section types and ship when all of these are true. Anything beyond this is scope creep.

- [x] Home opens directly to **Today** — next unfinished lesson + one-line progress, no menu-picking.
- [x] Ordered lesson path from Les 1 → Les 20, sequential unlock.
- [x] At least **7 lessons fully authored** (audio + sections + words). *(7 authored; curriculum follows the daily-pacing list — Hallo / Ik ben / Questions / Wonen / Numbers / Objects / Familie. The 20-lesson curriculum table waits on klanken/drill/de-het/luisteren components.)*
- [x] Each authored lesson has: intro vocab, at least one practice section, and one `schrijven` or `spreken` prompt.
- [x] Words from completed lessons flow into the SRS automatically (no manual deck building).
- [x] `/review` exists and merges everything due today behind one button.
- [x] One full daily loop is completable in ≤30 minutes (your budget).

## Out of scope for A0→A1 (revisit in A1→A2)

- KNM question bank — conceptually A2; memorizing strings at A0 is pointless.
- Custom flashcards — premature; you don't yet know what to add.
- Exam Simulator — month 4+ feature.
- Cloze grammar drills — needs base grammar first.
