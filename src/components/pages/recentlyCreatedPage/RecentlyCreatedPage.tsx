import React from 'react';
import { Table, Button } from 'antd';
import moment from 'moment';

import { useAPI } from '../../hooks/useAPI';
import { fetchRecentWords, startStagingWord } from '../../../apiClients';
import { IWordByName } from '../../../types';
import { StyledRecentlyCreatedPage, StyledRecentlyCreatedPageTitle } from './RecentlyCreatedPage.styled';
import { Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';

export const RecentlyCreatedPage = () => {
  const [recentWordsByName, setRecentWordsByName] = React.useState({} as IWordByName);
  const { data, loaded } = useAPI(fetchRecentWords, 100);
  React.useEffect(() => {
    if (data) {
      setRecentWordsByName(data);
    }
  }, [data]);

  const tableDataSource = Object.keys(recentWordsByName).map((wordName) => ({
    key: wordName,
    name: wordName,
    createdDate: recentWordsByName[wordName].createdDate,
    numberOfMeanings: Object.keys(recentWordsByName[wordName].meanings).length,
    stage: recentWordsByName[wordName].stage,
  }));

  const tableColumns: ColumnsType<any> = React.useMemo(
    () => [
      {
        key: 'name',
        dataIndex: 'name',
        title: 'Name',
        // eslint-disable-next-line react/display-name
        render: (wordName: string) => <Link to={`word/${wordName}`}>{wordName}</Link>,
      },
      {
        key: 'createdDate',
        dataIndex: 'createdDate',
        title: 'Created date',
        render: (date: string) => moment(date).format('MMMM Do YYYY'),
        sorter: (a: any, b: any) => moment(a.createdDate).unix() - moment(b.createdDate).unix(),
        defaultSortOrder: 'descend',
      },
      { key: 'numberOfMeanings', dataIndex: 'numberOfMeanings', title: 'Number of meanings' },
      {
        key: 'stage',
        dataIndex: 'stage',
        title: 'Stage',
        // eslint-disable-next-line react/display-name
        render: (stage: number | undefined, record: any) =>
          typeof stage === 'number' ? (
            stage
          ) : (
            <Button
              onClick={async () => {
                await startStagingWord(record.name);
                setRecentWordsByName({
                  ...recentWordsByName,
                  [record.name]: { ...recentWordsByName[record.name], stage: 0 },
                });
              }}
            >
              Stage
            </Button>
          ),
      },
    ],
    [recentWordsByName],
  );

  if (!loaded) {
    return null;
  }

  return (
    <StyledRecentlyCreatedPage>
      <StyledRecentlyCreatedPageTitle>
        <Typography.Title level={2}>Recently created words</Typography.Title>
      </StyledRecentlyCreatedPageTitle>
      <Table dataSource={tableDataSource} columns={tableColumns} />
    </StyledRecentlyCreatedPage>
  );
};
