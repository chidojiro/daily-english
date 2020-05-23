import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as UUID } from 'uuid';
import { groupBy } from 'lodash';

import { StyledWordPage, AddMeaningButton, StyledEditableText, Meanings } from './WordPage.styled';
import { useMeaningDialog, IWordMeaningForm } from './meaningDialog';
import { useParams, useHistory } from 'react-router';
import { useAPI } from '../../useAPI';
import { getWordDetails, updateWord, updateMeanings, deleteMeaning } from '../../../apiClients/apiClients';
import { EditableText } from '../../inputs';
import { IWord, IMeaning, IMeaningsByCategory, IMeaningCategoryKeys } from '../../../types';
import { MeaningByCategory } from './meaningByCategory';

const categories: IMeaningCategoryKeys[] = ['adjective', 'adverb', 'noun', 'verb', 'conjunction', 'idiom', 'phrasal'];

export const WordPage = () => {
  const { wordName } = useParams();
  const history = useHistory();

  const handleChangeWord = React.useCallback(
    async (newWordName) => {
      const trimmedNewWordName = newWordName.trim();
      await updateWord(wordName, trimmedNewWordName);
      history.push(`/word/${trimmedNewWordName}`);
    },
    [history, wordName],
  );

  const { data = {} as IWord, error, loaded, load } = useAPI(getWordDetails, wordName);
  const meaningsById = data.meanings || {};

  const { openMeaningDialog } = useMeaningDialog();

  const updateMeaning = React.useCallback(
    async (userInputs: IWordMeaningForm, id?: string) => {
      const newMeaning: IMeaning = { id: id || UUID(), ...userInputs };
      await updateMeanings(wordName, newMeaning);
      load();
    },
    [load, wordName],
  );

  const handleAddMeaningButtonClick = React.useCallback(() => {
    openMeaningDialog({ wordName, onOk: updateMeaning, mode: 'create' });
  }, [openMeaningDialog, updateMeaning, wordName]);

  const handleDelete = React.useCallback(
    async (id: string) => {
      await deleteMeaning(wordName, id);
      load();
    },
    [load, wordName],
  );

  const meanings: IMeaning[] = React.useMemo(
    () => Object.keys(meaningsById).map((id) => ({ id, ...meaningsById[id] })),
    [meaningsById],
  );

  const meaningsByCategory = groupBy(meanings, 'category') as IMeaningsByCategory;

  if (!loaded) {
    return null;
  }

  if (error) {
    return null;
  }

  return (
    <StyledWordPage>
      <StyledEditableText>
        <EditableText text={wordName} onEditComplete={handleChangeWord} />
      </StyledEditableText>
      <Meanings>
        {categories.map((key) => (
          <MeaningByCategory
            key={key}
            meanings={meaningsByCategory[key]}
            category={key}
            onEditClick={(meaning) =>
              openMeaningDialog({
                wordName,
                onOk: (userInput) => updateMeaning(userInput, meaning.id),
                meaning,
                onDelete: () => handleDelete(meaning.id),
                mode: 'edit',
              })
            }
          />
        ))}
      </Meanings>
      <AddMeaningButton>
        <Button type='primary' icon={<PlusOutlined />} onClick={handleAddMeaningButtonClick}>
          Add a meaning
        </Button>
      </AddMeaningButton>
    </StyledWordPage>
  );
};
