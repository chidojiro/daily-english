import React from 'react';
import { Menu, Button, Tooltip } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { StyledSideBar } from './SideBar.styled';
import { useDialog } from '../dialogs';

export const SideBar = () => {
  const { openDialog } = useDialog();

  const handleNewWordButtonClick = React.useCallback(() => {
    openDialog({
      type: 'NEW_WORD',
    });
  }, [openDialog]);

  return (
    <StyledSideBar>
      <Tooltip title='New word'>
        <Button
          shape='circle'
          icon={<PlusCircleOutlined />}
          className='new-word-btn'
          onClick={handleNewWordButtonClick}
        />
      </Tooltip>
      <Menu></Menu>
    </StyledSideBar>
  );
};
