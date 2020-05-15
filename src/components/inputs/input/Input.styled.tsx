import { styled } from '../../../styledComponents';

export const StyledInput = styled.div`
  &.error {
    input {
      border-color: ${({ theme }) => theme.RED};

      &:focus {
        box-shadow: none;
      }
    }
  }
`;
