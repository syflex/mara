'use client';

import { useTheme } from '@/lib/theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const next = theme === 'light' ? 'dark' : 'light';
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={
        theme === 'light' ? 'Schakel naar donker thema' : 'Schakel naar licht thema'
      }
      title={theme === 'light' ? 'Donker thema' : 'Licht thema'}
      className="grid h-10 w-10 place-content-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 active:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:active:bg-zinc-700"
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
