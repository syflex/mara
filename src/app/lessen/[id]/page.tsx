'use client';

import { use, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { getLesson, LESSONS } from '@/lib/content/lessons';
import {
  ensureLessonStarted,
  markLessonComplete,
  markSectionComplete,
} from '@/lib/lessons';
import { useTrackTimeOnPage } from '@/lib/activity';
import SectionRenderer from '@/components/lesson/SectionRenderer';
import { sectionLabel } from '@/components/lesson/sections/registry';
import type { LessonSection, SectionType } from '@/lib/types';

export default function LessonViewerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewMode = searchParams.get('review') === '1';

  // Tick today's activity counter while this page is open. Stops when the
  // user navigates away or backgrounds the tab.
  useTrackTimeOnPage();

  const lesson = getLesson(id);

  const progress = useLiveQuery(
    () => (lesson ? db.lessonProgress.get(lesson.id) : undefined),
    [lesson?.id],
  );

  const completedIds = useMemo(
    () => new Set(progress?.sectionIdsCompleted ?? []),
    [progress],
  );

  const initialIndex = useMemo(() => {
    if (!lesson) return 0;
    if (reviewMode) return 0;
    const firstIncomplete = lesson.sections.findIndex(
      (s) => !completedIds.has(s.id),
    );
    return firstIncomplete === -1 ? lesson.sections.length - 1 : firstIncomplete;
  }, [lesson, completedIds, reviewMode]);

  const [navigatedIndex, setNavigatedIndex] = useState<number | null>(null);
  const currentIndex = navigatedIndex ?? initialIndex;

  useEffect(() => {
    if (lesson && !reviewMode) void ensureLessonStarted(lesson.id);
  }, [lesson, reviewMode]);

  if (!lesson) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-300">Les niet gevonden.</p>
        <Link href="/lessen" className="text-sm text-orange-700 underline dark:text-orange-400">
          ← Terug naar lessen
        </Link>
      </div>
    );
  }

  const section = lesson.sections[currentIndex];
  const totalSections = lesson.sections.length;
  const isLast = currentIndex === totalSections - 1;
  const isFirst = currentIndex === 0;
  const lessonDone = !!progress?.completedAt;
  const showCelebration = lessonDone && !reviewMode;
  const nextLesson = LESSONS.find((l) => l.order === lesson.order + 1);
  const progressPct = ((currentIndex + 1) / totalSections) * 100;

  const lessonId = lesson.id;
  async function handleNext() {
    if (!section) return;
    if (reviewMode) {
      if (isLast) router.push('/lessen');
      else setNavigatedIndex(currentIndex + 1);
      return;
    }
    await markSectionComplete(lessonId, section.id);
    if (isLast) await markLessonComplete(lessonId);
    else setNavigatedIndex(currentIndex + 1);
  }

  function handlePrev() {
    if (!isFirst) setNavigatedIndex(currentIndex - 1);
  }

  return (
    <div className="space-y-5 pb-24">
      {/* Top: back link + sectie counter + hero progress bar */}
      <div>
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <Link
            href="/lessen"
            className="inline-flex items-center transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            ← Alle lessen
          </Link>
          {!showCelebration && section && (
            <span className="inline-flex items-center gap-2 tabular-nums">
              {reviewMode && (
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  Review
                </span>
              )}
              Sectie {currentIndex + 1} / {totalSections}
            </span>
          )}
        </div>
        {!showCelebration && section && (
          <ProgressBar pct={progressPct} label={sectionLabel(section.type)} />
        )}
      </div>

      {/* Lesson title card with section pills */}
      {!showCelebration && (
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Les {lesson.order}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            {lesson.titleNl}
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {lesson.titleEn}
          </p>
          <SectionPills
            sections={lesson.sections}
            currentIndex={currentIndex}
            completedIds={completedIds}
            onJump={(i) => setNavigatedIndex(i)}
          />
        </section>
      )}

      {showCelebration ? (
        <CompletionCard
          lessonOrder={lesson.order}
          recap={recapCounts(lesson)}
          reviewHref={`/lessen/${lesson.id}?review=1`}
          nextHref={nextLesson ? `/lessen/${nextLesson.id}` : null}
        />
      ) : (
        section && (
          <div>
            <p className="px-1 text-[11px] font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              {sectionLabel(section.type)}
            </p>
            <div className="mt-3">
              <SectionRenderer section={section} lessonId={lessonId} />
            </div>
          </div>
        )
      )}

      {/* Bottom action bar: prev icon + fat next pill */}
      {!showCelebration && section && (
        <div className="fixed inset-x-0 bottom-0 z-10 border-t border-zinc-200 bg-white/90 backdrop-blur transition-colors dark:border-zinc-800 dark:bg-zinc-900/90">
          <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFirst}
              aria-label="Vorige sectie"
              title="Vorige sectie"
              className="grid h-11 w-11 shrink-0 place-content-center rounded-full ring-1 ring-zinc-200 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:ring-zinc-700 dark:hover:bg-zinc-800"
            >
              <span className="text-lg text-zinc-500 dark:text-zinc-400">←</span>
            </button>
            <button
              type="button"
              onClick={() => void handleNext()}
              className={`flex-1 rounded-full px-6 py-3 text-base font-semibold text-white shadow-lg transition-colors ${
                reviewMode
                  ? 'bg-zinc-700 shadow-zinc-700/20 hover:bg-zinc-800 dark:bg-zinc-600 dark:hover:bg-zinc-500'
                  : 'bg-orange-600 shadow-orange-600/30 hover:bg-orange-700'
              }`}
            >
              {reviewMode
                ? isLast
                  ? 'Klaar'
                  : 'Volgende →'
                : isLast
                  ? 'Les voltooien'
                  : 'Volgende →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProgressBar({ pct, label }: { pct: number; label: string }) {
  return (
    <div className="mt-3 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <div className="relative h-9">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-orange-600 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
        {/* Two stacked labels — one for the part over orange (white text),
            one for the part over the empty track (zinc text). Mix-blend
            handled by switching color via the painted-vs-empty gap. */}
        <div className="relative flex h-full items-center justify-between px-4 text-sm font-semibold mix-blend-difference">
          <span className="text-white">{label}</span>
          <span className="text-white tabular-nums">{Math.round(pct)}%</span>
        </div>
      </div>
    </div>
  );
}

const SECTION_ICONS: Record<SectionType, string> = {
  uitleg: '✦',
  klanken: '♪',
  woorden: 'Aa',
  'de-het': '⚪',
  conjugatie: '⇆',
  drill: '◇',
  zinsbouw: '▦',
  luisteren: '🎧',
  spreken: '◉',
  'mini-dialoog': '⇄',
  schrijven: '✎',
};

function SectionPills({
  sections,
  currentIndex,
  completedIds,
  onJump,
}: {
  sections: LessonSection[];
  currentIndex: number;
  completedIds: Set<string>;
  onJump: (i: number) => void;
}) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {sections.map((s, i) => {
        const active = i === currentIndex;
        const done = completedIds.has(s.id);
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onJump(i)}
            aria-current={active ? 'step' : undefined}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              active
                ? 'bg-orange-600 text-white'
                : done
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/60'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
            }`}
          >
            {done && !active ? (
              <svg
                viewBox="0 0 24 24"
                width="10"
                height="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12.5l5 5L20 7" />
              </svg>
            ) : (
              <span className="text-[10px] leading-none">{SECTION_ICONS[s.type]}</span>
            )}
            {sectionLabel(s.type)}
          </button>
        );
      })}
    </div>
  );
}

interface RecapCounts {
  words: number;
  lines: number;
}

function recapCounts(lesson: { sections: LessonSection[] }): RecapCounts {
  let words = 0;
  let lines = 0;
  for (const s of lesson.sections) {
    if (s.type === 'woorden') words += s.payload.words.length;
    if (s.type === 'spreken') lines += s.payload.lines.length;
  }
  return { words, lines };
}

function recapText({ words, lines }: RecapCounts): string | null {
  const parts: string[] = [];
  if (words > 0) parts.push(`${words} ${words === 1 ? 'woord' : 'woorden'} geleerd`);
  if (lines > 0) parts.push(`${lines} ${lines === 1 ? 'zin' : 'zinnen'} geoefend`);
  return parts.length > 0 ? parts.join(' · ') : null;
}

function CompletionCard({
  lessonOrder,
  recap,
  reviewHref,
  nextHref,
}: {
  lessonOrder: number;
  recap: RecapCounts;
  reviewHref: string;
  nextHref: string | null;
}) {
  const recapLine = recapText(recap);
  return (
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900/50 dark:bg-emerald-950/30">
      <p className="text-base font-semibold text-emerald-900 dark:text-emerald-200">
        🎉 Les {lessonOrder} voltooid
      </p>
      {recapLine && (
        <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">
          {recapLine}
        </p>
      )}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href={reviewHref}
          className="rounded-md border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-900 transition-colors hover:bg-emerald-50 dark:border-emerald-900/50 dark:bg-zinc-900 dark:text-emerald-200 dark:hover:bg-emerald-950/40"
        >
          Bekijk opnieuw
        </Link>
        {nextHref && (
          <Link
            href={nextHref}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Volgende les →
          </Link>
        )}
      </div>
    </div>
  );
}
