import React from 'react';

import Styled from './Icon.styled';

interface IProps {
  component: React.ComponentType<any>;
  onClick?: () => void | Promise<void>;
}

const Icon: React.FC<IProps> = ({ component: Component, onClick }) => {
  return (
    <Styled.Wrapper>
      <Component onClick={onClick} />
    </Styled.Wrapper>
  );
};

export default Icon;
