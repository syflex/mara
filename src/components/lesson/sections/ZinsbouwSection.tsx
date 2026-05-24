'use client';

// Tile-builder: tap tiles in order to assemble a sentence; tap slotted
// tiles to send them back. Tiles + expected are punctuation-free; the
// trailing "." is decoration.

import { useMemo, useState } from 'react';
import type { ZinsbouwItem, ZinsbouwPayload } from '@/lib/types';

interface Props {
  lessonId: string;
  payload: ZinsbouwPayload;
}

export default function ZinsbouwSection({ payload }: Props) {
  return (
    <div className="space-y-4">
      {payload.intro && (
        <p className="px-1 text-sm text-zinc-600 dark:text-zinc-300">
          {payload.intro}
        </p>
      )}
      <ol className="space-y-3">
        {payload.items.map((item, i) => (
          <li key={i}>
            <ZinsbouwCard item={item} index={i + 1} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function shuffleIndices(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Verdict = null | 'correct' | 'wrong';

function ZinsbouwCard({ item, index }: { item: ZinsbouwItem; index: number }) {
  // bankOrder is the shuffled tile order shown in the bank. It stays stable
  // across plays; what moves around is `slotted` (indices into item.tiles).
  const bankOrder = useMemo(() => shuffleIndices(item.tiles.length), [item]);
  const [slotted, setSlotted] = useState<number[]>([]);
  const [verdict, setVerdict] = useState<Verdict>(null);

  const bank = bankOrder.filter((i) => !slotted.includes(i));
  const allPlaced = slotted.length === item.tiles.length;
  const locked = verdict === 'correct';

  function tapBank(i: number) {
    if (locked) return;
    if (verdict === 'wrong') setVerdict(null);
    setSlotted([...slotted, i]);
  }

  function tapSlot(slotIdx: number) {
    if (locked) return;
    if (verdict === 'wrong') setVerdict(null);
    setSlotted(slotted.filter((_, k) => k !== slotIdx));
  }

  function check() {
    const built = slotted.map((i) => item.tiles[i]).join(' ');
    const candidates = [item.expected, ...(item.acceptVariants ?? [])];
    const ok = candidates.some((c) => normalize(c) === normalize(built));
    setVerdict(ok ? 'correct' : 'wrong');
  }

  function reset() {
    setSlotted([]);
    setVerdict(null);
  }

  const slotBorder =
    verdict === 'correct'
      ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30'
      : verdict === 'wrong'
        ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30'
        : 'border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-800/40';

  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <p className="text-base text-zinc-900 dark:text-zinc-100">
        <span className="mr-2 text-xs font-medium text-zinc-400 dark:text-zinc-500">
          {index}.
        </span>
        <span className="italic">&ldquo;{item.promptEn}&rdquo;</span>
      </p>

      <div
        className={`mt-3 flex min-h-14 flex-wrap items-center gap-2 rounded-lg border-2 border-dashed px-3 py-2 transition-colors ${slotBorder}`}
      >
        {slotted.length === 0 && (
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            Tik de tegels in de juiste volgorde…
          </span>
        )}
        {slotted.map((tileIdx, slotIdx) => (
          <button
            key={`${tileIdx}-${slotIdx}`}
            type="button"
            onClick={() => tapSlot(slotIdx)}
            disabled={locked}
            className="inline-flex min-h-11 items-center rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-50 active:bg-zinc-100 disabled:cursor-default disabled:opacity-90 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:active:bg-zinc-600"
          >
            {item.tiles[tileIdx]}
          </button>
        ))}
        {slotted.length > 0 && (
          <span className="text-zinc-400 dark:text-zinc-500">.</span>
        )}
      </div>

      {!locked && (
        <div className="mt-3 flex flex-wrap gap-2">
          {bank.map((tileIdx) => (
            <button
              key={tileIdx}
              type="button"
              onClick={() => tapBank(tileIdx)}
              className="inline-flex min-h-11 items-center rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-base font-medium text-zinc-800 transition-colors hover:border-orange-300 hover:bg-orange-50 active:bg-orange-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-orange-700 dark:hover:bg-orange-950/40 dark:active:bg-orange-950/60"
            >
              {item.tiles[tileIdx]}
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {!locked && (
          <button
            type="button"
            onClick={check}
            disabled={!allPlaced}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700 active:bg-orange-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500"
          >
            Controleer
          </button>
        )}
        {verdict === 'wrong' && (
          <>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:active:bg-zinc-600"
            >
              Opnieuw
            </button>
            <span className="text-sm text-red-700 dark:text-red-300">
              Probeer nog eens. Tip: de eerste tegel begint met een hoofdletter.
            </span>
          </>
        )}
        {verdict === 'correct' && (
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Goed zo!
          </span>
        )}
      </div>
    </article>
  );
}
