import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { ThemeColorsContextProvider } from './themeColors';
import { TopBar } from './topBar';
import { SideBar } from './sideBar';
import { StyledApp, CenterArea, PageContent } from './App.styled';
import { EditWordPage } from './pages/editWordPage';
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
                  <Route path='/edit-word/:wordName'>
                    <EditWordPage />
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
