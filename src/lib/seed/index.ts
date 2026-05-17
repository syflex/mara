import { db } from '../db';
import { KNM_SEEDS } from './knm-starter';

export async function seedKnmIfEmpty(): Promise<number> {
  const count = await db.knmQuestions.count();
  if (count > 0) return 0;
  await db.knmQuestions.bulkAdd(KNM_SEEDS);
  return KNM_SEEDS.length;
}
