import React from 'react';
import _ from 'lodash';

import { MeaningByCategory } from '../meaningByCategory';
import { IWord, IMeaningsByCategory, IMeaningCategoryKeys, IMeaning } from '../../types';
import { deleteMeaning } from '../../apiClients';
import {useMeaningDialog} from '../meaningDialog';

interface IProps {
  word: IWord;
}

const categories: IMeaningCategoryKeys[] = ['adjective', 'adverb', 'noun', 'verb', 'conjunction', 'idiom', 'phrasal'];

export const WordMeanings: React.FC<IProps> = ({ word: wordProp }) => {
  const [word, setWord] = React.useState(wordProp);

  const handleDeleteMeaning = React.useCallback(
    async (id: string) => {
      await deleteMeaning(word.name, id);
      setWord({ ...word, meanings: { ...word.meanings, id: null } });
    },
    [word],
  );

  const {openMeaningDialog} = useMeaningDialog();

  const meaningsById = word.meanings || {};

  const meanings: IMeaning[] = React.useMemo(
    () => Object.keys(meaningsById).map((id) => ({ id, ...meaningsById[id] })),
    [meaningsById],
  );

  const meaningsByCategory = _.groupBy(meanings, 'category') as IMeaningsByCategory;

  return (<div>
    {categories.map((key) => (
      <MeaningByCategory
        key={key}
        meanings={meaningsByCategory[key]}
        category={key}
        onEditClick={(meaning) =>
          openMeaningDialog({
            wordName: word.name,
            onOk: console.log as any,
            meaning,
            onDelete: () => handleDeleteMeaning(meaning.id),
            mode: 'edit',
          })
        }
      />
    ))}
  </div>);
};