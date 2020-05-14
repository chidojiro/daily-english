import React, { ReactNode } from 'react';
import { CommonDialog } from './commonDialog';
import { NewWordDialog } from './newWordDialog';

interface IDialogContext {
  openDialog: (props: IOpenDialogProps) => void;
  closeDialog: () => void;
}

interface IOpenDialogProps {
  type: 'COMMON' | 'NEW_WORD';
  title?: string | ReactNode;
  onOk?: () => {};
  footer?: string | ReactNode;
  content?: string | ReactNode;
}

export const DialogContext = React.createContext<IDialogContext>(null);

export const DialogContextProvider: React.FC<{}> = ({ children }) => {
  const [state, setState] = React.useState<IOpenDialogProps>(null);
  const { type, title, onOk, footer, content } = state || {};

  const openDialog = React.useCallback((props: IOpenDialogProps) => {
    setState(props);
  }, []);

  const closeDialog = React.useCallback(() => {
    setState(null);
  }, []);

  const handleOk = React.useCallback(async () => {
    await onOk();
    closeDialog();
  }, [closeDialog, onOk]);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      <CommonDialog
        visible={!!state && type === 'COMMON'}
        title={title}
        onCancel={closeDialog}
        onOk={handleOk}
        footer={footer}
        content={content}
      />
      <NewWordDialog visible={!!state && type === 'NEW_WORD'} onCancel={closeDialog} />
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return React.useContext(DialogContext);
};
