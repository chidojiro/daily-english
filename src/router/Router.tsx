import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { NotFound } from '../pages/error';

const PageWord = React.lazy(() => import('../pages/word'));
const PageRecentlyCreated = React.lazy(() => import('../pages/recentlyCreated'));
const PageDailyDuty = React.lazy(() => import('../pages/dailyDuty'));

export const routesPath = {
  dashboard: '/',
  wordPage: '/word/:wordName',
  dailyDuty: '/daily-duty',
  recentlyCreated: '/recently-created',
  notFound: '/not-found',
};

export const Router = () => (
  <Suspense fallback=''>
    <Switch>
      <Switch>
        <Route path={routesPath.dashboard} exact component={() => null as any} />
        <Route path={routesPath.wordPage} component={PageWord} />
        <Route path={routesPath.dailyDuty} component={PageDailyDuty} />
        <Route path={routesPath.recentlyCreated} component={PageRecentlyCreated} />
        <Route path={routesPath.notFound} component={NotFound} />
        <Redirect to='/' />
      </Switch>
    </Switch>
  </Suspense>
);
