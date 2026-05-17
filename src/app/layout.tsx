import type { Metadata, Viewport } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'MARA — Dutch Inburgering A2',
  description: 'Jouw taal. Jouw toekomst. Personal Inburgering A2 prep.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MARA',
  },
};

export const viewport: Viewport = {
  themeColor: '#ea580c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 antialiased">
        <header className="border-b border-zinc-200 bg-white">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-2">
            <Link href="/" className="flex items-center gap-2" aria-label="MARA home">
              <Image
                src="/mara-logo.PNG"
                alt="MARA"
                width={40}
                height={40}
                priority
                className="rounded"
              />
              <span className="font-semibold tracking-tight text-zinc-900">MARA</span>
            </Link>
            <nav className="flex gap-4 text-sm text-zinc-600">
              <Link href="/" className="hover:text-zinc-900">
                Vandaag
              </Link>
              <Link href="/lessen" className="hover:text-zinc-900">
                Lessen
              </Link>
              <Link href="/review" className="hover:text-zinc-900">
                Review
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
