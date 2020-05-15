import React from 'react';
import { Menu, Button, Tooltip } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { StyledSideBar } from './SideBar.styled';
import { useNewWordDialog } from './newWordDialog';

export const SideBar = () => {
  const { openNewWordDialog } = useNewWordDialog();

  return (
    <StyledSideBar>
      <Tooltip title='New word'>
        <Button shape='circle' icon={<PlusCircleOutlined />} className='new-word-btn' onClick={openNewWordDialog} />
      </Tooltip>
      <Menu></Menu>
    </StyledSideBar>
  );
};
