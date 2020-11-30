import React from 'react';
import { Button, Carousel } from 'antd';
import _ from 'lodash';

import { WordsTable } from '../../components/wordsTable';
import { useAPI } from '../../components/hooks/useAPI';
import { fetchDueWords } from '../../apiClients';
import { PageHeader } from '../../components/pageHeader';
import { RiseOutlined } from '@ant-design/icons';
import { StyledDailyDuty, StyledCarouselSpareWorkaround } from './DailyDuty.page.styled';
import { WorkOutZone } from './workOutZone';
import { Loading } from '../../components/loading';

export const PageDailyDuty = () => {
  const { data: wordsByName, loaded } = useAPI(fetchDueWords);

  const hasWord = !_.isEmpty(wordsByName);

  const carouselRef = React.useRef(null);

  const enterReviseMode = React.useCallback(() => {
    (carouselRef as any).current.next();
  }, []);

  const leftPageHeader = React.useMemo(() => "Today's workload", []);

  const rightPageHeader = React.useMemo(
    () =>
      hasWord ? (
        <Button onClick={enterReviseMode} type='primary' size='large'>
          <span>Start</span>
          <RiseOutlined />
        </Button>
      ) : null,
    [enterReviseMode, hasWord],
  );

  const backToWordsTable = React.useCallback(() => {
    (carouselRef as any).current.prev();
  }, []);

  if (!loaded) {
    return <Loading />;
  }

  return (
    <StyledDailyDuty>
      <Carousel ref={carouselRef} dots={false}>
        {/* padding: 1px to bypass carousel bug */}
        <StyledCarouselSpareWorkaround>
          <PageHeader left={leftPageHeader} right={rightPageHeader} />
          <WordsTable wordsByName={wordsByName} />
        </StyledCarouselSpareWorkaround>
        {hasWord && <WorkOutZone wordsByName={wordsByName} onBackClick={backToWordsTable} />}
      </Carousel>
    </StyledDailyDuty>
  );
};
