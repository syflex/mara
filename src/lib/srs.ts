import {
  fsrs,
  generatorParameters,
  Rating,
  State,
  createEmptyCard,
  type Card as FsrsCard,
  type Grade,
} from 'ts-fsrs';
import type { SrsState, SrsRating, SrsCardState } from './types';

const params = generatorParameters({ enable_fuzz: true, enable_short_term: true });
const scheduler = fsrs(params);

const stateMap: Record<State, SrsCardState> = {
  [State.New]: 'new',
  [State.Learning]: 'learning',
  [State.Review]: 'review',
  [State.Relearning]: 'relearning',
};

const reverseStateMap: Record<SrsCardState, State> = {
  new: State.New,
  learning: State.Learning,
  review: State.Review,
  relearning: State.Relearning,
};

const ratingMap: Record<SrsRating, Grade> = {
  1: Rating.Again as Grade,
  2: Rating.Hard as Grade,
  3: Rating.Good as Grade,
  4: Rating.Easy as Grade,
};

export function newSrsState(): SrsState {
  const card = createEmptyCard();
  return fsrsToSrs(card);
}

function fsrsToSrs(card: FsrsCard): SrsState {
  return {
    due: card.due.getTime(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsedDays: card.elapsed_days,
    scheduledDays: card.scheduled_days,
    reps: card.reps,
    lapses: card.lapses,
    state: stateMap[card.state],
    lastReview: card.last_review?.getTime(),
  };
}

function srsToFsrs(s: SrsState): FsrsCard {
  return {
    due: new Date(s.due),
    stability: s.stability,
    difficulty: s.difficulty,
    elapsed_days: s.elapsedDays,
    scheduled_days: s.scheduledDays,
    learning_steps: 0,
    reps: s.reps,
    lapses: s.lapses,
    state: reverseStateMap[s.state],
    last_review: s.lastReview ? new Date(s.lastReview) : undefined,
  };
}

export function review(state: SrsState, rating: SrsRating, now: Date = new Date()): SrsState {
  const fsrsCard = srsToFsrs(state);
  const result = scheduler.next(fsrsCard, now, ratingMap[rating]);
  return fsrsToSrs(result.card);
}

export function isDue(state: SrsState, now: number = Date.now()): boolean {
  return state.due <= now;
}

export function dueSoonCount<T extends { srs: SrsState }>(
  items: T[],
  now: number = Date.now()
): { due: number; newCount: number; total: number } {
  const due = items.filter((i) => i.srs.due <= now && i.srs.state !== 'new').length;
  const newCount = items.filter((i) => i.srs.state === 'new').length;
  return { due, newCount, total: items.length };
}
