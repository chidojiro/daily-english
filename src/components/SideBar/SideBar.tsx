import React, { useEffect } from 'react';
import { useHistory, useLocation, matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import { Menu, Tooltip } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { routesPath } from '../../router';
import { useModal } from '../../hooks';
import { Button } from '../commons';

import { StyledSideBar } from './SideBar.styled';
import { WordModal } from './WordModal';

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

  const { openModal, Modal: WordModalWrapper } = useModal(WordModal);

  // identify current nav item
  useEffect(() => {
    for (const { to } of navConfigs) {
      const isMatchingPath = matchPath(location.pathname, {
        path: to,
        exact: true,
        strict: true,
      });

      if (isMatchingPath) {
        setCurrentNavKey(to);
        return;
      }
    }

    setCurrentNavKey('');
  }, [location.pathname]);

  return (
    <StyledSideBar>
      <WordModalWrapper />
      <Tooltip title='New word'>
        <Button shape='circle' icon={<PlusCircleOutlined />} className='self-center mb-auto mt-3' onClick={openModal} />
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
