import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeColorsContextProvider } from './components/themeColors';
import { TopBar } from './components/topBar';
import { SideBar } from './components/sideBar';
import { StyledApp, CenterArea, PageContent } from './App.styled';
import { DialogContextProvider } from './components/dialogs';
import { Router } from './router';
import { ErrorBoundary } from './components/errorBoundary';

const App = () => {
  return (
    <ThemeColorsContextProvider>
      <BrowserRouter>
        <DialogContextProvider>
          <StyledApp>
            <TopBar />
            <CenterArea>
              <SideBar />
              <PageContent>
                <ErrorBoundary>
                  <Router />
                </ErrorBoundary>
              </PageContent>
            </CenterArea>
          </StyledApp>
        </DialogContextProvider>
      </BrowserRouter>
    </ThemeColorsContextProvider>
  );
};

export default App;
