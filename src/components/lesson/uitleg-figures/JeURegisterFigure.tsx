/**
 * Visual mnemonic for the je / u register split — first introduced in Les 01.
 *
 * Two person silhouettes, each tinted with the matching register's chip color
 * (amber for je / informal, sky for u / formal). The color pairing matches the
 * formality chips used in WoordenSection and elsewhere so the same visual cue
 * carries across the app.
 */
export default function JeURegisterFigure() {
  return (
    <figure className="rounded-lg border border-zinc-200 bg-gradient-to-br from-amber-50/40 via-white to-sky-50/40 p-4">
      <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-3 gap-y-3">
        <PersonIcon variant="je" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-900">
            vriend · familie · kind
          </p>
          <p className="text-xs text-zinc-500">peer · leeftijdsgenoot</p>
        </div>
        <ArrowRight />
        <RegisterChip variant="je">je</RegisterChip>

        <PersonIcon variant="u" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-900">
            vreemde · dokter · gemeente
          </p>
          <p className="text-xs text-zinc-500">stranger · ouder · zakelijk</p>
        </div>
        <ArrowRight />
        <RegisterChip variant="u">u</RegisterChip>
      </div>
      <figcaption className="mt-3 border-t border-zinc-100 pt-2 text-xs italic text-zinc-500">
        Bij twijfel?{' '}
        <span className="font-medium not-italic text-sky-800">u</span> is altijd
        veilig.
      </figcaption>
    </figure>
  );
}

function PersonIcon({ variant }: { variant: 'je' | 'u' }) {
  const ringBg =
    variant === 'je'
      ? 'bg-amber-50 ring-amber-200 text-amber-700'
      : 'bg-sky-50 ring-sky-200 text-sky-700';
  return (
    <span
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ${ringBg}`}
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
      </svg>
    </span>
  );
}

function RegisterChip({
  variant,
  children,
}: {
  variant: 'je' | 'u';
  children: string;
}) {
  const cls =
    variant === 'je'
      ? 'bg-amber-100 text-amber-800'
      : 'bg-sky-100 text-sky-800';
  return (
    <span
      className={`inline-flex min-w-[2.25rem] items-center justify-center rounded-md px-2.5 py-1 text-sm font-semibold ${cls}`}
    >
      {children}
    </span>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-zinc-400"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}
