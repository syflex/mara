'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import {
  backfillLessonVocab,
  completionStats,
  computeStreakDays,
  indexProgress,
  nextUnfinishedLesson,
  recentLessons,
  relativeDayLabel,
} from '@/lib/lessons';
import { backfillPracticeCards, practiceDueCounts } from '@/lib/practice';
import { dueSoonCount } from '@/lib/srs';
import { useTodayMinutes } from '@/lib/activity';
import { ACTIVITY } from '@/lib/config';
import { TRACKS, type Lesson, type TrackId, type VocabCard } from '@/lib/types';

export default function Home() {
  const [track, setTrack] = useState<TrackId>('beginner');

  return (
    <div className="space-y-6">
      <TrackSwitcher track={track} onChange={setTrack} />
      {track === 'beginner' ? (
        <BeginnerTrack />
      ) : (
        <InburgeringTrack onBack={() => setTrack('beginner')} />
      )}
    </div>
  );
}

function TrackSwitcher({
  track,
  onChange,
}: {
  track: TrackId;
  onChange: (t: TrackId) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Leerroute"
      className="inline-flex gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900"
    >
      {TRACKS.map((t) => {
        const active = t.id === track;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(t.id)}
            className={`min-h-9 rounded-md px-3 py-2 text-sm transition-colors ${
              active
                ? 'bg-white font-medium text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50'
                : 'text-zinc-600 hover:text-zinc-900 active:bg-zinc-200/60 dark:text-zinc-400 dark:hover:text-zinc-100 dark:active:bg-zinc-800/60'
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function BeginnerTrack() {
  useEffect(() => {
    void backfillLessonVocab();
    void backfillPracticeCards();
  }, []);

  const progressRows = useLiveQuery(() => db.lessonProgress.toArray(), []);
  const vocab = useLiveQuery(
    () => db.vocab.where('source').equals('lesson').toArray(),
    [],
  );
  const practiceCards = useLiveQuery(() => db.practiceReviewCards.toArray(), []);
  const todayMinutes = useTodayMinutes();

  const progressByLesson = indexProgress(progressRows);
  const { completed, total } = completionStats(progressByLesson);
  const next = nextUnfinishedLesson(progressByLesson);
  const streakDays = computeStreakDays(progressRows);
  const recent = recentLessons(progressRows, 3);
  const vocabStats = vocab ? dueSoonCount(vocab) : null;
  const practiceStats = practiceDueCounts(practiceCards);
  const masteredCount = vocab ? countMastered(vocab) : 0;
  const reviewCount =
    (vocabStats ? vocabStats.due + vocabStats.newCount : 0) +
    practiceStats.due +
    practiceStats.newCount;
  const reviewTotal = (vocab?.length ?? 0) + practiceStats.total;

  const dateLabel = useDateLabel();
  const greeting = useGreeting();

  return (
    <div className="space-y-5">
      <header className="px-1">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{dateLabel}</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{greeting}</h1>
      </header>

      <RingsCard
        lessonsDone={completed}
        lessonsTotal={total}
        minutesToday={todayMinutes}
        minutesGoal={ACTIVITY.goalMinutes}
        wordsMastered={masteredCount}
        wordsTotal={vocab?.length ?? 0}
      />

      {next ? (
        <NextLessonCard lesson={next} isFirst={completed === 0} />
      ) : (
        <AllDoneCard />
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <ReviewCard count={reviewCount} total={reviewTotal} />
        <StreakCard days={streakDays} minutesToday={todayMinutes} />
      </div>

      {recent.length > 0 && <RecentCard recent={recent} />}
    </div>
  );
}

// Date and greeting are derived from `new Date()` — external state from
// React's perspective. useSyncExternalStore gives a clean server/client
// split: server snapshot is the placeholder, client snapshot reads the
// real clock on first render after hydration. Subscribe is a no-op
// since the value is stable enough for a single session.
const noopSubscribe = () => () => {};

function useDateLabel(): string {
  return useSyncExternalStore(
    noopSubscribe,
    () =>
      new Intl.DateTimeFormat('nl-NL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }).format(new Date()),
    () => '',
  );
}

function useGreeting(): string {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      const h = new Date().getHours();
      return h < 6
        ? 'Goedenacht'
        : h < 12
          ? 'Goedemorgen'
          : h < 18
            ? 'Goedemiddag'
            : 'Goedenavond';
    },
    () => 'Vandaag',
  );
}

function countMastered(vocab: VocabCard[]): number {
  // "Mastered" = the card has graduated to review state. A simple, honest
  // proxy until we add stricter criteria (e.g. multiple consecutive 'good's).
  return vocab.filter((v) => v.srs.state === 'review').length;
}

interface RingProps {
  label: string;
  value: number;
  total: number;
  stroke: string;
  trackLight: string;
  trackDark: string;
  display: string;
  sub?: string;
}

function Ring({ label, value, total, stroke, trackLight, trackDark, display, sub }: RingProps) {
  const fraction = total > 0 ? Math.min(Math.max(value / total, 0), 1) : 0;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - fraction);
  return (
    <div className="flex min-w-0 flex-col items-center gap-1.5">
      {/* Ring sizes down on narrow phones (h-20 = 80px) so 3 rings + gaps fit
          inside an iPhone-SE-width card without horizontal overflow. */}
      <span className="relative inline-flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={trackLight}
            strokeWidth="9"
            className="dark:hidden"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={trackDark}
            strokeWidth="9"
            className="hidden dark:block"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 600ms ease-out' }}
          />
        </svg>
        <span className="relative text-sm font-semibold tabular-nums">{display}</span>
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      {sub && (
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{sub}</span>
      )}
    </div>
  );
}

function RingsCard({
  lessonsDone,
  lessonsTotal,
  minutesToday,
  minutesGoal,
  wordsMastered,
  wordsTotal,
}: {
  lessonsDone: number;
  lessonsTotal: number;
  minutesToday: number;
  minutesGoal: number;
  wordsMastered: number;
  wordsTotal: number;
}) {
  return (
    <section className="grid grid-cols-3 gap-1 rounded-3xl bg-white p-3 shadow-sm ring-1 ring-zinc-900/5 sm:gap-2 sm:p-5 dark:bg-zinc-900 dark:ring-white/5">
      <Ring
        label="Lessen"
        value={lessonsDone}
        total={lessonsTotal}
        stroke="#ea580c"
        trackLight="#fed7aa"
        trackDark="rgba(234,88,12,0.18)"
        display={`${lessonsDone}/${lessonsTotal}`}
      />
      <Ring
        label="Vandaag"
        value={minutesToday}
        total={minutesGoal}
        stroke="#10b981"
        trackLight="#a7f3d0"
        trackDark="rgba(16,185,129,0.18)"
        display={`${minutesToday}m`}
        sub={`van ${minutesGoal}m`}
      />
      <Ring
        label="Woorden"
        value={wordsMastered}
        total={wordsTotal}
        stroke="#6366f1"
        trackLight="#c7d2fe"
        trackDark="rgba(99,102,241,0.18)"
        display={wordsTotal === 0 ? '—' : `${wordsMastered}`}
        sub={wordsTotal === 0 ? undefined : `van ${wordsTotal}`}
      />
    </section>
  );
}

function NextLessonCard({ lesson, isFirst }: { lesson: Lesson; isFirst: boolean }) {
  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <div className="border-b border-zinc-100 px-6 py-3 dark:border-zinc-800">
        <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
          {isFirst ? 'Begin hier' : 'Volgende les'}
        </p>
      </div>
      <Link
        href={`/lessen/${lesson.id}`}
        className="flex items-start gap-4 px-6 py-5 transition-colors hover:bg-zinc-50/60 active:bg-zinc-100/60 dark:hover:bg-zinc-800/40 dark:active:bg-zinc-800/60"
      >
        <span className="grid h-14 w-14 shrink-0 place-content-center rounded-2xl bg-orange-100 font-serif text-2xl font-semibold text-orange-700 dark:bg-orange-950/40 dark:text-orange-300">
          {lesson.order}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold leading-snug">{lesson.titleNl}</h2>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            {lesson.titleEn}
          </p>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            ~{lesson.estimatedMinutes} min · {lesson.sections.length} secties
            {lesson.coverage.length > 0 && (
              <span> · {lesson.coverage.join(', ')}</span>
            )}
          </p>
        </div>
      </Link>
      <div className="border-t border-zinc-100 px-6 py-3 dark:border-zinc-800">
        <Link
          href={`/lessen/${lesson.id}`}
          className="block min-h-12 w-full rounded-xl bg-orange-600 px-4 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 active:bg-orange-800"
        >
          {isFirst ? 'Beginnen →' : 'Doorgaan →'}
        </Link>
      </div>
    </section>
  );
}

function ReviewCard({ count, total }: { count: number; total: number }) {
  if (total === 0) {
    return (
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Review
        </p>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Komt na voltooide lessen
        </p>
      </div>
    );
  }
  const hasWork = count > 0;
  return (
    <Link
      href="/review"
      className={`block min-h-24 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-900/5 transition-all hover:shadow-md active:scale-[0.98] active:bg-zinc-50 dark:bg-zinc-900 dark:ring-white/5 dark:active:bg-zinc-800/60 ${
        hasWork ? '' : 'opacity-70'
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
        Review
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{count}</p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        {hasWork
          ? `items klaar van ${total}`
          : `niets klaar · ${total} items`}
      </p>
    </Link>
  );
}

function StreakCard({
  days,
  minutesToday,
}: {
  days: number;
  minutesToday: number;
}) {
  const subtitle = useMemo(() => {
    if (days === 0) return 'Begin vandaag';
    if (minutesToday === 0) return 'Houd je streak vast — open een les';
    return `${minutesToday}m vandaag`;
  }, [days, minutesToday]);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Streak
        </p>
        <FlameIcon active={days > 0} />
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{days}</p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        {days === 1 ? 'dag' : 'dagen'} · {subtitle}
      </p>
    </div>
  );
}

function RecentCard({
  recent,
}: {
  recent: { lesson: Lesson; progress: import('@/lib/types').LessonProgress }[];
}) {
  return (
    <section className="rounded-3xl bg-white p-2 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <h3 className="px-4 pt-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        Recent
      </h3>
      <ul className="mt-1 divide-y divide-zinc-100 dark:divide-zinc-800">
        {recent.map(({ lesson, progress }) => {
          const done = !!progress.completedAt;
          return (
            <li key={lesson.id}>
              <Link
                href={`/lessen/${lesson.id}${done ? '?review=1' : ''}`}
                className="flex min-h-14 items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-zinc-50 active:bg-zinc-100 dark:hover:bg-zinc-800/40 dark:active:bg-zinc-800/60"
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-content-center rounded-full text-xs font-semibold ${
                    done
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                      : 'bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400'
                  }`}
                >
                  {lesson.order}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{lesson.titleNl}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {relativeDayLabel(progress.updatedAt)}
                  </p>
                </div>
                {done ? (
                  <CheckIcon />
                ) : (
                  <span className="text-xs text-orange-600 dark:text-orange-400">
                    bezig
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function AllDoneCard() {
  return (
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/30">
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
        Alle lessen voltooid
      </p>
      <p className="mt-2 text-base text-emerald-900 dark:text-emerald-200">
        Mooi werk. Tijd om door te gaan naar A1 → A2.
      </p>
    </div>
  );
}

function InburgeringTrack({ onBack }: { onBack: () => void }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
        A1 → A2 Inburgering
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight">
        Beschikbaar later
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
        KNM, examenwoorden, mock-examen en spreekoefeningen komen hier zodra je
        de A0 → A1 basis afrondt.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="mt-6 inline-flex min-h-11 items-center rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:active:bg-zinc-600"
      >
        ← Begin met A0 → A1
      </button>
    </div>
  );
}

function FlameIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      className={active ? 'text-amber-500' : 'text-zinc-300 dark:text-zinc-700'}
      aria-hidden
    >
      <path d="M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4-1 4 2 4 2 2 0-3-1-5 1-8z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-emerald-500"
      aria-hidden
    >
      <path d="M5 12.5l5 5L20 7" />
    </svg>
  );
}
