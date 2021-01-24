import React from 'react';
import classnames from 'classnames';
import { ButtonProps } from 'antd/lib/button';

import * as Styled from './Button.styled';

export const Button: React.FC<ButtonProps> = ({ className, ...restProps }) => {
  return <Styled.Button {...restProps} className={classnames(className, 'flex items-center justify-center')} />;
};
