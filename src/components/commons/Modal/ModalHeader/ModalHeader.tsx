import React from 'react';
import { X } from 'react-feather';
import { ModalContext } from '../../../../contexts';

interface IProps {
  onHide?: () => void;
}

export const ModalHeader: React.FC<IProps> = ({ children, onHide: onHideProp }) => {
  const { handleHide: contextHandleHide } = React.useContext(ModalContext);

  const handleHide = () => {
    onHideProp?.();
    contextHandleHide();
  };

  return (
    <div className='py-3 px-5 flex items-center justify-between border-b border-border'>
      <div>{children}</div>
      <X onClick={handleHide} className='cursor-pointer' />
    </div>
  );
};
