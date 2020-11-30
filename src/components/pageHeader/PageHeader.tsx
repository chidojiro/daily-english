import React from 'react';
import classnames from 'classnames';
import { Typography } from 'antd';

import { StyledPageHeader, StyledCenterHeader } from './PageHeader.styled';

interface IProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  center?: boolean;
}

export const PageHeader: React.FC<IProps> = ({ left, right, children }) => {
  return (
    <StyledPageHeader className={classnames({ center: children })}>

      {children ? <Typography.Title level={2}><StyledCenterHeader>{children}</StyledCenterHeader></Typography.Title>
        : (<>
          <Typography.Title level={2}>{left}</Typography.Title>
          {right}
        </>)
      }
    </StyledPageHeader>
  );
};
