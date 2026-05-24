'use client';

// Free-write practice: learner reads an English prompt, types a Dutch
// sentence, then the model (expected) is revealed for self-comparison.
// No grading — personalized answers (name, city, age) can't be string-matched.

import { useState } from 'react';
import type { SchrijvenItem, SchrijvenPayload } from '@/lib/types';

interface Props {
  lessonId: string;
  payload: SchrijvenPayload;
}

export default function SchrijvenSection({ payload }: Props) {
  return (
    <div className="space-y-4">
      {payload.intro && (
        <p className="px-1 text-sm text-zinc-600 dark:text-zinc-300">
          {payload.intro}
        </p>
      )}
      <ol className="space-y-3">
        {payload.items.map((item, i) => (
          <li key={i}>
            <SchrijvenCard item={item} index={i + 1} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function SchrijvenCard({ item, index }: { item: SchrijvenItem; index: number }) {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function submit() {
    if (!value.trim()) return;
    setSubmitted(true);
  }

  function tryAgain() {
    setSubmitted(false);
    setValue('');
  }

  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <p className="text-base text-zinc-900 dark:text-zinc-100">
        <span className="mr-2 text-xs font-medium text-zinc-400 dark:text-zinc-500">
          {index}.
        </span>
        <span className="italic">&ldquo;{item.promptEn}&rdquo;</span>
      </p>
      {item.hint && !submitted && (
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Tip: {item.hint}
        </p>
      )}

      {!submitted ? (
        <form
          className="mt-3 flex flex-wrap items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Schrijf je zin…"
            aria-label="Jouw zin"
            className="min-h-11 min-w-0 flex-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700 active:bg-orange-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500"
          >
            OK
          </button>
        </form>
      ) : (
        <div className="mt-3 space-y-2">
          <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800/60">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Jouw antwoord
            </p>
            <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{value}</p>
          </div>
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              Modelantwoord
            </p>
            <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-200">
              {item.expected}
            </p>
          </div>
          <button
            type="button"
            onClick={tryAgain}
            className="inline-flex min-h-9 items-center text-xs font-medium text-zinc-500 underline-offset-2 hover:text-zinc-800 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Opnieuw proberen
          </button>
        </div>
      )}
    </article>
  );
}
