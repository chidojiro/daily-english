import { styled } from '../../../styledComponents';

export const StyledMeaningByCategory = styled.div`
  margin-top: 50px;
  font-size: 20px;

  .example {
    font-style: italic;
  }
`;
StyledMeaningByCategory.displayName = 'StyledMeaningByCategory';

export const StyledMeaning = styled.div`
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
StyledMeaning.displayName = 'StyledMeaning';

export const StyledMeanings = styled.div``;
StyledMeanings.displayName = 'StyledMeanings';

export const StyledExtensionContainer = styled.div`
  padding: 10px 20px;
  background: ${({ theme }) => theme.PALE_BLUE};
  .extension-meaning {
    color: ${({ theme }) => theme.BASE};
  }
`;
StyledExtensionContainer.displayName = 'StyledExtensionContainer';
