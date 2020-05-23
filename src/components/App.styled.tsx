import { styled } from '../styledComponents';

export const StyledApp = styled.div`
  background-color: ${({ theme }) => theme.LIGHT_GREY_1};
`;
StyledApp.displayName = 'StyledApp';

export const CenterArea = styled.div`
  display: flex;
  height: calc(100vh - 48px);
`;
CenterArea.displayName = 'CenterArea';

export const PageContent = styled.div`
  flex-grow: 1;
  padding: 5% 10% 0;
`;
PageContent.displayName = 'PageContent';
