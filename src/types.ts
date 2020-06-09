// Taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
export type Diff<T extends string | number | symbol, U extends string | number | symbol> = ({
  [P in T]: P;
} &
  { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends string | number | symbol> = Pick<T, Diff<Extract<keyof T, string>, K>>;

export type IMeaningCategoryKeys = 'adjective' | 'adverb' | 'noun' | 'verb' | 'conjunction' | 'idiom' | 'phrasal';

export type IVerbMeta = 'transitive' | 'intransitive';
export type INounMeta = 'countable' | 'uncountable';
export type IMeaningCategoryMeta = {
  [key in IVerbMeta | INounMeta]: boolean;
};

export interface IMeaning {
  id: string;
  category: IMeaningCategoryKeys;
  categoryMeta?: IMeaningCategoryMeta;
  meaning: string;
  example: string;
  note: string;
}

export interface IMeaningByID {
  [id: string]: IMeaning;
}

export type IMeaningsByCategory = {
  [category in IMeaningCategoryKeys]: IMeaning[];
};

export interface IWord {
  meanings?: IMeaningByID;
  createdDate: string;
  stage?: number;
}

export interface IWordByName {
  [name: string]: IWord;
}
