import type { VocabCard } from '../types';
import { newSrsState } from '../srs';

type Seed = Omit<VocabCard, 'srs' | 'createdAt' | 'source'>;

const seeds: Seed[] = [
  { id: 'v-001', dutch: 'ik', english: 'I', partOfSpeech: 'pronoun', level: 'A1', exampleNl: 'Ik ben moe.', exampleEn: 'I am tired.' },
  { id: 'v-002', dutch: 'jij / je', english: 'you (sg.)', partOfSpeech: 'pronoun', level: 'A1', exampleNl: 'Jij bent aardig.', exampleEn: 'You are nice.' },
  { id: 'v-003', dutch: 'hij', english: 'he', partOfSpeech: 'pronoun', level: 'A1' },
  { id: 'v-004', dutch: 'zij / ze', english: 'she / they', partOfSpeech: 'pronoun', level: 'A1' },
  { id: 'v-005', dutch: 'wij / we', english: 'we', partOfSpeech: 'pronoun', level: 'A1' },
  { id: 'v-006', dutch: 'zijn', english: 'to be', partOfSpeech: 'verb', level: 'A1', pastSingular: 'was', pastParticiple: 'geweest', auxiliary: 'zijn', exampleNl: 'Ik ben ziek.', exampleEn: 'I am sick.' },
  { id: 'v-007', dutch: 'hebben', english: 'to have', partOfSpeech: 'verb', level: 'A1', pastSingular: 'had', pastParticiple: 'gehad', auxiliary: 'hebben', exampleNl: 'Ik heb een vraag.', exampleEn: 'I have a question.' },
  { id: 'v-008', dutch: 'gaan', english: 'to go', partOfSpeech: 'verb', level: 'A1', pastSingular: 'ging', pastParticiple: 'gegaan', auxiliary: 'zijn', exampleNl: 'Ik ga naar huis.', exampleEn: 'I go home.' },
  { id: 'v-009', dutch: 'doen', english: 'to do', partOfSpeech: 'verb', level: 'A1', pastSingular: 'deed', pastParticiple: 'gedaan', auxiliary: 'hebben' },
  { id: 'v-010', dutch: 'kunnen', english: 'can / to be able', partOfSpeech: 'verb', level: 'A1', pastSingular: 'kon', pastParticiple: 'gekund', auxiliary: 'hebben' },
  { id: 'v-011', dutch: 'het huis', english: 'house', partOfSpeech: 'noun', gender: 'het', plural: 'huizen', level: 'A1', theme: 'wonen', exampleNl: 'Het huis is groot.', exampleEn: 'The house is big.' },
  { id: 'v-012', dutch: 'het werk', english: 'work', partOfSpeech: 'noun', gender: 'het', level: 'A1', theme: 'werk-inkomen' },
  { id: 'v-013', dutch: 'de school', english: 'school', partOfSpeech: 'noun', gender: 'de', plural: 'scholen', level: 'A1', theme: 'onderwijs' },
  { id: 'v-014', dutch: 'de dokter', english: 'doctor', partOfSpeech: 'noun', gender: 'de', plural: 'dokters', level: 'A1', theme: 'gezondheidszorg' },
  { id: 'v-015', dutch: 'de buurt', english: 'neighborhood', partOfSpeech: 'noun', gender: 'de', plural: 'buurten', level: 'A2', theme: 'wonen' },
  { id: 'v-016', dutch: 'de huur', english: 'rent', partOfSpeech: 'noun', gender: 'de', level: 'A2', theme: 'wonen' },
  { id: 'v-017', dutch: 'het salaris', english: 'salary', partOfSpeech: 'noun', gender: 'het', plural: 'salarissen', level: 'A2', theme: 'werk-inkomen' },
  { id: 'v-018', dutch: 'de afspraak', english: 'appointment', partOfSpeech: 'noun', gender: 'de', plural: 'afspraken', level: 'A2', theme: 'dagelijks-leven', exampleNl: 'Ik heb een afspraak bij de dokter.', exampleEn: 'I have an appointment at the doctor.' },
  { id: 'v-019', dutch: 'de gemeente', english: 'municipality', partOfSpeech: 'noun', gender: 'de', plural: 'gemeenten', level: 'A2', theme: 'rechten-plichten' },
  { id: 'v-020', dutch: 'de belasting', english: 'tax', partOfSpeech: 'noun', gender: 'de', plural: 'belastingen', level: 'A2', theme: 'rechten-plichten' },
  { id: 'v-021', dutch: 'groot', english: 'big', partOfSpeech: 'adjective', level: 'A1', exampleNl: 'Een grote auto.', exampleEn: 'A big car.' },
  { id: 'v-022', dutch: 'klein', english: 'small', partOfSpeech: 'adjective', level: 'A1' },
  { id: 'v-023', dutch: 'goed', english: 'good', partOfSpeech: 'adjective', level: 'A1' },
  { id: 'v-024', dutch: 'duur', english: 'expensive', partOfSpeech: 'adjective', level: 'A2' },
  { id: 'v-025', dutch: 'goedkoop', english: 'cheap', partOfSpeech: 'adjective', level: 'A2' },
  { id: 'v-026', dutch: 'in', english: 'in', partOfSpeech: 'preposition', level: 'A1' },
  { id: 'v-027', dutch: 'op', english: 'on', partOfSpeech: 'preposition', level: 'A1' },
  { id: 'v-028', dutch: 'met', english: 'with', partOfSpeech: 'preposition', level: 'A1' },
  { id: 'v-029', dutch: 'voor', english: 'for / before', partOfSpeech: 'preposition', level: 'A1' },
  { id: 'v-030', dutch: 'omdat', english: 'because', partOfSpeech: 'conjunction', level: 'A2', notes: 'Sends verb to end: "Ik blijf thuis omdat ik ziek ben."' },
];

export const VOCAB_SEEDS: VocabCard[] = seeds.map((s) => ({
  ...s,
  source: 'starter' as const,
  srs: newSrsState(),
  createdAt: Date.now(),
}));
