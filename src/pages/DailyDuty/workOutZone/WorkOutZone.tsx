import React from 'react';
import { Button, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { PageHeader, MeaningsByType } from '../../../components';
import { IWordByName } from '../../../types';
import { StyledBackBtn, StyledWordOutZone, StyledDecisions } from './WorkOutZone.styled';

interface IProps {
  wordsByName: IWordByName;
  onBackClick: () => void;
}

export const WorkOutZone: React.FC<IProps> = ({ wordsByName, onBackClick }) => {
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [showMeanings, setShowMeanings] = React.useState(false);

  const shuffledWords = Object.values(wordsByName).sort(() => Math.random() - 1);
  const currentWord = shuffledWords[currentWordIndex];

  return null;

  // return (
  //   <StyledWordOutZone>
  //     <PageHeader>
  //       <Typography.Title level={2}>{currentWord.name}</Typography.Title>
  //       <StyledDecisions>
  //         <Button type='default' danger>
  //           Failed
  //         </Button>
  //         <Button type='default'>Show</Button>
  //         <Button type='primary'>Passed</Button>
  //       </StyledDecisions>
  //     </PageHeader>
  //     <StyledBackBtn>
  //       <Button type='link' size='large' onClick={onBackClick} icon={<LeftOutlined />}>
  //         Back
  //       </Button>
  //     </StyledBackBtn>
  //     {/* {showMeanings && <MeaningByCategory meanings= />) */}
  //   </StyledWordOutZone>
  // );
};
