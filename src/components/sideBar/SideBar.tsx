import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Menu, Button, Tooltip } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { StyledSideBar } from './SideBar.styled';
import { useNewWordDialog, INewWordForm } from './newWordDialog';
import { createWord } from '../../apiClients';

export const SideBar = () => {
  const history = useHistory();

  const handleOk = React.useCallback(
    async ({ wordName }: INewWordForm) => {
      await createWord(wordName);
      history.push(`/word/${wordName}`);
    },
    [history],
  );
  const { openNewWordDialog } = useNewWordDialog();

  const handleAddWordClick = React.useCallback(() => openNewWordDialog({ onOk: handleOk }), [
    handleOk,
    openNewWordDialog,
  ]);

  return (
    <StyledSideBar>
      <Tooltip title='New word'>
        <Button shape='circle' icon={<PlusCircleOutlined />} className='new-word-btn' onClick={handleAddWordClick} />
      </Tooltip>
      <Menu defaultSelectedKeys={['dashboard']} mode='inline'>
        <Menu.Item key='dashboard'>
          <Link to='/'>Dashboard</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/daily-duty'>Daily duty</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/recently-created'>Recently created</Link>
        </Menu.Item>
      </Menu>
    </StyledSideBar>
  );
};
