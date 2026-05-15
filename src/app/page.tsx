'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { seedIfEmpty } from '@/lib/seed';
import { dueSoonCount } from '@/lib/srs';

export default function Home() {
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    seedIfEmpty().then(() => setSeeded(true));
  }, []);

  const knm = useLiveQuery(() => db.knmQuestions.toArray(), [seeded]);
  const vocab = useLiveQuery(() => db.vocab.toArray(), [seeded]);

  const knmStats = knm ? dueSoonCount(knm) : null;
  const vocabStats = vocab ? dueSoonCount(vocab) : null;

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Vandaag</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Inburgering A2 prep — pick a drill below.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <DrillCard
          href="/knm"
          title="KNM"
          subtitle="Kennis Nederlandse Maatschappij"
          due={knmStats?.due ?? 0}
          newCount={knmStats?.newCount ?? 0}
          total={knmStats?.total ?? 0}
          accent="bg-orange-50 border-orange-200"
        />
        <DrillCard
          href="/vocab"
          title="Woordenschat"
          subtitle="A1 / A2 vocabulary"
          due={vocabStats?.due ?? 0}
          newCount={vocabStats?.newCount ?? 0}
          total={vocabStats?.total ?? 0}
          accent="bg-sky-50 border-sky-200"
        />
        <DrillCard
          href="/flashcards"
          title="Mijn flashcards"
          subtitle="Custom decks (later)"
          due={0}
          newCount={0}
          total={0}
          accent="bg-zinc-50 border-zinc-200"
          disabled
        />
        <DrillCard
          href="/speaking"
          title="Spreken"
          subtitle="Speaking prompt drills (later)"
          due={0}
          newCount={0}
          total={0}
          accent="bg-zinc-50 border-zinc-200"
          disabled
        />
      </div>

      <p className="text-xs text-zinc-400">
        Data stored locally in your browser (IndexedDB). No account, no sync — yet.
      </p>
    </div>
  );
}

function DrillCard({
  href,
  title,
  subtitle,
  due,
  newCount,
  total,
  accent,
  disabled = false,
}: {
  href: string;
  title: string;
  subtitle: string;
  due: number;
  newCount: number;
  total: number;
  accent: string;
  disabled?: boolean;
}) {
  const inner = (
    <div
      className={`rounded-lg border p-4 ${accent} ${
        disabled ? 'opacity-50' : 'hover:shadow-sm'
      }`}
    >
      <div className="flex items-baseline justify-between">
        <h2 className="font-semibold">{title}</h2>
        <span className="text-xs text-zinc-500">{total} cards</span>
      </div>
      <p className="mt-1 text-xs text-zinc-600">{subtitle}</p>
      <div className="mt-3 flex gap-3 text-sm">
        <span className="font-medium text-orange-700">{due} due</span>
        <span className="text-zinc-500">{newCount} new</span>
      </div>
    </div>
  );

  if (disabled) return inner;
  return <Link href={href}>{inner}</Link>;
}
