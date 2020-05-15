import React, { ReactNode } from 'react';

import { CommonDialog } from './commonDialog';

interface IDialogContext {
  openCommonDialog: (props: IOpenCommonDialogProps) => void;
  closeDialog: () => void;
  attachAdditionalOkAction: (additionalOkAction: (...args: any[]) => void) => void;
}

interface IOpenCommonDialogProps {
  title?: string | ReactNode;
  onOk?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  footer?: string | ReactNode;
  content?: string | ReactNode;
  afterClose?: () => void;
}

interface IState extends IOpenCommonDialogProps {
  additionalOkAction?: () => Promise<any> | void;
}

export const DialogContext = React.createContext<IDialogContext>(null);

export const DialogContextProvider: React.FC<{}> = ({ children }) => {
  const [state, setState] = React.useState<IState>(null);

  const { title, onOk, footer, content, afterClose } = state || {};

  const openCommonDialog = React.useCallback((props: IOpenCommonDialogProps) => {
    setState({ ...props });
  }, []);

  const closeDialog = React.useCallback(() => {
    setState(null);
  }, []);

  const overridingOkHandler = React.useRef(null);
  const attachAdditionalOkAction = React.useCallback((okHandler) => {
    overridingOkHandler.current = okHandler;
  }, []);

  const handleOk = React.useCallback(async () => {
    if (overridingOkHandler.current) {
      await overridingOkHandler.current();
    } else {
      await onOk?.();
      closeDialog();
    }
  }, [closeDialog, onOk]);

  return (
    <DialogContext.Provider value={{ openCommonDialog, closeDialog, attachAdditionalOkAction }}>
      <CommonDialog
        visible={!!state}
        title={title}
        onCancel={closeDialog}
        onOk={handleOk}
        footer={footer}
        content={content}
        afterClose={afterClose}
      />
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return React.useContext(DialogContext);
};
