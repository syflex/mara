'use client';

/** Your-answer / model-answer box, shared by the writing and listening cards. */
export function AnswerBox({
  title,
  text,
  positive = false,
  negative = false,
}: {
  title: string;
  text: string;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <div
      className={`rounded-md border px-3 py-2 ${
        positive
          ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30'
          : negative
            ? 'border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30'
            : 'border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/60'
      }`}
    >
      <p
        className={`text-[10px] font-semibold uppercase tracking-wider ${
          positive
            ? 'text-emerald-700 dark:text-emerald-300'
            : 'text-zinc-500 dark:text-zinc-400'
        }`}
      >
        {title}
      </p>
      <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{text || '—'}</p>
    </div>
  );
}
