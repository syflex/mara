'use client';

import type { LessonSection, SectionType } from '@/lib/types';

const SECTION_LABELS: Record<SectionType, string> = {
  uitleg: 'Uitleg',
  klanken: 'Klanken',
  woorden: 'Woorden',
  'de-het': 'De / het',
  conjugatie: 'Conjugatie',
  drill: 'Drill',
  zinsbouw: 'Zinsbouw',
  luisteren: 'Luisteren',
  spreken: 'Spreken',
  'mini-dialoog': 'Mini-dialoog',
  schrijven: 'Schrijven',
};

export function sectionLabel(type: SectionType): string {
  return SECTION_LABELS[type];
}

export default function PlaceholderSection({
  section,
}: {
  section: LessonSection;
}) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
        {sectionLabel(section.type)}
      </p>
      <p className="mt-3 text-sm text-zinc-600">
        Dit sectietype is nog niet geïmplementeerd.
      </p>
      <p className="mt-1 text-xs text-zinc-400">
        Komt in een volgende stap van het bouwplan.
      </p>
    </div>
  );
}
