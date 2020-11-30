import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as UUID } from 'uuid';

import { StyledWordPage, AddMeaningButton, StyledEditableText, DeleteWordButton } from './Word.page.styled';
import { useMeaningDialog, IWordMeaningForm } from '../../components/meaningDialog';
import { useParams, useHistory } from 'react-router';
import { useAPI } from '../../components/hooks/useAPI';
import {
  fetchWordDetails,
  updateWordName,
  updateMeanings,
  deleteWord,
} from '../../apiClients/apiClients';
import { EditableText } from '../../components/inputs';
import { IWord, IMeaning } from '../../types';
import { useDialog } from '../../components/dialogs';
import { Loading } from '../../components/loading';
import { WordMeanings } from '../../components/wordMeanings';


export const PageWord = () => {
  const { wordName } = useParams() as any;
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


  if (!loaded) {
    return <Loading />;
  }

  if (error) {
    return null;
  }

  return (
    <StyledWordPage>
      <StyledEditableText>
        <EditableText text={wordName} onEditComplete={handleChangeWord} />
      </StyledEditableText>
      <WordMeanings word={word} />
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
