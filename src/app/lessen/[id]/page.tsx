import { Suspense } from 'react';
import { LESSONS } from '@/lib/content/lessons';
import LessonViewerClient from './LessonViewerClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return LESSONS.map((lesson) => ({ id: lesson.id }));
}

export default async function LessonViewerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={null}>
      <LessonViewerClient id={id} />
    </Suspense>
  );
}
