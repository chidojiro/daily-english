import { styled } from '../../../styledComponents';

export const StyledBackBtn = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;
StyledBackBtn.displayName = 'StyledBackBtn';

export const StyledWordOutZone = styled.div`
  position: relative;
`;
StyledWordOutZone.displayName = 'StyledWordOutZone';

export const StyledDecisions = styled.div`
  display: flex;

  button.ant-btn:not(:last-of-type) {
    margin-right: 10px;
  }
`;
StyledDecisions.displayName = 'StyledDecisions';