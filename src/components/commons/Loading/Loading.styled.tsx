import { styled } from '../../../styledComponents';

export const Loading = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .ant-spin {
    transform: translateY(-100%);

    span {
      font-size: 70px;
    }
  }

  .ant-spin-lg span {
    font-size: 100px;
  }

  .ant-spin-sm span {
    font-size: 50px;
  }
`;

export default { Loading };
