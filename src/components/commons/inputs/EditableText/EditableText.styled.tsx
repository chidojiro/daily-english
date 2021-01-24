import { styled } from '../../../../styledComponents';

export const StyledEditableText = styled.div`
  width: fit-content;
  font-size: 1.5rem;
  position: relative;

  input {
    text-align: center;
    font-size: 1.5rem;
  }

  .anticon.anticon-loading {
    font-size: 1.5rem;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(110%, 50%);
  }
`;
StyledEditableText.displayName = 'StyledEditableText';
