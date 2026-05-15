import Link from 'next/link';

export default function VocabPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Woordenschat</h1>
      <p className="text-sm text-zinc-600">
        Vocab SRS drill — coming next. The 30 starter words are already seeded in your database.
      </p>
      <Link href="/" className="text-sm text-orange-700 underline">
        ← Terug
      </Link>
    </div>
  );
}
