/**
 * Section registry — single source of truth mapping each SectionType to its
 * display label and (optionally) its renderer component.
 *
 * To add a new section type:
 *   1. Add a payload entry to SectionPayloadMap in src/lib/types.ts.
 *   2. Add an entry here. If the renderer doesn't exist yet, omit `component`
 *      and SectionRenderer will fall back to PlaceholderSection.
 *
 * That's the whole dance. The audio walker (scripts/lib/audio-items.ts) is a
 * separate, intentional touchpoint — only section types that carry TTS text
 * need to register there.
 */

import type { ComponentType } from 'react';
import type { SectionType, SectionProps } from '@/lib/types';
import UitlegSection from './UitlegSection';
import KlankenSection from './KlankenSection';
import WoordenSection from './WoordenSection';
import SprekenSection from './SprekenSection';
import MiniDialoogSection from './MiniDialoogSection';

type RegistryEntry<K extends SectionType> = {
  label: string;
  component?: ComponentType<SectionProps<K>>;
};

export const SECTION_REGISTRY: { [K in SectionType]: RegistryEntry<K> } = {
  uitleg: { label: 'Uitleg', component: UitlegSection },
  klanken: { label: 'Klanken', component: KlankenSection },
  woorden: { label: 'Woorden', component: WoordenSection },
  spreken: { label: 'Spreken', component: SprekenSection },
  'mini-dialoog': { label: 'Mini-dialoog', component: MiniDialoogSection },
  // Payload shapes exist (see SectionPayloadMap); renderers TBD.
  'de-het': { label: 'De / het' },
  conjugatie: { label: 'Conjugatie' },
  drill: { label: 'Drill' },
  zinsbouw: { label: 'Zinsbouw' },
  luisteren: { label: 'Luisteren' },
  schrijven: { label: 'Schrijven' },
};

export function sectionLabel(type: SectionType): string {
  return SECTION_REGISTRY[type].label;
}
