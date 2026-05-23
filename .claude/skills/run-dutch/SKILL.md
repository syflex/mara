---
name: run-dutch
description: Build, run, and screenshot the Dutch learning app (Next.js 16, A0 Inburgering-prep). Use when asked to start the dev server, take a screenshot of a lesson page, typecheck, lint, regenerate audio, or smoke-test a content change. Authored on macOS using headless Google Chrome — Linux agents need the swap noted under Prerequisites.
---

A Next.js 16 (App Router, Turbopack) PWA with Dexie/IndexedDB and ts-fsrs. Content lives in TS files under [src/lib/content/lessons/](../../../src/lib/content/lessons/) and is the most-edited surface; UI rendering is verified by hitting routes through [drive.sh](drive.sh), which ensures `npm run dev` is up and captures PNGs of key routes via headless Chrome.

All paths below are relative to the repo root (`/Users/mac/Documents/dutch/`).

## Prerequisites

macOS with Node ≥ 18 and Google Chrome installed at the default path.

```bash
node --version   # tested on v24.9.0
npm --version    # tested on 11.6.0
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --version
# tested on 148.0.7778.179
```

For audio regeneration: an ElevenLabs API key in `.env.local` (see Setup). The macOS `say` testing fallback also needs the Dutch voice "Xander" installed (System Settings → Accessibility → Spoken Content → Manage Voices → Dutch (Netherlands)) — only matters if you actually invoke the fallback.

**On Linux**, the driver works after exporting `CHROME=$(which google-chrome || which chromium)` and adding `xvfb-run` if no display is available; the rest of this skill is platform-clean.

## Setup

```bash
npm install
```

Env vars (drop into `.env.local` at the repo root — auto-loaded by the audio scripts via [scripts/lib/env-local.ts](../../../scripts/lib/env-local.ts)):

```
ELEVENLABS_API_KEY=sk_...                       # required for audio:build
# ELEVENLABS_VOICE_ID=60CwgZt94Yf7yYIXMDDe       # optional, default: Peter (nl-NL)
# ELEVENLABS_MODEL_ID=eleven_flash_v2_5          # optional, default
```

Run `npm run audio:voices` after the key is set to list every voice your account can use.

**⚠️ Free-tier reality (late 2025):** the default voice (Peter — native Dutch) is a `professional` category voice and requires a paid plan. Free accounts get HTTP 402 on every call. The 21 free `premade` voices are all English-default and would teach wrong Dutch pronunciation, so they are NOT a workaround. To generate shipping audio you need at least the $5/mo Starter plan. Until then, use the macOS `say` fallback (`npm run audio:build:say`) — pronunciation is correct, prosody is flatter.

## Run (agent path)

The driver is [drive.sh](drive.sh). It is idempotent: reuses any existing dev server on port 3000, otherwise starts one in the background and polls for HTTP 200 before screenshotting.

```bash
./.claude/skills/run-dutch/drive.sh
```

Default routes captured: `/`, `/lessen`, `/lessen/a0-les-01`. Override with positional args:

```bash
./.claude/skills/run-dutch/drive.sh /vandaag /review
```

Outputs:

| artifact | location |
|---|---|
| screenshots | `/tmp/dutch-shots/<slug>.png` |
| dev-server log (when the script started it) | `/tmp/dutch-dev.log` |
| dev-server pid (when the script started it) | `/tmp/dutch-dev.pid` |

Env overrides: `PORT` (default 3000), `SHOTS_DIR` (default `/tmp/dutch-shots`), `CHROME` (default the macOS Chrome path above).

After a run, **inspect the PNGs** — `Read` them in this agent or open with `qlmanage -p /tmp/dutch-shots/*.png` in a terminal. A 200 status is not proof the page rendered; the screenshot is.

### Verifying a lesson-content change

Typical edit-loop for `src/lib/content/lessons/a0/*.ts`:

```bash
npx tsc --noEmit                              # types
npm run audio:build                           # new audioIds → .mp3 via ElevenLabs (idempotent)
./.claude/skills/run-dutch/drive.sh /lessen/a0-les-01
# Read /tmp/dutch-shots/lessen_a0-les-01.png
```

The audio script reads `LESSONS` from [src/lib/content/lessons/index.ts](../../../src/lib/content/lessons/index.ts) and skips any (lessonId, audioId) pair already in [src/lib/content/audio-manifest.json](../../../src/lib/content/audio-manifest.json) whose file exists on disk — so re-running it after a tiny content edit only generates the *new* clips. Confirm with `AUDIO_BUILD_DRY_RUN=1 npm run audio:build` first if unsure.

### Audio backends — which to use

| script | npm command | output | when to use |
|---|---|---|---|
| **ElevenLabs (primary)** | `npm run audio:build` | `.mp3` | shipping audio; the default |
| macOS `say` (testing fallback) | `npm run audio:build:say` | `.wav` | offline, no API key, or quick throwaway iteration. Quality is noticeably flatter; prints a `⚠️ TESTING FALLBACK` banner at the top of every run as a reminder. |

Both scripts share [`scripts/lib/audio-items.ts`](../../../scripts/lib/audio-items.ts) (walks lessons for TTS items) and [`scripts/lib/audio-manifest.ts`](../../../scripts/lib/audio-manifest.ts) (manifest I/O). Add a new TTS-bearing section type once in `itemsFromSection` there — both backends pick it up.

## Run (human path)

```bash
npm run dev   # → http://localhost:3000 (or 3001 if 3000 is taken). Ctrl-C to stop.
```

Open `/lessen/a0-les-01` and click through the 4 sections (uitleg → woorden → mini-dialoog → spreken) for the only available lesson.

## Test

There is no test suite. Verification is typecheck + lint + the visual smoke loop above.

```bash
npx tsc --noEmit          # passes clean as of this writing
npm run lint              # 3 pre-existing errors in src/app/vocab/page.tsx
                          # and a hooks file — unrelated to lessons / runtime.
```

`npm run build` works but is slow (Turbopack production) — skip unless deploying.

## Gotchas

- **Sections aren't URL-addressable.** The lesson viewer drives `currentIndex` via `useState`, so `drive.sh` only ever screenshots the first incomplete section (= section 1 for a fresh visitor). Visual review of `woorden` / `mini-dialoog` / `spreken` still requires a real browser. A future enhancement: a Playwright-driven extension that clicks "Volgende →" and screenshots each section — `npm i -D playwright` is the entry cost.
- **First nav is slow.** Next.js 16 compiles routes on demand; the very first hit to `/lessen/a0-les-01` after `npm run dev` can take ~5–10 s. `drive.sh` accounts for this via `--virtual-time-budget=8000`, but if you see a near-empty PNG (the bare shell, no lesson content), rerun.
- **IndexedDB state is per-browser-profile.** Headless Chrome and your daily Chrome do **not** share state. The driver always sees a "fresh learner" — no `lessonProgress`, no SRS due-queue. For testing the completed-lesson flow, exercise it in your dev browser.
- **Old `a1-les-XX` Dexie rows.** If your dev browser previously studied the deleted `a1-les-02..07`, `lessonProgress` and `vocabCards` rows for those ids are orphaned. They don't break anything — `getLesson()` returns undefined and the viewer shows "Les niet gevonden" if visited. Clean via DevTools → Application → IndexedDB → delete the database if you want a fresh slate.
- **Audio script only walks `woorden` / `spreken` / `mini-dialoog`.** Other section types (`klanken`, `drill`, `de-het`, `conjugatie`, `zinsbouw`, `luisteren`, `schrijven`) get no audio generated even if their data carries `audioId` fields. Extend `itemsFromSection` in [scripts/lib/audio-items.ts](../../../scripts/lib/audio-items.ts) — both backends share it.
- **Stale audio files.** Removing a `Woord` from a lesson does *not* delete its `.wav` / `.mp3` from disk or its manifest entry. Clean by hand if it bothers you; the runtime never references it once the data is gone.
- **Mixed extensions in `audio-manifest.json` are intentional.** Items generated by ElevenLabs are `mp3`; items generated by the `say` fallback are `wav`. The runtime reads the per-item extension from the manifest so both coexist cleanly. To unify, delete the stale files and re-run `audio:build`.
- **AGENTS.md is non-negotiable.** Next.js 16 is not the Next.js you remember — App Router conventions, `params` as a `Promise`, etc. Read [`node_modules/next/dist/docs/`](../../../node_modules/next/dist/docs/) before writing or refactoring Next.js code.

## Troubleshooting

- **`Port 3000 is in use`** in the dev log: a previous `npm run dev` is still attached. `lsof -nP -i :3000` → `kill <pid>` (or `pkill -f 'next dev'`).
- **`Chrome not found at /Applications/...`**: set `CHROME=$(which chromium || which google-chrome)` and re-run.
- **Screenshot PNG is suspiciously small (~10 KB)** or shows an empty white frame: route hadn't finished compiling. Re-run `drive.sh` — the second hit is cached and fast.
- **`Missing ELEVENLABS_API_KEY`** from `npm run audio:build`: the key isn't in `.env.local` and isn't exported in your shell. Add `ELEVENLABS_API_KEY=sk_...` to `.env.local`. Verify the env loader sees it: `AUDIO_BUILD_DRY_RUN=1 npm run audio:build` — no "Missing" error means it's loaded.
- **`Voice "Xander" not installed`** from `npm run audio:build:say`: install via System Settings → Accessibility → Spoken Content → Manage Voices → Dutch (Netherlands). Or override `SAY_VOICE=Ellen` for a Flemish-Belgian voice if you have it.
- **`Another next dev server is already running`** when you `npm run dev` yourself: that's the background server `drive.sh` launched earlier. Reuse it (no action needed) or kill it via `kill $(cat /tmp/dutch-dev.pid)`.
