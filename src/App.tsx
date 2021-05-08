import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeContextProvider } from './contexts';
import { TopBar, SideBar, ErrorBoundary } from './components';
import { Router } from './router';

import { StyledApp, CenterArea, PageContent } from './App.styled';

const App = () => {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </ThemeContextProvider>
  );
};

export default App;
