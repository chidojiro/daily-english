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

  const handleSubmit = React.useCallback(
    async ({ wordName }: INewWordForm) => {
      await createWord(wordName);
      history.push(`/edit-word/${wordName}`);
      closeDialog();
    },
    [closeDialog, history],
  );

  const { errors, handleChange, handleBlur, values, handleSubmit: formikHandleSubmit, isValid } = useFormik<
    INewWordForm
  >({
    initialValues: { [NewWordFieldNames.wordName]: '' },
    onSubmit: handleSubmit,
    validationSchema: newWordFormSchema,
  });

  React.useEffect(() => {
    const additionalOkAction = () => {
      formikHandleSubmit();
    };
    attachAdditionalOkAction(additionalOkAction);
  }, [attachAdditionalOkAction, formikHandleSubmit, isValid]);

  return (
    <Input
      name={NewWordFieldNames.wordName}
      messageOnError={errors.wordName}
      value={values.wordName}
      onChange={handleChange}
      onBlur={handleBlur}
      onPressEnter={formikHandleSubmit}
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
