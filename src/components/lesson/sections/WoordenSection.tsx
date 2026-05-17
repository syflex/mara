'use client';

import type { WoordenPayload } from '@/lib/types';
import AudioPlayer from '@/components/audio/AudioPlayer';

interface Props {
  lessonId: string;
  payload: WoordenPayload;
}

export default function WoordenSection({ lessonId, payload }: Props) {
  return (
    <div className="space-y-4">
      {payload.intro && (
        <p className="text-sm text-zinc-600">{payload.intro}</p>
      )}
      <ul className="grid gap-3 sm:grid-cols-2">
        {payload.words.map((w, i) => (
          <li
            key={i}
            className="rounded-xl border border-zinc-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-base font-medium text-zinc-900">
                  {w.gender && (
                    <span className="mr-1 text-zinc-400">{w.gender}</span>
                  )}
                  {w.nl}
                </p>
                <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                  <span>{w.en}</span>
                  {w.formality && (
                    <span
                      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                        w.formality === 'formeel'
                          ? 'bg-sky-50 text-sky-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {w.formality}
                    </span>
                  )}
                </p>
              </div>
              {w.audioId && (
                <AudioPlayer lessonId={lessonId} audioId={w.audioId} label="" />
              )}
            </div>
            {w.exampleNl && (
              <div className="mt-3 border-t border-zinc-100 pt-3">
                <p className="text-sm italic text-zinc-700">
                  &ldquo;{w.exampleNl}&rdquo;
                </p>
                {w.exampleEn && (
                  <p className="mt-0.5 text-xs text-zinc-500">{w.exampleEn}</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
