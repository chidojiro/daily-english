import { styled } from '../../styledComponents';

export const StyledSideBar = styled.div`
  width: 210px;
  height: 100%;
  background-color: ${({ theme }) => theme.BASE};
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 30px 0 100px 0;

  .new-word-btn {
    align-self: center;
    margin-bottom: auto;
    margin-top: 30px 0;
  }

  ul {
    margin-bottom: auto;
  }

  .ant-menu {
    background: inherit;
    border: none;

    a {
      color: ${({ theme }) => theme.WHITE};

      &:hover::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        border-right: 3px solid ${({ theme }) => theme.WHITE};
      }
    }

    .ant-menu-item-selected a {
      color: ${({ theme }) => theme.BASE};
    }
  }
`;
StyledSideBar.displayName = 'StyledSideBar';
