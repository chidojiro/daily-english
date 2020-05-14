import React from 'react';
import { Modal } from 'antd';

interface IProps {
  visible: boolean;
  onOk: () => Promise<any>;
  onCancel: () => void;
}

export const AddMeaningDialog: React.FC<IProps> = ({ visible, onCancel, onOk }) => {
  const [loading, setLoading] = React.useState(false);

  const handleOk = React.useCallback(async () => {
    setLoading(true);
    await onOk();
    setLoading(false);
  }, [onOk]);

  return <Modal visible={visible} onCancel={onCancel} onOk={handleOk} okText='Add' confirmLoading={loading} />;
};
