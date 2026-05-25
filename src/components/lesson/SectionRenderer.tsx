'use client';

import type { ComponentType } from 'react';
import type { LessonSection, SectionCompletion } from '@/lib/types';
import PlaceholderSection from './PlaceholderSection';
import { SECTION_REGISTRY } from './sections/registry';

export default function SectionRenderer({
  section,
  lessonId,
  onCompletionChange,
}: {
  section: LessonSection;
  lessonId: string;
  onCompletionChange?: (completion: SectionCompletion) => void;
}) {
  const entry = SECTION_REGISTRY[section.type];
  if (!entry.component) {
    return <PlaceholderSection section={section} />;
  }
  // The registry is typed `RegistryEntry<K>` per key; TS can't narrow that
  // here from the dynamic `section.type` lookup, so the cast is contained
  // to this one dispatch point. The compile-time guarantee is at the
  // registry definition itself (component K accepts payload K).
  const Component = entry.component as ComponentType<{
    lessonId: string;
    sectionId: string;
    payload: typeof section.payload;
    onCompletionChange?: (completion: SectionCompletion) => void;
  }>;
  return (
    <Component
      lessonId={lessonId}
      sectionId={section.id}
      payload={section.payload}
      onCompletionChange={onCompletionChange}
    />
  );
}
