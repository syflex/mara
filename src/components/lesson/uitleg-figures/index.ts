import type { ComponentType } from 'react';
import type { UitlegFigureId } from '@/lib/types';
import JeURegisterFigure from './JeURegisterFigure';

// Registry of inline SVG mnemonic diagrams referenced by uitleg blocks.
// Keep the keys in sync with UitlegFigureId in src/lib/types.ts so authors
// get a compile error if they reference a figure that hasn't been built.
export const UITLEG_FIGURES: Record<UitlegFigureId, ComponentType> = {
  'je-u-register': JeURegisterFigure,
};
