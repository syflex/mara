'use client';

/**
 * Daily activity tracking — minutes spent in the app today.
 *
 * Stored in localStorage keyed by date (one number per day, total seconds).
 * The lesson viewer mounts the tracker; while the tab is visible it adds
 * the elapsed time between ticks to today's bucket. Tab-hidden time is
 * not counted (Page Visibility API).
 *
 * localStorage is intentional: this is single-device, low-stakes data and
 * doesn't need Dexie's schema/migration machinery. The Vandaag rings read
 * the same keys.
 *
 * Keys: `dutch:activity:YYYY-MM-DD` → string of integer seconds.
 */

import { useEffect, useState } from 'react';
import { ACTIVITY } from './config';

const KEY_PREFIX = 'dutch:activity:';

function todayKey(d: Date = new Date()): string {
  // Local-date YYYY-MM-DD. Using local instead of UTC so a streak feels
  // right to the learner — "I did Dutch today" matches their wall clock.
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function readSeconds(date: Date = new Date()): number {
  if (typeof window === 'undefined') return 0;
  const raw = localStorage.getItem(KEY_PREFIX + todayKey(date));
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function addSecondsToday(secs: number): void {
  if (typeof window === 'undefined' || secs <= 0) return;
  const key = KEY_PREFIX + todayKey();
  const current = readSeconds();
  localStorage.setItem(key, String(current + secs));
  // Notify subscribers in the same tab (storage events only fire across tabs).
  window.dispatchEvent(new CustomEvent('dutch:activity:tick'));
}

/**
 * Call from any page that should count toward today's minutes. Ticks every
 * ACTIVITY.tickMs while the tab is visible. Pauses when hidden. Unmounts
 * cleanly — no double-counting across re-mounts.
 */
export function useTrackTimeOnPage(): void {
  useEffect(() => {
    let lastTick = Date.now();

    function flush() {
      if (document.hidden) {
        // Drop the elapsed since lastTick (the user was away).
        lastTick = Date.now();
        return;
      }
      const now = Date.now();
      const delta = Math.floor((now - lastTick) / 1000);
      if (delta > 0) {
        addSecondsToday(delta);
        lastTick = now;
      }
    }

    function onVisibility() {
      // When we come back from hidden, reset lastTick so we don't count
      // the time the tab was in the background.
      if (!document.hidden) lastTick = Date.now();
    }

    document.addEventListener('visibilitychange', onVisibility);
    const id = setInterval(flush, ACTIVITY.tickMs);
    return () => {
      flush();
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
}

/**
 * Reactive read of today's minutes. Updates when the tracker ticks (same
 * tab) or when another tab writes (storage event).
 */
export function useTodayMinutes(): number {
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    function update() {
      setMinutes(Math.floor(readSeconds() / 60));
    }
    update();
    const onStorage = (e: StorageEvent) => {
      if (e.key?.startsWith(KEY_PREFIX)) update();
    };
    const onTick = () => update();
    window.addEventListener('storage', onStorage);
    window.addEventListener('dutch:activity:tick', onTick);
    // Also refresh on focus — covers tab returning after a long sleep.
    window.addEventListener('focus', update);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('dutch:activity:tick', onTick);
      window.removeEventListener('focus', update);
    };
  }, []);

  return minutes;
}
