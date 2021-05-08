import { IWord, IMeaning, IWordByName } from './../types';
import * as firebase from 'firebase';
import { v4 as UUID } from 'uuid';

export const fetchWordDetails = async (name: string): Promise<IWord> =>
  (await firebase.database().ref(`words/${name}`).once('value')).val();

const removeDueDatesFromWord = async (wordName: string) => {
  await firebase
    .database()
    .ref(`words/${wordName}`)
    .update({ stageDueDate: null, previousStageDueDate: null });
};

const updateDueDates = async ({ name, stageDueDate }: IWord) => {
  firebase
    .database()
    .ref(`words/${name}`)
    .update({
      stageDueDate: new Date().toDateString(),
      previousStageDueDate: stageDueDate || null,
    });
};

const updateWordStage = async (word: IWord, stage: number) => {
  await Promise.all([
    firebase.database().ref(`words/${word.name}`).update({ stage }),
    updateDueDates(word),
  ]);
};

const addWordToDueDate = async (date: string, wordName: string) => {
  firebase
    .database()
    .ref(`staging/dueDate/${date}`)
    .update({
      [wordName]: true,
    });
};

const removeWordFromDueDate = async ({
  name,
  stageDueDate,
  previousStageDueDate,
}: IWord) => {
  await Promise.all([
    firebase
      .database()
      .ref(`staging/dueDate/${stageDueDate}`)
      .update({
        [name]: null,
      }),
    firebase
      .database()
      .ref(`staging/previousDueDate/${previousStageDueDate}`)
      .update({
        [name]: null,
      }),
  ]);
};

export const fetchWords = async (): Promise<IWordByName> =>
  (await firebase.database().ref('words').once('value')).val() || {};

export const fetchRecentWords = async (
  quantity: number,
): Promise<IWordByName> =>
  (
    await firebase.database().ref('words').endAt(quantity).once('value')
  ).val() || {};

export const fetchDueWords = async (): Promise<IWordByName> => {
  const dueWordNames = Object.keys(
    (
      await firebase
        .database()
        .ref(`staging/dueDate/${new Date().toDateString()}`)
        .once('value')
    ).val() || {},
  );

  const wordDetailCollection = await Promise.all(
    dueWordNames.map((dueWordName) => fetchWordDetails(dueWordName)),
  );

  return wordDetailCollection.reduce(
    (acc, cur) => ({ ...acc, [cur.name]: cur }),
    {},
  );
};

export const createWord = async (name: string) => {
  await firebase
    .database()
    .ref(`words/${name}`)
    .set({ name, createdDate: new Date().toDateString() });
};

export const deleteWord = async (word: IWord) => {
  await Promise.all([
    firebase.database().ref(`words/${word.name}`).remove(),
    removeWordFromDueDate(word),
  ]);
};

export const updateWordName = async (oldWord: string, newWord: string) => {
  const oldWordData = (
    await firebase.database().ref(`words/${oldWord}`).once('value')
  ).val();
  await Promise.all([
    firebase
      .database()
      .ref(`words/${newWord}`)
      .set({ ...oldWordData, name: newWord }),
    firebase.database().ref(`words/${oldWord}`).remove(),
  ]);
};

export const addMeaning = async (
  wordName: string,
  meaning: Omit<IMeaning, 'id'>,
) => {
  await firebase
    .database()
    .ref(`words/${wordName}/meanings/${UUID()}`)
    // firebase does not accept undefined
    .set({ ...meaning, type: meaning.type || null });
};

export const updateMeaning = async (
  wordName: string,
  meaning: Partial<IMeaning>,
) => {
  await firebase
    .database()
    .ref(`words/${wordName}/meanings/${meaning.id}`)
    // firebase does not accept undefined
    .set({ ...meaning, type: meaning.type || null });
};

export const deleteMeaning = async (wordName: string, meaningID: string) => {
  await firebase
    .database()
    .ref(`words/${wordName}/meanings/${meaningID}`)
    .remove();
};

export const fetchSearchResults = async (searchQuery: string) => {
  if (!searchQuery) {
    return [];
  }
  const words = await fetchWords();
  return Object.keys(words).filter((word) => word.includes(searchQuery));
};

export const startStagingWord = async (word: IWord) => {
  const today = new Date().toDateString();

  await Promise.all([
    updateWordStage(word, 0),
    addWordToDueDate(today, word.name),
  ]);
};

export const stopStagingWord = async (word: IWord) => {
  await Promise.all([
    updateWordStage(word, null),
    removeDueDatesFromWord(word.name),
    removeWordFromDueDate(word),
  ]);
};
