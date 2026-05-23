'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { backfillLessonVocab } from '@/lib/lessons';
import { isDue, review } from '@/lib/srs';
import { SRS_RATING, type SrsRating, type VocabCard } from '@/lib/types';
import AudioPlayer from '@/components/audio/AudioPlayer';
import ArticleChip from '@/components/ArticleChip';

export default function WoordreviewPage() {
  useEffect(() => {
    void backfillLessonVocab();
  }, []);

  const all = useLiveQuery(
    () => db.vocab.where('source').equals('lesson').toArray(),
    [],
  );

  // Snapshot "now" once per mount. A vocab session is a discrete activity;
  // freezing `now` keeps the queue stable (cards don't appear/disappear
  // mid-session) and satisfies React's purity rule by keeping Date.now()
  // out of the render body. Newly-due cards show up next time you visit.
  const [now] = useState(() => Date.now());

  const queue = useMemo(() => {
    if (!all) return [] as VocabCard[];
    const due = all.filter(
      (c) => c.srs.state !== 'new' && isDue(c.srs, now),
    );
    const fresh = all.filter((c) => c.srs.state === 'new');
    return [...due, ...fresh].sort((a, b) => a.srs.due - b.srs.due);
  }, [all, now]);

  const current = queue[0];
  const [revealed, setRevealed] = useState(false);
  const [cardKey, setCardKey] = useState(0);

  if (!all) {
    return <p className="text-sm text-zinc-500 dark:text-zinc-400">Laden…</p>;
  }

  if (all.length === 0) {
    return <EmptyState reason="empty" />;
  }

  if (!current) {
    return <EmptyState reason="done" totalCount={all.length} />;
  }

  async function handleRate(rating: SrsRating) {
    if (!current) return;
    const nextSrs = review(current.srs, rating);
    await db.vocab.update(current.id, { srs: nextSrs });
    setRevealed(false);
    setCardKey((k) => k + 1);
  }

  return (
    <div className="space-y-6">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Woordreview</h1>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {queue.length} in de wachtrij · {all.length} totaal
        </span>
      </header>

      <VocabCardView
        key={cardKey}
        card={current}
        revealed={revealed}
        onReveal={() => setRevealed(true)}
      />

      {revealed && (
        <div>
          <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
            Hoe goed wist je dit? Dit bepaalt wanneer je het woord weer ziet.
          </p>
          <div className="grid grid-cols-4 gap-2">
            <RateBtn
              label="Again"
              color="bg-red-600 hover:bg-red-700"
              onClick={() => void handleRate(SRS_RATING.AGAIN)}
            />
            <RateBtn
              label="Hard"
              color="bg-amber-600 hover:bg-amber-700"
              onClick={() => void handleRate(SRS_RATING.HARD)}
            />
            <RateBtn
              label="Good"
              color="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => void handleRate(SRS_RATING.GOOD)}
            />
            <RateBtn
              label="Easy"
              color="bg-sky-600 hover:bg-sky-700"
              onClick={() => void handleRate(SRS_RATING.EASY)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function VocabCardView({
  card,
  revealed,
  onReveal,
}: {
  card: VocabCard;
  revealed: boolean;
  onReveal: () => void;
}) {
  const hasAudio = card.lessonId && card.audioId;
  return (
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
          onClick={onReveal}
          className="mt-6 inline-flex min-h-11 items-center rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:active:bg-zinc-600"
        >
          Toon antwoord
        </button>
      )}
    </div>
  );
}

function RateBtn({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-12 rounded-xl px-2 py-3 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95 ${color}`}
    >
      {label}
    </button>
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
