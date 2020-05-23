import React from 'react';
import { Formik, Field, FieldProps } from 'formik';

import { Input } from '../../inputs/input';
import { useDialog } from '../../dialogs';
import { functionPlaceholder } from '../../../constants';

enum NewWordFieldNames {
  wordName = 'wordName',
}

export interface INewWordForm {
  [NewWordFieldNames.wordName]: string;
}

export const NewWordDialogContent = () => {
  const { syncUserInput } = useDialog();

  return (
    <Formik initialValues={{ [NewWordFieldNames.wordName]: '' } as INewWordForm} onSubmit={functionPlaceholder}>
      {({ values, errors }) => (
        <>
          <Field name={NewWordFieldNames.wordName}>
            {({ field }: FieldProps) => (
              <Input
                messageOnError={errors.wordName}
                // onPressEnter={handlePressEnter}
                placeholder='Enter a word'
                autoFocus
                {...field}
              />
            )}
          </Field>
          {syncUserInput(values)}
        </>
      )}
    </Formik>
  );
};

interface IOpenNewWordDialogProps {
  onOk: (userInput: INewWordForm) => Promise<void>;
}

export const useNewWordDialog = () => {
  const { openCommonDialog, closeDialog } = useDialog();

  return {
    openNewWordDialog: ({ onOk }: IOpenNewWordDialogProps) =>
      openCommonDialog({ title: 'New word', content: <NewWordDialogContent />, onOk }),
    closeDialog,
  };
};
