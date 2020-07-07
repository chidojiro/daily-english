import React from 'react';
import { Typography, Button, Carousel } from 'antd';

import { WordsTable } from '../../components/wordsTable';
import { useAPI } from '../../components/hooks/useAPI';
import { fetchDueWords } from '../../apiClients';
import { PageHeader } from '../../components/pageHeader';
import { RiseOutlined } from '@ant-design/icons';
import { StyledDailyDuty } from './DailyDuty.page.styled';

export const PageDailyDuty = () => {
  const { data, loaded } = useAPI(fetchDueWords);

  const carouselRef = React.useRef(null);

  const enterReviseMode = React.useCallback(() => {
    (carouselRef as any).next();
  }, []);

  const leftPageHeader = React.useMemo(() => <Typography.Title level={2}>Today&apos;s workload</Typography.Title>, []);

  const rightPageHeader = React.useMemo(
    () => (
      <Button onClick={enterReviseMode} type='primary' size='large' icon={<RiseOutlined />}>
        Start
      </Button>
    ),
    [enterReviseMode],
  );

  if (!loaded) {
    return null;
  }

  return (
    <StyledDailyDuty>
      <Carousel ref={carouselRef}>
        <div>
          <PageHeader left={leftPageHeader} right={rightPageHeader} />
          <WordsTable wordsByName={data} />
        </div>
        <div>Page 2</div>
      </Carousel>
    </StyledDailyDuty>
  );
};
