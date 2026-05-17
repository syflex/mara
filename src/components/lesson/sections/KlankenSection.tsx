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
        <p className="text-sm text-zinc-600">{payload.intro}</p>
      )}

      <div className="flex flex-wrap gap-2">
        {payload.sounds.map((s) => {
          const active = s.id === selectedId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedId(s.id)}
              className={`rounded-lg border px-4 py-2 text-base font-semibold transition-colors ${
                active
                  ? 'border-orange-300 bg-orange-50 text-orange-800'
                  : 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50'
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
    <article className="rounded-xl border border-zinc-200 bg-white p-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-lg font-semibold tracking-tight text-zinc-900">
          {sound.display}
        </p>
        {sound.hint && (
          <p className="text-xs italic text-zinc-500">{sound.hint}</p>
        )}
      </div>

      <ul className="mt-4 space-y-2">
        {sound.examples.map((ex, i) => (
          <li
            key={i}
            className="flex items-center justify-between gap-3 rounded-md border border-zinc-100 bg-zinc-50/50 px-3 py-2"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-900">{ex.nl}</p>
              {ex.en && <p className="text-xs text-zinc-500">{ex.en}</p>}
            </div>
            {ex.audioId && (
              <AudioPlayer
                lessonId={lessonId}
                audioId={ex.audioId}
                label=""
              />
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
