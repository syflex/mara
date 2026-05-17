import Link from 'next/link';

export default function VocabPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Woordreview</h1>
      <p className="text-sm text-zinc-600">
        Woorden uit voltooide lessen verschijnen hier automatisch met SRS. Komt later in het bouwplan.
      </p>
      <Link href="/" className="text-sm text-orange-700 underline">
        ← Terug
      </Link>
    </div>
  );
}
