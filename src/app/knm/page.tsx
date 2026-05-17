'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { KNM_THEMES, SRS_RATING, type KnmQuestion, type SrsRating } from '@/lib/types';
import { review, isDue } from '@/lib/srs';
import { seedKnmIfEmpty } from '@/lib/seed';

export default function KnmPage() {
  const [seeded, setSeeded] = useState(false);
  useEffect(() => {
    seedKnmIfEmpty().then(() => setSeeded(true));
  }, []);

  const all = useLiveQuery(() => db.knmQuestions.toArray(), [seeded]);

  const queue = useMemo(() => {
    if (!all) return [] as KnmQuestion[];
    const now = Date.now();
    const due = all.filter((q) => q.srs.state !== 'new' && isDue(q.srs, now));
    const fresh = all.filter((q) => q.srs.state === 'new');
    return [...due, ...fresh].sort((a, b) => a.srs.due - b.srs.due);
  }, [all]);

  const current = queue[0];

  const [revealed, setRevealed] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => {
    setRevealed(false);
    setPicked(null);
  }, [current?.id]);

  async function handleAnswer(idx: number) {
    if (revealed || !current) return;
    setPicked(idx);
    setRevealed(true);
  }

  async function handleRate(rating: SrsRating) {
    if (!current) return;
    const nextSrs = review(current.srs, rating);
    await db.knmQuestions.update(current.id, { srs: nextSrs });
  }

  if (!all) {
    return <p className="text-sm text-zinc-500">Loading…</p>;
  }

  if (!current) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">KNM</h1>
        <p className="text-sm text-zinc-600">
          Geen vragen klaar voor nu. Goed bezig! Kom later terug — kaarten worden ingepland op basis van wat je goed of fout hebt.
        </p>
        <Link href="/" className="text-sm text-orange-700 underline">
          ← Terug
        </Link>
      </div>
    );
  }

  const themeMeta = KNM_THEMES.find((t) => t.id === current.theme);
  const correctIdx = current.correctIndex;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-800">
          {themeMeta?.nl ?? current.theme}
        </span>
        <span className="text-xs text-zinc-500">{queue.length} in queue</span>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <h2 className="text-lg font-medium leading-snug">{current.questionNl}</h2>
        {current.questionEn && (
          <p className="mt-1 text-sm text-zinc-500">{current.questionEn}</p>
        )}

        <ul className="mt-4 space-y-2">
          {current.choices.map((c, i) => {
            const isPicked = picked === i;
            const isCorrect = i === correctIdx;
            let cls = 'border-zinc-200 bg-white hover:bg-zinc-50';
            if (revealed) {
              if (isCorrect) cls = 'border-green-500 bg-green-50';
              else if (isPicked) cls = 'border-red-500 bg-red-50';
              else cls = 'border-zinc-200 bg-white opacity-60';
            }
            return (
              <li key={i}>
                <button
                  onClick={() => handleAnswer(i)}
                  disabled={revealed}
                  className={`w-full rounded-md border px-3 py-2 text-left text-sm transition ${cls}`}
                >
                  <span className="mr-2 inline-block w-5 text-zinc-400">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  <span>{c.nl}</span>
                  {c.en && revealed && (
                    <span className="ml-2 text-xs text-zinc-500">— {c.en}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {revealed && (current.explanationNl || current.explanationEn) && (
          <div className="mt-4 rounded-md bg-zinc-50 p-3 text-sm">
            {current.explanationNl && <p>{current.explanationNl}</p>}
            {current.explanationEn && (
              <p className="mt-1 text-zinc-500">{current.explanationEn}</p>
            )}
          </div>
        )}
      </div>

      {revealed && (
        <div>
          <p className="mb-2 text-xs text-zinc-500">
            Hoe goed wist je dit? (Bepaalt wanneer je deze vraag weer ziet.)
          </p>
          <div className="grid grid-cols-4 gap-2">
            <RateBtn label="Again" color="bg-red-600" onClick={() => handleRate(SRS_RATING.AGAIN)} />
            <RateBtn label="Hard" color="bg-amber-600" onClick={() => handleRate(SRS_RATING.HARD)} />
            <RateBtn label="Good" color="bg-emerald-600" onClick={() => handleRate(SRS_RATING.GOOD)} />
            <RateBtn label="Easy" color="bg-sky-600" onClick={() => handleRate(SRS_RATING.EASY)} />
          </div>
        </div>
      )}
    </div>
  );
}

function RateBtn({ label, color, onClick }: { label: string; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md ${color} px-3 py-2 text-sm font-medium text-white hover:opacity-90`}
    >
      {label}
    </button>
  );
}
