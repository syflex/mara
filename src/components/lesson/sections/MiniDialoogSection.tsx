'use client';

import { useEffect, useRef, useState } from 'react';
import type {
  MiniDialoogLine,
  MiniDialoogPayload,
  MiniDialoogScene,
} from '@/lib/types';
import AudioPlayer from '@/components/audio/AudioPlayer';
import { audioUrl, hasAudio } from '@/lib/audio';
import { MINI_DIALOOG } from '@/lib/config';

interface Props {
  lessonId: string;
  payload: MiniDialoogPayload;
}

export default function MiniDialoogSection({ lessonId, payload }: Props) {
  return (
    <div className="space-y-4">
      {payload.intro && (
        <p className="text-sm text-zinc-600">{payload.intro}</p>
      )}
      <div className="space-y-4">
        {payload.scenes.map((scene) => (
          <Scene key={scene.id} scene={scene} lessonId={lessonId} />
        ))}
      </div>
    </div>
  );
}

const { lineGapMs: LINE_GAP_MS } = MINI_DIALOOG;

function Scene({
  scene,
  lessonId,
}: {
  scene: MiniDialoogScene;
  lessonId: string;
}) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Snapshot the desired index per scheduled step so a stop() between play()
  // and the audio element's actual playback can no-op the late callback.
  const playTokenRef = useRef(0);

  const playableIndices = scene.lines
    .map((line, i) => ({ line, i }))
    .filter(
      ({ line }) => line.audioId && hasAudio(lessonId, line.audioId),
    )
    .map(({ i }) => i);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      audioRef.current?.pause();
    };
  }, []);

  function stop() {
    playTokenRef.current += 1;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.onended = null;
    }
    setActiveIdx(null);
  }

  function playFrom(orderIdx: number) {
    const token = ++playTokenRef.current;
    const lineIdx = playableIndices[orderIdx];
    if (lineIdx === undefined) {
      setActiveIdx(null);
      return;
    }
    const line = scene.lines[lineIdx];
    if (!line.audioId) return;

    setActiveIdx(lineIdx);
    if (!audioRef.current) audioRef.current = new Audio();
    const el = audioRef.current;
    el.src = audioUrl(lessonId, line.audioId);
    el.currentTime = 0;
    el.onended = () => {
      if (token !== playTokenRef.current) return;
      const next = orderIdx + 1;
      if (next >= playableIndices.length) {
        setActiveIdx(null);
        return;
      }
      timerRef.current = setTimeout(() => {
        if (token === playTokenRef.current) playFrom(next);
      }, LINE_GAP_MS);
    };
    el.play().catch(() => {
      if (token === playTokenRef.current) setActiveIdx(null);
    });
  }

  const playing = activeIdx !== null;
  const canPlayAll = playableIndices.length > 0;

  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-4">
      <header className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-900">
              {scene.titleNl}
            </h3>
            <RegisterBadge register={scene.register} />
          </div>
          {scene.titleEn && (
            <p className="mt-0.5 text-xs text-zinc-500">{scene.titleEn}</p>
          )}
        </div>
        {canPlayAll && (
          <button
            type="button"
            onClick={() => (playing ? stop() : playFrom(0))}
            aria-pressed={playing}
            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-1 ${
              playing
                ? 'border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100'
                : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50'
            }`}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
            {playing ? 'Stop scène' : 'Speel scène'}
          </button>
        )}
      </header>
      <ol className="space-y-2">
        {scene.lines.map((line, i) => (
          <li key={line.id}>
            <LineRow
              line={line}
              lessonId={lessonId}
              active={activeIdx === i}
            />
          </li>
        ))}
      </ol>
    </article>
  );
}

function RegisterBadge({ register }: { register: 'informeel' | 'formeel' }) {
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
        register === 'formeel'
          ? 'bg-sky-50 text-sky-700'
          : 'bg-amber-50 text-amber-700'
      }`}
    >
      {register}
    </span>
  );
}

function LineRow({
  line,
  lessonId,
  active,
}: {
  line: MiniDialoogLine;
  lessonId: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
        active
          ? 'border-orange-300 bg-orange-50/60'
          : 'border-zinc-100 bg-zinc-50/60'
      }`}
    >
      <span className="mt-0.5 inline-flex min-w-[3.5rem] shrink-0 items-center justify-center rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-600 ring-1 ring-zinc-200">
        {line.speaker}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-zinc-900">{line.nl}</p>
        {line.en && (
          <p className="mt-0.5 text-xs text-zinc-500">{line.en}</p>
        )}
      </div>
      {line.audioId && (
        <AudioPlayer
          lessonId={lessonId}
          audioId={line.audioId}
          ariaLabel={`Luister: ${line.speaker} — ${line.nl}`}
        />
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6 4.5v15l13-7.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}
