import React from 'react';
import { X } from 'react-feather';
import { ModalContext } from '../../../contexts';

interface IProps {
  onHide: () => void;
}

export const ModalHeader: React.FC<IProps> = ({ children, onHide: onHideProp }) => {
  const { handleHide: contextHandleHide } = React.useContext(ModalContext);

  const handleHide = () => {
    if (onHideProp) {
      onHideProp();
      return;
    }

    contextHandleHide();
  };

  return (
    <div className='my-3 mx-5 flex items-center justify-between'>
      <div>{children}</div>
      <X onClick={handleHide} className='cursor-pointer' />
    </div>
  );
};
