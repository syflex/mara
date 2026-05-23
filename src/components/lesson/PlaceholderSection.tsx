'use client';

import type { LessonSection } from '@/lib/types';
import { sectionLabel } from './sections/registry';

export default function PlaceholderSection({
  section,
}: {
  section: LessonSection;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-900">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        {sectionLabel(section.type)}
      </p>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
        Dit sectietype is nog niet geïmplementeerd.
      </p>
      <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
        Komt in een volgende stap van het bouwplan.
      </p>
    </div>
  );
}
