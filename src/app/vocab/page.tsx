'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { backfillLessonVocab } from '@/lib/lessons';
import { useTrackTimeOnPage } from '@/lib/activity';
import { isDue } from '@/lib/srs';
import { vocabDirection } from '@/lib/review-session';
import type { VocabCard } from '@/lib/types';
import VocabReviewCard from '@/components/review/VocabReviewCard';

export default function WoordreviewPage() {
  useTrackTimeOnPage();
  useEffect(() => {
    void backfillLessonVocab();
  }, []);

  const all = useLiveQuery(
    () => db.vocab.where('source').equals('lesson').toArray(),
    [],
  );

  // Snapshot "now" once per mount so the queue is stable mid-session. Newly-due
  // cards show up next visit.
  const [now] = useState(() => Date.now());

  const queue = useMemo(() => {
    if (!all) return [] as VocabCard[];
    const due = all.filter((c) => c.srs.state !== 'new' && isDue(c.srs, now));
    const fresh = all.filter((c) => c.srs.state === 'new');
    return [...due, ...fresh].sort((a, b) => a.srs.due - b.srs.due);
  }, [all, now]);

  const current = queue[0];

  if (!all) {
    return <p className="text-sm text-zinc-500 dark:text-zinc-400">Laden…</p>;
  }
  if (all.length === 0) {
    return <EmptyState reason="empty" />;
  }
  if (!current) {
    return <EmptyState reason="done" totalCount={all.length} />;
  }

  return (
    <div className="space-y-6">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Woordreview</h1>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {queue.length} in de wachtrij · {all.length} totaal
        </span>
      </header>

      {/* Keyed by card id so the card's internal reveal state resets when the
          live query advances the queue after a rating. */}
      <VocabReviewCard
        key={current.id}
        card={current}
        direction={vocabDirection(current)}
      />
    </div>
  );
}

function EmptyState({
  reason,
  totalCount,
}: {
  reason: 'empty' | 'done';
  totalCount?: number;
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Woordreview</h1>
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
        {reason === 'empty' ? (
          <>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              Nog geen woorden om te reviewen.
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Voltooi een les om woorden hier toe te voegen.
            </p>
            <Link
              href="/lessen"
              className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 active:bg-orange-800"
            >
              Naar lessen
            </Link>
          </>
        ) : (
          <>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              Geen woorden klaar voor nu — goed bezig.
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {totalCount} {totalCount === 1 ? 'woord' : 'woorden'} in je
              wachtrij. Kom later terug.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex min-h-11 items-center rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:active:bg-zinc-600"
            >
              ← Terug naar Vandaag
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
