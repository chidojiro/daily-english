import React from 'react';
import { Typography, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Input } from 'formik-antd';
import { Formik } from 'formik';

import { StyledEditableText } from './EditableText.styled';
import { updateWord } from '../../apiClients/apiClients';

interface IProps {
  value: string;
  onChange: () => void;
  validate?: () => void;
  placeHolder?: string;
}

export const EditableText: React.FC<IProps> = ({ value, placeHolder }) => {
  const [isInEditMode, setIsInEditMode] = React.useState(false);

  const { Text } = Typography;

  const enterEditMode = React.useCallback(() => {
    setIsInEditMode(true);
  }, []);

  const leaveEditMode = React.useCallback(() => {
    setIsInEditMode(false);
  }, []);

  const handleChangeWordSubmit = React.useCallback(async () => {
    console.log('submitted');
    await updateWord(null, null);
  }, []);

  return (
    <StyledEditableText>
      {isInEditMode ? (
        <Formik initialValues={{ input: value }} onSubmit={handleChangeWordSubmit}>
          <Input name='input' onBlur={leaveEditMode} autoFocus />
        </Formik>
      ) : (
        <Space>
          <Text type={!value ? 'secondary' : undefined}>{value || placeHolder}</Text>
          <EditOutlined onClick={enterEditMode} />
        </Space>
      )}
    </StyledEditableText>
  );
};
