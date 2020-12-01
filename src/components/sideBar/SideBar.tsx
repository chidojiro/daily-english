import React, { useEffect } from 'react';
import { useHistory, useLocation, matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import { Menu, Button, Tooltip } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { StyledSideBar } from './SideBar.styled';
import { createWord } from '../../apiClients';
import { routesPath } from '../../router';

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

  const handleOk = () => {};

  const handleAddWordClick = () => {};

  return (
    <StyledSideBar>
      {/* <Tooltip title='New word'>
        <Button shape='circle' icon={<PlusCircleOutlined />} className='new-word-btn' onClick={handleAddWordClick} />
      </Tooltip>
      <Menu selectedKeys={[currentNavKey]} mode='inline'>
        {navConfigs.map(({ key, to, label }) => (
          <Menu.Item key={key}>
            <Link to={to}>{label}</Link>
          </Menu.Item>
        ))}
      </Menu> */}
    </StyledSideBar>
  );
};
