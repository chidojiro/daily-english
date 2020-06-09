import { IWord, IMeaning, IWordByName } from './../types';
import * as firebase from 'firebase';

export const fetchWords = async () => (await firebase.database().ref('words').once('value')).val();

export const fetchRecentWords = async (quantity: number): Promise<IWordByName> =>
  (await firebase.database().ref('words').endAt(quantity).once('value')).val();

export const fetchWordDetails = async (name: string): Promise<IWord> =>
  (await firebase.database().ref(`words/${name}`).once('value')).val();

export const createWord = async (name: string) => {
  await firebase.database().ref(`words/${name}`).set({ createdDate: new Date().toISOString() });
};

export const deleteWord = async (name: string) => {
  await firebase.database().ref(`words/${name}`).set(null);
};

export const updateWord = async (oldWord: string, newWord: string) => {
  const oldWordData = (await firebase.database().ref(`words/${oldWord}`).once('value')).val();
  await firebase.database().ref(`words/${oldWord}`).set(null);
  await Promise.all([
    firebase.database().ref(`words/${newWord}`).set(oldWordData),
    firebase.database().ref(`words/${oldWord}`).set(null),
  ]);
};

export const updateMeanings = async (wordName: string, meaning: IMeaning) => {
  await firebase
    .database()
    .ref(`words/${wordName}/meanings/${meaning.id}`)
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
  await Promise.all([
    firebase
      .database()
      .ref(`staging/${today}`)
      .update({
        [wordName]: true,
      }),
    firebase.database().ref(`words/${wordName}`).update({ stage: 0 }),
  ]);
};
