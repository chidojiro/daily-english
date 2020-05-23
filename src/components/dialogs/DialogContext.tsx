import React from 'react';

import { CommonDialog } from './commonDialog';

interface IDialogContext {
  openCommonDialog: (props: IOpenCommonDialogProps) => void;
  clickOk: () => Promise<void>;
  closeDialog: () => void;
  syncUserInput: <T>(userInput: T) => void;
  userInput: any;
}

interface IOpenCommonDialogProps {
  title: string | React.ReactNode;
  onOk?: (userInput: any, ...args: any[]) => void;
  footer?: string | React.ReactNode;
  content: string | React.ReactNode;
  afterClose?: () => void;
}

export const DialogContext = React.createContext<IDialogContext>(null);

export const DialogContextProvider: React.FC<{}> = ({ children }) => {
  const [state, setState] = React.useState<IOpenCommonDialogProps>(null);
  const [isHandlingOK, setIsHandlingOK] = React.useState(false);

  const userInputRef = React.useRef(null);

  const { onOk, title, footer, content, afterClose } = state || ({} as IOpenCommonDialogProps);

  const openCommonDialog = React.useCallback((props: IOpenCommonDialogProps) => {
    setState(props);
  }, []);

  const closeDialog = React.useCallback(() => {
    setState(null);
    userInputRef.current = null;
  }, []);

  const syncUserInput = React.useCallback((userInput) => {
    userInputRef.current = userInput;
  }, []);

  const handleOk = React.useCallback(async () => {
    setIsHandlingOK(true);
    await onOk(userInputRef.current);
    setIsHandlingOK(false);
    closeDialog();
  }, [closeDialog, onOk]);

  return (
    <DialogContext.Provider
      value={{ openCommonDialog, closeDialog, clickOk: handleOk, syncUserInput, userInput: userInputRef.current }}
    >
      <CommonDialog
        visible={!!state}
        title={title}
        onCancel={closeDialog}
        onOk={handleOk}
        footer={footer}
        content={content}
        afterClose={afterClose}
        isHandlingOK={isHandlingOK}
      />
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return React.useContext(DialogContext);
};
