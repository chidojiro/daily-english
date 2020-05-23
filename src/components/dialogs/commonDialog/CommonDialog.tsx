import React from 'react';
import { Modal } from 'antd';

interface IProps {
  visible: boolean;
  title: React.ReactNode;
  footer?: React.ReactNode;
  content: React.ReactNode;
  onOk: () => Promise<void>;
  onCancel: () => void;
  afterClose?: () => void;
  isHandlingOK: boolean;
}

export const CommonDialog: React.FC<IProps> = ({ visible, title, onCancel, onOk, footer, content, isHandlingOK }) => {
  return (
    <Modal
      visible={visible}
      destroyOnClose
      title={title}
      onCancel={onCancel}
      onOk={onOk}
      footer={footer}
      confirmLoading={isHandlingOK}
    >
      {content}
    </Modal>
  );
};
