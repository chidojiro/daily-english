export type ISimpleMeaningType =
  | 'adjective'
  | 'adverb'
  | 'conjunction'
  | 'idiom'
  | 'phrasal';
export type IMeaningType = ISimpleMeaningType | 'noun' | 'verb';

export type IVerbSubType = 'transitive' | 'intransitive';
export type INounSubType = 'countable' | 'uncountable';
export type IMeaningCategoryMeta = {
  [key in IVerbSubType | INounSubType]: boolean;
};

export interface ISimpleType {
  type: ISimpleMeaningType;
}

export interface IVerb {
  type: 'verb';
  subTypes?: IVerbSubType[];
}

export interface INoun {
  type: 'noun';
  subTypes?: INounSubType[];
}

export type IType = ISimpleType | IVerb | INoun;

export interface IBaseMeaning {
  id: string;
  meaning: string;
  example?: string;
  note?: string;
  extension?: string;
  extensionMeaning?: string;
  extensionExample?: string;
}

export type ISimpleTypeMeaning = IBaseMeaning & ISimpleType;

export type INounMeaning = IBaseMeaning & INoun;

export type IVerbMeaning = IBaseMeaning & IVerb;

export type IMeaning = ISimpleTypeMeaning | INounMeaning | IVerbMeaning;

export interface IMeaningByID {
  [id: string]: IMeaning;
}

export type IMeaningsByType = {
  [type in IMeaningType]: IMeaning;
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
