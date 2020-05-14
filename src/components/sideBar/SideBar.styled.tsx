import { styled } from '../../styledComponents';

export const StyledSideBar = styled.div`
  width: 210px;
  height: 100%;
  background-color: ${({ theme }) => theme.BASE};
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 30px 0;

  .new-word-btn {
    align-self: center;
    margin-bottom: auto;
    margin-top: 30px 0;
  }

  ul {
    margin-bottom: auto;
  }
`;
StyledSideBar.displayName = 'StyledSideBar';
