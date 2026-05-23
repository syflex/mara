'use client';

import Link from 'next/link';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { LESSONS } from '@/lib/content/lessons';
import {
  completionStats,
  indexProgress,
  isLessonComplete,
  isLessonUnlocked,
} from '@/lib/lessons';
import type { Lesson, LessonProgress } from '@/lib/types';

export default function LessonPathPage() {
  const progressRows = useLiveQuery(() => db.lessonProgress.toArray(), []);
  const progressByLesson = indexProgress(progressRows);
  const { completed, total } = completionStats(progressByLesson);

  return (
    <div className="space-y-6">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Lessen</h1>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {completed}/{total} voltooid
        </span>
      </header>

      <ol className="space-y-2">
        {LESSONS.map((lesson) => {
          const p = progressByLesson.get(lesson.id);
          const done = isLessonComplete(p);
          const unlocked = isLessonUnlocked(lesson, progressByLesson);
          return (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              progress={p}
              done={done}
              unlocked={unlocked}
            />
          );
        })}
      </ol>
    </div>
  );
}

function LessonRow({
  lesson,
  progress,
  done,
  unlocked,
}: {
  lesson: Lesson;
  progress: LessonProgress | undefined;
  done: boolean;
  unlocked: boolean;
}) {
  const inProgress = !!progress?.startedAt && !done;
  const sectionsTotal = lesson.sections.length;
  const sectionsDone = progress?.sectionIdsCompleted.length ?? 0;

  const body = (
    <div
      className={`flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-zinc-900/5 transition-colors dark:bg-zinc-900 dark:ring-white/5 ${
        unlocked
          ? 'hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
          : 'opacity-60'
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
            done
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
              : inProgress
                ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400'
                : unlocked
                  ? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
                  : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500'
          }`}
        >
          {done ? '✓' : lesson.order}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {lesson.titleNl}
          </p>
          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
            {done
              ? 'Voltooid'
              : inProgress
                ? `${sectionsDone}/${sectionsTotal} secties · ${lesson.estimatedMinutes} min`
                : unlocked
                  ? `${sectionsTotal} secties · ${lesson.estimatedMinutes} min`
                  : 'Vergrendeld'}
          </p>
        </div>
      </div>
      {unlocked && (
        <span className="text-sm text-zinc-400 dark:text-zinc-500" aria-hidden>
          →
        </span>
      )}
    </div>
  );

  if (!unlocked) return <li>{body}</li>;
  const href = done ? `/lessen/${lesson.id}?review=1` : `/lessen/${lesson.id}`;
  return (
    <li>
      <Link href={href}>{body}</Link>
    </li>
  );
}
