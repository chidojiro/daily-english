import { styled } from '../../../../styledComponents';

export const StyledMeaningByCategory = styled.div`
  margin-top: 50px;
  font-size: 20px;

  .example {
    font-style: italic;
  }
`;
StyledMeaningByCategory.displayName = 'StyledMeaningByCategory';

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
Meaning.displayName = 'Meaning';

export const Meanings = styled.div``;
Meanings.displayName = 'Meanings';
