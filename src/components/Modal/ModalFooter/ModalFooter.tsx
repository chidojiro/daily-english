import React from 'react';
import { Button } from 'antd';
import classnames from 'classnames';

interface IProps {
  showNotOk?: boolean;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  onNotOk?: () => void | Promise<void>;
  okLabel: 'Ok';
  cancelLabel: 'Cancel';
  notOkLabel: 'Not Ok';
}

export const ModalFooter: React.FC<IProps> = ({
  children,
  showNotOk,
  onCancel,
  onNotOk,
  onOk,
  okLabel,
  cancelLabel,
  notOkLabel,
}) => {
  return children ? (
    <div className='my-3 mx-5'>{children}</div>
  ) : (
    <div
      className={classnames('my-3 mx-5 flex items-center', { 'justify-between': showNotOk, 'justify-end': !showNotOk })}
    >
      {showNotOk && (
        <Button type='primary' onClick={onNotOk}>
          {notOkLabel}
        </Button>
      )}
      <div className='flex items-center'>
        <Button type='default' onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button type='primary' onClick={onOk}>
          {okLabel}
        </Button>
      </div>
    </div>
  );
};
