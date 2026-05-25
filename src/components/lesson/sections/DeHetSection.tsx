'use client';

// Article drill: see a noun, tap "de" or "het". No audio — purely visual
// recognition. Sequential like DrillSection mc mode: shuffled per mount,
// auto-advance on right, "Volgende" on wrong, summary at the end.

import { useEffect, useMemo, useState } from 'react';
import { saveSectionResult } from '@/lib/practice';
import type { DeHetPayload, SectionCompletion } from '@/lib/types';
import { DRILL } from '@/lib/config';

const { autoAdvanceMs: AUTO_ADVANCE_MS } = DRILL;

interface Props {
  lessonId: string;
  sectionId: string;
  payload: DeHetPayload;
  onCompletionChange?: (completion: SectionCompletion) => void;
}

type Gender = 'de' | 'het';
type Result = { itemIndex: number; correct: boolean };

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function DeHetSection({
  lessonId,
  sectionId,
  payload,
  onCompletionChange,
}: Props) {
  const items = useMemo(() => shuffle(payload.items), [payload.items]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [picked, setPicked] = useState<Gender | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  const item = items[currentIndex];
  const done = currentIndex >= items.length;
  const locked = picked !== null;
  const isCorrect = picked !== null && item?.gender === picked;
  const correctCount = results.filter((r) => r.correct).length;

  useEffect(() => {
    if (!isCorrect) return;
    const t = setTimeout(() => {
      setResults((prev) => [...prev, { itemIndex: currentIndex, correct: true }]);
      setCurrentIndex((prev) => prev + 1);
      setPicked(null);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(t);
  }, [isCorrect, currentIndex]);

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
      evidence: `${items.length} de/het-items beantwoord.`,
    };
    onCompletionChange?.(completion);
    void saveSectionResult({
      lessonId,
      sectionId,
      sectionType: 'de-het',
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

  function handlePick(g: Gender) {
    if (locked) return;
    setPicked(g);
  }

  function handleVolgende() {
    setResults((prev) => [...prev, { itemIndex: currentIndex, correct: isCorrect }]);
    setCurrentIndex((prev) => prev + 1);
    setPicked(null);
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

        <div className="mt-3 text-center">
          <p className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {locked ? (
              <span>
                <span className="text-emerald-700 dark:text-emerald-300">
                  {item.gender}
                </span>{' '}
                {item.nl}
              </span>
            ) : (
              <span className="text-zinc-300 dark:text-zinc-700">___ </span>
            )}
            {!locked && item.nl}
          </p>
          {item.en && (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {item.en}
            </p>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <ArticleButton
            text="de"
            state={
              !locked
                ? 'idle'
                : picked === 'de'
                  ? item.gender === 'de'
                    ? 'right'
                    : 'wrong'
                  : item.gender === 'de'
                    ? 'reveal'
                    : 'dim'
            }
            onClick={() => handlePick('de')}
          />
          <ArticleButton
            text="het"
            state={
              !locked
                ? 'idle'
                : picked === 'het'
                  ? item.gender === 'het'
                    ? 'right'
                    : 'wrong'
                  : item.gender === 'het'
                    ? 'reveal'
                    : 'dim'
            }
            onClick={() => handlePick('het')}
          />
        </div>

        {locked && !isCorrect && (
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Het is <span className="font-semibold">{item.gender}</span> {item.nl}.
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

type ButtonState = 'idle' | 'right' | 'wrong' | 'reveal' | 'dim';

function ArticleButton({
  text,
  state,
  onClick,
}: {
  text: string;
  state: ButtonState;
  onClick: () => void;
}) {
  const styles: Record<ButtonState, string> = {
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
      className={`flex min-h-14 items-center justify-center rounded-xl px-4 py-3 text-xl font-bold ring-1 transition-all ${styles[state]}`}
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
    <div className="flex flex-wrap items-center justify-center gap-1.5">
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
  const tone = pct >= 80 ? 'emerald' : pct >= 50 ? 'amber' : 'zinc';
  const toneClasses: Record<string, string> = {
    emerald:
      'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200',
    amber:
      'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200',
    zinc: 'border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100',
  };
  const message =
    pct >= 80
      ? 'Mooi werk — je herkent de patronen.'
      : pct >= 50
        ? 'Goede start — herhaal de woorden waar je twijfelde.'
        : 'Geen zorgen — onthoud: zo\'n 75% van de woorden is "de". Bij twijfel gokken op "de".';
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
