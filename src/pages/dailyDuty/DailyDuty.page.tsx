import React from 'react';
import { Typography, Button } from 'antd';

import { WordsTable } from '../../components/wordsTable';
import { useAPI } from '../../components/hooks/useAPI';
import { fetchDueWords } from '../../apiClients';
import { PageHeader } from '../../components/pageHeader';
import { RiseOutlined } from '@ant-design/icons';

export const PageDailyDuty = () => {
  const { data, loaded } = useAPI(fetchDueWords);

  const leftPageHeader = React.useMemo(() => <Typography.Title level={2}>Today&apos;s Workload</Typography.Title>, []);

  const rightPageHeader = React.useMemo(
    () => (
      <Button type='primary' size='large' icon={<RiseOutlined />}>
        Start
      </Button>
    ),
    [],
  );
  if (!loaded) {
    return null;
  }

  return (
    <>
      <PageHeader left={leftPageHeader} right={rightPageHeader} />
      <WordsTable wordsByName={data} />;
    </>
  );
};
