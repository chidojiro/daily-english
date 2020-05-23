import { IWord, IMeaning } from './../types';
import * as firebase from 'firebase';

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
  const words = (await firebase.database().ref('words').once('value')).val();
  return Object.keys(words).filter((word) => word.includes(searchQuery));
};
