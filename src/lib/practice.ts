import { db } from './db';
import { LESSONS } from './content/lessons';
import { newSrsState, review } from './srs';
import type {
  Lesson,
  LessonSectionResult,
  ListeningAttempt,
  PracticeReviewCard,
  PracticeReviewKind,
  SectionCompletion,
  SrsRating,
  SectionType,
  SpeakingAttempt,
  WritingAttempt,
} from './types';

export function sectionResultId(lessonId: string, sectionId: string): string {
  return `${lessonId}:${sectionId}`;
}

export function writingAttemptId(
  lessonId: string,
  sectionId: string,
  itemIndex: number,
): string {
  return `${lessonId}:${sectionId}:${itemIndex}`;
}

export function listeningAttemptId(
  lessonId: string,
  sectionId: string,
  questionIndex: number,
): string {
  return `${lessonId}:${sectionId}:${questionIndex}`;
}

export function speakingAttemptId(
  lessonId: string,
  sectionId: string,
  lineId: string,
): string {
  return `${lessonId}:${sectionId}:${lineId}`;
}

export function practiceCardId(
  kind: PracticeReviewKind,
  lessonId: string,
  sectionId: string,
  itemIndex: number,
): string {
  return `practice:${kind}:${lessonId}:${sectionId}:${itemIndex}`;
}

export function collectPracticeCards(lesson: Lesson): PracticeReviewCard[] {
  const now = Date.now();
  const cards: PracticeReviewCard[] = [];
  for (const section of lesson.sections) {
    if (section.type === 'schrijven') {
      section.payload.items.forEach((item, itemIndex) => {
        cards.push({
          id: practiceCardId('writing', lesson.id, section.id, itemIndex),
          kind: 'writing',
          lessonId: lesson.id,
          sectionId: section.id,
          itemIndex,
          prompt: item.promptEn,
          promptEn: item.promptEn,
          expected: item.expected,
          srs: newSrsState(),
          createdAt: now,
          updatedAt: now,
        });
      });
    }

    if (section.type === 'luisteren') {
      section.payload.questions.forEach((question, itemIndex) => {
        const choices = question.choices?.length ? question.choices : undefined;
        const expected = choices
          ? choices[question.correctIndex ?? 0] ?? ''
          : question.expected ?? '';
        cards.push({
          id: practiceCardId('listening', lesson.id, section.id, itemIndex),
          kind: 'listening',
          lessonId: lesson.id,
          sectionId: section.id,
          itemIndex,
          prompt: question.questionNl,
          expected,
          choices,
          audioId: section.payload.audioId,
          transcriptNl: section.payload.transcriptNl,
          transcriptEn: section.payload.transcriptEn,
          srs: newSrsState(),
          createdAt: now,
          updatedAt: now,
        });
      });
    }
  }
  return cards;
}

export async function importLessonPracticeCards(lesson: Lesson): Promise<number> {
  const cards = collectPracticeCards(lesson);
  if (cards.length === 0) return 0;
  const existing = await db.practiceReviewCards.bulkGet(cards.map((c) => c.id));
  const toAdd: PracticeReviewCard[] = [];
  const toUpdate: PracticeReviewCard[] = [];

  cards.forEach((next, i) => {
    const current = existing[i];
    if (!current) {
      toAdd.push(next);
      return;
    }
    if (
      current.prompt !== next.prompt ||
      current.promptEn !== next.promptEn ||
      current.expected !== next.expected ||
      current.audioId !== next.audioId ||
      current.transcriptNl !== next.transcriptNl ||
      current.transcriptEn !== next.transcriptEn ||
      JSON.stringify(current.choices ?? []) !== JSON.stringify(next.choices ?? [])
    ) {
      toUpdate.push({
        ...current,
        prompt: next.prompt,
        promptEn: next.promptEn,
        expected: next.expected,
        choices: next.choices,
        audioId: next.audioId,
        transcriptNl: next.transcriptNl,
        transcriptEn: next.transcriptEn,
        updatedAt: Date.now(),
      });
    }
  });

  if (toAdd.length > 0) await db.practiceReviewCards.bulkAdd(toAdd);
  if (toUpdate.length > 0) await db.practiceReviewCards.bulkPut(toUpdate);
  return toAdd.length;
}

export async function backfillPracticeCards(): Promise<void> {
  const completed = await db.lessonProgress
    .where('completedAt')
    .above(0)
    .toArray();
  for (const p of completed) {
    const lesson = LESSONS.find((l) => l.id === p.lessonId);
    if (lesson) await importLessonPracticeCards(lesson);
  }
}

export function practiceDueCounts(
  cards: PracticeReviewCard[] | undefined,
  now: number = Date.now(),
): { due: number; newCount: number; total: number } {
  if (!cards) return { due: 0, newCount: 0, total: 0 };
  const due = cards.filter((c) => c.srs.state !== 'new' && c.srs.due <= now).length;
  const newCount = cards.filter((c) => c.srs.state === 'new').length;
  return { due, newCount, total: cards.length };
}

export async function reviewPracticeCard(
  card: PracticeReviewCard,
  rating: SrsRating,
  attemptId?: string,
): Promise<void> {
  await db.practiceReviewCards.update(card.id, {
    srs: review(card.srs, rating),
    updatedAt: Date.now(),
    lastAttemptId: attemptId ?? card.lastAttemptId,
  });
}

export async function saveSectionResult({
  lessonId,
  sectionId,
  sectionType,
  completion,
}: {
  lessonId: string;
  sectionId: string;
  sectionType: SectionType;
  completion: SectionCompletion;
}): Promise<void> {
  if (!completion.isComplete) return;
  const now = Date.now();
  const row: LessonSectionResult = {
    id: sectionResultId(lessonId, sectionId),
    lessonId,
    sectionId,
    sectionType,
    completedAt: now,
    updatedAt: now,
    score: completion.score,
    total: completion.total,
    evidence: completion.evidence,
  };
  await db.lessonSectionResults.put(row);
}

export async function saveWritingAttempt(
  attempt: Omit<WritingAttempt, 'id' | 'submittedAt'>,
): Promise<string> {
  const row = {
    ...attempt,
    id: writingAttemptId(attempt.lessonId, attempt.sectionId, attempt.itemIndex),
    submittedAt: Date.now(),
  };
  await db.writingAttempts.put(row);
  return row.id;
}

export async function saveListeningAttempt(
  attempt: Omit<ListeningAttempt, 'id' | 'submittedAt'>,
): Promise<string> {
  const row = {
    ...attempt,
    id: listeningAttemptId(
      attempt.lessonId,
      attempt.sectionId,
      attempt.questionIndex,
    ),
    submittedAt: Date.now(),
  };
  await db.listeningAttempts.put(row);
  return row.id;
}

export async function saveSpeakingAttempt(
  attempt: Omit<SpeakingAttempt, 'id' | 'recordedAt'>,
): Promise<void> {
  await db.speakingAttempts.put({
    ...attempt,
    id: speakingAttemptId(attempt.lessonId, attempt.sectionId, attempt.lineId),
    recordedAt: Date.now(),
  });
}
