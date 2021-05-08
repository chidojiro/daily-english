import { groupBy } from 'lodash';
import React from 'react';
import { useModal } from '../../hooks';
import { IMeaning, IMeaningType, IWord } from '../../types';
import { MeaningModal } from '../MeaningModal';
import { MeaningsByType } from '../MeaningsByType';

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

export const WordMeanings: React.FC<IProps> = ({ word }) => {
  const [meaningEditing, setMeaningEditing] = React.useState<IMeaning>();
  const { openModal, Modal: MeaningModalWrapper } = useModal(MeaningModal);

  const meaningsById = React.useMemo(() => word.meanings || {}, [
    word.meanings,
  ]);

  const meanings: IMeaning[] = React.useMemo(
    () => Object.keys(meaningsById).map((id) => ({ id, ...meaningsById[id] })),
    [meaningsById],
  );

  const meaningsByType = groupBy(meanings, 'type');

  const handleEditClick = (meaning: IMeaning) => {
    openModal();
    setMeaningEditing(meaning);
  };

  return (
    <div>
      <MeaningModalWrapper wordName={word.name} meaning={meaningEditing} />
      {types.map((key) => (
        <MeaningsByType
          key={key}
          meanings={meaningsByType[key]}
          type={key}
          onEditClick={handleEditClick}
        />
      ))}
    </div>
  );
};
