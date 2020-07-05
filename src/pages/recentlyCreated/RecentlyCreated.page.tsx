import React from 'react';
import { Typography } from 'antd';

import { useAPI } from '../../components/hooks/useAPI';
import { fetchRecentWords } from '../../apiClients';
import { StyledRecentlyCreatedPage, StyledRecentlyCreatedPageTitle } from './RecentlyCreated.page.styled';
import { WordsTable } from '../../components/wordsTable';

export const PageRecentlyCreated = () => {
  const { data: recentWordsByName, loaded } = useAPI(fetchRecentWords, 100);

  if (!loaded) {
    return null;
  }

  return (
    <StyledRecentlyCreatedPage>
      <StyledRecentlyCreatedPageTitle>
        <Typography.Title level={2}>Recently created words</Typography.Title>
      </StyledRecentlyCreatedPageTitle>
      <WordsTable wordsByName={recentWordsByName} />
    </StyledRecentlyCreatedPage>
  );
};
