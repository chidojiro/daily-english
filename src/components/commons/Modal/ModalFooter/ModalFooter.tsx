import React, { useContext } from 'react';
import { Button } from 'antd';
import classnames from 'classnames';

import { ModalContext } from '../../../../contexts';

import * as Styled from './ModalFooter.styled';
import { configConsumerProps } from 'antd/lib/config-provider';

interface IProps {
  showNotOk?: boolean;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  onNotOk?: () => void | Promise<void>;
  okLabel?: string;
  cancelLabel?: string;
  notOkLabel?: string;
  notOk?: React.ReactNode;
  cancel?: React.ReactNode;
  ok?: React.ReactNode;
  noBorder?: boolean;
}

export const ModalFooter: React.FC<IProps> = ({
  children,
  showNotOk,
  onCancel,
  onNotOk,
  onOk,
  okLabel = 'Ok',
  cancelLabel = 'Cancel',
  notOkLabel = 'Not Ok',
  notOk,
  cancel,
  ok,
  noBorder,
}) => {
  const { handleHide } = useContext(ModalContext);

  const handleCancel = async () => {
    await handleHide();
    onCancel?.();
  };

  const handleNotOk = async () => {
    await onNotOk?.();
    handleCancel();
  };

  const handleOk = async () => {
    await onOk?.();
    handleCancel();
  };

  const renderNotOk = () => {
    if (!showNotOk) {
      return null;
    }

    if (notOk) {
      return notOk;
    }

    return (
      <Button type='primary' onClick={handleNotOk}>
        {notOkLabel}
      </Button>
    );
  };

  return children ? (
    <Styled.ModalFooter noBorder={noBorder}>{children}</Styled.ModalFooter>
  ) : (
    <Styled.ModalFooter
      className={classnames('flex items-center', {
        'justify-between': showNotOk,
        'justify-end': !showNotOk,
      })}
      noBorder={noBorder}
    >
      {renderNotOk()}
      <div className='flex items-center'>
        <Button type='default' onClick={handleCancel} className='mr-3'>
          {cancelLabel}
        </Button>
        <Button htmlType='submit' type='primary' onClick={handleOk}>
          {okLabel}
        </Button>
      </div>
    </Styled.ModalFooter>
  );
};
