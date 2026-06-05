'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { backfillPracticeCards, practiceDueCounts } from '@/lib/practice';
import { isDue } from '@/lib/srs';
import { useTrackTimeOnPage } from '@/lib/activity';
import type { PracticeReviewCard } from '@/lib/types';
import WritingReviewCard from '@/components/review/WritingReviewCard';

export default function SchrijvenReviewPage() {
  useTrackTimeOnPage();
  useEffect(() => {
    void backfillPracticeCards();
  }, []);

  const cards = useLiveQuery(
    () => db.practiceReviewCards.where('kind').equals('writing').toArray(),
    [],
  );
  const [now] = useState(() => Date.now());

  const queue = useMemo(() => {
    if (!cards) return [] as PracticeReviewCard[];
    const due = cards.filter((c) => c.srs.state !== 'new' && isDue(c.srs, now));
    const fresh = cards.filter((c) => c.srs.state === 'new');
    return [...due, ...fresh].sort((a, b) => a.srs.due - b.srs.due);
  }, [cards, now]);

  const current = queue[0];
  const stats = practiceDueCounts(cards, now);
  const ready = stats.due + stats.newCount;

  return (
    <div className="space-y-5">
      <header>
        <Link
          href="/review"
          className="-ml-2 inline-flex min-h-10 items-center rounded-md px-2 py-1 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 active:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          ← Review
        </Link>
        <div className="mt-2 flex items-baseline justify-between gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">Schrijven</h1>
          {cards && (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {ready} klaar · {stats.total} totaal
            </span>
          )}
        </div>
      </header>

      {cards === undefined ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Laden…</p>
      ) : stats.total === 0 ? (
        <EmptyState text="Nog geen schrijfopdrachten in review. Voltooi lessen met schrijven om prompts toe te voegen." />
      ) : !current ? (
        <EmptyState text="Geen schrijfopdrachten klaar voor nu. Kom later terug." />
      ) : (
        <WritingReviewCard key={current.id} card={current} />
      )}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">{text}</p>
    </div>
  );
}
