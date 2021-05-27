import React from 'react';
import { Typography } from 'antd';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';

import { Input } from '../Input';
import { StyledEditableText } from './EditableText.styled';

interface IProps {
  text: string;
  placeholder?: string;
  onEditComplete?: (value: string) => Promise<void> | void;
}

export const EditableText: React.FC<IProps> = ({
  placeholder,
  onEditComplete,
  text,
}) => {
  const [isInEditMode, setIsInEditMode] = React.useState(false);
  const [isCompletingEdit, setIsCompletingEdit] = React.useState(false);
  const [value, setValue] = React.useState(text);

  const { Text } = Typography;

  const enterEditMode = React.useCallback(() => {
    setIsInEditMode(true);
  }, []);

  const leaveEditMode = React.useCallback(() => {
    setIsInEditMode(false);
  }, []);

  const handlePressEnter = React.useCallback(async () => {
    setIsCompletingEdit(true);
    await onEditComplete(value);
    setIsCompletingEdit(false);
  }, [value, onEditComplete]);

  const handleBlur = React.useCallback(() => {
    leaveEditMode();
    setValue(text);
  }, [leaveEditMode, text]);

  return (
    <StyledEditableText>
      {isInEditMode ? (
        <>
          <Input
            name='inputValue'
            value={value}
            onBlur={handleBlur}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            onPressEnter={handlePressEnter}
            placeholder={placeholder}
          />
          {isCompletingEdit ? <LoadingOutlined /> : null}
        </>
      ) : (
        <div className='flex items-center'>
          <Text className='mr-3'>{text}</Text>
          <EditOutlined onClick={enterEditMode} />
        </div>
      )}
    </StyledEditableText>
  );
};
