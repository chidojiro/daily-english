import { styled } from '../../../../styledComponents';

export const Input = styled.div`
  &.error {
    input {
      border-color: ${({ theme }) => theme.RED};

      &:focus {
        box-shadow: none;
      }
    }
  }
`;
