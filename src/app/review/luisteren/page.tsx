'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import {
  backfillPracticeCards,
  practiceDueCounts,
  reviewPracticeCard,
  saveListeningAttempt,
} from '@/lib/practice';
import { isDue } from '@/lib/srs';
import {
  SRS_RATING,
  type PracticeReviewCard,
  type SrsRating,
} from '@/lib/types';
import AudioPlayer from '@/components/audio/AudioPlayer';

type AnswerState =
  | { kind: 'unanswered' }
  | { kind: 'answered'; answer: string; correct: boolean; attemptId?: string };

function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export default function LuisterenReviewPage() {
  useEffect(() => {
    void backfillPracticeCards();
  }, []);

  const cards = useLiveQuery(
    () => db.practiceReviewCards.where('kind').equals('listening').toArray(),
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
          <h1 className="text-2xl font-semibold tracking-tight">Luisteren</h1>
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
        <EmptyState text="Nog geen luistervragen in review. Voltooi lessen met luisteren om vragen toe te voegen." />
      ) : !current ? (
        <EmptyState text="Geen luistervragen klaar voor nu. Kom later terug." />
      ) : (
        <ListeningCard key={current.id} card={current} remaining={queue.length} />
      )}
    </div>
  );
}

function ListeningCard({
  card,
  remaining,
}: {
  card: PracticeReviewCard;
  remaining: number;
}) {
  const [state, setState] = useState<AnswerState>({ kind: 'unanswered' });
  const [typedAnswer, setTypedAnswer] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [ratingPending, setRatingPending] = useState(false);
  const hasChoices = !!card.choices?.length;
  const suggestedRating =
    state.kind === 'answered' && state.correct
      ? SRS_RATING.GOOD
      : SRS_RATING.AGAIN;

  async function answer(value: string, correct: boolean) {
    if (state.kind !== 'unanswered') return;
    const attemptId = await saveListeningAttempt({
      cardId: card.id,
      lessonId: card.lessonId,
      sectionId: card.sectionId,
      questionIndex: card.itemIndex,
      questionNl: card.prompt,
      answer: value.trim(),
      expected: card.expected,
      correct,
    });
    setState({ kind: 'answered', answer: value.trim(), correct, attemptId });
  }

  async function rate(rating: SrsRating) {
    if (state.kind !== 'answered') return;
    setRatingPending(true);
    await reviewPracticeCard(card, rating, state.attemptId);
    setState({ kind: 'unanswered' });
    setTypedAnswer('');
    setShowTranscript(false);
    setRatingPending(false);
  }

  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Vraag · {remaining} in wachtrij
          </p>
          <h2 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {card.prompt}
          </h2>
        </div>
        {card.audioId && (
          <AudioPlayer
            lessonId={card.lessonId}
            audioId={card.audioId}
            ariaLabel="Speel het fragment af"
          />
        )}
      </div>

      {card.transcriptNl && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowTranscript((v) => !v)}
            aria-expanded={showTranscript}
            className="inline-flex min-h-10 items-center gap-1 text-xs font-medium text-zinc-500 underline-offset-2 hover:text-zinc-700 hover:underline active:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 dark:active:text-zinc-100"
          >
            {showTranscript ? 'Verberg transcript' : 'Toon transcript'}
          </button>
          {showTranscript && (
            <div className="mt-2 rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-800/60">
              <p className="text-sm text-zinc-800 dark:text-zinc-100">
                {card.transcriptNl}
              </p>
              {card.transcriptEn && (
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {card.transcriptEn}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {hasChoices ? (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {card.choices?.map((choice) => {
            const answered = state.kind === 'answered';
            const picked = answered && state.answer === choice;
            const correct = choice === card.expected;
            let cls =
              'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-700 dark:active:bg-zinc-600';
            if (answered) {
              if (picked && correct) {
                cls =
                  'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200';
              } else if (picked && !correct) {
                cls =
                  'border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200';
              } else if (correct) {
                cls =
                  'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200';
              } else {
                cls =
                  'border-zinc-200 bg-white text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400';
              }
            }
            return (
              <button
                key={choice}
                type="button"
                disabled={answered}
                onClick={() => void answer(choice, choice === card.expected)}
                className={`inline-flex min-h-12 items-center justify-center rounded-lg border px-4 py-2 text-base font-semibold transition-colors disabled:cursor-default ${cls}`}
              >
                {choice}
              </button>
            );
          })}
        </div>
      ) : state.kind === 'unanswered' ? (
        <form
          className="mt-4 flex flex-wrap items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void answer(typedAnswer, normalize(typedAnswer) === normalize(card.expected));
          }}
        >
          <input
            type="text"
            value={typedAnswer}
            onChange={(e) => setTypedAnswer(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Typ wat je hoort…"
            aria-label="Jouw antwoord"
            className="min-h-11 min-w-0 flex-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
          <button
            type="submit"
            disabled={!typedAnswer.trim()}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700 active:bg-orange-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500"
          >
            Controleer
          </button>
        </form>
      ) : (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <AnswerBox
            title="Jouw antwoord"
            text={state.answer}
            positive={state.correct}
            negative={!state.correct}
          />
          <AnswerBox title="Antwoord" text={card.expected} positive />
        </div>
      )}

      {state.kind === 'answered' && (
        <div className="mt-5 border-t border-zinc-100 pt-4 dark:border-zinc-800">
          <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
            {state.correct
              ? 'Correct. Gebruik Good, of Easy als dit vanzelf ging.'
              : 'Nog niet goed. Gebruik Again, of Hard als je het bijna had.'}
          </p>
          <RatingButtons
            disabled={ratingPending}
            suggestedRating={suggestedRating}
            onRate={rate}
          />
        </div>
      )}
    </article>
  );
}

function AnswerBox({
  title,
  text,
  positive = false,
  negative = false,
}: {
  title: string;
  text: string;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <div
      className={`rounded-md border px-3 py-2 ${
        positive
          ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30'
          : negative
            ? 'border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30'
            : 'border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/60'
      }`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {title}
      </p>
      <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{text || '—'}</p>
    </div>
  );
}

function RatingButtons({
  disabled,
  suggestedRating,
  onRate,
}: {
  disabled: boolean;
  suggestedRating: SrsRating;
  onRate: (rating: SrsRating) => Promise<void>;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <RateBtn
        label="Again"
        color="bg-red-600 hover:bg-red-700"
        active={suggestedRating === SRS_RATING.AGAIN}
        disabled={disabled}
        onClick={() => void onRate(SRS_RATING.AGAIN)}
      />
      <RateBtn
        label="Hard"
        color="bg-amber-600 hover:bg-amber-700"
        active={suggestedRating === SRS_RATING.HARD}
        disabled={disabled}
        onClick={() => void onRate(SRS_RATING.HARD)}
      />
      <RateBtn
        label="Good"
        color="bg-emerald-600 hover:bg-emerald-700"
        active={suggestedRating === SRS_RATING.GOOD}
        disabled={disabled}
        onClick={() => void onRate(SRS_RATING.GOOD)}
      />
      <RateBtn
        label="Easy"
        color="bg-sky-600 hover:bg-sky-700"
        active={suggestedRating === SRS_RATING.EASY}
        disabled={disabled}
        onClick={() => void onRate(SRS_RATING.EASY)}
      />
    </div>
  );
}

function RateBtn({
  label,
  color,
  active,
  disabled,
  onClick,
}: {
  label: string;
  color: string;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`min-h-12 rounded-xl px-2 py-3 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${color} ${
        active ? 'ring-2 ring-zinc-900 ring-offset-2 dark:ring-white dark:ring-offset-zinc-900' : ''
      }`}
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
