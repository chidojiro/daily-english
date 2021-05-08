import React from 'react';
import { ModalContext } from '../../contexts';
export interface IBaseModalContainerProps {
  onCancel?: () => void | Promise<void>;
}

export const useModal = <T extends IBaseModalContainerProps>(Modal: React.FC<T>) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const ModalWrapper: React.FC<T> = React.useCallback(
    ({ onCancel, ...restProps }) => {
      const handleHide = () => {
        onCancel?.();
        closeModal();
      };

      return (
        <ModalContext.Provider value={{ isOpen, handleHide }}>
          <Modal onCancel={handleHide} {...(restProps as any)} />
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
