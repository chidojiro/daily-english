export type IMeaningType = 'adjective' | 'adverb' | 'noun' | 'verb' | 'conjunction' | 'idiom' | 'phrasal';

export type IVerbSubType = 'transitive' | 'intransitive';
export type INounSubType = 'countable' | 'uncountable';
export type IMeaningCategoryMeta = {
  [key in IVerbSubType | INounSubType]: boolean;
};

export interface IVerb {
  type: 'verb';
  subType?: IVerbSubType;
}

export interface INoun {
  type: 'noun';
  subType?: INounSubType;
}

export interface IFullMeaningType {
  type: IMeaningType;
  subType?: IVerb | INoun;
}

export interface IMeaning extends IFullMeaningType {
  id: string;
  meaning: string;
  example?: string;
  note?: string;
  extension?: string;
  extensionMeaning?: string;
  extensionExample?: string;
}

export interface IMeaningByID {
  [id: string]: IMeaning;
}

export type IMeaningsByType = {
  [type in IMeaningType]: IMeaning[];
};

export interface IWord {
  name: string;
  meanings?: IMeaningByID;
  createdDate: string;
  stage?: number;
  stageDueDate?: string;
  previousStageDueDate?: string;
}

export interface IWordByName {
  [name: string]: IWord;
}

export interface IOption<T> {
  value: T;
  label: React.ReactNode;
}
