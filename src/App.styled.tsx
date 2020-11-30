import { styled } from './styledComponents';

export const StyledApp = styled.div`
  background-color: ${({ theme }) => theme.LIGHT_GREY_1};
`;
StyledApp.displayName = 'StyledApp';

export const CenterArea = styled.div`
  display: flex;
  height: calc(100vh - 48px);
  width: 100%;
  /* width: calc(100% - 210px); */
  & > * {
    flex-shrink: 0;
    flex-grow: 0;
  }
`;
CenterArea.displayName = 'CenterArea';

export const PageContent = styled.div`
  padding: 5% 10% 0;
  /* TODO: HOW THE FUCK DOES THIS WORK? (antd-carousel) */
  flex-grow: 1;
  width: 100px;
`;
PageContent.displayName = 'PageContent';
