'use client';

import { SRS_RATING, type SrsRating } from '@/lib/types';

/**
 * The four FSRS rating buttons, shared by every review card. Pass
 * `suggestedRating` to ring-highlight the rating the auto-check implies
 * (used by listening, where correctness is known).
 */
export function RatingButtons({
  disabled = false,
  suggestedRating,
  onRate,
}: {
  disabled?: boolean;
  suggestedRating?: SrsRating;
  onRate: (rating: SrsRating) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <RateBtn label="Again" color="bg-red-600 hover:bg-red-700" active={suggestedRating === SRS_RATING.AGAIN} disabled={disabled} onClick={() => onRate(SRS_RATING.AGAIN)} />
      <RateBtn label="Hard" color="bg-amber-600 hover:bg-amber-700" active={suggestedRating === SRS_RATING.HARD} disabled={disabled} onClick={() => onRate(SRS_RATING.HARD)} />
      <RateBtn label="Good" color="bg-emerald-600 hover:bg-emerald-700" active={suggestedRating === SRS_RATING.GOOD} disabled={disabled} onClick={() => onRate(SRS_RATING.GOOD)} />
      <RateBtn label="Easy" color="bg-sky-600 hover:bg-sky-700" active={suggestedRating === SRS_RATING.EASY} disabled={disabled} onClick={() => onRate(SRS_RATING.EASY)} />
    </div>
  );
}

function RateBtn({
  label,
  color,
  active = false,
  disabled,
  onClick,
}: {
  label: string;
  color: string;
  active?: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`min-h-12 rounded-xl px-2 py-3 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${color} ${
        active ? 'ring-2 ring-zinc-900 ring-offset-2 dark:ring-white dark:ring-offset-zinc-900' : ''
      }`}
    >
      {label}
    </button>
  );
}
