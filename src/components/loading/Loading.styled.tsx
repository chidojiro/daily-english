import { styled } from '../../styledComponents';

type StyledLoadingSize = 'large' | 'normal' | 'small';

export interface StyledLoadingProps {
  size?: StyledLoadingSize;
}

const fontSizeMap: { [key in StyledLoadingSize]: string } = {
  large: '100px',
  normal: '70px',
  small: '50px',
};

export const StyledLoading = styled.div<StyledLoadingProps>`
  font-size: ${(props) => fontSizeMap[props.size]};
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  & > * {
    margin: 15%;
  }
`;
StyledLoading.displayName = 'StyledLoading';