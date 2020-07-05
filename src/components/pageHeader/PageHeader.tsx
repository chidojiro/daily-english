import React from 'react';
import classnames from 'classnames';

import { StyledPageHeader } from './PageHeader.styled';

interface IProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  center?: boolean;
}

export const PageHeader: React.FC<IProps> = ({ left, right, center, children }) => {
  return (
    <StyledPageHeader className={classnames({ center })}>
      {left}
      {right}
      {children}
    </StyledPageHeader>
  );
};
