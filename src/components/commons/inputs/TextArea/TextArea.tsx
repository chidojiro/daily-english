import React from 'react';
import { Tooltip, Input } from 'antd';
import classnames from 'classnames';

import * as Styled from './TextArea.styled';

interface IProps {
  error?: string;
}

export const TextArea: React.FC<IProps> = ({ error, ...restProps }) => {
  const { TextArea } = Input;
  return (
    <Tooltip
      title={error}
      visible={!!error}
      placement='topLeft'
      overlayClassName='tooltip--error'
    >
      <Styled.TextAreaWrapper className={classnames({ error: !!error })}>
        <TextArea {...restProps} />
      </Styled.TextAreaWrapper>
    </Tooltip>
  );
};
