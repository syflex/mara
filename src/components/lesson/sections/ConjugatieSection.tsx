'use client';

// Typed conjugation drill: one row per pronoun, learner types the form.
// Optional audio model per row plays the full "pronoun form" after answering.

import { useState } from 'react';
import type { ConjugatieItem, ConjugatiePayload } from '@/lib/types';
import AudioPlayer from '@/components/audio/AudioPlayer';

interface Props {
  lessonId: string;
  payload: ConjugatiePayload;
}

export default function ConjugatieSection({ lessonId, payload }: Props) {
  return (
    <div className="space-y-4">
      {payload.intro && (
        <p className="px-1 text-sm text-zinc-600 dark:text-zinc-300">
          {payload.intro}
        </p>
      )}

      <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Vervoeg <span className="text-zinc-900 dark:text-zinc-100">{payload.infinitive}</span>
        </p>
        <ul className="mt-3 space-y-2">
          {payload.items.map((item, i) => (
            <li key={i}>
              <ConjugatieRow lessonId={lessonId} item={item} />
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

type Verdict = null | 'correct' | 'wrong';

function ConjugatieRow({
  lessonId,
  item,
}: {
  lessonId: string;
  item: ConjugatieItem;
}) {
  const [value, setValue] = useState('');
  const [verdict, setVerdict] = useState<Verdict>(null);
  const locked = verdict !== null;

  function submit() {
    if (!value.trim()) return;
    const correct = normalize(value) === normalize(item.expected);
    setVerdict(correct ? 'correct' : 'wrong');
  }

  return (
    <div
      className={`flex flex-wrap items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors ${
        verdict === 'correct'
          ? 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/30'
          : verdict === 'wrong'
            ? 'border-red-200 bg-red-50/60 dark:border-red-900 dark:bg-red-950/30'
            : 'border-zinc-200 bg-zinc-50/40 dark:border-zinc-800 dark:bg-zinc-800/40'
      }`}
    >
      <span className="w-24 shrink-0 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
        {item.pronoun}
      </span>
      {locked ? (
        <span className="flex-1 min-w-0 text-base font-semibold">
          <span
            className={
              verdict === 'correct'
                ? 'text-emerald-700 dark:text-emerald-300'
                : 'text-red-700 line-through dark:text-red-300'
            }
          >
            {value}
          </span>
          {verdict === 'wrong' && (
            <span className="ml-2 text-emerald-700 dark:text-emerald-300">
              → {item.expected}
            </span>
          )}
        </span>
      ) : (
        <form
          className="flex flex-1 flex-wrap items-center gap-2"
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
            placeholder={item.hint ?? ''}
            aria-label={`Vervoeging voor ${item.pronoun}`}
            className="min-h-11 min-w-0 flex-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700 active:bg-orange-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500"
          >
            OK
          </button>
        </form>
      )}
      {locked && item.audioId && (
        <AudioPlayer
          lessonId={lessonId}
          audioId={item.audioId}
          ariaLabel={`Luister: ${item.pronoun} ${item.expected}`}
          withSlow={false}
        />
      )}
    </div>
  );
}
