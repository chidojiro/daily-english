import React from 'react';

import { useAPI } from '../../components/hooks/useAPI';
import { fetchRecentWords } from '../../apiClients';
import { StyledRecentlyCreatedPage } from './RecentlyCreated.page.styled';
import { WordsTable } from '../../components/wordsTable';
import { Loading } from '../../components/loading';
import { PageHeader } from '../../components/pageHeader';

export const PageRecentlyCreated = () => {
  const { data: recentWordsByName, loaded } = useAPI(fetchRecentWords, 100);

  if (!loaded) {
    return <Loading />;
  }

  return (
    <StyledRecentlyCreatedPage>
      <PageHeader>
        Recently created words
      </PageHeader>
      <WordsTable wordsByName={recentWordsByName} />
    </StyledRecentlyCreatedPage>
  );
};
