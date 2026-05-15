import { db } from '../db';
import { KNM_SEEDS } from './knm-starter';
import { VOCAB_SEEDS } from './vocab-starter';

export async function seedIfEmpty(): Promise<{ knm: number; vocab: number }> {
  const [knmCount, vocabCount] = await Promise.all([
    db.knmQuestions.count(),
    db.vocab.count(),
  ]);
  let added = { knm: 0, vocab: 0 };
  if (knmCount === 0) {
    await db.knmQuestions.bulkAdd(KNM_SEEDS);
    added.knm = KNM_SEEDS.length;
  }
  if (vocabCount === 0) {
    await db.vocab.bulkAdd(VOCAB_SEEDS);
    added.vocab = VOCAB_SEEDS.length;
  }
  return added;
}
