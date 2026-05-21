# A0 Lessons — Sequencing Plan

This document sequences the A0 syllabus (`SYLLABUS_A0.md`) into **30 ordered lessons**. It is the source of truth for *what each lesson covers*; the implementation lives in `src/lib/content/lessons/a0/a0-les-NN.ts`.

The plan is read top-to-bottom: each lesson assumes the previous ones have been completed. Function words (§2.11) and basic word order (§3.7) are *threaded* through every lesson rather than getting standalone slots.

## Sources of truth

- **Syllabus:** [`SYLLABUS_A0.md`](SYLLABUS_A0.md) — scope of what A0 must cover
- **Resources:** [`RESOURCES_A0.md`](RESOURCES_A0.md) — Kim/Bart/juf M video map per syllabus section
- **NiG cross-check:** [`NIG_COVERAGE_A0.md`](NIG_COVERAGE_A0.md) — alignment with Nederlands in Gang
- **Frequency tiers:** [`FREQUENCY_A0.md`](FREQUENCY_A0.md) — per-word A/B/C priority

---

## Lesson template

Every lesson entry below uses this shape:

```
### Les NN — Title

**Coverage:** §X.Y, §A.B (back-references to syllabus sections)
**Level:** A0
**New words:** word₁, word₂, … (count)
**Estimated:** ~N min · M sections
**Prereq:** Les NN−1

**Sections:**
1. **section-type** — short description
2. …

**Verder kijken:** Title — Creator — URL
```

Mirrored into TS as:

```ts
export const A0_LES_NN: Lesson = {
  id: 'a0-les-NN',
  track: 'beginner',
  level: 'A0',
  order: NN,
  titleNl: '…',
  titleEn: '…',
  estimatedMinutes: N,
  coverage: ['§X.Y', '§A.B'],     // new field on Lesson interface
  prerequisites: ['a0-les-(NN-1)'],
  sections: [ … ],
};
```

## Lesson size budget

- **3–5 sections** per lesson
- **5–10 new words** (occasionally up to 20 for inherently chunked sets like numbers/days/months)
- **1–2 grammar concepts** max
- **~12–15 minutes** target length

Anything bigger gets split. The lesson is the *middle* of a daily session (Review + Lesson + Listen).

## Section types (from syllabus §3 of `PLAN_A0_A1.md`)

`uitleg` · `klanken` · `woorden` · `de-het` · `conjugatie` · `drill` · `zinsbouw` · `luisteren` · `spreken` · `mini-dialoog` · `schrijven`

## Register policy

Every greeting/intro/transactional function is shown in **both *je* and *u* registers** (see SYLLABUS_A0.md §3.1 and §4). The default form in templates and drills is *je*; *u* appears alongside it in greetings and address scenarios.

---

## Overview — all 30 lessons

| # | Title | Phase | Primary coverage |
|---|---|---|---|
| 01 | Welkom — hallo, dag, tot ziens | Foundation | §2.1 greetings · §3.1 pronouns intro |
| 02 | Klanken 1 — alfabet & spell-your-name | Foundation | §1.1 alphabet · §1.2 g/ch/sch |
| 03 | Klanken 2 — kort vs lang vowels | Foundation | §1.3 short/long vowels |
| 04 | Klanken 3 — tweeklanken (ij/ei, ui, eu, oe, ou/au) | Foundation | §1.4 digraphs |
| 05 | Ik ben — first identity sentence | Foundation | §3.2 zijn full · §2.2 ik ben/heet/kom uit |
| 06 | Wie ben je? — questions about identity | Personalia | §2.13 wie/wat/hoe · §3.7 question inversion |
| 07 | Cijfers 0–20 | Personalia | §2.3 numbers 0–20 |
| 08 | Cijfers 20–100, telefoon, leeftijd | Personalia | §2.3 numbers 20–100 · §2.2 oud/jaar/telefoonnummer |
| 09 | Waar woon je? — places and origins | Personalia | §2.2 wonen/komen · §2.12 in/uit · §4 say where you live |
| 10 | **REVIEW 1** — first 9 lessons | Review | recap of §1, §2.1–§2.3, §3.1–§3.2 |
| 11 | Ik heb — hebben + states | Grammar pillars | §3.3 hebben · §2.6 honger/dorst/pijn/koud |
| 12 | De en het — articles deep dive | Grammar pillars | §3.4 de/het · §2.11 dit/dat/deze/die |
| 13 | Meervoud — plurals | Grammar pillars | §3.5 plurals (-en, -s, -'s, irregulars) |
| 14 | Familie | People + body | §2.5 family vocab |
| 15 | Het lichaam — body parts | People + body | §2.6 body parts |
| 16 | Hoe voel je je? — feelings | People + body | §2.6 feelings · §3.6 niet/geen intro |
| 17 | Tijd & datum — dagen, maanden, seizoenen | Daily life | §2.4 days/months/seasons · ordinals (recognition) |
| 18 | Hoe laat is het? — telling time | Daily life | §2.4 clock (uur, half) |
| 19 | Mijn huis — kamers | Daily life | §2.7 rooms |
| 20 | **REVIEW 2** — Les 11–19 | Review | hebben/articles/plurals/people/time/home |
| 21 | Voorwerpen — objects + spatial prepositions | Daily life | §2.7 objects · §2.12 in/op/onder/naast |
| 22 | Eten & drinken — drinks + basics | Food + colors + verbs | §2.8 drinks + brood/kaas/etc. · §4 order at café |
| 23 | Boodschappen — meals + shopping | Food + colors + verbs | §2.8 meals · §4 grocery shopping |
| 24 | Kleuren | Food + colors + verbs | §2.9 colors · article+adj integration |
| 25 | Bijvoeglijke naamwoorden — adjectives | Food + colors + verbs | §2.9 size/quality/temperature adjectives |
| 26 | Top 25 werkwoorden — lexical pass | Food + colors + verbs | §2.10 high-frequency verbs (recognition + ik-form) |
| 27 | Voorzetsels — full prepositional set | Food + colors + verbs | §2.12 all 15 prepositions |
| 28 | Vraagwoorden — full deep dive | Mastery | §2.13 all question words · §3.7 question formation |
| 29 | Niet vs geen — negation mastery | Mastery | §3.6 niet vs geen |
| 30 | **EINDREVIEW A0** — mock + can-do checklist | Review | §4 full A0 can-do; A0→A1 bridge |

Total: **30 lessons** (27 content + 3 review).

---

## Phase 1 — Foundation (Les 1–5)

Pronunciation + zero-prior survival. By end of Phase 1 the learner can greet, spell their name, and say "Ik ben …".

### Les 01 — Welkom — hallo, dag, tot ziens

**Coverage:** §2.1 greetings · §3.1 pronouns ik/je/u (intro) · §4 greet appropriately
**Level:** A0
**New words:** hallo, hoi, dag, doei, goedemorgen, goedemiddag, goedenavond, tot ziens, tot morgen, meneer, mevrouw (11)
**Estimated:** ~12 min · 4 sections
**Prereq:** —

**Sections:**
1. **uitleg** — formal vs informal greetings; the rule of thumb (stranger / older / professional = formal); 5-second cultural framing
2. **woorden** — 11 greetings with audio; formality tag (informal / formaal); listening repetition
3. **mini-dialoog** — two short scenes: meeting a peer (*Hoi! Hoe heet je?*) vs. meeting a clerk (*Goedemorgen mevrouw*)
4. **spreken** — practice both register pairs aloud; record + compare to model

**Verder kijken:** Dutch Greetings — Kim (les 1) — https://www.youtube.com/watch?v=jzTUo7efsow

### Les 02 — Klanken 1 — alfabet & spell-your-name

**Coverage:** §1.1 alphabet · §1.2 hard g/ch/sch · §4 spell name aloud
**Level:** A0
**New words:** alphabet (recognition); "spelt u dat?" / "spel je dat?" (formal/informal); "kun je dat herhalen?"
**Estimated:** ~13 min · 4 sections
**Prereq:** Les 01

**Sections:**
1. **klanken** — the 26 letter names; emphasis on Dutch-distinct sounds (g, ch, sch, ij, y)
2. **drill** — hear-the-letter → tap-the-letter (10 items, randomized)
3. **spreken** — spell your own name aloud; record and compare
4. **mini-dialoog** — "Hoe schrijf je dat?" — peer; "Spelt u dat alstublieft?" — clerk

**Verder kijken:** NT2 A1 les 11 — uitspraak alfabet, naam spellen — juf M — https://www.youtube.com/watch?v=Vzmff7dGad0 · Dutch Sounds & The Alphabet — Kim (les 4) — https://www.youtube.com/watch?v=_AjSb2CSoT8

### Les 03 — Klanken 2 — kort vs lang vowels

**Coverage:** §1.3 short vs long vowels (a/aa, e/ee, i/ie, o/oo, u/uu)
**Level:** A0
**New words:** sample contrast pairs as listening anchors — *man/maan, bed/been, kind/kies, pot/poot, bus/muur*
**Estimated:** ~12 min · 3 sections
**Prereq:** Les 02

**Sections:**
1. **klanken** — five vowel pairs; explanation of "doubled vowel = long" + "consonant doubling protects shortness"
2. **drill** — minimal-pair discrimination: hear *man* vs *maan* and tap the right spelling (10 items)
3. **spreken** — read the 5 contrast pairs aloud; record

**Verder kijken:** NT2 A1 les 9 — kort/lang U UU E EE O OO A AA — juf M — https://www.youtube.com/watch?v=HtIYa6oY9SA

### Les 04 — Klanken 3 — tweeklanken (digraphs)

**Coverage:** §1.4 digraphs ij/ei, ui, eu, oe, ou/au
**Level:** A0
**New words:** anchor words — *ijs, klein, huis, leuk, boek, koud* (6 anchors; not for SRS)
**Estimated:** ~14 min · 4 sections
**Prereq:** Les 03

**Sections:**
1. **klanken** — five digraph sounds with 1–2 anchor words each; the spelling-overlaps note (ij = ei, ou = au)
2. **drill** — hear-the-digraph → tap which spelling it is (ij/ei boundary deliberately tested)
3. **spreken** — read the anchors aloud; record
4. **luisteren** — short audio clip with multiple digraphs; identify them in sequence

**Verder kijken:** NT2 A1 les 12 — IE OE EI IJ tweetekenklanken — juf M — https://www.youtube.com/watch?v=z0gbbX9ZQK0 · NT2 12.04 — ui / eu — juf M — https://www.youtube.com/watch?v=IJBU8MxW5MA

### Les 05 — Ik ben — first identity sentence

**Coverage:** §3.2 zijn full conjugation · §2.2 naam, ik ben, ik heet, ik kom uit · §4 introduce yourself
**Level:** A0
**New words:** ben, bent, is, zijn, naam (de), heten, ik kom uit, Nederland, België (9 + heten conjugation)
**Estimated:** ~15 min · 5 sections
**Prereq:** Les 04

**Sections:**
1. **uitleg** — zijn is the most important verb in Dutch; full table
2. **conjugatie** — drill all 7 forms of zijn (ik ben, jij/je bent, u bent, hij/zij/het is, wij zijn, jullie zijn, zij zijn)
3. **woorden** — ik heet …, mijn naam is …, ik kom uit … (3 templates)
4. **zinsbouw** — build sentences combining "Ik ben + adj" and "Ik heet + naam"
5. **spreken** — record yourself doing a full self-intro: *"Hallo, ik ben [naam]. Ik kom uit [land]."*

**Verder kijken:** Introducing Yourself in Dutch — Kim (les 2) — https://www.youtube.com/watch?v=ISzH9QI0Bn8

---

## Phase 2 — Personalia (Les 6–9)

Identity, numbers, places. By end of Phase 2 the learner can answer the basic "who are you / where are you from / how old are you / what's your phone number" exchange.

### Les 06 — Wie ben je? — questions about identity

**Coverage:** §2.13 wie/wat/hoe (intro) · §3.7 question word inversion · §4 ask name/age/origin in both registers
**Level:** A0
**New words:** wie, wat, hoe, jij/je, jouw/je, u, uw (function words, 7) + "hoe heet je?", "hoe heet u?", "waar kom je vandaan?" templates
**Estimated:** ~13 min · 4 sections
**Prereq:** Les 05

**Sections:**
1. **uitleg** — Dutch question word order: *wat + verb + subject* (Wat is dat? Hoe heet je?)
2. **drill** — match question to answer (multiple-choice, 8 items)
3. **mini-dialoog** — full intro exchange: *Hoe heet je? Ik heet … En jij? / En u?*
4. **spreken** — record yourself asking + answering the 3 core questions

**Verder kijken:** Dutch Question Words (Vraagwoorden) — Kim (les 5) — https://www.youtube.com/watch?v=BBe9vCH0T7o

### Les 07 — Cijfers 0–20

**Coverage:** §2.3 numbers 0–20 · §3.7 yes/no inversion ("Is het zes?")
**Level:** A0
**New words:** nul, een, twee, drie, vier, vijf, zes, zeven, acht, negen, tien, elf, twaalf, dertien, veertien, vijftien, zestien, zeventien, achttien, negentien, twintig (21)
**Estimated:** ~14 min · 4 sections
**Prereq:** Les 06

**Sections:**
1. **woorden** — 0–10 with audio (the irregulars to memorize)
2. **woorden** — 11–20; the *-tien* family; note *dertien* (no -ie-) and *veertien*
3. **drill** — audio dictation: hear the number, type the digit (10 items)
4. **spreken** — count 0–20 aloud; record

**Verder kijken:** Numbers in Dutch — Kim (les 6) — https://www.youtube.com/watch?v=rXXHBhkhoqA

### Les 08 — Cijfers 20–100, telefoonnummer, leeftijd

**Coverage:** §2.3 numbers 20–100 + reversed composition · §2.2 oud, jaar, telefoonnummer · §4 give phone number / age
**Level:** A0
**New words:** twintig (review), dertig, veertig, vijftig, zestig, zeventig, tachtig, negentig, honderd, oud, jaar (het), telefoonnummer (het) (12)
**Estimated:** ~15 min · 4 sections
**Prereq:** Les 07

**Sections:**
1. **uitleg** — reversed composition rule: *eenentwintig* = 1 + 20; demo with audio
2. **drill** — hear *vierenveertig* → type 44 (10 items, harder)
3. **spreken** — say your telefoonnummer aloud, digit by digit
4. **mini-dialoog** — clerk asks "Wat is uw telefoonnummer?" and "Hoe oud bent u?" — both *u* register

**Verder kijken:** Lesson 07 — How to count in Dutch — Bart — https://www.learndutch.org/lessons/how-to-count-in-dutch/

### Les 09 — Waar woon je? — places and origins

**Coverage:** §2.2 wonen, komen, stad, straat, adres, Nederland, België · §2.12 prepositions in/uit · §4 say where you live and where you're from
**Level:** A0
**New words:** wonen, komen, woon, woont, kom, komt, stad (de), straat (de), adres (het), in, uit (11)
**Estimated:** ~13 min · 4 sections
**Prereq:** Les 08

**Sections:**
1. **woorden** — wonen + komen as the two location verbs; introduce *in* and *uit* alongside
2. **zinsbouw** — build "Ik woon in [stad]" / "Ik kom uit [land]" — drag the prepositions to the right slot
3. **mini-dialoog** — peer asks, you answer; then a clerk version with *u*
4. **schrijven** — type 3 sentences about yourself: name, residence, origin

**Verder kijken:** Where are you from & Where do you live? — Kim (les 3) — https://www.youtube.com/watch?v=omqnwN7k_OM

---

## Phase 3 — First grammar pillars (Les 10–13)

The two foundational grammar lessons (hebben, articles) plus plurals. By end of Phase 3 the learner has both copulas + can handle countable nouns correctly.

### Les 10 — **REVIEW 1**

**Coverage:** recap of §1 pronunciation, §2.1–§2.3 vocab, §3.1–§3.2 pronouns + zijn, §4 can-do "intro yourself fully"
**Level:** A0
**New words:** — (review only)
**Estimated:** ~15 min · 4 sections
**Prereq:** Les 09

**Sections:**
1. **drill** — mixed quick-fire from Les 1–9 (20 items: greetings, numbers, zijn forms, location prepositions)
2. **luisteren** — short audio: someone introducing themselves; answer 3 comprehension Qs
3. **spreken** — full self-intro: greeting + name + origin + residence + age + phone number, in 30 seconds
4. **schrijven** — write a 5-line intro paragraph; check against model

**Verder kijken:** Dutch STORY for BEGINNERS — Wie ben ik? — Kim — https://www.youtube.com/watch?v=wZrA_nkLGqE

### Les 11 — Ik heb — hebben + states

**Coverage:** §3.3 hebben full conjugation · §2.6 honger/dorst/pijn hebben, het koud/warm hebben
**Level:** A0
**New words:** heb, hebt, heeft, hebben (conjug.) · honger (de), dorst (de), pijn (de), tijd (de), koud, warm (10)
**Estimated:** ~14 min · 4 sections
**Prereq:** Les 10

**Sections:**
1. **uitleg** — hebben as the second-most-important verb; full table
2. **conjugatie** — drill all forms of hebben (parallel to Les 5's zijn drill)
3. **woorden** — the "states with hebben" idioms: *Ik heb honger / dorst / pijn / het koud*
4. **spreken** — say each state aloud about yourself; then a mini-dialoog where someone offers help (*Heb je dorst? Ja, ik heb dorst.*)

**Verder kijken:** HEBBEN & ZIJN in Dutch — Kim (les 8) — https://www.youtube.com/watch?v=35qyPfFZh70

### Les 12 — De en het — articles deep dive

**Coverage:** §3.4 de/het with tendencies · §2.11 dit/dat/deze/die
**Level:** A0
**New words:** dit, dat, deze, die (4 demonstratives); plus a *de* set and a *het* set drawn from prior lessons (no new content words beyond demonstratives — this is a grammar-anchoring lesson)
**Estimated:** ~14 min · 4 sections
**Prereq:** Les 11

**Sections:**
1. **uitleg** — the "always learn nouns with their article" rule (callout from §3.4); the 4 useful tendencies; the unreliable-but-useful bias
2. **de-het** — drill: see a noun → tap *de* or *het* (15 items, drawn from §2.2, §2.5, §2.7 nouns we've already learned)
3. **woorden** — dit/dat/deze/die: *dit boek* (singular het), *deze tafel* (singular de), *dat huis* (distal het), *die stoel* (distal de)
4. **schrijven** — write 5 sentences using a demonstrative + noun + adj or verb

**Verder kijken:** The articles DE, HET and EEN — Kim — https://www.youtube.com/watch?v=2Za8N7Klz1U

### Les 13 — Meervoud — plurals

**Coverage:** §3.5 plurals (-en, -s, -'s, irregulars)
**Level:** A0
**New words:** plural forms of prior nouns; new lexicon: koeien (cows), eieren (eggs), steden (cities), foto's (photos) as pattern anchors
**Estimated:** ~13 min · 4 sections
**Prereq:** Les 12

**Sections:**
1. **uitleg** — 4 plural patterns: -en (most), -s (after -el/-en/-er/-em + loanwords), -'s (after some vowels), irregulars (ei → eieren, kind → kinderen, stad → steden)
2. **drill** — see singular → type plural (12 items, includes the irregular set)
3. **luisteren** — short audio with multiple plurals; identify how many of each noun
4. **schrijven** — write 4 sentences with plural objects (*Ik heb twee boeken*, etc.)

**Verder kijken:** Plurals in Dutch (Meervoud) — Kim (les 15) — https://www.youtube.com/watch?v=cf750IOi75o

---

## Phase 4 — People + body (Les 14–16)

Family, body, feelings. Introduces niet/geen lightly via feelings.

### Les 14 — Familie

**Coverage:** §2.5 family vocab · article-practice on family nouns
**Level:** A0
**New words:** familie (de), vader (de), moeder (de), zoon (de), dochter (de), broer (de), zus (de), kind (het) / kinderen, baby (de), opa (de), oma (de), oom (de), tante (de), vriend (de), vriendin (de), man (de), vrouw (de) (17)
**Estimated:** ~14 min · 4 sections
**Prereq:** Les 13

**Sections:**
1. **woorden** — family vocab with articles; note *het kind* but *de kinderen* (article switches to *de* in plural)
2. **de-het** — quick article-recall drill on the new family nouns (10 items)
3. **spreken** — describe your own family: *"Mijn vader heet … Mijn moeder is …"* (uses possessive *mijn*)
4. **schrijven** — write 5 sentences about one family member

**Verder kijken:** Dutch Personal Pronouns + family (les 7) — Kim — https://www.youtube.com/watch?v=hR9qHBek8y8

### Les 15 — Het lichaam — body parts

**Coverage:** §2.6 body parts · article practice
**Level:** A0
**New words:** hoofd (het), haar (het), oog (het) / ogen, oor (het) / oren, neus (de), mond (de), tand (de) / tanden, hand (de), arm (de), been (het), voet (de), buik (de), rug (de), hart (het) (14)
**Estimated:** ~13 min · 4 sections
**Prereq:** Les 14

**Sections:**
1. **woorden** — body parts with audio + articles; pair singular/plural where relevant (oog/ogen, oor/oren)
2. **de-het** — article-recall on body parts (10 items)
3. **luisteren** — short audio: "Ik heb pijn aan mijn …" — identify which body part
4. **spreken** — describe a person: *"Hij heeft groene ogen en bruin haar"* (introduces colors lightly — preview for Les 24)

**Verder kijken:** Lesson 16 — Body parts in Dutch — Bart — https://www.learndutch.org/lessons/body-parts-in-dutch/

### Les 16 — Hoe voel je je? — feelings

**Coverage:** §2.6 feelings · §3.6 niet/geen intro (light)
**Level:** A0
**New words:** moe, ziek, blij, verdrietig, boos, bang, goed, slecht (8 adjectives) · niet (function word, formal intro) · "Ik voel me …"
**Estimated:** ~13 min · 4 sections
**Prereq:** Les 15

**Sections:**
1. **woorden** — 8 feeling adjectives with audio; pair opposites where useful (blij ↔ verdrietig, goed ↔ slecht)
2. **uitleg** — *niet* for negating verbs/adjectives; brief intro (full treatment in Les 29). Example: *Ik ben moe* / *Ik ben niet moe*
3. **mini-dialoog** — peer asks "Hoe gaat het?" — you answer with a feeling + reason; clerk version with *u*
4. **schrijven** — write 3 sentences: 1 positive, 1 negative (using *niet*), 1 about another person

**Verder kijken:** Hoe gaat het? — Kim (les 12) — https://www.youtube.com/watch?v=ZCZEg4PHtHs

---

## Phase 5 — Daily life (Les 17–21)

Time, dates, home. Mid-track review at Les 20.

### Les 17 — Tijd & datum — dagen, maanden, seizoenen

**Coverage:** §2.4 days/months/seasons · ordinals (recognition only) · §4 say today's day/date
**Level:** A0
**New words:** 7 days, 12 months, 4 seasons (lente, zomer, herfst, winter); recognition-only ordinals eerste–twaalfde (23 active + 12 recognition)
**Estimated:** ~14 min · 4 sections
**Prereq:** Les 16

**Sections:**
1. **woorden** — days of the week (audio); months (audio); seasons
2. **drill** — hear → tap correct day/month/season (mixed, 10 items)
3. **uitleg** — ordinals for dates: *3 maart* read as *de derde maart*; recognition only — production is A1
4. **spreken** — "Vandaag is [maandag, de tiende januari]" — say today's date aloud

**Verder kijken:** Weekdays + months + seasons — Bart (lesson 10) — https://www.learndutch.org/lessons/weekdays-months-seasons-in-dutch/

### Les 18 — Hoe laat is het? — telling time

**Coverage:** §2.4 clock — hele uren + half + (recognition only: kwart over/voor)
**Level:** A0
**New words:** uur (het), half, kwart (recognition); templates "Het is X uur", "Het is half X" (with the famous "half twee = 1:30" gotcha)
**Estimated:** ~13 min · 4 sections
**Prereq:** Les 17

**Sections:**
1. **uitleg** — the "half X = X−1:30" rule; visual + auditory examples
2. **drill** — see a clock → tap the right time-phrase (10 items)
3. **luisteren** — audio: someone says a time; you tap which clock matches
4. **mini-dialoog** — "Hoe laat is het?" / "Het is half drie"

**Verder kijken:** Telling time in Dutch — Kim (les 17) — https://www.youtube.com/watch?v=I1eUmisbLOQ

### Les 19 — Mijn huis — kamers

**Coverage:** §2.7 rooms
**Level:** A0
**New words:** huis (het), kamer (de), woonkamer (de), slaapkamer (de), keuken (de), badkamer (de), wc (de), tuin (de) (8)
**Estimated:** ~12 min · 3 sections
**Prereq:** Les 18

**Sections:**
1. **woorden** — 8 room names with audio + articles
2. **luisteren** — audio: "Mijn huis heeft drie slaapkamers en een grote tuin" — answer 2 comprehension Qs
3. **spreken** — describe your own home: *"Mijn huis heeft …"*

**Verder kijken:** NT2 les 27 — het huis, de woonkamer, de muur, de zolder — juf M — https://www.youtube.com/watch?v=FalKIG8dGbQ

### Les 20 — **REVIEW 2**

**Coverage:** recap of Les 11–19: hebben, articles, plurals, family, body, feelings, time, home
**Level:** A0
**New words:** — (review only)
**Estimated:** ~15 min · 4 sections
**Prereq:** Les 19

**Sections:**
1. **drill** — 20-item mixed: conjugate hebben, choose de/het, pluralize, identify body part from audio
2. **luisteren** — audio: someone describing a family member + their house; 4 comprehension Qs
3. **spreken** — describe yourself in 6 sentences: name + family + home + feelings today
4. **schrijven** — write a paragraph (~5 sentences) about your morning routine using vocabulary so far

**Verder kijken:** — (review consolidation)

### Les 21 — Voorwerpen — objects + spatial prepositions

**Coverage:** §2.7 objects · §2.12 in/op/onder/naast (spatial)
**Level:** A0
**New words:** deur (de), raam (het), tafel (de), stoel (de), bed (het), bank (de), kast (de), lamp (de), boek (het), pen (de), tas (de), telefoon (de), sleutel (de) (13) · op, onder, naast (3 prepositions)
**Estimated:** ~14 min · 4 sections
**Prereq:** Les 20

**Sections:**
1. **woorden** — 13 objects with audio + articles
2. **de-het** — quick article drill on the new objects (10 items)
3. **woorden** — spatial prepositions with concrete examples: *Het boek ligt op de tafel*, *De kat zit onder de stoel*
4. **zinsbouw** — build sentences placing objects in rooms with prepositions

**Verder kijken:** Prepositions in Dutch (Voorzetsels) — Kim (les 13) — https://www.youtube.com/watch?v=llsJtRu5stI · NT2 les 33 — woonkamer detail — juf M — https://www.youtube.com/watch?v=4sPPcLzGIII

---

## Phase 6 — Food, colors, verbs (Les 22–27)

Survival vocabulary: ordering, shopping, describing the world, acting in it.

### Les 22 — Eten & drinken — drinks + basics

**Coverage:** §2.8 drinks + basic foods · §4 order at café
**Level:** A0
**New words:** water (het), koffie (de), thee (de), melk (de), sap (het), bier (het), wijn (de), brood (het), kaas (de), boter (de), ham (de), ei (het) / eieren (12) · drinken, eten (verbs, intro)
**Estimated:** ~14 min · 4 sections
**Prereq:** Les 21

**Sections:**
1. **woorden** — drinks + basic breakfast/lunch items with audio + articles
2. **de-het** — article drill on the new items (10 items)
3. **mini-dialoog** — at the café: *"Een koffie graag" / "Voor mij een thee, alstublieft"*; clerk responds with *u*
4. **spreken** — practice the dialog yourself; record

**Verder kijken:** Order in a Cafe or Restaurant — Kim (les 23) — https://www.youtube.com/watch?v=FoIRbGXTeCM

### Les 23 — Boodschappen — meals + shopping

**Coverage:** §2.8 meals + shopping vocab · §4 grocery shopping
**Level:** A0
**New words:** groente (de), fruit (het), appel (de), banaan (de), aardappel (de), rijst (de), pasta (de), vlees (het), vis (de), soep (de) (10) · koken (verb); "eet smakelijk", "lekker", "proost" (3 phrases)
**Estimated:** ~13 min · 4 sections
**Prereq:** Les 22

**Sections:**
1. **woorden** — 10 food items + phrases with audio
2. **luisteren** — audio: someone reading a small grocery list; you note what they need
3. **mini-dialoog** — at the supermarkt: *"Heeft u appels?" / "Wat kost een kilo aardappelen?"* (formal register)
4. **schrijven** — write a 5-item grocery list in Dutch with articles

**Verder kijken:** Grocery shopping (Boodschappen doen) — Kim (les 21) — https://www.youtube.com/watch?v=ZBHyyYUmj14

### Les 24 — Kleuren

**Coverage:** §2.9 colors · light integration with adjective + noun placement
**Level:** A0
**New words:** rood, blauw, geel, groen, wit, zwart, bruin, grijs, oranje, paars, roze (11)
**Estimated:** ~12 min · 3 sections
**Prereq:** Les 23

**Sections:**
1. **woorden** — 11 colors with audio
2. **drill** — see a colored shape → tap the color name (10 items)
3. **spreken** — describe items in your room by color: *"De stoel is wit, de lamp is geel"* — note no adjective inflection at A0 (predicative only — *de stoel is wit*, not *de witte stoel*; inflection is A1)

**Verder kijken:** Lesson 35 — Colours in Dutch — Bart — https://www.learndutch.org/lessons/colours-in-dutch/

### Les 25 — Bijvoeglijke naamwoorden — basic adjectives

**Coverage:** §2.9 size/quality/temperature adjectives — predicative only at A0
**Level:** A0
**New words:** groot, klein, oud, jong, nieuw, lang, kort, hoog, laag, mooi, lelijk, goed, slecht, leuk, makkelijk, moeilijk, snel, langzaam, warm, koud, heet, koel (22)
**Estimated:** ~14 min · 4 sections
**Prereq:** Les 24

**Sections:**
1. **woorden** — 22 adjectives grouped in opposite pairs (groot/klein, etc.)
2. **uitleg** — predicative position only at A0: *De man is groot* ✓ — attributive *de grote man* is A1
3. **drill** — match adjective to its opposite (12 items)
4. **schrijven** — write 4 sentences using adjective + noun + zijn ("Het huis is groot")

**Verder kijken:** Dutch Adjectives You Should Know — Kim (les 16) — https://www.youtube.com/watch?v=2DjBQayso08

### Les 26 — Top 25 werkwoorden — lexical pass

**Coverage:** §2.10 high-frequency verbs (recognition + ik-form only; full conjugation is A1)
**Level:** A0
**New words:** doen, gaan, komen (review), zien, willen, kunnen, moeten, mogen, weten, zeggen, maken, geven, nemen, spreken, praten, luisteren, kijken, lezen, schrijven, leren, werken (21 + the 4 already known from prior lessons = 25)
**Estimated:** ~15 min · 4 sections
**Prereq:** Les 25

**Sections:**
1. **woorden** — 25 verbs with infinitive + ik-form; audio for both
2. **drill** — hear ik-form (e.g. *"ik ga"*) → tap infinitive (10 items)
3. **zinsbouw** — combine ik-form + object from prior vocab: *"Ik lees een boek", "Ik drink koffie"* — 6 sentences to build
4. **schrijven** — write 5 sentences about what you do today

**Verder kijken:** Conjugating Dutch Verbs & Spelling — Kim (les 9) — https://www.youtube.com/watch?v=UFLrX3cyioc (note: les 9 covers full conjugation which is A1 — watch for recognition only)

### Les 27 — Voorzetsels — full prepositional set

**Coverage:** §2.12 all 15 prepositions
**Level:** A0
**New words:** in, op, aan, naar, van, bij, met, voor, na, tot, om, onder, boven, naast, tussen (15 — partial review, full deep dive)
**Estimated:** ~14 min · 4 sections
**Prereq:** Les 26

**Sections:**
1. **uitleg** — three groupings: spatial (in/op/onder/naast/tussen/boven), directional (naar/van/uit/tot), with-verb (met/bij/voor/na/om/aan)
2. **drill** — choose the right preposition for the context (12 items)
3. **zinsbouw** — build sentences with prepositional phrases (8 items: *"Ik ga naar de winkel", "Het boek ligt op de tafel"*)
4. **luisteren** — audio with prepositional phrases; identify which preposition was used

**Verder kijken:** Lesson 11 — Prepositions — Bart — https://www.learndutch.org/lessons/prepositions-in-dutch/

---

## Phase 7 — Question and negation mastery (Les 28–30)

Final two grammar masteries + A0 capstone.

### Les 28 — Vraagwoorden — full deep dive

**Coverage:** §2.13 all question words · §3.7 question formation patterns
**Level:** A0
**New words:** wanneer, waarom, hoeveel, welk/welke (4 new; rest are review)
**Estimated:** ~13 min · 4 sections
**Prereq:** Les 27

**Sections:**
1. **woorden** — 8 question words; *welk* (het-nouns) vs *welke* (de-nouns + plural)
2. **drill** — match question word to answer type (10 items: *wanneer → time*, *waar → place*, etc.)
3. **zinsbouw** — build full questions using each question word + verb + subject pattern
4. **mini-dialoog** — peer + clerk versions of "20 questions" — ask & answer with each question word once

**Verder kijken:** Dutch Question Words (Vraagwoorden) — Kim (les 5) — https://www.youtube.com/watch?v=BBe9vCH0T7o

### Les 29 — Niet vs geen — negation mastery

**Coverage:** §3.6 niet vs geen full rules
**Level:** A0
**New words:** niet (review), geen, wel; the production rules
**Estimated:** ~13 min · 4 sections
**Prereq:** Les 28

**Sections:**
1. **uitleg** — the rule: *geen* replaces *een* / negates indefinite or zero-article nouns; *niet* covers everything else
2. **drill** — pick *niet* or *geen* for a sentence (15 items — covers all the boundary cases)
3. **zinsbouw** — convert positive sentences to negative (8 items)
4. **schrijven** — write 4 sentence pairs (positive → negative) using vocab from prior lessons

**Verder kijken:** NIET en GEEN — Kim — https://www.youtube.com/watch?v=GvSlC_ZhPxs

### Les 30 — **EINDREVIEW A0** — mock + can-do checklist

**Coverage:** §4 full A0 can-do checklist · all §2 themes · A0→A1 bridge framing
**Level:** A0
**New words:** — (review only)
**Estimated:** ~18 min · 5 sections
**Prereq:** Les 29

**Sections:**
1. **drill** — 30-item mixed mock: vocabulary, articles, plurals, conjugations, question words, negation
2. **luisteren** — 3 short audio clips with comprehension Qs; tests the §1 pronunciation + §2 vocab range
3. **spreken** — full self-presentation in 60 seconds: greeting + intro + family + home + what you do today + a request
4. **schrijven** — write a 10-line personal profile (name, origin, residence, age, phone, family, home, feelings, daily activity, a goal)
5. **uitleg** — what's next: A1 introduces regular verb conjugation patterns, full V2 inversion, adjective inflection, basic past tense, modal verbs as main verbs. See `SYLLABUS_A1.md` (forthcoming).

**Verder kijken:** Learn DUTCH in 60 minutes (NT2 A1 crash review) — Kim — https://www.youtube.com/watch?v=g8Q1tpX1asc — *A1 stretch; use only as a preview*

---

## Coverage check

Verifies every syllabus item gets at least one lesson home. If something is missing, add a lesson or extend an existing one.

### §1 Pronunciation

| Syllabus item | Lesson(s) |
|---|---|
| §1.1 Alphabet | Les 02 |
| §1.2 Hard consonants (g/ch/sch/r/w/v/f) | Les 02 (g/ch/sch); r threaded across all lessons via audio; w/v/f acquired by exposure |
| §1.3 Vowels short vs long | Les 03 |
| §1.4 Digraphs ij/ei, ui, eu, oe, ou/au | Les 04 |
| §1.5 Stress + schwa + final-n | Threaded via audio in every lesson; explicit callout in Les 02 |
| §1.6 Pronunciation milestones | Les 04 (assessed informally) + Les 10 review |

### §2 Vocabulary

| Theme | Lesson(s) |
|---|---|
| §2.1 Greetings & politeness | Les 01 |
| §2.2 Personalia | Les 05, 06, 08, 09 |
| §2.3 Numbers | Les 07, 08; ordinals (recognition) in Les 17 |
| §2.4 Time/date | Les 17, 18 |
| §2.5 Family | Les 14 |
| §2.6 Body & feelings | Les 11 (states), 15 (body), 16 (feelings) |
| §2.7 Huis | Les 19 (rooms), 21 (objects) |
| §2.8 Food & drink | Les 22, 23 |
| §2.9 Colors & adjectives | Les 24 (colors), 25 (adjectives) |
| §2.10 High-frequency verbs | Les 05 (zijn), 11 (hebben), 26 (top 25) |
| §2.11 Function words | Threaded throughout (pronouns Les 01/05/06, demonstratives Les 12, conjunctions/quantifiers via exposure) |
| §2.12 Prepositions | Les 09 (in/uit), 21 (spatial), 27 (full set) |
| §2.13 Question words | Les 06 (wie/wat/hoe), 28 (full set) |

### §3 Grammar

| Item | Lesson(s) |
|---|---|
| §3.1 Pronouns | Les 01, 05, 06 (introduced); threaded |
| §3.2 zijn | Les 05 |
| §3.3 hebben | Les 11 |
| §3.4 de/het | Les 12 deep dive; article-first policy threaded everywhere |
| §3.5 Plurals | Les 13 |
| §3.6 niet/geen | Les 16 intro, Les 29 mastery |
| §3.7 Word order (SVO + question inversion) | Les 06 (inversion), 07 (yes/no), threaded |

### §4 Communicative functions

Every can-do in §4 maps to at least one `spreken` or `mini-dialoog` section above. Validation belongs in Les 30 (eindreview).

### §5 Scenarios

| Scenario | Lesson(s) |
|---|---|
| First meeting | Les 01, 06 |
| Spelling your name | Les 02 |
| Counting at the market | Les 07, 23 |
| Phone call introduction | Les 08 |
| Family introductions | Les 14 |
| Reading a clock | Les 18 |
| Saying you don't understand | Les 02 (in spreken), reinforced later |
| Basic restaurant | Les 22 |
| Saying you're not feeling well | Les 11 (states), Les 16 (feelings) |
| At the door (formal vs informal) | Les 01 |

---

## Implementation notes

When the time comes to author the TS files:

1. **Add `coverage: string[]` to the `Lesson` interface** in `src/lib/types.ts` — e.g. `coverage: ['§2.3', '§3.7']`. Required field; allows programmatic coverage validation.
2. **Move existing 7 lessons** (`a1-les-01.ts` … `a1-les-07.ts`) into `src/lib/content/lessons/a0/` and rename to `a0-les-NN.ts`. Their numbering changes (current 1–7 don't match the new sequence — see "Existing lesson mapping" below).
3. **One TS file per lesson.** 30 files total. Aggregate in `src/lib/content/lessons/a0/index.ts`.
4. **Lesson order is the authoritative sequence.** Prereqs in each TS file point to the previous lesson by id.

### Image thumbnails on `woorden` (Tier 1 visual)

Each `Woord` carries an optional `imageUrl?: string` field. When present, `WoordenSection` renders a 48×48 thumbnail to the left of the word — image first, text right, audio button far right. When absent, the card renders without an image and the layout collapses cleanly.

**Convention:**
- **Path:** `public/images/woorden/{slug}.{ext}` referenced as `/images/woorden/{slug}.{ext}`. Slug matches `audioId` when present (e.g. `audioId: 'hallo'` → `/images/woorden/hallo.png`).
- **Source size:** ≥256×256 square; rendered at 48×48. PNG/WebP for illustrations, JPG for photos.
- **Scope:** ~120–150 images covering concrete nouns in §2.5 family, §2.6 body parts, §2.7 home (rooms + objects), §2.8 food & drink, §2.9 colors. Abstract themes (greetings, function words, pronouns, time, feelings, verbs) skip thumbnails — images add no value there.
- **Sourcing:** one-time batch via AI image generation (DALL-E / Flux ~$0.04/image, ~$5–6 total) or curated stock photos (Unsplash/Pexels). AI gives style consistency; stock gives cultural authenticity. Pick one and stay with it.
- **Fallback:** missing `imageUrl` → no image rendered. No broken-image placeholders.

**Rationale:** Paivio's dual-coding theory — pairing a word with a matching image creates two memory traces (linguistic + visual) instead of one, boosting recall. Strongest effect on concrete nouns; meta-analysis effect sizes around d = 0.5–0.7. Replaces the L1 translation crutch ("appel = apple") with direct concept association ("appel = [the fruit]"). See pedagogy discussion in session log (2026-05-19).

### Existing lesson mapping (Les 1–7 → new sequence)

The existing lessons need re-numbering and re-purposing. Recommended mapping:

| Existing file | Current content | Map to (new) | Action |
|---|---|---|---|
| a1-les-01 (Welkom) | greetings | **Les 01** | minor refresh to align with new template; add formal *u* parallel |
| a1-les-02 (Ik ben) | feelings | **Les 16** (Hoe voel je je?) | broaden scope; add niet intro |
| a1-les-03 (Vragen) | question words | **Les 06** (partial) + **Les 28** (full) | split |
| a1-les-04 (Wonen) | where you live | **Les 09** | extend with §2.2 vocab + *je*/*u* parallel |
| a1-les-05 (Cijfers 0–10) | numbers | **Les 07** | extend to 0–20 (add elf-twintig) |
| a1-les-06 (Voorwerpen de/het) | objects + de/het | split into **Les 12** (articles) + **Les 21** (objects) |
| a1-les-07 (Familie) | family | **Les 14** | minor refresh |

---

## Open questions / future decisions

- [ ] **Speed of authoring.** The plan tip ("author each lesson the day before you study it") works for ongoing content but not for the initial rewrite of the existing 7 lessons. Decide: ship the full Les 1–7 rebuild as one batch, or do them one-by-one?
- [ ] **A1 sequencing.** When SYLLABUS_A1.md exists, this same doc gets a `LESSONS_A1.md` sibling for Les 31–~55 (rough estimate).
- [ ] **SRS hookup timing.** Words enter the SRS pool when their lesson is completed (per `RESOURCES_A0.md` discussion). Need to confirm this works for review lessons (do they add new SRS items, or just consolidate existing ones?). My assumption: review lessons add nothing new to SRS.
- [ ] **Verder kijken vs in-app audio.** Some lessons reference external YouTube videos as "verder kijken." App audio (TTS-generated) handles the in-lesson audio. Decide whether the verder kijken link is shown after each lesson, after each section, or only on demand.
- [ ] **The 25-verbs lesson (Les 26) is dense.** May need to split into two if the dwell time exceeds budget when authored. Watch for this when implementing.
