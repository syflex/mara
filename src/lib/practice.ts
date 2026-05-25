import { db } from './db';
import type {
  LessonSectionResult,
  ListeningAttempt,
  SectionCompletion,
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
): Promise<void> {
  await db.writingAttempts.put({
    ...attempt,
    id: writingAttemptId(attempt.lessonId, attempt.sectionId, attempt.itemIndex),
    submittedAt: Date.now(),
  });
}

export async function saveListeningAttempt(
  attempt: Omit<ListeningAttempt, 'id' | 'submittedAt'>,
): Promise<void> {
  await db.listeningAttempts.put({
    ...attempt,
    id: listeningAttemptId(
      attempt.lessonId,
      attempt.sectionId,
      attempt.questionIndex,
    ),
    submittedAt: Date.now(),
  });
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
