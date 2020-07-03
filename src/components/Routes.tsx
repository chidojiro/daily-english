import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router';

const WordPage = React.lazy(() => import('./pages/wordPage'));
const RecentlyCreatedPage = React.lazy(() => import('./pages/recentlyCreatedPage'));

export const routesPath = {
  dashboard: '/',
  wordPage: '/word/:wordName',
  dailyDuty: '/daily-duty',
  recentlyCreated: '/recently-created',
};

export const Routes = () => (
  <Suspense fallback='hello'>
    <Switch>
      <Switch>
        <Route path={routesPath.dashboard} exact component={() => null as any} />
        <Route path={routesPath.wordPage} component={WordPage} />
        <Route path={routesPath.dailyDuty} component={() => null as any} />
        <Route path={routesPath.recentlyCreated} component={RecentlyCreatedPage} />
        <Redirect to='/' />
      </Switch>
    </Switch>
  </Suspense>
);
