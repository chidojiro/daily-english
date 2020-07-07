import React from 'react';
import { Table, Button, Popover, Menu } from 'antd';
import moment from 'moment';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { MoreOutlined } from '@ant-design/icons';

import { startStagingWord, stopStagingWord } from '../../apiClients';
import { IWordByName, IWord } from '../../types';
import { StyledAction } from './WordsTable.styled';

interface IProps {
  wordsByName: IWordByName;
}

export const WordsTable: React.FC<IProps> = ({ wordsByName: wordsByNameProp }) => {
  const [wordsByName, setWordsByName] = React.useState({} as IWordByName);

  React.useEffect(() => {
    setWordsByName(wordsByNameProp);
  }, [wordsByNameProp]);

  const handleStartStagingWordClick = React.useCallback(
    async (word: IWord) => {
      await startStagingWord(word);
      setWordsByName({
        ...wordsByName,
        [word.name]: {
          ...wordsByName[word.name],
          stage: 0,
          stageDueDate: new Date().toDateString(),
        },
      });
    },
    [wordsByName],
  );

  const handleStopStagingWordClick = React.useCallback(
    async ({ name }: IWord) => {
      await stopStagingWord(wordsByName[name]);
      setWordsByName({
        ...wordsByName,
        [name]: {
          ...wordsByName[name],
          stage: undefined,
          stageDueDate: undefined,
        },
      });
    },
    [wordsByName],
  );

  const tableDataSource: IWord[] = Object.keys(wordsByName).map((wordName) => ({
    key: wordName,
    name: wordName,
    createdDate: wordsByName[wordName].createdDate,
    numberOfMeanings: Object.keys(wordsByName[wordName].meanings || {}).length,
    stage: wordsByName[wordName].stage,
    stageDueDate: wordsByName[wordName].stageDueDate,
  }));

  const tableColumns: ColumnsType<IWord> = React.useMemo(
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
        render: (date: string) => moment(date).format('DD/MM'),
        sorter: (a: IWord, b: IWord) => moment(a.createdDate).unix() - moment(b.createdDate).unix(),
        defaultSortOrder: 'descend',
        className: 'table__column--center',
      },
      {
        key: 'numberOfMeanings',
        dataIndex: 'numberOfMeanings',
        title: '#Meanings',
        className: 'table__column--center',
      },
      {
        key: 'stage',
        dataIndex: 'stage',
        title: 'Stage',
        // eslint-disable-next-line react/display-name
        render(stage: number) {
          return stage !== undefined ? stage : 'Unstaged';
        },
        // 0 and undefined are both falsy, and stage maybe 0
        className: 'table__column--center',
      },
      {
        key: 'stageDueDate',
        dataIndex: 'stageDueDate',
        title: 'Due Date',
        render: (date: string) => (date ? moment(date).format('DD/MM') : null),
        className: 'table__column--center',
      },
      {
        key: 'action',
        title: 'Action',
        render(_, record) {
          return (
            <StyledAction>
              <Popover
                placement='rightTop'
                content={
                  <Menu mode='horizontal'>
                    {record.stage === undefined ? (
                      <Menu.Item onClick={() => handleStartStagingWordClick(record)}>Start staging</Menu.Item>
                    ) : (
                      <Menu.Item onClick={() => handleStopStagingWordClick(record)}>Stop staging</Menu.Item>
                    )}
                  </Menu>
                }
                trigger='focus'
              >
                <Button>
                  <MoreOutlined />
                </Button>
              </Popover>
            </StyledAction>
          );
        },
        className: 'table__column--center',
      },
    ],
    [handleStartStagingWordClick, handleStopStagingWordClick],
  );

  return <Table dataSource={tableDataSource} columns={tableColumns} />;
};
