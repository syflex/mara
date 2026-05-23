'use client';

/**
 * Streak + today's-minutes pills, shown in the navbar at all viewports
 * (compact: emoji + number only on narrow widths, label inline on md+).
 * Live-updated from Dexie + the activity tracker.
 */

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { computeStreakDays } from '@/lib/lessons';
import { useTodayMinutes } from '@/lib/activity';
import { ACTIVITY } from '@/lib/config';

export default function StatusPills() {
  const progressRows = useLiveQuery(() => db.lessonProgress.toArray(), []);
  const streak = computeStreakDays(progressRows);
  const minutes = useTodayMinutes();
  const goal = ACTIVITY.goalMinutes;
  const minutesReached = minutes >= goal;

  return (
    <div className="flex items-center gap-1 px-1 text-xs font-semibold tabular-nums">
      <Pill
        title={`Streak: ${streak} ${streak === 1 ? 'dag' : 'dagen'}`}
        tone={streak > 0 ? 'flame' : 'muted'}
      >
        <FlameIcon active={streak > 0} />
        <span>{streak}</span>
      </Pill>
      <Pill
        title={`${minutes} min vandaag van ${goal}`}
        tone={minutesReached ? 'emerald' : 'muted'}
      >
        <ClockIcon active={minutesReached} />
        <span>{minutes}m</span>
      </Pill>
    </div>
  );
}

type Tone = 'flame' | 'emerald' | 'muted';

function Pill({
  children,
  title,
  tone,
}: {
  children: React.ReactNode;
  title: string;
  tone: Tone;
}) {
  const cls =
    tone === 'flame'
      ? 'text-amber-700 dark:text-amber-400'
      : tone === 'emerald'
        ? 'text-emerald-700 dark:text-emerald-400'
        : 'text-zinc-500 dark:text-zinc-400';
  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 ${cls}`}
    >
      {children}
    </span>
  );
}

function FlameIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="currentColor"
      aria-hidden
      className={active ? '' : 'opacity-50'}
    >
      <path d="M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4-1 4 2 4 2 2 0-3-1-5 1-8z" />
    </svg>
  );
}

function ClockIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={active ? '' : 'opacity-70'}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
