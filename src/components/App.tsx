import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import { ThemeColorsContextProvider } from './themeColors';
import { TopBar } from './topBar';
import { SideBar } from './sideBar';
import { StyledApp, CenterArea, PageContent } from './App.styled';
import { WordPage } from './pages/wordPage';
import { DialogContextProvider } from './dialogs';
import { RecentlyCreatedPage } from './pages/recentlyCreatedPage';

(String.prototype as any).encode = (str: string) => encodeURIComponent(str);

const App = () => {
  return (
    <ThemeColorsContextProvider>
      <Router>
        <DialogContextProvider>
          <StyledApp>
            <TopBar />
            <CenterArea>
              <SideBar />
              <PageContent>
                <Switch>
                  <Route path='/word/:wordName' component={WordPage} />
                  <Route path='/recently-created' component={RecentlyCreatedPage} />
                  <Redirect to='/' />
                </Switch>
              </PageContent>
            </CenterArea>
          </StyledApp>
        </DialogContextProvider>
      </Router>
    </ThemeColorsContextProvider>
  );
};

export default App;
