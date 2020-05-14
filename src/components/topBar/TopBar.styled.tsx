import { styled } from '../../styledComponents';

export const StyledTopBar = styled.div`
  background-color: ${({ theme }) => theme.BASE};
  width: 100%;
  height: 48px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 2px 0px;
  position: relative;
  z-index: 100;
`;
StyledTopBar.displayName = 'StyledTopBar';
