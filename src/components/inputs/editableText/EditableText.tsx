import React from 'react';
import { Typography, Space } from 'antd';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';

import { Input } from '../input';
import { StyledEditableText } from './EditableText.styled';
import { useFormik } from 'formik';
import { functionPlaceholder } from '../../../constants';

interface IProps {
  text: string;
  placeholder?: string;
  onEditComplete?: (value: string) => Promise<void> | void;
}

export const EditableText: React.FC<IProps> = ({ placeholder, onEditComplete, text }) => {
  const [isInEditMode, setIsInEditMode] = React.useState(false);
  const [isCompletingEdit, setIsCompletingEdit] = React.useState(false);

  const { Text } = Typography;

  const {
    handleBlur: formikHandleBlur,
    handleChange,
    values: { inputValue },
    errors: { inputValue: error },
    resetForm,
  } = useFormik<{ inputValue: string }>({
    initialValues: { inputValue: text },
    onSubmit: functionPlaceholder,
  });

  const enterEditMode = React.useCallback(() => {
    setIsInEditMode(true);
  }, []);

  const leaveEditMode = React.useCallback(() => {
    setIsInEditMode(false);
  }, []);

  const handlePressEnter = React.useCallback(async () => {
    setIsCompletingEdit(true);
    await onEditComplete(inputValue);
    if (!error) {
      leaveEditMode();
    }
    setIsCompletingEdit(false);
  }, [error, inputValue, leaveEditMode, onEditComplete]);

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      formikHandleBlur(event);
      leaveEditMode();
      resetForm();
    },
    [formikHandleBlur, leaveEditMode, resetForm],
  );

  return (
    <StyledEditableText>
      {isInEditMode ? (
        <>
          <Input
            name='inputValue'
            value={inputValue}
            onBlur={handleBlur}
            onChange={handleChange}
            autoFocus
            onPressEnter={handlePressEnter}
            placeholder={placeholder}
          />
          {isCompletingEdit ? <LoadingOutlined /> : null}
        </>
      ) : (
        <Space>
          <Text>{text}</Text>
          <EditOutlined onClick={enterEditMode} />
        </Space>
      )}
    </StyledEditableText>
  );
};
