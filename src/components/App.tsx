import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeColorsContextProvider } from './themeColors';
import { TopBar } from './topBar';
import { SideBar } from './sideBar';
import { StyledApp, CenterArea, PageContent } from './App.styled';
import { DialogContextProvider } from './dialogs';
import { Routes } from './Routes';

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
                <Routes />
              </PageContent>
            </CenterArea>
          </StyledApp>
        </DialogContextProvider>
      </Router>
    </ThemeColorsContextProvider>
  );
};

export default App;
