'use client';

// Spaced-review card for grammar (conjugation, de/het, word order, drills).
// Multiple-choice or typed, auto-checked against expected (+ acceptVariants),
// then self-rated with the implied rating ring-highlighted. Persists on rate
// and calls onRated(). Key this by card.id so state resets per card.

import { useState } from 'react';
import { reviewPracticeCard } from '@/lib/practice';
import { matchesExpected } from '@/lib/answer-check';
import { SRS_RATING, type PracticeReviewCard, type SrsRating } from '@/lib/types';
import AudioPlayer from '@/components/audio/AudioPlayer';
import { RatingButtons } from './RatingButtons';
import { AnswerBox } from './AnswerBox';

type AnswerState =
  | { kind: 'unanswered' }
  | { kind: 'answered'; answer: string; correct: boolean };

export default function GrammarReviewCard({
  card,
  onRated,
}: {
  card: PracticeReviewCard;
  onRated?: () => void;
}) {
  const [state, setState] = useState<AnswerState>({ kind: 'unanswered' });
  const [typed, setTyped] = useState('');
  const [ratingPending, setRatingPending] = useState(false);
  const hasChoices = !!card.choices?.length;
  const suggestedRating =
    state.kind === 'answered' && state.correct ? SRS_RATING.GOOD : SRS_RATING.AGAIN;

  function answer(value: string, correct: boolean) {
    if (state.kind !== 'unanswered') return;
    setState({ kind: 'answered', answer: value.trim(), correct });
  }

  async function rate(rating: SrsRating) {
    if (state.kind !== 'answered' || ratingPending) return;
    setRatingPending(true);
    await reviewPracticeCard(card, rating);
    onRated?.();
  }

  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Grammatica
          </p>
          <h2 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {card.prompt}
          </h2>
          {card.promptEn && (
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{card.promptEn}</p>
          )}
        </div>
        {card.audioId && (
          <AudioPlayer
            lessonId={card.lessonId}
            audioId={card.audioId}
            ariaLabel="Speel het voorbeeld af"
          />
        )}
      </div>

      {hasChoices ? (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {card.choices?.map((choice) => {
            const answered = state.kind === 'answered';
            const picked = answered && state.answer === choice;
            const correct = choice === card.expected;
            let cls =
              'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-700 dark:active:bg-zinc-600';
            if (answered) {
              if (correct) {
                cls =
                  'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200';
              } else if (picked) {
                cls =
                  'border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200';
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
                onClick={() => answer(choice, choice === card.expected)}
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
            answer(typed, matchesExpected(typed, card.expected, card.acceptVariants));
          }}
        >
          <input
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Typ je antwoord…"
            aria-label="Jouw antwoord"
            className="min-h-11 min-w-0 flex-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
          <button
            type="submit"
            disabled={!typed.trim()}
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
