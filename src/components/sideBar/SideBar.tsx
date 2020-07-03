import React, { useEffect } from 'react';
import { useHistory, useLocation, matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import { Menu, Button, Tooltip } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { StyledSideBar } from './SideBar.styled';
import { useNewWordDialog, INewWordForm } from './newWordDialog';
import { createWord } from '../../apiClients';
import { routesPath } from '../Routes';

const navConfigs = [
  {
    key: routesPath.dashboard,
    to: routesPath.dashboard,
    label: 'Dashboard',
  },
  {
    key: routesPath.dailyDuty,
    to: routesPath.dailyDuty,
    label: 'Daily Duty',
  },
  {
    key: routesPath.recentlyCreated,
    to: routesPath.recentlyCreated,
    label: 'Recently Created',
  },
];

export const SideBar = () => {
  const [currentNavKey, setCurrentNavKey] = React.useState(routesPath.dashboard);

  const history = useHistory();
  const location = useLocation();

  // identify current nav item
  useEffect(() => {
    navConfigs.forEach(({ to }) => {
      const isMatchingPath = matchPath(location.pathname, {
        path: to,
        strict: true,
      });

      if (isMatchingPath) {
        setCurrentNavKey(to);
      }
    });
  }, [location.pathname]);

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
      <Menu selectedKeys={[currentNavKey]} mode='inline'>
        {navConfigs.map(({ key, to, label }) => (
          <Menu.Item key={key}>
            <Link to={to}>{label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </StyledSideBar>
  );
};
