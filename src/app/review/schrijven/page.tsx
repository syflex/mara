'use client';

import Link from 'next/link';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';

export default function SchrijvenReviewPage() {
  const attempts = useLiveQuery(
    () => db.writingAttempts.orderBy('submittedAt').reverse().toArray(),
    [],
  );

  return (
    <div className="space-y-5">
      <header>
        <Link
          href="/review"
          className="-ml-2 inline-flex min-h-10 items-center rounded-md px-2 py-1 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 active:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          ← Review
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Schrijven</h1>
      </header>

      {attempts === undefined ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Laden…</p>
      ) : attempts.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Nog geen schrijfopdrachten ingediend.
        </p>
      ) : (
        <ol className="space-y-3">
          {attempts.map((attempt) => (
            <li key={attempt.id}>
              <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {attempt.promptEn}
                </p>
                <div className="mt-3 space-y-2">
                  <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800/60">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Jouw antwoord
                    </p>
                    <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
                      {attempt.answer}
                    </p>
                  </div>
                  <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      Modelantwoord
                    </p>
                    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-200">
                      {attempt.expected}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
