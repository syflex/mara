'use client';

import type { ComponentType } from 'react';
import type { LessonSection, SectionType } from '@/lib/types';
import PlaceholderSection from './PlaceholderSection';

export interface SectionComponentProps {
  section: LessonSection;
}

const SECTION_COMPONENTS: Record<SectionType, ComponentType<SectionComponentProps>> = {
  uitleg: PlaceholderSection,
  klanken: PlaceholderSection,
  woorden: PlaceholderSection,
  'de-het': PlaceholderSection,
  conjugatie: PlaceholderSection,
  drill: PlaceholderSection,
  zinsbouw: PlaceholderSection,
  luisteren: PlaceholderSection,
  spreken: PlaceholderSection,
  'mini-dialoog': PlaceholderSection,
  schrijven: PlaceholderSection,
};

export default function SectionRenderer({ section }: SectionComponentProps) {
  const Component = SECTION_COMPONENTS[section.type] ?? PlaceholderSection;
  return <Component section={section} />;
}
