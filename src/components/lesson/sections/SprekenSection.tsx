'use client';

import { useEffect, useRef, useState } from 'react';
import type { SprekenLine, SprekenPayload } from '@/lib/types';
import AudioPlayer from '@/components/audio/AudioPlayer';

interface Props {
  lessonId: string;
  payload: SprekenPayload;
}

export default function SprekenSection({ lessonId, payload }: Props) {
  return (
    <div className="space-y-4">
      {payload.intro && (
        <p className="text-sm text-zinc-600">{payload.intro}</p>
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

type RecorderState =
  | { kind: 'idle' }
  | { kind: 'recording' }
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
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      if (state.kind === 'recording') {
        recorderRef.current?.stop();
        streamRef.current?.getTracks().forEach((t) => t.stop());
      }
      if (state.kind === 'recorded') {
        URL.revokeObjectURL(state.url);
      }
    };
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
      setState({ kind: 'recording' });
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
    recorderRef.current?.stop();
    recorderRef.current = null;
  }

  function playMine() {
    if (state.kind !== 'recorded') return;
    new Audio(state.url).play().catch(() => {});
  }

  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-base text-zinc-900">
            <span className="mr-2 text-xs font-medium text-zinc-400">
              {index}.
            </span>
            {line.nl}
          </p>
          {line.en && (
            <p className="mt-0.5 text-xs text-zinc-500">{line.en}</p>
          )}
        </div>
        {line.audioId && (
          <AudioPlayer
            lessonId={lessonId}
            audioId={line.audioId}
            label="Model"
          />
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {state.kind === 'idle' && (
          <button
            type="button"
            onClick={startRecord}
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            <span aria-hidden>🎙</span>
            Opnemen
          </button>
        )}
        {state.kind === 'recording' && (
          <button
            type="button"
            onClick={stopRecord}
            className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
          >
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
            Stop opname
          </button>
        )}
        {state.kind === 'recorded' && (
          <>
            <button
              type="button"
              onClick={playMine}
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              <span aria-hidden>▶</span>
              Mijn opname
            </button>
            <button
              type="button"
              onClick={startRecord}
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50"
            >
              <span aria-hidden>🎙</span>
              Opnieuw
            </button>
          </>
        )}
        {state.kind === 'error' && (
          <p className="text-xs text-red-600">{state.message}</p>
        )}
      </div>
    </article>
  );
}
