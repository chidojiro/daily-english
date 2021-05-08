import { styled } from '../../../styledComponents';

const BackButton = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Decisions = styled.div`
  display: flex;

  button.ant-btn:not(:last-of-type) {
    margin-right: 10px;
  }
`;

const EditableTextWrapper = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

export default { BackButton, Wrapper, Decisions, EditableTextWrapper };
