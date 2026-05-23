'use client';

/**
 * Mobile-only bottom tab bar — three primary destinations (Vandaag /
 * Lessen / Review). Replaces the desktop nav links on narrow screens
 * (those are hidden via `md:flex` in Navbar).
 *
 * Hidden on the lesson viewer (/lessen/<id>): the viewer has its own
 * sticky Prev/Next bar at the bottom, and stacking two bottom bars eats
 * too much vertical space on a phone. To leave a lesson, use the "←
 * Alle lessen" link at the top of the viewer.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Tab = {
  href: string;
  label: string;
  Icon: (props: { active: boolean }) => React.JSX.Element;
};

const TABS: Tab[] = [
  { href: '/', label: 'Vandaag', Icon: HomeIcon },
  { href: '/lessen', label: 'Lessen', Icon: BookIcon },
  { href: '/review', label: 'Review', Icon: RefreshIcon },
];

// Anything under /lessen/<id> (but not the bare /lessen list) is the
// viewer — match a non-empty second segment.
const LESSON_VIEWER_RE = /^\/lessen\/[^/]+/;

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function BottomTabBar() {
  const pathname = usePathname();
  if (LESSON_VIEWER_RE.test(pathname)) return null;

  return (
    <nav
      aria-label="Hoofdmenu"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-200 bg-white/95 backdrop-blur transition-colors md:hidden dark:border-zinc-800 dark:bg-zinc-900/95"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex max-w-3xl items-stretch">
        {TABS.map((tab) => {
          const active = isActive(pathname, tab.href);
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-12 flex-col items-center justify-center gap-0.5 py-2.5 transition-colors active:bg-zinc-100 dark:active:bg-zinc-800 ${
                  active
                    ? 'text-orange-600 dark:text-orange-400'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                }`}
              >
                <tab.Icon active={active} />
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? '0' : '2'}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-8.5z" />
    </svg>
  );
}

function BookIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? '0' : '2'}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5a2.5 2.5 0 0 0 0 5H20" />
      <path d="M4 4.5V21" />
    </svg>
  );
}

function RefreshIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? '2.5' : '2'}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <polyline points="21 3 21 8 16 8" />
      <polyline points="3 21 3 16 8 16" />
    </svg>
  );
}
