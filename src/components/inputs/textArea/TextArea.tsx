import React from 'react';
import { Tooltip, Input } from 'antd';
import classnames from 'classnames';

import { StyledTextArea } from './TextArea.styled';
import { TextAreaProps } from 'formik-antd';

interface IProps extends TextAreaProps {
  messageOnError?: string;
}

export const TextArea: React.FC<IProps> = ({ messageOnError, ...restProps }) => {
  const { TextArea } = Input;
  return (
    <Tooltip title={messageOnError} visible={!!messageOnError} placement='topLeft' overlayClassName='tooltip--error'>
      <StyledTextArea className={classnames({ error: !!messageOnError })}>
        <TextArea {...restProps} />
      </StyledTextArea>
    </Tooltip>
  );
};
