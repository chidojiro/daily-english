import React from 'react';
import _ from 'lodash';

import { MeaningsByType } from '../MeaningsByType';
import { IWord, IMeaningsByType, IMeaningType, IMeaning } from '../../types';
import { deleteMeaning } from '../../apiClients';
import { MeaningModal } from '../MeaningModal';
import { useModal } from '../../hooks';

interface IProps {
  word: IWord;
}

const types: IMeaningType[] = [
  'adjective',
  'adverb',
  'noun',
  'verb',
  'conjunction',
  'idiom',
  'phrasal',
];

export const WordMeanings: React.FC<IProps> = ({ word: wordProp }) => {
  const [word, setWord] = React.useState(wordProp);

  const handleDeleteMeaning = React.useCallback(
    async (id: string) => {
      await deleteMeaning(word.name, id);
      setWord({ ...word, meanings: { ...word.meanings, id: null } });
    },
    [word],
  );

  const { openModal, Modal: MeaningModalWrapper } = useModal(MeaningModal);

  const meaningsById = word.meanings || {};

  const meanings: IMeaning[] = React.useMemo(
    () => Object.keys(meaningsById).map((id) => ({ id, ...meaningsById[id] })),
    [meaningsById],
  );

  const meaningsByType = _.groupBy(meanings, 'type');

  return (
    <div>
      {types.map((key) => (
        <MeaningsByType
          key={key}
          meanings={meaningsByType[key]}
          type={key}
          // onEditClick={(meaning) =>
          //   openMeaningDialog({
          //     wordName: word.name,
          //     onOk: console.log as any,
          //     meaning,
          //     onDelete: () => handleDeleteMeaning(meaning.id),
          //     mode: 'edit',
          //   })
          // }
          onEditClick={openModal}
        />
      ))}
    </div>
  );
};
