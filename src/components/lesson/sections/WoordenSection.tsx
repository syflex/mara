'use client';

import Image from 'next/image';
import type { WoordenPayload } from '@/lib/types';
import AudioPlayer from '@/components/audio/AudioPlayer';
import ArticleChip from '@/components/ArticleChip';

interface Props {
  lessonId: string;
  payload: WoordenPayload;
}

export default function WoordenSection({ lessonId, payload }: Props) {
  return (
    <div className="space-y-4">
      {payload.intro && (
        <p className="px-1 text-sm text-zinc-600 dark:text-zinc-300">{payload.intro}</p>
      )}
      <ul className="grid gap-3 sm:grid-cols-2">
        {payload.words.map((w, i) => (
          <li
            key={i}
            className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-900/5 transition-shadow hover:shadow-md dark:bg-zinc-900 dark:ring-white/5"
          >
            {/* Imagery slot — real image when authored, a serif-letter
                placeholder over a soft gradient otherwise. The gradient
                stays subtle in both themes so the letter reads clearly. */}
            <div className="relative aspect-[5/3] bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-rose-950/30">
              {w.imageUrl ? (
                <Image
                  src={w.imageUrl}
                  alt={w.nl}
                  fill
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="absolute inset-0 grid place-content-center font-serif text-4xl font-medium text-zinc-400/70 dark:text-zinc-500/60"
                >
                  {w.nl[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold tracking-tight">
                    {w.gender && <ArticleChip gender={w.gender} />}
                    {w.nl}
                  </p>
                  <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {w.en}
                  </p>
                </div>
                {w.audioId && (
                  <AudioPlayer
                    lessonId={lessonId}
                    audioId={w.audioId}
                    ariaLabel={`Luister naar: ${w.nl}`}
                  />
                )}
              </div>
              {w.formality && (
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                    w.formality === 'formeel'
                      ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300'
                      : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                  }`}
                >
                  {w.formality}
                </span>
              )}
              {w.exampleNl && (
                <div className="border-t border-zinc-100 pt-3 dark:border-zinc-800">
                  <p className="text-sm italic text-zinc-700 dark:text-zinc-300">
                    &ldquo;{w.exampleNl}&rdquo;
                  </p>
                  {w.exampleEn && (
                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                      {w.exampleEn}
                    </p>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
