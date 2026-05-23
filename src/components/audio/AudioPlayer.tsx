'use client';

import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { audioUrl, hasAudio } from '@/lib/audio';

interface Props {
  lessonId: string;
  audioId: string;
  // Used for both the tooltip and the screen-reader label on the normal-speed
  // button. The slow-speed button derives its label by appending "(langzaam)".
  // Defaults to a generic "Speel audio af".
  ariaLabel?: string;
  // Render the slow-playback button next to the normal one. Default true —
  // useful for pronunciation. Set false where slow audio adds nothing (a
  // single phoneme, a UI confirmation tone, etc.).
  withSlow?: boolean;
}

// Pitch-preserved half-speed. Slow enough to dissect a digraph, fast enough
// not to drag. Tune via this constant if 0.5 feels off for the Xander voice.
const SLOW_RATE = 0.5;
const NORMAL_RATE = 1;

export default function AudioPlayer({
  lessonId,
  audioId,
  ariaLabel,
  withSlow = true,
}: Props) {
  const available = hasAudio(lessonId, audioId);
  const ref = useRef<HTMLAudioElement | null>(null);
  // Which rate is currently playing, or null if paused/stopped. Single
  // source of truth for both buttons' visual state.
  const [activeRate, setActiveRate] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onStop = () => setActiveRate(null);
    const onError = () => {
      const code = el.error?.code;
      const map: Record<number, string> = {
        1: 'aborted',
        2: 'network error',
        3: 'decode failed',
        4: 'format not supported by browser',
      };
      setError(code ? map[code] ?? `error ${code}` : 'audio error');
      setActiveRate(null);
    };
    el.addEventListener('pause', onStop);
    el.addEventListener('ended', onStop);
    el.addEventListener('error', onError);
    return () => {
      el.removeEventListener('pause', onStop);
      el.removeEventListener('ended', onStop);
      el.removeEventListener('error', onError);
    };
  }, []);

  if (!available) return null;

  function play(rate: number) {
    const el = ref.current;
    if (!el) return;
    setError(null);
    if (activeRate === rate) {
      el.pause();
      return;
    }
    // Always restart at the top — whether toggling rates or replaying.
    el.pause();
    el.currentTime = 0;
    el.playbackRate = rate;
    // preservesPitch keeps the voice natural at <1×; without it 0.5× sounds
    // pitch-bent ("drunk"). All target browsers support the un-prefixed name
    // by 2024; the `in` guard is belt-and-suspenders for older WebKit.
    if ('preservesPitch' in el) el.preservesPitch = true;
    setActiveRate(rate);
    el.play().catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : 'play blocked';
      setError(msg);
      setActiveRate(null);
      console.error(`AudioPlayer ${lessonId}/${audioId}:`, err);
    });
  }

  const baseLabel = ariaLabel ?? 'Speel audio af';
  const normalLabel =
    activeRate === NORMAL_RATE ? 'Pauzeer audio' : baseLabel;
  const slowLabel =
    activeRate === SLOW_RATE
      ? 'Pauzeer langzame audio'
      : `${baseLabel} (langzaam, ½×)`;

  return (
    <span className="inline-flex flex-col items-end gap-1">
      <span className="inline-flex divide-x divide-zinc-200 overflow-hidden rounded-md border border-zinc-200 bg-white">
        <RateButton
          playing={activeRate === NORMAL_RATE}
          onClick={() => play(NORMAL_RATE)}
          title={normalLabel}
          aria-label={normalLabel}
        >
          {activeRate === NORMAL_RATE ? <PauseIcon /> : <SpeakerIcon />}
        </RateButton>
        {withSlow && (
          <RateButton
            playing={activeRate === SLOW_RATE}
            onClick={() => play(SLOW_RATE)}
            title={slowLabel}
            aria-label={slowLabel}
          >
            {activeRate === SLOW_RATE ? (
              <PauseIcon />
            ) : (
              <span className="text-[11px] font-semibold leading-none">
                ½×
              </span>
            )}
          </RateButton>
        )}
      </span>
      {error && (
        <span role="alert" className="text-[10px] text-red-600">
          {error}
        </span>
      )}
      <audio ref={ref} src={audioUrl(lessonId, audioId)} preload="metadata" />
    </span>
  );
}

function RateButton({
  playing,
  children,
  ...rest
}: {
  playing: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={playing}
      {...rest}
      className={`inline-flex h-8 w-8 items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:-outline-offset-1 ${
        playing
          ? 'bg-orange-50 text-orange-700 hover:bg-orange-100'
          : 'text-zinc-700 hover:bg-zinc-50'
      }`}
    >
      {children}
    </button>
  );
}

function SpeakerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H2v6h4l5 4Z" fill="currentColor" stroke="none" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}
