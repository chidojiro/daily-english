import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { StyledEditWordPage, AddMeaningButton } from './EditWordPage.styled';
import { EditableWordName } from './editableWordName';

export const EditWordPage = () => {
  return (
    <StyledEditWordPage>
      <EditableWordName />
      <AddMeaningButton>
        <Button type='primary' icon={<PlusOutlined />} onClick={() => {}}>
          Add meaning
        </Button>
      </AddMeaningButton>
    </StyledEditWordPage>
  );
};
