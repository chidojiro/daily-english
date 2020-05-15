import React, { ChangeEvent } from 'react';
import { Tooltip, Input as AntInput } from 'antd';
import classnames from 'classnames';

import { StyledInput } from './Input.styled';

interface IProps {
  name: string;
  value?: string;
  placeholder?: string;
  messageOnError?: string;
  autoFocus?: boolean;
  onChange: (event: string | ChangeEvent) => void;
  onFocus?: () => void;
  onBlur?: (e: any) => void;
  onPressEnter?: () => void;
}

export const Input: React.FC<IProps> = ({ messageOnError, ...restProps }) => {
  return (
    <Tooltip title={messageOnError} visible={!!messageOnError} placement='topLeft' overlayClassName='tooltip--error'>
      <StyledInput className={classnames({ error: !!messageOnError })}>
        <AntInput {...restProps} />
      </StyledInput>
    </Tooltip>
  );
};
