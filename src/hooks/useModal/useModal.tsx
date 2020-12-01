import React from 'react';
import { ModalContext } from '../../contexts';

export const useModal = (Modal: React.FC) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const ModalWrapper = React.useCallback(
    ({ onHide, ...restProps }) => {
      const handleHide = () => {
        onHide?.();
        closeModal();
      };

      return (
        <ModalContext.Provider value={{ isOpen, handleHide }}>
          <Modal onCancel={handleHide} {...restProps} />
        </ModalContext.Provider>
      );
    },
    [Modal, isOpen],
  );

  return {
    isOpen,
    Modal: ModalWrapper,
    openModal,
  };
};
