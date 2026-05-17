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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onStop = () => setPlaying(false);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onStop);
    el.addEventListener('ended', onStop);
    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onStop);
      el.removeEventListener('ended', onStop);
    };
  }, []);

  if (!available) return null;

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      el.currentTime = 0;
      void el.play().catch(() => setPlaying(false));
    }
  }

  return (
    <>
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
        <span>{label}</span>
      </button>
      <audio ref={ref} src={audioUrl(lessonId, audioId)} preload="none" />
    </>
  );
}
