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
        <p className="mt-1 text-sm text-zinc-500">
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
          className="block rounded-md bg-orange-600 px-4 py-3 text-center text-sm font-medium text-white hover:bg-orange-700"
        >
          Start review →
        </Link>
      ) : (
        <p className="text-center text-xs text-zinc-500">
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
      className={`flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors ${
        href ? 'hover:border-zinc-300 hover:bg-zinc-50' : 'opacity-60'
      }`}
    >
      <div>
        <p className="text-sm font-medium text-zinc-900">{title}</p>
        <p className="mt-0.5 text-xs text-zinc-500">{subtitle}</p>
      </div>
      {href && (
        <span className="text-sm text-zinc-400" aria-hidden>
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
