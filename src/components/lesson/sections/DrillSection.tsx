'use client';

// Sequential drill: mc (tap a choice) or typed (type the answer).
// Both kinds: optional audio plays on item enter; right answer auto-advances
// after AUTO_ADVANCE_MS; wrong answer locks with a "Volgende" button so the
// learner can sit with the reveal before moving on.

import { useEffect, useMemo, useRef, useState } from 'react';
import { saveSectionResult } from '@/lib/practice';
import type { DrillPayload, SectionCompletion } from '@/lib/types';
import { audioUrl, hasAudio } from '@/lib/audio';
import { DRILL } from '@/lib/config';

const { autoAdvanceMs: AUTO_ADVANCE_MS } = DRILL;

interface Props {
  lessonId: string;
  sectionId: string;
  payload: DrillPayload;
  onCompletionChange?: (completion: SectionCompletion) => void;
}

type Result = { itemIndex: number; correct: boolean };

type Answer =
  | { kind: 'mc'; choiceIndex: number; correct: boolean }
  | { kind: 'typed'; value: string; correct: boolean };

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function isTypedCorrect(
  value: string,
  expected: string,
  variants?: string[],
): boolean {
  const candidates = [expected, ...(variants ?? [])];
  return candidates.some((c) => normalize(c) === normalize(value));
}

export default function DrillSection({
  lessonId,
  sectionId,
  payload,
  onCompletionChange,
}: Props) {
  // Shuffle items AND each mc item's choices once per mount. Authors
  // habitually write `correct: true` first; without choice shuffle the
  // right answer always lands top-left.
  const items = useMemo(
    () =>
      shuffle(payload.items).map((item) =>
        item.kind === 'mc' ? { ...item, choices: shuffle(item.choices) } : item,
      ),
    [payload.items],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  const item = items[currentIndex];
  const done = currentIndex >= items.length;
  const locked = answer !== null;
  const isCorrect = answer?.correct === true;
  const correctCount = results.filter((r) => r.correct).length;

  // Auto-play on item change (browser autoplay rules: this works after
  // the user has interacted with the page, which they have by tapping
  // into the section).
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (done || !item?.audioId) return;
    if (!hasAudio(lessonId, item.audioId)) return;
    if (!audioRef.current) audioRef.current = new Audio();
    const el = audioRef.current;
    el.src = audioUrl(lessonId, item.audioId);
    el.currentTime = 0;
    el.play().catch(() => {
      // Autoplay blocked — that's fine, the tap-to-replay button stays.
    });
  }, [currentIndex, done, item, lessonId]);

  // Auto-advance on a correct answer.
  useEffect(() => {
    if (!isCorrect) return;
    const t = setTimeout(() => {
      setResults((prev) => [...prev, { itemIndex: currentIndex, correct: true }]);
      setCurrentIndex((prev) => prev + 1);
      setAnswer(null);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(t);
  }, [isCorrect, currentIndex]);

  // Cleanup audio on unmount.
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!done) {
      onCompletionChange?.({
        isComplete: false,
        score: correctCount,
        total: items.length,
      });
      return;
    }
    const completion = {
      isComplete: true,
      score: correctCount,
      total: items.length,
      evidence: `${items.length} drill-items beantwoord.`,
    };
    onCompletionChange?.(completion);
    void saveSectionResult({
      lessonId,
      sectionId,
      sectionType: 'drill',
      completion,
    });
  }, [
    correctCount,
    done,
    items.length,
    lessonId,
    onCompletionChange,
    sectionId,
  ]);

  if (done) {
    return <SummaryCard correct={correctCount} total={items.length} />;
  }

  if (!item) return null;

  function handleSelectChoice(i: number) {
    if (locked || !item || item.kind !== 'mc') return;
    const correct = item.choices[i]?.correct === true;
    setAnswer({ kind: 'mc', choiceIndex: i, correct });
  }

  function handleSubmitTyped(value: string) {
    if (locked || !item || item.kind !== 'typed') return;
    const correct = isTypedCorrect(value, item.expected, item.acceptVariants);
    setAnswer({ kind: 'typed', value, correct });
  }

  function handleVolgende() {
    setResults((prev) => [...prev, { itemIndex: currentIndex, correct: isCorrect }]);
    setCurrentIndex((prev) => prev + 1);
    setAnswer(null);
  }

  function replay() {
    if (!item?.audioId) return;
    if (!audioRef.current) audioRef.current = new Audio();
    const el = audioRef.current;
    el.src = audioUrl(lessonId, item.audioId);
    el.currentTime = 0;
    el.play().catch(() => {});
  }

  return (
    <div className="space-y-4">
      {payload.intro && currentIndex === 0 && (
        <p className="px-1 text-sm text-zinc-600 dark:text-zinc-300">
          {payload.intro}
        </p>
      )}

      <ProgressDots
        total={items.length}
        currentIndex={currentIndex}
        results={results}
      />

      <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          Item {currentIndex + 1} van {items.length}
        </p>

        {item.promptNl && (
          <h3 className="mt-2 text-lg font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
            {item.promptNl}
          </h3>
        )}
        {item.promptEn && (
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            {item.promptEn}
          </p>
        )}

        {item.audioId && (
          <AudioPromptButton onPlay={replay} disabled={!hasAudio(lessonId, item.audioId)} />
        )}

        {item.kind === 'mc' ? (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {item.choices.map((choice, i) => (
              <ChoiceButton
                key={i}
                text={choice.text}
                state={
                  !locked
                    ? 'idle'
                    : answer?.kind === 'mc' && answer.choiceIndex === i
                      ? choice.correct
                        ? 'right'
                        : 'wrong'
                      : choice.correct
                        ? 'reveal'
                        : 'dim'
                }
                onClick={() => handleSelectChoice(i)}
              />
            ))}
          </div>
        ) : (
          <TypedInputBlock
            // Force a fresh instance per item so the internal input value
            // (local useState) doesn't bleed from one drill item to the next.
            key={currentIndex}
            locked={locked}
            answer={answer?.kind === 'typed' ? answer : null}
            expected={item.expected}
            onSubmit={handleSubmitTyped}
          />
        )}

        {locked && !isCorrect && (
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              {item.kind === 'mc'
                ? 'Geen probleem — de groene is goed.'
                : `Het juiste antwoord: ${item.expected}.`}
            </p>
            <button
              type="button"
              onClick={handleVolgende}
              className="inline-flex min-h-10 items-center rounded-full bg-zinc-800 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-900 active:bg-black dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-white"
            >
              Volgende →
            </button>
          </div>
        )}
      </article>
    </div>
  );
}

function AudioPromptButton({
  onPlay,
  disabled,
}: {
  onPlay: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      disabled={disabled}
      className="mt-5 flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-orange-50 px-6 py-3 text-base font-semibold text-orange-700 ring-1 ring-orange-200 transition-colors hover:bg-orange-100 active:bg-orange-200 disabled:opacity-50 dark:bg-orange-950/30 dark:text-orange-300 dark:ring-orange-900/60 dark:hover:bg-orange-950/50 dark:active:bg-orange-950"
    >
      <SpeakerIcon />
      {disabled ? 'Audio ontbreekt' : 'Speel klank opnieuw'}
    </button>
  );
}

function TypedInputBlock({
  locked,
  answer,
  expected,
  onSubmit,
}: {
  locked: boolean;
  answer: { value: string; correct: boolean } | null;
  expected: string;
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = useState('');

  if (locked && answer) {
    return (
      <div
        className={`mt-5 rounded-xl border px-4 py-3 text-center text-2xl font-semibold ${
          answer.correct
            ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200'
            : 'border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200'
        }`}
      >
        {answer.value || <span className="opacity-60">—</span>}
        {!answer.correct && (
          <div className="mt-1 text-base font-medium text-emerald-700 dark:text-emerald-300">
            → {expected}
          </div>
        )}
      </div>
    );
  }

  return (
    <form
      className="mt-5 flex flex-wrap items-center gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) onSubmit(value);
      }}
    >
      <input
        type="text"
        inputMode="text"
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        aria-label="Typ je antwoord"
        placeholder="Typ je antwoord…"
        className="min-h-12 min-w-0 flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-lg text-zinc-900 placeholder:text-zinc-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-600 px-5 py-2 text-base font-semibold text-white transition-colors hover:bg-orange-700 active:bg-orange-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500"
      >
        OK
      </button>
    </form>
  );
}

type ChoiceState = 'idle' | 'right' | 'wrong' | 'reveal' | 'dim';

function ChoiceButton({
  text,
  state,
  onClick,
}: {
  text: string;
  state: ChoiceState;
  onClick: () => void;
}) {
  const styles: Record<ChoiceState, string> = {
    idle:
      'bg-white text-zinc-900 ring-zinc-200 hover:bg-zinc-50 active:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-700 dark:active:bg-zinc-600',
    right:
      'bg-emerald-100 text-emerald-900 ring-emerald-400 dark:bg-emerald-950/60 dark:text-emerald-200 dark:ring-emerald-700',
    wrong:
      'bg-red-100 text-red-900 ring-red-400 dark:bg-red-950/60 dark:text-red-200 dark:ring-red-700',
    reveal:
      'bg-emerald-50 text-emerald-800 ring-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800',
    dim: 'bg-white text-zinc-400 ring-zinc-200 opacity-60 dark:bg-zinc-800 dark:text-zinc-500 dark:ring-zinc-700',
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={state !== 'idle'}
      className={`flex min-h-14 items-center justify-center rounded-xl px-4 py-3 text-base font-semibold ring-1 transition-all ${styles[state]}`}
    >
      {text}
    </button>
  );
}

function ProgressDots({
  total,
  currentIndex,
  results,
}: {
  total: number;
  currentIndex: number;
  results: Result[];
}) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const result = results.find((r) => r.itemIndex === i);
        const active = i === currentIndex;
        const cls = result
          ? result.correct
            ? 'bg-emerald-500'
            : 'bg-red-500'
          : active
            ? 'bg-orange-600'
            : 'bg-zinc-200 dark:bg-zinc-700';
        const widthCls = active && !result ? 'w-6' : 'w-1.5';
        return (
          <span
            key={i}
            aria-hidden
            className={`h-1.5 rounded-full transition-all ${widthCls} ${cls}`}
          />
        );
      })}
    </div>
  );
}

function SummaryCard({ correct, total }: { correct: number; total: number }) {
  const pct = Math.round((correct / total) * 100);
  const tone =
    pct >= 80
      ? 'emerald'
      : pct >= 50
        ? 'amber'
        : 'zinc';
  const toneClasses: Record<string, string> = {
    emerald:
      'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200',
    amber:
      'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200',
    zinc: 'border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100',
  };
  const message =
    pct >= 80
      ? 'Mooi werk — je hebt het door.'
      : pct >= 50
        ? 'Goede start — herhaal de les nog een keer voor de fijnafstemming.'
        : 'Geen zorgen — luister de klanken-sectie nog eens en probeer opnieuw.';
  return (
    <div className={`rounded-3xl border p-8 text-center ${toneClasses[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-wider opacity-70">
        Drill voltooid
      </p>
      <p className="mt-3 text-4xl font-bold tabular-nums">
        {correct}
        <span className="text-2xl opacity-60"> / {total}</span>
      </p>
      <p className="mt-1 text-sm opacity-80">{pct}%</p>
      <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed">{message}</p>
    </div>
  );
}

function SpeakerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11 5 6 9H2v6h4l5 4Z" fill="currentColor" stroke="none" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}
