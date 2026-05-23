'use client';

import { useState } from 'react';
import type { KlankSound, KlankenPayload } from '@/lib/types';
import AudioPlayer from '@/components/audio/AudioPlayer';

interface Props {
  lessonId: string;
  payload: KlankenPayload;
}

export default function KlankenSection({ lessonId, payload }: Props) {
  const [selectedId, setSelectedId] = useState<string>(
    payload.sounds[0]?.id ?? '',
  );
  const selected = payload.sounds.find((s) => s.id === selectedId) ?? null;

  return (
    <div className="space-y-4">
      {payload.intro && (
        <p className="px-1 text-sm text-zinc-600 dark:text-zinc-300">
          {payload.intro}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {payload.sounds.map((s) => {
          const active = s.id === selectedId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedId(s.id)}
              className={`inline-flex min-h-11 items-center rounded-lg border px-4 py-2 text-base font-semibold transition-colors ${
                active
                  ? 'border-orange-300 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-200'
                  : 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:active:bg-zinc-700'
              }`}
              aria-pressed={active}
            >
              {s.display}
            </button>
          );
        })}
      </div>

      {selected && <KlankDetail lessonId={lessonId} sound={selected} />}
    </div>
  );
}

function KlankDetail({
  lessonId,
  sound,
}: {
  lessonId: string;
  sound: KlankSound;
}) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {sound.display}
        </p>
        {sound.hint && (
          <p className="text-xs italic text-zinc-500 dark:text-zinc-400">
            {sound.hint}
          </p>
        )}
      </div>

      <ul className="mt-4 space-y-2">
        {sound.examples.map((ex, i) => (
          <li
            key={i}
            className="flex items-center justify-between gap-3 rounded-md border border-zinc-100 bg-zinc-50/50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-800/40"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {ex.nl}
              </p>
              {ex.en && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{ex.en}</p>
              )}
            </div>
            {ex.audioId && (
              <AudioPlayer
                lessonId={lessonId}
                audioId={ex.audioId}
                ariaLabel={`Luister naar: ${ex.nl}`}
              />
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
