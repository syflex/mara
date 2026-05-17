'use client';

import { use, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { getLesson, LESSONS } from '@/lib/content/lessons';
import {
  ensureLessonStarted,
  markLessonComplete,
  markSectionComplete,
} from '@/lib/lessons';
import SectionRenderer from '@/components/lesson/SectionRenderer';
import { sectionLabel } from '@/components/lesson/PlaceholderSection';

export default function LessonViewerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewMode = searchParams.get('review') === '1';

  const lesson = getLesson(id);

  const progress = useLiveQuery(
    () => (lesson ? db.lessonProgress.get(lesson.id) : undefined),
    [lesson?.id],
  );

  const completedIds = useMemo(
    () => new Set(progress?.sectionIdsCompleted ?? []),
    [progress],
  );

  const initialIndex = useMemo(() => {
    if (!lesson) return 0;
    if (reviewMode) return 0;
    const firstIncomplete = lesson.sections.findIndex(
      (s) => !completedIds.has(s.id),
    );
    return firstIncomplete === -1 ? lesson.sections.length - 1 : firstIncomplete;
  }, [lesson, completedIds, reviewMode]);

  const [navigatedIndex, setNavigatedIndex] = useState<number | null>(null);
  const currentIndex = navigatedIndex ?? initialIndex;

  useEffect(() => {
    if (lesson && !reviewMode) void ensureLessonStarted(lesson.id);
  }, [lesson, reviewMode]);

  if (!lesson) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-zinc-600">Les niet gevonden.</p>
        <Link href="/lessen" className="text-sm text-orange-700 underline">
          ← Terug naar lessen
        </Link>
      </div>
    );
  }

  const section = lesson.sections[currentIndex];
  const totalSections = lesson.sections.length;
  const isLast = currentIndex === totalSections - 1;
  const isFirst = currentIndex === 0;
  const lessonDone = !!progress?.completedAt;
  const showCelebration = lessonDone && !reviewMode;
  const nextLesson = LESSONS.find((l) => l.order === lesson.order + 1);

  const lessonId = lesson.id;
  async function handleNext() {
    if (!section) return;
    if (reviewMode) {
      if (isLast) {
        router.push('/lessen');
      } else {
        setNavigatedIndex(currentIndex + 1);
      }
      return;
    }
    await markSectionComplete(lessonId, section.id);
    if (isLast) {
      await markLessonComplete(lessonId);
    } else {
      setNavigatedIndex(currentIndex + 1);
    }
  }

  function handlePrev() {
    if (!isFirst) setNavigatedIndex(currentIndex - 1);
  }

  return (
    <div className="space-y-6 pb-24">
      <div>
        <Link
          href="/lessen"
          className="text-xs text-zinc-500 hover:text-zinc-900"
        >
          ← Alle lessen
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            {lesson.titleNl}
          </h1>
          {reviewMode && (
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
              Review
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-zinc-500">{lesson.titleEn}</p>
      </div>

      <SectionStepper
        sections={lesson.sections}
        currentIndex={currentIndex}
        completedIds={completedIds}
        onJump={(i) => setNavigatedIndex(i)}
      />

      {showCelebration ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <p className="text-sm font-medium text-emerald-900">
            Les voltooid 🎉
          </p>
          <p className="mt-1 text-xs text-emerald-700">
            Je kunt deze les altijd opnieuw bekijken.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/lessen"
              className="rounded-md border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-50"
            >
              Lessenpad
            </Link>
            <Link
              href={`/lessen/${lesson.id}?review=1`}
              className="rounded-md border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-50"
            >
              Bekijk opnieuw
            </Link>
            {nextLesson && (
              <Link
                href={`/lessen/${nextLesson.id}`}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Volgende les →
              </Link>
            )}
          </div>
        </div>
      ) : (
        section && (
          <div>
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                {sectionLabel(section.type)}
              </span>
              <span className="text-xs text-zinc-400">
                Sectie {currentIndex + 1} van {totalSections}
              </span>
            </div>
            <SectionRenderer section={section} lessonId={lessonId} />
          </div>
        )
      )}

      {!showCelebration && section && (
        <div className="fixed inset-x-0 bottom-0 z-10 border-t border-zinc-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFirst}
              className="rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Vorige
            </button>
            <button
              type="button"
              onClick={() => void handleNext()}
              className={`rounded-md px-4 py-2 text-sm font-medium text-white ${
                reviewMode
                  ? 'bg-zinc-700 hover:bg-zinc-800'
                  : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              {reviewMode
                ? isLast
                  ? 'Klaar'
                  : 'Volgende →'
                : isLast
                  ? 'Les voltooien'
                  : 'Volgende →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionStepper({
  sections,
  currentIndex,
  completedIds,
  onJump,
}: {
  sections: { id: string; type: string }[];
  currentIndex: number;
  completedIds: Set<string>;
  onJump: (i: number) => void;
}) {
  return (
    <div className="flex gap-1.5">
      {sections.map((s, i) => {
        const done = completedIds.has(s.id);
        const active = i === currentIndex;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onJump(i)}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              active
                ? 'bg-orange-500'
                : done
                  ? 'bg-emerald-400'
                  : 'bg-zinc-200 hover:bg-zinc-300'
            }`}
            aria-label={`Ga naar sectie ${i + 1}`}
          />
        );
      })}
    </div>
  );
}
