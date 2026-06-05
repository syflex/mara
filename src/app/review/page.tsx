'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { backfillLessonVocab } from '@/lib/lessons';
import { backfillPracticeCards } from '@/lib/practice';
import { useTrackTimeOnPage } from '@/lib/activity';
import { buildReviewQueue, vocabDirection, type ReviewItem } from '@/lib/review-session';
import { REVIEW } from '@/lib/config';
import type { PracticeReviewCard, VocabCard } from '@/lib/types';
import VocabReviewCard from '@/components/review/VocabReviewCard';
import WritingReviewCard from '@/components/review/WritingReviewCard';
import ListeningReviewCard from '@/components/review/ListeningReviewCard';
import GrammarReviewCard from '@/components/review/GrammarReviewCard';

export default function ReviewPage() {
  useTrackTimeOnPage();
  useEffect(() => {
    void backfillLessonVocab();
    void backfillPracticeCards();
  }, []);

  const vocab = useLiveQuery(
    () => db.vocab.where('source').equals('lesson').toArray(),
    [],
  );
  const writing = useLiveQuery(
    () => db.practiceReviewCards.where('kind').equals('writing').toArray(),
    [],
  );
  const listening = useLiveQuery(
    () => db.practiceReviewCards.where('kind').equals('listening').toArray(),
    [],
  );
  const grammar = useLiveQuery(
    () => db.practiceReviewCards.where('kind').equals('grammar').toArray(),
    [],
  );
  const loaded =
    vocab !== undefined &&
    writing !== undefined &&
    listening !== undefined &&
    grammar !== undefined;

  // Bumping `round` remounts <Session>, which rebuilds a fresh frozen queue
  // from the latest data — that's how "Nog een ronde" works.
  const [round, setRound] = useState(0);

  if (!loaded) {
    return (
      <div className="space-y-5">
        <Header />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Laden…</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Session
        key={round}
        vocab={vocab}
        writing={writing}
        listening={listening}
        grammar={grammar}
        onNextRound={() => setRound((r) => r + 1)}
      />
    </div>
  );
}

function Session({
  vocab,
  writing,
  listening,
  grammar,
  onNextRound,
}: {
  vocab: VocabCard[];
  writing: PracticeReviewCard[];
  listening: PracticeReviewCard[];
  grammar: PracticeReviewCard[];
  onNextRound: () => void;
}) {
  // `now` and the queue are frozen at mount — a session is one stable run.
  // (Date.now() in a useState initializer keeps it out of the render body.)
  const [now] = useState(() => Date.now());
  const [queue] = useState(() =>
    buildReviewQueue({
      vocab,
      writing,
      listening,
      grammar,
      now,
      sessionMax: REVIEW.sessionMax,
      newPerSession: REVIEW.newPerSession,
    }),
  );
  const [index, setIndex] = useState(0);

  // How many cards a fresh round would pull right now — reflects the ratings
  // already made this round (rated cards drop out), so it's the true remainder.
  const remaining = useMemo(
    () =>
      buildReviewQueue({
        vocab,
        writing,
        listening,
        grammar,
        now,
        sessionMax: REVIEW.sessionMax,
        newPerSession: REVIEW.newPerSession,
      }).length,
    [vocab, writing, listening, grammar, now],
  );

  const total = queue.length;
  const current = queue[index];

  if (total === 0) {
    const hasCards =
      vocab.length + writing.length + listening.length + grammar.length > 0;
    return (
      <>
        <Header />
        <EmptyState hasCards={hasCards} />
      </>
    );
  }

  if (!current) {
    return (
      <>
        <Header />
        <DoneState done={total} remaining={remaining} onNextRound={onNextRound} />
      </>
    );
  }

  const advance = () => setIndex((i) => i + 1);

  return (
    <>
      <SessionHeader index={index} total={total} kind={current.kind} />
      {current.kind === 'vocab' && (
        <VocabReviewCard
          key={current.id}
          card={current.card}
          direction={vocabDirection(current.card)}
          onRated={advance}
        />
      )}
      {current.kind === 'writing' && (
        <WritingReviewCard key={current.id} card={current.card} onRated={advance} />
      )}
      {current.kind === 'listening' && (
        <ListeningReviewCard key={current.id} card={current.card} onRated={advance} />
      )}
      {current.kind === 'grammar' && (
        <GrammarReviewCard key={current.id} card={current.card} onRated={advance} />
      )}
    </>
  );
}

function Header() {
  return (
    <header>
      <h1 className="text-2xl font-semibold tracking-tight">Review</h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Eén ronde voor al je dagelijkse herhaling — woorden, schrijven en luisteren door elkaar.
      </p>
    </header>
  );
}

const KIND_LABEL: Record<ReviewItem['kind'], string> = {
  vocab: 'Woord',
  writing: 'Schrijven',
  listening: 'Luisteren',
  grammar: 'Grammatica',
};

function SessionHeader({
  index,
  total,
  kind,
}: {
  index: number;
  total: number;
  kind: ReviewItem['kind'];
}) {
  const pct = total > 0 ? ((index + 1) / total) * 100 : 0;
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <Link
          href="/"
          className="-ml-2 inline-flex min-h-10 items-center rounded-md px-2 py-1 transition-colors hover:bg-zinc-100 hover:text-zinc-900 active:bg-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          ← Stop
        </Link>
        <span className="inline-flex items-center gap-2 tabular-nums">
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {KIND_LABEL[kind]}
          </span>
          {index + 1} / {total}
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-orange-600 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function EmptyState({ hasCards }: { hasCards: boolean }) {
  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        {hasCards ? 'Niets klaar voor nu — kom later terug.' : 'Nog niets om te herhalen.'}
      </p>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
        {hasCards
          ? 'Je herhaling is bijgewerkt.'
          : 'Voltooi een les om woorden en oefeningen toe te voegen.'}
      </p>
      <Link
        href={hasCards ? '/' : '/lessen'}
        className="mt-5 inline-flex min-h-11 items-center rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:active:bg-zinc-600"
      >
        {hasCards ? '← Terug naar Vandaag' : 'Naar lessen'}
      </Link>
    </div>
  );
}

function DoneState({
  done,
  remaining,
  onNextRound,
}: {
  done: number;
  remaining: number;
  onNextRound: () => void;
}) {
  return (
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900/50 dark:bg-emerald-950/30">
      <p className="text-base font-semibold text-emerald-900 dark:text-emerald-200">
        🎉 Klaar voor vandaag
      </p>
      <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">
        {done} {done === 1 ? 'item' : 'items'} herhaald.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {remaining > 0 && (
          <button
            type="button"
            onClick={onNextRound}
            className="inline-flex min-h-11 items-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 active:bg-emerald-800"
          >
            Nog een ronde ({remaining})
          </button>
        )}
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-xl border border-emerald-200 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-50 active:bg-emerald-100 dark:border-emerald-900/50 dark:bg-zinc-900 dark:text-emerald-200 dark:hover:bg-emerald-950/40 dark:active:bg-emerald-950/60"
        >
          Terug naar Vandaag
        </Link>
      </div>
    </div>
  );
}
