import React from 'react';
import { useHistory } from 'react-router-dom';
import { Input, AutoComplete } from 'antd';

import { StyledTopBar, TopBarLeft, TopBarCenter, TopBarRight } from './TopBar.styled';
import { fetchSearchResults } from '../../apiClients';
import { useAPI } from '../hooks/useAPI';

export const TopBar = () => {
  const [search, setSearch] = React.useState('');
  const [debounceSearch, setDebounceSearch] = React.useState('');

  const globalSearchDebounce = React.useRef(null);

  const history = useHistory();

  const handleSearchChange = React.useCallback((value: string) => {
    setSearch(value);
    clearTimeout(globalSearchDebounce.current);
    globalSearchDebounce.current = setTimeout(() => setDebounceSearch(value), 500);
  }, []);

  const viewWord = React.useCallback(
    (word) => {
      clearTimeout(globalSearchDebounce.current);
      history.push(`/word/${word}`);
      setSearch('');
      setDebounceSearch('');
    },
    [history],
  );

  const { data = [] } = useAPI(fetchSearchResults, debounceSearch);

  const autoCompleteOptions = React.useMemo(
    () =>
      data.map((word) => ({
        value: word,
      })),
    [data],
  );

  return (
    <StyledTopBar>
      <TopBarLeft />
      <TopBarCenter>
        <AutoComplete
          options={autoCompleteOptions}
          onSelect={viewWord}
          value={search}
          onChange={handleSearchChange}
          placeholder='Enter a word'
        >
          <Input.Search onSearch={viewWord} />
        </AutoComplete>
      </TopBarCenter>
      <TopBarRight />
    </StyledTopBar>
  );
};
