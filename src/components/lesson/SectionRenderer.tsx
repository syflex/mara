'use client';

import type { LessonSection } from '@/lib/types';
import PlaceholderSection from './PlaceholderSection';
import UitlegSection from './sections/UitlegSection';
import WoordenSection from './sections/WoordenSection';
import SprekenSection from './sections/SprekenSection';
import KlankenSection from './sections/KlankenSection';

export default function SectionRenderer({
  section,
  lessonId,
}: {
  section: LessonSection;
  lessonId: string;
}) {
  switch (section.type) {
    case 'uitleg':
      return <UitlegSection payload={section.payload} />;
    case 'woorden':
      return <WoordenSection lessonId={lessonId} payload={section.payload} />;
    case 'spreken':
      return <SprekenSection lessonId={lessonId} payload={section.payload} />;
    case 'klanken':
      return <KlankenSection lessonId={lessonId} payload={section.payload} />;
    default:
      return <PlaceholderSection section={section} />;
  }
}
