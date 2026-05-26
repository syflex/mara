'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import {
  backfillPracticeCards,
  practiceDueCounts,
  reviewPracticeCard,
  saveWritingAttempt,
} from '@/lib/practice';
import { isDue } from '@/lib/srs';
import {
  SRS_RATING,
  type PracticeReviewCard,
  type SrsRating,
} from '@/lib/types';

export default function SchrijvenReviewPage() {
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
        <WritingCard key={current.id} card={current} remaining={queue.length} />
      )}
    </div>
  );
}

function WritingCard({
  card,
  remaining,
}: {
  card: PracticeReviewCard;
  remaining: number;
}) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [attemptId, setAttemptId] = useState<string | undefined>();
  const [ratingPending, setRatingPending] = useState(false);

  async function submit() {
    if (!answer.trim()) return;
    const id = await saveWritingAttempt({
      cardId: card.id,
      lessonId: card.lessonId,
      sectionId: card.sectionId,
      itemIndex: card.itemIndex,
      promptEn: card.promptEn ?? card.prompt,
      answer: answer.trim(),
      expected: card.expected,
    });
    setAttemptId(id);
    setSubmitted(true);
  }

  async function rate(rating: SrsRating) {
    setRatingPending(true);
    await reviewPracticeCard(card, rating, attemptId);
    setAnswer('');
    setSubmitted(false);
    setAttemptId(undefined);
    setRatingPending(false);
  }

  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
        Prompt · {remaining} in wachtrij
      </p>
      <h2 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {card.promptEn ?? card.prompt}
      </h2>

      {!submitted ? (
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Schrijf je zin…"
            aria-label="Jouw zin"
            className="min-h-12 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
          <button
            type="submit"
            disabled={!answer.trim()}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-orange-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700 active:bg-orange-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500"
          >
            Toon modelantwoord
          </button>
        </form>
      ) : (
        <div className="mt-4 space-y-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <AnswerBox title="Jouw antwoord" text={answer} />
            <AnswerBox title="Modelantwoord" text={card.expected} positive />
          </div>
          <div>
            <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
              Beoordeel je antwoord. Dit bepaalt wanneer je deze prompt weer ziet.
            </p>
            <RatingButtons disabled={ratingPending} onRate={rate} />
          </div>
        </div>
      )}
    </article>
  );
}

function AnswerBox({
  title,
  text,
  positive = false,
}: {
  title: string;
  text: string;
  positive?: boolean;
}) {
  return (
    <div
      className={`rounded-md border px-3 py-2 ${
        positive
          ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30'
          : 'border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/60'
      }`}
    >
      <p
        className={`text-[10px] font-semibold uppercase tracking-wider ${
          positive
            ? 'text-emerald-700 dark:text-emerald-300'
            : 'text-zinc-500 dark:text-zinc-400'
        }`}
      >
        {title}
      </p>
      <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{text || '—'}</p>
    </div>
  );
}

function RatingButtons({
  disabled,
  onRate,
}: {
  disabled: boolean;
  onRate: (rating: SrsRating) => Promise<void>;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <RateBtn
        label="Again"
        color="bg-red-600 hover:bg-red-700"
        disabled={disabled}
        onClick={() => void onRate(SRS_RATING.AGAIN)}
      />
      <RateBtn
        label="Hard"
        color="bg-amber-600 hover:bg-amber-700"
        disabled={disabled}
        onClick={() => void onRate(SRS_RATING.HARD)}
      />
      <RateBtn
        label="Good"
        color="bg-emerald-600 hover:bg-emerald-700"
        disabled={disabled}
        onClick={() => void onRate(SRS_RATING.GOOD)}
      />
      <RateBtn
        label="Easy"
        color="bg-sky-600 hover:bg-sky-700"
        disabled={disabled}
        onClick={() => void onRate(SRS_RATING.EASY)}
      />
    </div>
  );
}

function RateBtn({
  label,
  color,
  disabled,
  onClick,
}: {
  label: string;
  color: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`min-h-12 rounded-xl px-2 py-3 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${color}`}
    >
      {label}
    </button>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">{text}</p>
    </div>
  );
}
