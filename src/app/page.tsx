'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import {
  backfillLessonVocab,
  completionStats,
  indexProgress,
  nextUnfinishedLesson,
} from '@/lib/lessons';
import { dueSoonCount } from '@/lib/srs';
import { TRACKS, type Lesson, type TrackId } from '@/lib/types';

export default function Home() {
  const [track, setTrack] = useState<TrackId>('beginner');

  return (
    <div className="space-y-8">
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
      className="inline-flex gap-1 rounded-lg bg-zinc-100 p-1"
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
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              active
                ? 'bg-white font-medium text-zinc-900 shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
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
  }, []);

  const progressRows = useLiveQuery(() => db.lessonProgress.toArray(), []);
  const vocab = useLiveQuery(
    () => db.vocab.where('source').equals('lesson').toArray(),
    [],
  );

  const progressByLesson = indexProgress(progressRows);
  const { completed, total } = completionStats(progressByLesson);
  const next = nextUnfinishedLesson(progressByLesson);
  const vocabStats = vocab ? dueSoonCount(vocab) : null;

  return (
    <div className="space-y-8">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Vandaag</h1>
        <span className="text-sm text-zinc-500">
          Les {completed}/{total}
        </span>
      </header>

      {next ? (
        <NextLessonCard lesson={next} isFirst={completed === 0} />
      ) : (
        <AllDoneCard />
      )}

      {vocabStats && vocabStats.due + vocabStats.newCount > 0 && (
        <ReviewCta count={vocabStats.due + vocabStats.newCount} />
      )}

      <section className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Meer
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <SecondaryCard
            href="/lessen"
            title="Alle lessen"
            subtitle={`${total} ${total === 1 ? 'les' : 'lessen'}`}
          />
          <SecondaryCard
            href="/review"
            title="Review"
            subtitle={
              !vocabStats || vocabStats.total === 0
                ? 'Komt na voltooide lessen'
                : `${vocabStats.due + vocabStats.newCount} klaar · ${vocabStats.total} woorden`
            }
          />
        </div>
      </section>
    </div>
  );
}

function InburgeringTrack({ onBack }: { onBack: () => void }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        A1 → A2 Inburgering
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900">
        Beschikbaar later
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-sm text-zinc-500">
        KNM, examenwoorden, mock-examen en spreekoefeningen komen hier zodra je
        de A0 → A1 basis afrondt.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="mt-6 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
      >
        ← Begin met A0 → A1
      </button>
    </div>
  );
}

function NextLessonCard({ lesson, isFirst }: { lesson: Lesson; isFirst: boolean }) {
  return (
    <Link
      href={`/lessen/${lesson.id}`}
      className="block rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-orange-600">
        {isFirst ? 'Begin hier' : 'Volgende les'}
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900">
        Les {lesson.order}: {lesson.titleNl}
      </h2>
      <p className="mt-1 text-sm text-zinc-500">{lesson.titleEn}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-zinc-500">
          ~{lesson.estimatedMinutes} min · {lesson.sections.length} secties
        </span>
        <span className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white">
          {isFirst ? 'Beginnen →' : 'Doorgaan →'}
        </span>
      </div>
    </Link>
  );
}

function ReviewCta({ count }: { count: number }) {
  return (
    <Link
      href="/review"
      className="block rounded-2xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-sm"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Review
          </p>
          <p className="mt-1 text-base font-medium text-zinc-900">
            {count} {count === 1 ? 'woord' : 'woorden'} klaar
          </p>
        </div>
        <span className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700">
          Start review →
        </span>
      </div>
    </Link>
  );
}

function AllDoneCard() {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-emerald-700">
        Alle lessen voltooid
      </p>
      <p className="mt-2 text-base text-emerald-900">
        Mooi werk. Tijd om door te gaan naar A1 → A2.
      </p>
    </div>
  );
}

function SecondaryCard({
  href,
  title,
  subtitle,
}: {
  href: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
    >
      <p className="text-sm font-medium text-zinc-900">{title}</p>
      <p className="mt-0.5 text-xs text-zinc-500">{subtitle}</p>
    </Link>
  );
}
