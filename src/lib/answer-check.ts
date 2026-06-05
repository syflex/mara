/**
 * Shared answer normalisation + matching for typed review cards (listening
 * dictation, grammar production). Diacritic- and case-insensitive, whitespace-
 * collapsed — mirrors the in-lesson DrillSection check so review grades the
 * same way the lesson does.
 */
export function normalizeAnswer(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function matchesExpected(
  answer: string,
  expected: string,
  acceptVariants: string[] = [],
): boolean {
  const a = normalizeAnswer(answer);
  if (a === normalizeAnswer(expected)) return true;
  return acceptVariants.some((v) => a === normalizeAnswer(v));
}
