import React from 'react';
import { Typography } from 'antd';
import { IMeaning, IMeaningType } from '../../types';
import { EditOutlined } from '@ant-design/icons';
import * as Styled from './MeaningsByType.styled';

const { Title, Text } = Typography;

interface IProps {
  type: IMeaningType;
  meanings: IMeaning[];
  onEditClick: (meaning: IMeaning) => void;
}

const typeLabelMapping: { [key in IMeaningType]: string } = {
  adjective: 'Adjective',
  adverb: 'Adverb',
  conjunction: 'Conjunction',
  idiom: 'Idiom',
  noun: 'Noun',
  phrasal: 'Phrasal',
  verb: 'Verb',
};

export const MeaningsByType: React.FC<IProps> = ({ meanings, type, onEditClick }) => {
  if (!meanings) {
    return null;
  }

  return (
    <Styled.MeaningsByCategory>
      <Title underline className='category' level={4}>
        {typeLabelMapping[type]}
      </Title>
      {meanings.map((meaning) => (
        <div key={meaning.id}>
          <Styled.Meaning>
            <EditOutlined onClick={() => onEditClick(meaning)} />
            <Text className='meaning'>{meaning.meaning}</Text>
          </Styled.Meaning>
          {meaning.example && (
            <ul>
              {meaning.example.split('\n').map((ex) => (
                <li key={ex}>
                  <Text className='example'>{ex}</Text>
                </li>
              ))}
            </ul>
          )}
          {meaning.extension && (
            <Styled.ExtensionContainer>
              <Title level={4}>{meaning.extension}</Title>
              <Text className='extension-meaning'>{meaning.extensionMeaning}</Text>
              {meaning.extensionExample && (
                <ul>
                  {meaning.extensionExample.split('\n').map((ex) => (
                    <li key={ex}>
                      <Text className='example'>{ex}</Text>
                    </li>
                  ))}
                </ul>
              )}
            </Styled.ExtensionContainer>
          )}
        </div>
      ))}
    </Styled.MeaningsByCategory>
  );
};
