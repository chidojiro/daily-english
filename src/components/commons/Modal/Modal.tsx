import React from 'react';
import { ModalProps } from 'antd/lib/modal';

import { ModalHeader } from './ModalHeader';
import { ModalTitle } from './ModalTitle';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalContext } from '../../../contexts';

import * as Styled from './Modal.styled';

type IProps = Omit<ModalProps, 'footer' | 'title'>;

interface IModal extends React.FC<IProps> {
  Header?: typeof ModalHeader;
  Title?: typeof ModalTitle;
  Body?: typeof ModalBody;
  Footer?: typeof ModalFooter;
}

export const Modal: IModal = ({ children, visible, ...restProps }) => {
  const { isOpen } = React.useContext(ModalContext);

  const isVisible = visible || isOpen;

  return (
    isVisible && (
      <Styled.Modal visible={isVisible} {...restProps} footer={null} closable={false}>
        {children}
      </Styled.Modal>
    )
  );
};

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
