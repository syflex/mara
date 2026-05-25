'use client';

// One shared audio clip + a stack of independent questions (MC or typed).
// First tap locks the answer; transcript stays hidden until the learner asks.

import { useEffect, useState } from 'react';
import { saveListeningAttempt, saveSectionResult } from '@/lib/practice';
import type {
  LuisterenPayload,
  LuisterenQuestion,
  SectionCompletion,
} from '@/lib/types';
import AudioPlayer from '@/components/audio/AudioPlayer';

interface Props {
  lessonId: string;
  sectionId: string;
  payload: LuisterenPayload;
  onCompletionChange?: (completion: SectionCompletion) => void;
}

export default function LuisterenSection({
  lessonId,
  sectionId,
  payload,
  onCompletionChange,
}: Props) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter(Boolean).length;
  const complete =
    payload.questions.length > 0 && answeredCount === payload.questions.length;

  useEffect(() => {
    const completion = {
      isComplete: complete,
      score: correctCount,
      total: payload.questions.length,
      evidence: complete ? `${payload.questions.length} luistervragen beantwoord.` : undefined,
    };
    onCompletionChange?.(completion);
    if (complete) {
      void saveSectionResult({
        lessonId,
        sectionId,
        sectionType: 'luisteren',
        completion,
      });
    }
  }, [
    complete,
    correctCount,
    lessonId,
    onCompletionChange,
    payload.questions.length,
    sectionId,
  ]);

  return (
    <div className="space-y-4">
      {payload.intro && (
        <p className="px-1 text-sm text-zinc-600 dark:text-zinc-300">
          {payload.intro}
        </p>
      )}

      <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Luister
          </p>
          <AudioPlayer
            lessonId={lessonId}
            audioId={payload.audioId}
            ariaLabel="Speel het fragment af"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowTranscript((v) => !v)}
          aria-expanded={showTranscript}
          className="mt-3 inline-flex min-h-10 items-center gap-1 text-xs font-medium text-zinc-500 underline-offset-2 hover:text-zinc-700 hover:underline active:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 dark:active:text-zinc-100"
        >
          {showTranscript ? 'Verberg transcript' : 'Toon transcript'}
        </button>
        {showTranscript && (
          <div className="mt-2 rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-800/60">
            <p className="text-sm text-zinc-800 dark:text-zinc-100">
              {payload.transcriptNl}
            </p>
            {payload.transcriptEn && (
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {payload.transcriptEn}
              </p>
            )}
          </div>
        )}
      </article>

      <ol className="space-y-3">
        {payload.questions.map((q, i) => (
          <li key={i}>
            <QuestionCard
              lessonId={lessonId}
              sectionId={sectionId}
              question={q}
              index={i + 1}
              onAnswered={(correct) =>
                setAnswers((prev) => ({ ...prev, [i]: correct }))
              }
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

type AnswerState =
  | { kind: 'unanswered' }
  | { kind: 'mc'; picked: number; correct: boolean }
  | { kind: 'typed'; value: string; correct: boolean };

function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function QuestionCard({
  lessonId,
  sectionId,
  question,
  index,
  onAnswered,
}: {
  lessonId: string;
  sectionId: string;
  question: LuisterenQuestion;
  index: number;
  onAnswered: (correct: boolean) => void;
}) {
  const [state, setState] = useState<AnswerState>({ kind: 'unanswered' });
  const isMc = question.choices !== undefined && question.choices.length > 0;

  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/5">
      <p className="text-base text-zinc-900 dark:text-zinc-100">
        <span className="mr-2 text-xs font-medium text-zinc-400 dark:text-zinc-500">
          {index}.
        </span>
        {question.questionNl}
      </p>
      {question.questionEn && (
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
          {question.questionEn}
        </p>
      )}

      {isMc ? (
        <McChoices
          lessonId={lessonId}
          sectionId={sectionId}
          question={question}
          questionIndex={index - 1}
          state={state}
          setState={setState}
          onAnswered={onAnswered}
        />
      ) : (
        <TypedInput
          lessonId={lessonId}
          sectionId={sectionId}
          question={question}
          questionIndex={index - 1}
          state={state}
          setState={setState}
          onAnswered={onAnswered}
        />
      )}
    </article>
  );
}

function McChoices({
  lessonId,
  sectionId,
  question,
  questionIndex,
  state,
  setState,
  onAnswered,
}: {
  lessonId: string;
  sectionId: string;
  question: LuisterenQuestion;
  questionIndex: number;
  state: AnswerState;
  setState: (s: AnswerState) => void;
  onAnswered: (correct: boolean) => void;
}) {
  const choices = question.choices ?? [];
  const correctIndex = question.correctIndex ?? 0;
  const locked = state.kind !== 'unanswered';

  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2">
      {choices.map((c, i) => {
        const isCorrect = i === correctIndex;
        const isPicked = state.kind === 'mc' && state.picked === i;
        // Visual rules: before a pick, all neutral. After: picked-correct =
        // emerald; picked-wrong = red + reveal the correct one in emerald.
        let cls =
          'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-700 dark:active:bg-zinc-600';
        if (locked) {
          if (isPicked && isCorrect) {
            cls =
              'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200';
          } else if (isPicked && !isCorrect) {
            cls =
              'border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200';
          } else if (isCorrect) {
            cls =
              'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200';
          } else {
            cls =
              'border-zinc-200 bg-white text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400';
          }
        }
        return (
          <button
            key={i}
            type="button"
            disabled={locked}
            onClick={() => {
              setState({ kind: 'mc', picked: i, correct: isCorrect });
              onAnswered(isCorrect);
              void saveListeningAttempt({
                lessonId,
                sectionId,
                questionIndex,
                questionNl: question.questionNl,
                answer: c,
                expected: choices[correctIndex] ?? '',
                correct: isCorrect,
              });
            }}
            className={`inline-flex min-h-12 items-center justify-center rounded-lg border px-4 py-2 text-base font-semibold transition-colors disabled:cursor-default ${cls}`}
            aria-pressed={isPicked}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

function TypedInput({
  lessonId,
  sectionId,
  question,
  questionIndex,
  state,
  setState,
  onAnswered,
}: {
  lessonId: string;
  sectionId: string;
  question: LuisterenQuestion;
  questionIndex: number;
  state: AnswerState;
  setState: (s: AnswerState) => void;
  onAnswered: (correct: boolean) => void;
}) {
  const [value, setValue] = useState('');
  const locked = state.kind !== 'unanswered';
  const expected = question.expected ?? '';

  function submit() {
    const correct = normalize(value) === normalize(expected);
    setState({ kind: 'typed', value, correct });
    onAnswered(correct);
    void saveListeningAttempt({
      lessonId,
      sectionId,
      questionIndex,
      questionNl: question.questionNl,
      answer: value.trim(),
      expected,
      correct,
    });
  }

  if (locked && state.kind === 'typed') {
    return (
      <div className="mt-3 space-y-2">
        <p
          className={`rounded-md border px-3 py-2 text-sm ${
            state.correct
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200'
              : 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200'
          }`}
        >
          <span className="font-medium">Jouw antwoord:</span> {state.value || '—'}
        </p>
        {!state.correct && (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
            <span className="font-medium">Antwoord:</span> {expected}
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      className="mt-3 flex flex-wrap items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        className="min-h-11 min-w-0 flex-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        placeholder="Typ hier…"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700 active:bg-orange-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500"
      >
        Controleer
      </button>
    </form>
  );
}
