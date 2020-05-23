import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { ThemeColorsContextProvider } from './themeColors';
import { TopBar } from './topBar';
import { SideBar } from './sideBar';
import { StyledApp, CenterArea, PageContent } from './App.styled';
import { WordPage } from './pages/wordPage';
import { DialogContextProvider } from './dialogs';

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
                  <Route path='/word/:wordName'>
                    <WordPage />
                  </Route>
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
