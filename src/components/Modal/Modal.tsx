import React from 'react';
import ReactDOM from 'react-dom';
import { Modal as AModal } from 'antd';
import { ModalProps } from 'antd/lib/modal';

import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import { ModalContext } from '../../contexts';

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

  React.useLayoutEffect(() => {
    if (isVisible) {
      const modalContent = document.getElementsByClassName('ant-modal-content')[0];
      while (modalContent.firstChild) {
        modalContent.firstChild.remove();
      }

      ReactDOM.render(<>{children}</>, modalContent);
    }
  });

  return isVisible && <AModal visible={isVisible} {...restProps} />;
};

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
