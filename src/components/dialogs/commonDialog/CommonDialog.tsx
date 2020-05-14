import React, { ReactNode } from 'react';
import { Modal } from 'antd';

interface IProps {
  visible: boolean;
  title: string | ReactNode;
  footer?: string | ReactNode;
  content: string | ReactNode;
  onOk: () => Promise<void> | void;
  onCancel: () => void;
}

export const CommonDialog: React.FC<IProps> = ({ visible, title, onCancel, onOk, footer, content }) => {
  return (
    <Modal visible={visible} destroyOnClose title={title} onCancel={onCancel} onOk={onOk} footer={footer}>
      {content}
    </Modal>
  );
};
