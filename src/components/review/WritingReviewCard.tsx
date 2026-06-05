'use client';

// Spaced-review card for a writing prompt: read the English prompt, type the
// Dutch, reveal the model answer for self-comparison, then self-rate. Persists
// on rate and calls onRated(). Key this by card.id so state resets per card.

import { useState } from 'react';
import { reviewPracticeCard, saveWritingAttempt } from '@/lib/practice';
import type { PracticeReviewCard, SrsRating } from '@/lib/types';
import { RatingButtons } from './RatingButtons';
import { AnswerBox } from './AnswerBox';

export default function WritingReviewCard({
  card,
  onRated,
}: {
  card: PracticeReviewCard;
  onRated?: () => void;
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
    if (ratingPending) return;
    setRatingPending(true);
    await reviewPracticeCard(card, rating, attemptId);
    onRated?.();
  }

  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
        Schrijven
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
