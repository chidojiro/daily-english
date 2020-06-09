import React from 'react';
import { Typography } from 'antd';
import { IMeaning, IMeaningCategoryKeys } from '../../../../types';
import { EditOutlined } from '@ant-design/icons';
import { Meaning, StyledMeaningByCategory, Meanings } from './MeaningByCategory.styled';

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
      <Title underline className='category' level={4}>
        {categoryLabelMapping[category]}
      </Title>
      {meanings.map((meaning) => (
        <Meanings key={meaning.id}>
          <Meaning>
            <EditOutlined onClick={() => onEditClick(meaning)} />
            <Text className='meaning'>{meaning.meaning}</Text>
          </Meaning>
          {meaning.example && (
            <ul>
              {meaning.example.split('\n').map((ex) => (
                <li key={ex}>
                  <Text className='example'>{ex}</Text>
                </li>
              ))}
            </ul>
          )}
        </Meanings>
      ))}
    </StyledMeaningByCategory>
  );
};
