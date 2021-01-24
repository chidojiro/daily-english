import React from 'react';
import { Tooltip, Input } from 'antd';
import classnames from 'classnames';

import * as Styled from './TextArea.styled';
import { TextAreaProps } from 'formik-antd';

interface IProps extends TextAreaProps {
  error?: string;
}

export const TextArea: React.FC<IProps> = ({ error, ...restProps }) => {
  const { TextArea } = Input;
  return (
    <Tooltip title={error} visible={!!error} placement='topLeft' overlayClassName='tooltip--error'>
      <Styled.TextArea className={classnames({ error: !!error })}>
        <TextArea {...restProps} />
      </Styled.TextArea>
    </Tooltip>
  );
};
