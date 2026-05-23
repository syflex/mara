'use client';

import { useEffect, useRef, useState } from 'react';
import { audioUrl, hasAudio } from '@/lib/audio';

interface Props {
  lessonId: string;
  audioId: string;
  // Visible button label. Default is icon-only (recommended for inline use).
  // Pass a label only when the button stands alone without surrounding context
  // (e.g. a standalone CTA outside a row).
  label?: string;
  // Visible description for screen readers + tooltip. Defaults to a generic
  // "Speel audio af" / "Pauzeer audio" pair. Override to a context-specific
  // label when the audio is about a particular word/line ("Luister: hallo").
  ariaLabel?: string;
}

export default function AudioPlayer({
  lessonId,
  audioId,
  label,
  ariaLabel,
}: Props) {
  const available = hasAudio(lessonId, audioId);
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onStop = () => setPlaying(false);
    const onError = () => {
      const code = el.error?.code;
      const map: Record<number, string> = {
        1: 'aborted',
        2: 'network error',
        3: 'decode failed',
        4: 'format not supported by browser',
      };
      setError(code ? map[code] ?? `error ${code}` : 'audio error');
      setPlaying(false);
    };
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onStop);
    el.addEventListener('ended', onStop);
    el.addEventListener('error', onError);
    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onStop);
      el.removeEventListener('ended', onStop);
      el.removeEventListener('error', onError);
    };
  }, []);

  if (!available) return null;

  function toggle() {
    const el = ref.current;
    if (!el) return;
    setError(null);
    if (playing) {
      el.pause();
      return;
    }
    el.currentTime = 0;
    el.play().catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : 'play blocked';
      setError(msg);
      setPlaying(false);
      // Surface for debugging — the audio element fires its own 'error' for
      // decode/network issues; this catch covers play() promise rejections
      // (autoplay policy, user gesture missing, etc).
      console.error(`AudioPlayer ${lessonId}/${audioId}:`, err);
    });
  }

  const accessibleLabel =
    ariaLabel ?? (playing ? 'Pauzeer audio' : 'Speel audio af');

  return (
    <span className="inline-flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={toggle}
        title={accessibleLabel}
        aria-label={accessibleLabel}
        aria-pressed={playing}
        className={`inline-flex items-center gap-1.5 rounded-md border transition-colors ${
          label ? 'px-2.5 py-1' : 'h-8 w-8 justify-center p-0'
        } text-xs font-medium ${
          playing
            ? 'border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100'
            : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50'
        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-1`}
      >
        {playing ? <PauseIcon /> : <SpeakerIcon />}
        {label && <span>{label}</span>}
      </button>
      {error && (
        <span role="alert" className="text-[10px] text-red-600">
          {error}
        </span>
      )}
      <audio ref={ref} src={audioUrl(lessonId, audioId)} preload="metadata" />
    </span>
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
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}
