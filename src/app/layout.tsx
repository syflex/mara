import type { Metadata, Viewport } from 'next';
import Navbar from '@/components/Navbar';
import BottomTabBar from '@/components/BottomTabBar';
import { THEME_INIT_SCRIPT } from '@/lib/theme';
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
      <head>
        {/* Sets the dark class on <html> before React hydrates — avoids
            flash of wrong theme. Reads from localStorage (explicit choice)
            with a fallback to prefers-color-scheme. */}
        <script
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 antialiased transition-colors dark:bg-zinc-950 dark:text-zinc-100">
        <Navbar />
        {/* Extra bottom padding on mobile so the BottomTabBar (h≈56px)
            doesn't cover the last bit of content. md+ keeps the slim 6. */}
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-6 md:pb-6">
          {children}
        </main>
        <BottomTabBar />
      </body>
    </html>
  );
}
