import { Button } from 'antd';
import React from 'react';
import { MeaningModal, WordMeanings } from '../../../components';
import { useModal } from '../../../hooks';
import { IWordByName } from '../../../types';
import Styled from './WorkOutZone.styled';

interface IProps {
  wordsByName: IWordByName;
  onBackClick: () => void;
}

export const WorkOutZone: React.FC<IProps> = ({ wordsByName }) => {
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [shouldShowAnswer, setShouldShowAnswer] = React.useState(false);

  const shuffledWords = React.useMemo(
    () => Object.values(wordsByName).sort(() => Math.random() - 0.5),
    [wordsByName],
  );

  const currentWord = shuffledWords[currentWordIndex];

  const { Modal: MeaningModalWrapper } = useModal(MeaningModal);

  const handleApprove = () => {
    setCurrentWordIndex((prev) => prev + 1);
    setShouldShowAnswer(false);
  };

  const handleDecline = () => {
    setCurrentWordIndex((prev) => prev + 1);
    setShouldShowAnswer(false);
  };

  return (
    <Styled.Wrapper>
      <MeaningModalWrapper wordName={currentWord.name} />
      <div className='flex justify-center mb-5'>
        {!shouldShowAnswer ? (
          <Button onClick={() => setShouldShowAnswer(true)}>Show Answer</Button>
        ) : (
          <>
            <Button
              type='primary'
              danger
              className='mr-3'
              onClick={handleDecline}
            >
              Decline
            </Button>
            <Button type='primary' onClick={handleApprove}>
              Approve
            </Button>
          </>
        )}
      </div>
      <div className='flex justify-center'>
        <p className='text-3xl'>{currentWord.name}</p>
      </div>
      <WordMeanings word={currentWord} />
    </Styled.Wrapper>
  );
};
