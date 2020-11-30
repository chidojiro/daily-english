import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { StyledLoading, StyledLoadingProps } from './Loading.styled';

type IProps = StyledLoadingProps;

export const Loading: React.FC<IProps> = ({ size = 'normal' }) => {
  return <StyledLoading size={size}><LoadingOutlined /></StyledLoading>;
};