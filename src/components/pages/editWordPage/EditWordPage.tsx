import React from 'react';
import { useParams } from 'react-router';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { StyledEditWordPage, EditableWord, AddMeaningButton } from './EditWordPage.styled';
import { EditableText } from '../../editableText';
import { AddMeaningDialog } from './addMeaningDialog';
import { updateWord } from '../../../apiClients/apiClients';

const wordPlaceHolder = 'Enter word';

export const EditWordPage = () => {
  const [showAddMeaningDialog, setShowAddMeaningDialog] = React.useState(false);

  const { word } = useParams();

  const openAddMeaningDialog = React.useCallback(() => {
    setShowAddMeaningDialog(true);
  }, []);

  const closeAddMeaningDialog = React.useCallback(() => {
    setShowAddMeaningDialog(false);
  }, []);

  const handleOk = React.useCallback(async () => {
    await updateWord(null, null);
    closeAddMeaningDialog();
  }, [closeAddMeaningDialog]);

  return (
    <StyledEditWordPage>
      <AddMeaningDialog visible={showAddMeaningDialog} onCancel={closeAddMeaningDialog} onOk={handleOk} />
      <EditableWord>
        <EditableText value={word} onChange={() => {}} placeHolder={wordPlaceHolder} />
      </EditableWord>
      <AddMeaningButton>
        <Button type='primary' icon={<PlusOutlined />} onClick={openAddMeaningDialog}>
          Add meaning
        </Button>
      </AddMeaningButton>
    </StyledEditWordPage>
  );
};
