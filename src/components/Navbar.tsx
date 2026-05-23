'use client';

/**
 * Top navbar — logo + nav links (desktop) + status pills + theme toggle.
 *
 * On screens narrower than `md` the nav links collapse and live in the
 * BottomTabBar instead. Status pills + theme toggle stay in the header at
 * all viewports.
 */

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import StatusPills from './StatusPills';

const NAV_LINKS = [
  { href: '/', label: 'Vandaag' },
  { href: '/lessen', label: 'Lessen' },
  { href: '/review', label: 'Review' },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur transition-colors dark:border-zinc-800 dark:bg-zinc-900/90">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-2">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="MARA home"
        >
          <Image
            src="/mara-logo.PNG"
            alt="MARA"
            width={32}
            height={32}
            priority
            className="rounded"
          />
          <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            MARA
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {/* Desktop nav — on mobile the links live in BottomTabBar. */}
          <nav className="hidden items-center gap-0.5 text-sm md:flex" aria-label="Hoofdmenu">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`inline-flex min-h-9 items-center rounded-md px-3 py-2 transition-colors ${
                    active
                      ? 'bg-zinc-100 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 active:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100 dark:active:bg-zinc-800'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <StatusPills />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
