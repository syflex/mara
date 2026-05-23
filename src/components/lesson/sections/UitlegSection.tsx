'use client';

import type { UitlegPayload } from '@/lib/types';
import { UITLEG_FIGURES } from '@/components/lesson/uitleg-figures';

export default function UitlegSection({ payload }: { payload: UitlegPayload }) {
  return (
    <article className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6">
      {payload.blocks.map((block, i) => {
        switch (block.kind) {
          case 'heading':
            return (
              <h2
                key={i}
                className="text-base font-semibold text-zinc-900 first:mt-0"
              >
                {block.text}
              </h2>
            );
          case 'paragraph':
            return (
              <p
                key={i}
                className="text-sm leading-relaxed text-zinc-700"
              >
                {block.text}
              </p>
            );
          case 'list':
            return (
              <ul
                key={i}
                className="list-inside list-disc space-y-1 text-sm text-zinc-700"
              >
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case 'figure': {
            const Figure = UITLEG_FIGURES[block.figureId];
            return <Figure key={i} />;
          }
        }
      })}
    </article>
  );
}
