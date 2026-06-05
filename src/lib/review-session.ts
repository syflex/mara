/**
 * Assembles ONE governed review session out of the three skill pools (vocab,
 * writing, listening) so the learner gets a single interleaved, capped run
 * with a clear end — instead of three separate sessions with no budget.
 *
 * Rules: due cards come first (most-overdue first), interleaved across skills
 * so one skill doesn't dominate a long run; then up to `newPerSession` new
 * cards fill the remainder; the whole thing is capped at `sessionMax`.
 */
import type { PracticeReviewCard, SrsState, VocabCard } from './types';
import { isDue } from './srs';

export type ReviewItem =
  | { kind: 'vocab'; id: string; card: VocabCard }
  | { kind: 'writing'; id: string; card: PracticeReviewCard }
  | { kind: 'listening'; id: string; card: PracticeReviewCard }
  | { kind: 'grammar'; id: string; card: PracticeReviewCard };

interface BuildArgs {
  vocab?: VocabCard[];
  writing?: PracticeReviewCard[];
  listening?: PracticeReviewCard[];
  grammar?: PracticeReviewCard[];
  now?: number;
  sessionMax: number;
  newPerSession: number;
}

/**
 * Whether a vocab card should be reviewed in the productive direction
 * (English → produce Dutch + recall the article) instead of recognition.
 * Recognition stays the default; once a word has graduated to review state we
 * ask for production on roughly every third review, so the spaced loop trains
 * recall and gender — not just recognition — without punishing fresh words.
 */
export function vocabDirection(card: VocabCard): 'recognition' | 'production' {
  if (card.srs.state !== 'review') return 'recognition';
  return card.srs.reps % 3 === 0 ? 'production' : 'recognition';
}

/** Round-robin merge: take one from each group in turn so skills alternate. */
function interleave<T>(groups: T[][]): T[] {
  const out: T[] = [];
  const longest = groups.reduce((m, g) => Math.max(m, g.length), 0);
  for (let i = 0; i < longest; i++) {
    for (const g of groups) {
      if (i < g.length) out.push(g[i]);
    }
  }
  return out;
}

const wrapVocab = (c: VocabCard): ReviewItem => ({ kind: 'vocab', id: c.id, card: c });
const wrapWriting = (c: PracticeReviewCard): ReviewItem => ({ kind: 'writing', id: c.id, card: c });
const wrapListening = (c: PracticeReviewCard): ReviewItem => ({ kind: 'listening', id: c.id, card: c });
const wrapGrammar = (c: PracticeReviewCard): ReviewItem => ({ kind: 'grammar', id: c.id, card: c });

const isReviewDue = (s: SrsState, now: number) => s.state !== 'new' && isDue(s, now);
const isFresh = (s: SrsState) => s.state === 'new';
const byDue = (a: ReviewItem, b: ReviewItem) => a.card.srs.due - b.card.srs.due;

export function buildReviewQueue({
  vocab = [],
  writing = [],
  listening = [],
  grammar = [],
  now = Date.now(),
  sessionMax,
  newPerSession,
}: BuildArgs): ReviewItem[] {
  // Due cards from each skill (most-overdue first within a skill), interleaved.
  const due = interleave([
    vocab.filter((c) => isReviewDue(c.srs, now)).map(wrapVocab).sort(byDue),
    writing.filter((c) => isReviewDue(c.srs, now)).map(wrapWriting).sort(byDue),
    listening.filter((c) => isReviewDue(c.srs, now)).map(wrapListening).sort(byDue),
    grammar.filter((c) => isReviewDue(c.srs, now)).map(wrapGrammar).sort(byDue),
  ]);

  // New cards, interleaved across skills, capped so fresh material is paced.
  const fresh = interleave([
    vocab.filter((c) => isFresh(c.srs)).map(wrapVocab),
    writing.filter((c) => isFresh(c.srs)).map(wrapWriting),
    listening.filter((c) => isFresh(c.srs)).map(wrapListening),
    grammar.filter((c) => isFresh(c.srs)).map(wrapGrammar),
  ]).slice(0, newPerSession);

  return [...due, ...fresh].slice(0, sessionMax);
}
