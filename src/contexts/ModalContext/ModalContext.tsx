import React from 'react';
import { noop } from 'lodash';

interface IModalContext {
  isOpen: boolean;
  handleHide: () => void;
}

const defaultValue: IModalContext = {
  isOpen: false,
  handleHide: noop,
};

export const ModalContext = React.createContext<IModalContext>(defaultValue);
