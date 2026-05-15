import Link from 'next/link';

export default function FlashcardsPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Mijn flashcards</h1>
      <p className="text-sm text-zinc-600">
        Custom flashcards (Tier 2) — coming after the Tier 1 drills are stable.
      </p>
      <Link href="/" className="text-sm text-orange-700 underline">
        ← Terug
      </Link>
    </div>
  );
}
