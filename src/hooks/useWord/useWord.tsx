import { useQuery } from 'react-query';

import { fetchWordDetails } from '../../apiClients';

export const useWord = (wordName: string) =>
  useQuery(`details for word: ${wordName}`, () => fetchWordDetails(wordName));
