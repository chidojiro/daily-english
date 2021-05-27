import React from 'react';
import { Tooltip, Input as AntInput, InputProps } from 'antd';
import classnames from 'classnames';

import * as Styled from './Input.styled';

interface IProps extends InputProps {
  messageOnError?: string;
}

export const Input: React.FC<IProps> = ({ messageOnError, ...restProps }) => {
  return (
    <Tooltip
      title={messageOnError}
      visible={!!messageOnError}
      placement='topLeft'
      overlayClassName='tooltip--error'
    >
      <Styled.Input className={classnames({ error: !!messageOnError })}>
        <AntInput {...restProps} />
      </Styled.Input>
    </Tooltip>
  );
};
