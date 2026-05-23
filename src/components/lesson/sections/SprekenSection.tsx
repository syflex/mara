'use client';

import { useEffect, useRef, useState } from 'react';
import type { SprekenLine, SprekenPayload } from '@/lib/types';
import AudioPlayer from '@/components/audio/AudioPlayer';
import { RECORDING } from '@/lib/config';

interface Props {
  lessonId: string;
  payload: SprekenPayload;
}

export default function SprekenSection({ lessonId, payload }: Props) {
  return (
    <div className="space-y-4">
      {payload.intro && (
        <p className="px-1 text-sm text-zinc-600 dark:text-zinc-300">{payload.intro}</p>
      )}
      <ol className="space-y-3">
        {payload.lines.map((line, i) => (
          <li key={line.id}>
            <SpeakLineCard line={line} lessonId={lessonId} index={i + 1} />
          </li>
        ))}
      </ol>
    </div>
  );
}

const { maxMs: MAX_RECORDING_MS, tickMs: TICK_MS } = RECORDING;

type RecorderState =
  | { kind: 'idle' }
  | { kind: 'recording'; startedAt: number }
  | { kind: 'recorded'; url: string }
  | { kind: 'error'; message: string };

function SpeakLineCard({
  line,
  lessonId,
  index,
}: {
  line: SprekenLine;
  lessonId: string;
  index: number;
}) {
  const [state, setState] = useState<RecorderState>({ kind: 'idle' });
  // `now` ticks every TICK_MS while recording. elapsedMs is derived from it
  // at render time so we can avoid calling setState synchronously inside the
  // effect (which the react-hooks lint rule flags).
  const [now, setNow] = useState(0);
  const elapsedMs =
    state.kind === 'recording'
      ? Math.min(MAX_RECORDING_MS, Math.max(0, now - state.startedAt))
      : 0;
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  function stopRecorder() {
    const recorder = recorderRef.current;
    if (recorder?.state === 'recording') {
      recorder.stop();
    }
    recorderRef.current = null;
  }

  useEffect(() => {
    return () => {
      if (state.kind === 'recording') {
        stopRecorder();
        streamRef.current?.getTracks().forEach((t) => t.stop());
      }
      if (state.kind === 'recorded') {
        URL.revokeObjectURL(state.url);
      }
    };
  }, [state]);

  // While recording: tick `now` so the timer/progress-ring re-render, and
  // auto-stop at the cap. The recorder's own 'stop' event transitions us to
  // 'recorded' and tears this effect down.
  useEffect(() => {
    if (state.kind !== 'recording') return;
    const startedAt = state.startedAt;
    const tick = () => {
      const t = Date.now();
      if (t - startedAt >= MAX_RECORDING_MS) {
        stopRecorder();
        return;
      }
      setNow(t);
    };
    tick();
    const id = setInterval(tick, TICK_MS);
    return () => clearInterval(id);
  }, [state]);

  async function startRecord() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.addEventListener('dataavailable', (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      });
      rec.addEventListener('stop', () => {
        const blob = new Blob(chunksRef.current, {
          type: rec.mimeType || 'audio/webm',
        });
        const url = URL.createObjectURL(blob);
        setState({ kind: 'recorded', url });
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      });
      recorderRef.current = rec;
      rec.start();
      setState({ kind: 'recording', startedAt: Date.now() });
    } catch (e) {
      const raw = e instanceof Error ? e.message : String(e);
      const name = e instanceof Error ? e.name : '';
      const denied = name === 'NotAllowedError' || /denied|notallowed/i.test(raw);
      setState({
        kind: 'error',
        message: denied
          ? 'Microfoon geweigerd. Klik op het slotje in de adresbalk → Microfoon → toestaan. Op macOS ook: Systeeminstellingen → Privacy & Beveiliging → Microfoon → vink je browser aan.'
          : `Microfoon niet beschikbaar: ${raw}`,
      });
    }
  }

  function stopRecord() {
    stopRecorder();
  }

  function playMine() {
    if (state.kind !== 'recorded') return;
    new Audio(state.url).play().catch(() => {});
  }

  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-base text-zinc-900 dark:text-zinc-100">
            <span className="mr-2 text-xs font-medium text-zinc-400 dark:text-zinc-500">
              {index}.
            </span>
            {line.nl}
          </p>
          {line.en && (
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{line.en}</p>
          )}
        </div>
        {line.audioId && (
          <AudioPlayer
            lessonId={lessonId}
            audioId={line.audioId}
            ariaLabel={`Luister naar voorbeeld: ${line.nl}`}
          />
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {state.kind === 'idle' && (
          <button
            type="button"
            onClick={startRecord}
            title="Neem op"
            aria-label="Neem op"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 ring-1 ring-red-200 transition-colors hover:bg-red-100 active:bg-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1 dark:bg-red-950/40 dark:text-red-400 dark:ring-red-900/60 dark:hover:bg-red-950/60 dark:active:bg-red-950"
          >
            <MicIcon size={18} />
          </button>
        )}
        {state.kind === 'recording' && (
          <RecordingControls
            elapsedMs={elapsedMs}
            maxMs={MAX_RECORDING_MS}
            onStop={stopRecord}
          />
        )}
        {state.kind === 'recorded' && (
          <>
            <button
              type="button"
              onClick={playMine}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 active:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-1 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-700 dark:active:bg-zinc-600"
            >
              <PlayIcon />
              Mijn opname
            </button>
            <button
              type="button"
              onClick={startRecord}
              title="Opnieuw opnemen"
              aria-label="Opnieuw opnemen"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-600 ring-1 ring-zinc-200 transition-colors hover:bg-zinc-50 active:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-1 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-700 dark:active:bg-zinc-600"
            >
              <MicIcon size={14} />
            </button>
          </>
        )}
        {state.kind === 'error' && (
          <p role="alert" className="text-xs text-red-600">{state.message}</p>
        )}
      </div>
    </article>
  );
}

function RecordingControls({
  elapsedMs,
  maxMs,
  onStop,
}: {
  elapsedMs: number;
  maxMs: number;
  onStop: () => void;
}) {
  const remainingMs = Math.max(0, maxMs - elapsedMs);
  return (
    <div className="inline-flex items-center gap-3">
      <span className="relative inline-flex">
        {/* Halo: subtle expanding ring that signals "live mic" without
            competing with the progress ring on the button itself. */}
        <span
          aria-hidden="true"
          className="absolute -inset-1 rounded-full bg-red-400 opacity-30 animate-ping"
        />
        <button
          type="button"
          onClick={onStop}
          title="Stop opname"
          aria-label="Stop opname"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1"
        >
          <ProgressRing elapsed={elapsedMs} total={maxMs} />
          <StopIcon size={12} />
        </button>
      </span>
      <div className="flex flex-col leading-tight">
        <span className="font-mono text-sm tabular-nums text-red-700 dark:text-red-400">
          {formatSeconds(elapsedMs)}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          nog {formatSeconds(remainingMs)}
        </span>
      </div>
    </div>
  );
}

function ProgressRing({ elapsed, total }: { elapsed: number; total: number }) {
  const fraction = Math.min(Math.max(elapsed / total, 0), 1);
  // Match the parent's 40px (h-10 w-10) box; radius 18 leaves a 2px border
  // (inset 2px from edge) so the stroke isn't clipped.
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - fraction);
  return (
    <svg
      className="absolute inset-0"
      viewBox="0 0 40 40"
      width="40"
      height="40"
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
      />
      <circle
        cx="20"
        cy="20"
        r={radius}
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 20 20)"
        style={{ transition: 'stroke-dashoffset 120ms linear' }}
      />
    </svg>
  );
}

function formatSeconds(ms: number): string {
  const s = ms / 1000;
  return `${s.toFixed(1)}s`;
}

function MicIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="8" y1="21" x2="16" y2="21" />
    </svg>
  );
}

function PlayIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6 4.5v15l13-7.5z" />
    </svg>
  );
}

function StopIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
    </svg>
  );
}
