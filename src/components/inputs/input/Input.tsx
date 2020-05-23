import React from 'react';
import { Tooltip, Input as AntInput } from 'antd';
import classnames from 'classnames';

import { StyledInput } from './Input.styled';
import { InputProps } from 'formik-antd';

interface IProps extends InputProps {
  messageOnError?: string;
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
