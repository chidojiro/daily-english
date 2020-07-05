import { IWord, IMeaning, IWordByName } from './../types';
import * as firebase from 'firebase';

export const fetchWordDetails = async (name: string): Promise<IWord> =>
  (await firebase.database().ref(`words/${name}`).once('value')).val();

const removeDueDatesFromWord = async (wordName: string) => {
  firebase.database().ref(`words/${wordName}`).update({ stageDueDate: null, previousStageDueDate: null });
};

const updateDueDates = async (wordName: string) => {
  const wordDetails = await fetchWordDetails(wordName);
  firebase
    .database()
    .ref(`words/${wordName}`)
    .update({ stageDueDate: new Date().toDateString(), previousStageDueDate: wordDetails.stageDueDate || null });
};

const updateWordStage = async (wordName: string, stage: number) => {
  await Promise.all([firebase.database().ref(`words/${wordName}`).update({ stage }), updateDueDates(wordName)]);
};

const addWordToDueDate = async (date: string, wordName: string) => {
  firebase
    .database()
    .ref(`staging/dueDate/${date}`)
    .update({
      [wordName]: true,
    });
};

const removeWordFromDueDate = async (date: string, wordName: string) => {
  firebase
    .database()
    .ref(`staging/dueDate/${date}`)
    .update({
      [wordName]: null,
    });
};

export const fetchWords = async (): Promise<IWordByName> =>
  (await firebase.database().ref('words').once('value')).val() || {};

export const fetchRecentWords = async (quantity: number): Promise<IWordByName> =>
  (await firebase.database().ref('words').endAt(quantity).once('value')).val() || {};

export const fetchDueWords = async (): Promise<IWordByName> => {
  const dueWordNames = Object.keys(
    (await firebase.database().ref(`staging/dueDate/${new Date().toDateString()}`).once('value')).val() || {},
  );

  const wordDetailCollection = await Promise.all(dueWordNames.map((dueWordName) => fetchWordDetails(dueWordName)));

  return wordDetailCollection.reduce((acc, cur) => ({ ...acc, [cur.name]: cur }), {});
};

export const createWord = async (name: string) => {
  await firebase.database().ref(`words/${name}`).set({ name, createdDate: new Date().toDateString() });
};

export const deleteWord = async (word: IWord) => {
  await Promise.all([
    firebase.database().ref(`words/${word.name}`).set(null),
    removeWordFromDueDate(word.stageDueDate, word.name),
  ]);
};

export const updateWordName = async (oldWord: string, newWord: string) => {
  const oldWordData = (await firebase.database().ref(`words/${oldWord}`).once('value')).val();
  await Promise.all([
    firebase
      .database()
      .ref(`words/${newWord}`)
      .set({ ...oldWordData, name: newWord }),
    firebase.database().ref(`words/${oldWord}`).set(null),
  ]);
};

export const updateMeanings = async (wordName: string, meaning: IMeaning) => {
  await firebase
    .database()
    .ref(`words/${wordName}/meanings/${meaning.id}`)
    // firebase does not accept undefined
    .set({ ...meaning, categoryMeta: meaning.categoryMeta || null });
};

export const deleteMeaning = async (wordName: string, id: string) => {
  await firebase.database().ref(`words/${wordName}/meanings/${id}`).set(null);
};

export const fetchSearchResults = async (searchQuery: string) => {
  if (!searchQuery) {
    return [];
  }
  const words = await fetchWords();
  return Object.keys(words).filter((word) => word.includes(searchQuery));
};

export const startStagingWord = async (wordName: string) => {
  const today = new Date().toDateString();

  await Promise.all([updateWordStage(wordName, 0), addWordToDueDate(today, wordName)]);
};

export const stopStagingWord = async (date: string, wordName: string) => {
  await Promise.all([
    updateWordStage(wordName, null),
    removeDueDatesFromWord(wordName),
    removeWordFromDueDate(date, wordName),
  ]);
};
