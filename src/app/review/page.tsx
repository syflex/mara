'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { backfillLessonVocab } from '@/lib/lessons';
import { dueSoonCount } from '@/lib/srs';

export default function ReviewPage() {
  useEffect(() => {
    void backfillLessonVocab();
  }, []);

  const vocab = useLiveQuery(
    () => db.vocab.where('source').equals('lesson').toArray(),
    [],
  );
  const stats = vocab ? dueSoonCount(vocab) : null;
  const ready = stats ? stats.due + stats.newCount : 0;
  const total = stats?.total ?? 0;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Review</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Eén plek voor al je dagelijkse herhaling.
        </p>
      </header>

      <ul className="space-y-2">
        <ReviewRow
          title="Woorden"
          subtitle={
            vocab === undefined
              ? 'Laden…'
              : total === 0
                ? 'Komt na voltooide lessen'
                : ready === 0
                  ? 'Geen woorden klaar — kom later terug'
                  : `${ready} klaar · ${total} totaal`
          }
          href={ready > 0 ? '/vocab' : null}
        />
        <ReviewRow title="Schrijven" subtitle="Beschikbaar later" href={null} />
        <ReviewRow title="Luisteren" subtitle="Beschikbaar later" href={null} />
      </ul>

      {ready > 0 ? (
        <Link
          href="/vocab"
          className="block min-h-12 rounded-xl bg-orange-600 px-4 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-orange-700 active:bg-orange-800"
        >
          Start review →
        </Link>
      ) : (
        <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
          {total === 0
            ? 'Voltooi een les om woorden toe te voegen.'
            : 'Alles bijgewerkt. Mooi werk.'}
        </p>
      )}
    </div>
  );
}

function ReviewRow({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle: string;
  href: string | null;
}) {
  const body = (
    <div
      className={`flex min-h-14 items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-zinc-900/5 transition-colors dark:bg-zinc-900 dark:ring-white/5 ${
        href ? 'hover:bg-zinc-50 active:bg-zinc-100 dark:hover:bg-zinc-800/60 dark:active:bg-zinc-800' : 'opacity-60'
      }`}
    >
      <div>
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</p>
      </div>
      {href && (
        <span className="text-sm text-zinc-400 dark:text-zinc-500" aria-hidden>
          →
        </span>
      )}
    </div>
  );
  if (!href) return <li>{body}</li>;
  return (
    <li>
      <Link href={href}>{body}</Link>
    </li>
  );
}
