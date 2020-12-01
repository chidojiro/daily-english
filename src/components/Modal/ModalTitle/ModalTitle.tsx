import React from 'react';

interface IProps {
  onHide: () => void;
}

export const ModalTitle: React.FC<IProps> = ({ children }) => {
  return <h3>{children}</h3>;
};
