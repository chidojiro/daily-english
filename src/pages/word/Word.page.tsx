import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as UUID } from 'uuid';
import { groupBy } from 'lodash';

import { StyledWordPage, AddMeaningButton, StyledEditableText, Meanings, DeleteWordButton } from './Word.page.styled';
import { useMeaningDialog, IWordMeaningForm } from './meaningDialog';
import { useParams, useHistory } from 'react-router';
import { useAPI } from '../../components/hooks/useAPI';
import {
  fetchWordDetails,
  updateWordName,
  updateMeanings,
  deleteMeaning,
  deleteWord,
} from '../../apiClients/apiClients';
import { EditableText } from '../../components/inputs';
import { IWord, IMeaning, IMeaningsByCategory, IMeaningCategoryKeys } from '../../types';
import { MeaningByCategory } from './meaningByCategory';
import { useDialog } from '../../components/dialogs';

const categories: IMeaningCategoryKeys[] = ['adjective', 'adverb', 'noun', 'verb', 'conjunction', 'idiom', 'phrasal'];

export const PageWord = () => {
  const { wordName } = useParams();
  const history = useHistory();

  const handleChangeWord = React.useCallback(
    async (newWordName) => {
      const trimmedNewWordName = newWordName.trim();
      await updateWordName(wordName, trimmedNewWordName);
      history.push(`/word/${trimmedNewWordName}`);
    },
    [history, wordName],
  );

  const { data: word = {} as IWord, error, loaded, load } = useAPI(fetchWordDetails, wordName);
  const meaningsById = word.meanings || {};

  const { openMeaningDialog } = useMeaningDialog();

  const { openCommonDialog } = useDialog();

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

  const handleDeleteWord = React.useCallback(async () => {
    await deleteWord(word);
    history.push('/');
  }, [history, word]);

  const handleDeleteButtonClick = React.useCallback(() => {
    openCommonDialog({
      title: `Delete "${wordName}"`,
      content: `Are you sure you want to delete "${wordName}"?`,
      onOk: handleDeleteWord,
    });
  }, [handleDeleteWord, openCommonDialog, wordName]);

  const handleDeleteMeaning = React.useCallback(
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
                onDelete: () => handleDeleteMeaning(meaning.id),
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
      <DeleteWordButton>
        <Button danger type='primary' onClick={handleDeleteButtonClick}>
          Delete
        </Button>
      </DeleteWordButton>
    </StyledWordPage>
  );
};
