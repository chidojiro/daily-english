import React from 'react';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { createWord } from '../../../apiClients/apiClients';
import { Input } from '../../inputs/input';
import { useDialog } from '../../dialogs';

enum NewWordFieldNames {
  wordName = 'wordName',
}

interface INewWordForm {
  [NewWordFieldNames.wordName]: string;
}

export const NewWordDialogContent = () => {
  const history = useHistory();

  const { closeDialog, attachAdditionalOkAction } = useDialog();

  const newWordFormSchema = Yup.object().shape({
    wordName: Yup.string().required('Empty word not allowed!'),
  });

  const handleFormikSubmit = React.useCallback(
    async (values = {}) => {
      await createWord(values?.wordName);
      history.push(`/edit-word/${values?.wordName}`);
      closeDialog();
    },
    [closeDialog, history],
  );

  const { errors, handleChange, handleBlur, values, handleSubmit } = useFormik<INewWordForm>({
    initialValues: { [NewWordFieldNames.wordName]: '' },
    onSubmit: handleFormikSubmit,
    validationSchema: newWordFormSchema,
  });

  React.useEffect(() => {
    attachAdditionalOkAction(handleSubmit);
  }, [attachAdditionalOkAction, handleSubmit]);

  return (
    <Input
      name={NewWordFieldNames.wordName}
      messageOnError={errors.wordName}
      value={values.wordName}
      onChange={handleChange}
      onBlur={handleBlur}
      autoFocus
    />
  );
};

export const useNewWordDialog = () => {
  const { openCommonDialog, closeDialog } = useDialog();

  return {
    openNewWordDialog: () => openCommonDialog({ title: 'New word', content: <NewWordDialogContent /> }),
    closeDialog,
  };
};
