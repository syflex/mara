'use client';

// Spaced-review card for a vocab word: show Dutch (+ article + audio), reveal
// English + example, then self-rate. Persists on rate and calls onRated().
// Consumers MUST key this by card.id so internal state resets per card.

import { useState } from 'react';
import { db } from '@/lib/db';
import { review } from '@/lib/srs';
import type { SrsRating, VocabCard } from '@/lib/types';
import AudioPlayer from '@/components/audio/AudioPlayer';
import ArticleChip from '@/components/ArticleChip';
import { RatingButtons } from './RatingButtons';

export default function VocabReviewCard({
  card,
  onRated,
}: {
  card: VocabCard;
  onRated?: () => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const [pending, setPending] = useState(false);
  const hasAudio = card.lessonId && card.audioId;

  async function rate(rating: SrsRating) {
    if (pending) return;
    setPending(true);
    await db.vocab.update(card.id, { srs: review(card.srs, rating) });
    onRated?.();
  }

  return (
    <div className="space-y-6">
      <div className="relative rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
        {hasAudio && (
          <div className="absolute right-4 top-4">
            <AudioPlayer
              lessonId={card.lessonId as string}
              audioId={card.audioId as string}
              ariaLabel={`Luister naar: ${card.dutch}`}
            />
          </div>
        )}

        <p className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {card.gender && <ArticleChip gender={card.gender} />}
          {card.dutch}
        </p>

        {revealed ? (
          <>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300">{card.english}</p>
            {card.exampleNl && (
              <div className="mt-6 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <p className="text-sm italic text-zinc-700 dark:text-zinc-300">
                  &ldquo;{card.exampleNl}&rdquo;
                </p>
                {card.exampleEn && (
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{card.exampleEn}</p>
                )}
              </div>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mt-6 inline-flex min-h-11 items-center rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:active:bg-zinc-600"
          >
            Toon antwoord
          </button>
        )}
      </div>

      {revealed && (
        <div>
          <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
            Hoe goed wist je dit? Dit bepaalt wanneer je het woord weer ziet.
          </p>
          <RatingButtons disabled={pending} onRate={rate} />
        </div>
      )}
    </div>
  );
}
