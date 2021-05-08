import { IMeaningType, INounSubType, IVerbSubType } from './types';

type IVerbMetaKey = {
  [key in IVerbSubType]: string;
};

export const VerbMeta: IVerbMetaKey = {
  transitive: 'transitive',
  intransitive: 'intransitive',
};

type INounMetaKey = {
  [key in INounSubType]: string;
};

export const NounMeta: INounMetaKey = {
  countable: 'countable',
  uncountable: 'uncountable',
};

type IMeaningCategoryKey = {
  [wordCategory in IMeaningType]: string;
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

export const levelMapping = [1, 1, 1, 2, 2, 4, 4, 7, 7, 15, 15, 30, 30];

export const prefixCls = 'dv-';
