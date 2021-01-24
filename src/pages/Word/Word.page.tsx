import React from 'react';
import { useParams, useHistory } from 'react-router';
import { useMutation } from 'react-query';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { WordMeanings, Loading, EditableText, MeaningModal, ConfirmModal } from '../../components';
import { useModal, useWord } from '../../hooks';
import * as WordApis from '../../apiClients';

import * as Styled from './Word.page.styled';

export const PageWord = () => {
  const { wordName } = useParams() as any;
  const history = useHistory();

  const { data: word, error: wordError, isLoading: isLoadingWord } = useWord(wordName);

  const [deleteWord, { isLoading: isDeletingWord, error: deleteWordError }] = useMutation(WordApis.deleteWord);
  const [
    updateWordName,
    { isLoading: isUpdatingWordName, error: updateWordNameError },
  ] = useMutation((newWordName: string) => WordApis.updateWordName(wordName, newWordName));

  const { openModal: openMeaningModal, Modal: MeaningModalWrapper } = useModal(MeaningModal);
  const { openModal: openConfirmDeleteModal, Modal: ConfirmDeleteModalWrapper } = useModal(ConfirmModal);

  const handleDeleteWord = async () => {
    await deleteWord(word);

    history.push('/');
  };

  const handleChangeWord = async (newWordName: string) => {
    const trimmedNewWordName = newWordName.trim();

    await updateWordName(trimmedNewWordName);

    history.push(`/word/${trimmedNewWordName}`);
  };

  if (isLoadingWord) {
    return <Loading />;
  }

  if (wordError) {
    return null;
  }

  return (
    <Styled.WordPage>
      <MeaningModalWrapper wordName={wordName} />
      <ConfirmDeleteModalWrapper
        title={`Delete "${wordName}"`}
        content={`Are you sure you want to delete "${wordName}"?`}
        onOk={handleDeleteWord}
      />
      <Styled.EditableText>
        <EditableText text={wordName} onEditComplete={handleChangeWord} />
      </Styled.EditableText>
      {/* <WordMeanings word={word} /> */}
      <Styled.AddMeaningButton>
        <Button type='primary' icon={<PlusOutlined />} onClick={openMeaningModal}>
          Add a meaning
        </Button>
      </Styled.AddMeaningButton>
      <Styled.DeleteWordButton>
        <Button danger type='primary' onClick={openConfirmDeleteModal} loading={isDeletingWord}>
          Delete
        </Button>
      </Styled.DeleteWordButton>
    </Styled.WordPage>
  );
};
