'use client';

// Spaced-review card for a listening question: play the clip, answer (MC or
// typed) before the transcript is revealed, auto-check, then self-rate (the
// implied rating is ring-highlighted). Persists on rate and calls onRated().
// Key this by card.id so state resets per card.

import { useState } from 'react';
import { reviewPracticeCard, saveListeningAttempt } from '@/lib/practice';
import { SRS_RATING, type PracticeReviewCard, type SrsRating } from '@/lib/types';
import AudioPlayer from '@/components/audio/AudioPlayer';
import { RatingButtons } from './RatingButtons';
import { AnswerBox } from './AnswerBox';

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

export default function ListeningReviewCard({
  card,
  onRated,
}: {
  card: PracticeReviewCard;
  onRated?: () => void;
}) {
  const [state, setState] = useState<AnswerState>({ kind: 'unanswered' });
  const [typedAnswer, setTypedAnswer] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [ratingPending, setRatingPending] = useState(false);
  const hasChoices = !!card.choices?.length;
  const suggestedRating =
    state.kind === 'answered' && state.correct ? SRS_RATING.GOOD : SRS_RATING.AGAIN;

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
    if (state.kind !== 'answered' || ratingPending) return;
    setRatingPending(true);
    await reviewPracticeCard(card, rating, state.attemptId);
    onRated?.();
  }

  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Luisteren
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
              <p className="text-sm text-zinc-800 dark:text-zinc-100">{card.transcriptNl}</p>
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
