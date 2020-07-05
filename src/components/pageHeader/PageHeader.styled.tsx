import { styled } from '../../styledComponents';

export const StyledPageHeader = styled.div`
  margin-bottom: 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &.center {
    justify-content: center;
  }
`;
StyledPageHeader.displayName = 'StyledPageHeader';
