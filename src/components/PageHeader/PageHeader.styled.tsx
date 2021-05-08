import { styled } from '../../styledComponents';

export const StyledPageHeader = styled.div`
  margin-bottom: 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &.center {
    justify-content: center;
  }  
  
  & > * {
    margin: 0 !important;
  }
`;
StyledPageHeader.displayName = 'StyledPageHeader';

export const StyledCenterHeader = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
`;
StyledCenterHeader.displayName = 'StyledCenterHeader';