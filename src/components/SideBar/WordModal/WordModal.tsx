import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Controlled, Modal } from '../../commons';
import { createWord } from '../../../apiClients';

export const WordModal: React.FC = () => {
  const methods = useForm();

  const { handleSubmit } = methods;

  return (
    <Modal>
      <form onSubmit={handleSubmit((values) => createWord(values.wordName))}>
        <Modal.Header>
          <Modal.Title>New word</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormProvider {...methods}>
            <Controlled.Input name='wordName' placeholder='Enter a word' autoFocus />
          </FormProvider>
        </Modal.Body>
        <Modal.Footer noBorder />
      </form>
    </Modal>
  );
};
