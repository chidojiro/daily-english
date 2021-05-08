import React from 'react';
import Spin, { SpinProps } from 'antd/lib/spin';
import { LoadingOutlined } from '@ant-design/icons';

import Styled from './Loading.styled';

export type ILoadingSize = 'large' | 'default' | 'small';

export const Loading: React.FC<SpinProps> = (props) => {
  return (
    <Styled.Loading>
      <Spin {...props} indicator={<LoadingOutlined spin />} />
    </Styled.Loading>
  );
};
