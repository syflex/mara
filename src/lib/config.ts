/**
 * Central tunables for the lesson runtime.
 *
 * Add a value here when it's a *behavioral* knob — timing, speed, pedagogy —
 * that someone might want to change without diving into a component. Keep
 * presentational details tied to one component's layout (SVG geometry,
 * CSS-bound sizes, icon dimensions) co-located, since changing them
 * elsewhere wouldn't make sense in isolation.
 */

export const AUDIO = {
  /** Playback rates exposed via the per-clip [🔊 | ½×] button group. */
  rates: {
    normal: 1,
    slow: 0.5,
  },
} as const;

export const RECORDING = {
  /**
   * Hard cap on a single spreken recording. A0 lines are 1–3s utterances;
   * 10s leaves headroom for slower learners and prevents the recorder
   * running indefinitely if the learner forgets to stop.
   */
  maxMs: 10_000,
  /**
   * Update interval for the recording timer + progress ring. 100ms feels
   * smooth; lower means more re-renders for no perceptual gain.
   */
  tickMs: 100,
} as const;

export const MINI_DIALOOG = {
  /**
   * Pause between consecutive lines during the "Speel scène" play-all.
   * Long enough to feel like turn-taking, short enough to keep momentum.
   */
  lineGapMs: 400,
} as const;

export const ACTIVITY = {
  /**
   * Daily minutes goal — the Vandaag rings fill against this. Matches the
   * "30 min/day" budget the app is designed around.
   */
  goalMinutes: 30,
  /**
   * How often the activity tracker ticks while a lesson is open. Each tick
   * adds the elapsed seconds since the last tick to today's total. Short
   * enough that backgrounding/closing the tab loses at most this much.
   */
  tickMs: 5_000,
} as const;
