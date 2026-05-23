/**
 * Colored chip for the Dutch article (de / het).
 *
 * Article-first teaching is locked in for A0 — every noun is taught with its
 * article. This chip keeps that pairing visually consistent everywhere a
 * noun surfaces (woorden cards, mini-dialoog, vocab review). Color coding
 * (indigo for `de`, rose for `het`) primes article recall on every exposure
 * without conflicting with the existing palette: sky/amber are formality,
 * emerald is completion, orange is the active/play state, red is recording.
 */

type Gender = 'de' | 'het';

interface Props {
  gender: Gender;
}

const STYLES: Record<Gender, string> = {
  de: 'bg-indigo-50 text-indigo-700',
  het: 'bg-rose-50 text-rose-700',
};

export default function ArticleChip({ gender }: Props) {
  return (
    <span
      className={`mr-1.5 inline-flex items-center rounded px-1.5 py-0.5 align-middle text-[11px] font-semibold lowercase ${STYLES[gender]}`}
    >
      {gender}
    </span>
  );
}
