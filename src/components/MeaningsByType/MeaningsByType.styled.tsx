import { styled } from '../../styledComponents';

export const MeaningsByCategory = styled.div`
  margin-top: 50px;
  font-size: 20px;

  .example {
    font-style: italic;
  }
`;

export const Meaning = styled.div`
  position: relative;
  margin-top: 10px;

  .meaning {
    color: ${({ theme }) => theme.BASE};
  }

  .anticon.anticon-edit {
    position: absolute;
    line-height: 1.5715;
    top: 0;
    left: 0;
    transform: translate(-150%, 5px);
  }
`;

export const ExtensionContainer = styled.div`
  padding: 10px 20px;
  background: ${({ theme }) => theme.PALE_BLUE};
  .extension-meaning {
    color: ${({ theme }) => theme.BASE};
  }
`;
