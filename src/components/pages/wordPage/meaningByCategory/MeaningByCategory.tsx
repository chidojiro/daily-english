import React from 'react';
import { Typography } from 'antd';
import { IMeaning, IMeaningCategoryKeys } from '../../../../types';
import { EditOutlined } from '@ant-design/icons';
import { Meaning, StyledMeaningByCategory } from './MeaningByCategory.styled';

const { Title, Text } = Typography;

interface IProps {
  category: IMeaningCategoryKeys;
  meanings: IMeaning[];
  onEditClick: (meaning: IMeaning) => void;
}

const categoryLabelMapping: { [key in IMeaningCategoryKeys]: string } = {
  adjective: 'Adjective',
  adverb: 'Adverb',
  conjunction: 'Conjunction',
  idiom: 'Idiom',
  noun: 'Noun',
  phrasal: 'Phrasal',
  verb: 'Verb',
};

export const MeaningByCategory: React.FC<IProps> = ({ meanings, category, onEditClick }) => {
  if (!meanings) {
    return null;
  }

  return (
    <StyledMeaningByCategory>
      <Title level={4}>{categoryLabelMapping[category]}</Title>
      {meanings.map((meaning) => (
        <Meaning key={meaning.id}>
          <EditOutlined onClick={() => onEditClick(meaning)} />
          <Text>{meaning.meaning}</Text>
        </Meaning>
      ))}
    </StyledMeaningByCategory>
  );
};
