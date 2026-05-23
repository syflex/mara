'use client';

/**
 * Light/dark theme: stored in localStorage, applied as a `.dark` class on
 * <html>. First load matches system preference; clicking the toggle sets
 * an explicit choice that survives reloads.
 *
 * No-flash: the initial class is set by an inline <script> in layout.tsx
 * BEFORE React hydrates. This module is for React-side reads/writes
 * after hydration. Reads use useSyncExternalStore so the value is always
 * a fresh read of the source of truth — and so cross-tab changes via the
 * storage event flow through automatically.
 */

import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'dutch:theme';

/**
 * The inline script source. Kept here so the storage key and the script
 * stay in lockstep; layout.tsx renders it via dangerouslySetInnerHTML.
 */
export const THEME_INIT_SCRIPT = `
(function(){
  try {
    var s = localStorage.getItem('${THEME_STORAGE_KEY}');
    var dark = s === 'dark' || (!s && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

function readStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function subscribeToTheme(onChange: () => void): () => void {
  // Storage events fire cross-tab. Same-tab changes go through a custom
  // event we dispatch from update() below.
  window.addEventListener('storage', onChange);
  window.addEventListener('dutch:theme:change', onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener('dutch:theme:change', onChange);
  };
}

export function useTheme(): [Theme, (next: Theme) => void] {
  // Server snapshot is 'light' so the initial markup is stable and matches
  // what the no-flash <script> would render before any class is applied.
  // The script will have already added .dark to <html> if needed; the
  // useSyncExternalStore subscription syncs the React state on hydration.
  const theme = useSyncExternalStore(
    subscribeToTheme,
    readStoredTheme,
    () => 'light' as Theme,
  );

  function update(next: Theme) {
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable (private mode etc) — the class still
      // flipped for this session.
    }
    // Storage events only fire in *other* tabs, so notify same-tab
    // listeners manually.
    window.dispatchEvent(new Event('dutch:theme:change'));
  }

  return [theme, update];
}
