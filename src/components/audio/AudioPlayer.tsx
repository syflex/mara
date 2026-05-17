'use client';

import { useEffect, useRef, useState } from 'react';
import { audioUrl, hasAudio } from '@/lib/audio';

interface Props {
  lessonId: string;
  audioId: string;
  label?: string;
}

export default function AudioPlayer({ lessonId, audioId, label = 'Luister' }: Props) {
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

  return (
    <span className="inline-flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={toggle}
        className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
          playing
            ? 'border-orange-300 bg-orange-50 text-orange-800'
            : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
        }`}
        aria-label={`${label} ${audioId}`}
      >
        <span aria-hidden>{playing ? '⏸' : '🔊'}</span>
        {label && <span>{label}</span>}
      </button>
      {error && <span className="text-[10px] text-red-600">{error}</span>}
      <audio
        ref={ref}
        src={audioUrl(lessonId, audioId)}
        preload="metadata"
      />
    </span>
  );
}
