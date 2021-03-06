import React from 'react';

import { useAPI } from '../../hooks';
import { Loading, PageHeader, WordsTable } from '../../components';
import { fetchRecentWords } from '../../apiClients';

import * as Styled from './RecentlyCreated.page.styled';

export const PageRecentlyCreated = () => {
  const { data: recentWordsByName, loaded } = useAPI(fetchRecentWords, 100);

  console.log(recentWordsByName);

  if (!loaded) {
    return <Loading />;
  }

  return null;

  return (
    <Styled.RecentlyCreatedPage>
      <PageHeader>Recently created words</PageHeader>
      <WordsTable wordsByName={recentWordsByName} />
    </Styled.RecentlyCreatedPage>
  );
};
