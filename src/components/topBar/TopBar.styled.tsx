import { styled } from '../../styledComponents';

export const StyledTopBar = styled.div`
  background-color: ${({ theme }) => theme.BASE};
  width: 100%;
  height: 48px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 2px 0px;
  position: relative;
  display: flex;
  z-index: 100;
`;
StyledTopBar.displayName = 'StyledTopBar';

export const TopBarLeft = styled.div`
  min-width: 200px;
`;
TopBarLeft.displayName = 'TopBarLeft';

export const TopBarRight = styled.div`
  min-width: 200px;
`;
TopBarRight.displayName = 'TopBarRight';

export const TopBarCenter = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  align-items: center;

  .ant-select-auto-complete {
    max-width: 500px;
    width: 50%;
  }
`;
TopBarCenter.displayName = 'TopBarCenter';

export const SearchResult = styled.div`
  width: 100%;
  display: block;
  color: ${({ theme }) => theme.BLACK};
`;
SearchResult.displayName = 'SearchResult';
