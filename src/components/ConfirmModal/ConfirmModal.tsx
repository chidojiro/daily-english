import React from 'react';

import { IBaseModalContainerProps } from '../../hooks';

import { Modal } from '../commons';

interface IProps extends IBaseModalContainerProps {
  title: string;
  content: string;
  onOk: () => void | Promise<void>;
  okLabel?: string;
  cancelLabel?: string;
}

export const ConfirmModal: React.FC<IProps> = ({ title, content, onOk, okLabel, cancelLabel }) => {
  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer onOk={onOk} okLabel={okLabel} cancelLabel={cancelLabel} />
    </Modal>
  );
};
