import { IVerbMeta, INounMeta, IMeaningCategoryKeys } from './types';

type IVerbMetaKey = {
  [key in IVerbMeta]: string;
};

export const VerbMeta: IVerbMetaKey = {
  transitive: 'transitive',
  intransitive: 'intransitive',
};

type INounMetaKey = {
  [key in INounMeta]: string;
};

export const NounMeta: INounMetaKey = {
  countable: 'countable',
  uncountable: 'uncountable',
};

type IMeaningCategoryKey = {
  [wordCategory in IMeaningCategoryKeys]: string;
};

export const meaningCategoryKey: IMeaningCategoryKey = {
  adjective: 'adjective',
  adverb: 'adverb',
  noun: 'noun',
  verb: 'verb',
  conjunction: 'conjunction',
  idiom: 'idiom',
  phrasal: 'phrasal',
};

export const WordCategoryMeta = {
  [meaningCategoryKey.verb]: VerbMeta,
  [meaningCategoryKey.noun]: NounMeta,
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const functionPlaceholder = () => {};
