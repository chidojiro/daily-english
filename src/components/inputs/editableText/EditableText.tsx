import React, { ChangeEvent } from 'react';
import { Typography, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { Input } from '../input';
import { StyledEditableText } from './EditableText.styled';

interface IProps {
  text: string;
  value: string;
  name: string;
  placeholder?: string;
  messageOnError?: string;
  onChange?: (event: string | ChangeEvent) => void;
  onBlur?: (event: any) => void;
  onPressEnter?: () => Promise<void> | void;
}

export const EditableText: React.FC<IProps> = ({
  value,
  name,
  placeholder,
  messageOnError,
  onChange,
  onPressEnter,
  onBlur,
  text,
}) => {
  const [isInEditMode, setIsInEditMode] = React.useState(false);

  const { Text } = Typography;

  const enterEditMode = React.useCallback(() => {
    setIsInEditMode(true);
  }, []);

  const leaveEditMode = React.useCallback(() => {
    setIsInEditMode(false);
  }, []);

  const handlePressEnter = React.useCallback(() => {
    onPressEnter();
    if (!messageOnError) {
      leaveEditMode();
    }
  }, [leaveEditMode, messageOnError, onPressEnter]);

  const handleBlur = React.useCallback(
    (event: any) => {
      onBlur(event);
      leaveEditMode();
    },
    [leaveEditMode, onBlur],
  );

  return (
    <StyledEditableText>
      {isInEditMode ? (
        <Input
          name={name}
          value={value}
          onBlur={handleBlur}
          onChange={onChange}
          autoFocus
          onPressEnter={handlePressEnter}
          messageOnError={messageOnError}
          placeholder={placeholder}
        />
      ) : (
        <Space>
          <Text>{text}</Text>
          <EditOutlined onClick={enterEditMode} />
        </Space>
      )}
    </StyledEditableText>
  );
};
