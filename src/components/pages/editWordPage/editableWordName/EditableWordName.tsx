import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { StyledEditableWordName } from './EditableWordName.styled';
import { EditableText } from '../../../inputs';
import { updateWord } from '../../../../apiClients/apiClients';

enum WordInputName {
  newWordName = 'newWordName',
}

type IWordInputName = {
  [WordInputName.newWordName]: string;
};

export const EditableWordName = () => {
  const history = useHistory();
  const { wordName } = useParams();

  const handleSubmit = React.useCallback(
    async ({ newWordName }) => {
      await updateWord(wordName, newWordName);
      history.push(`/edit-word/${newWordName}`);
    },
    [history, wordName],
  );

  const newWordFormSchema = Yup.object().shape({
    wordName: Yup.string().required('Empty word not allowed!'),
  });

  const {
    handleSubmit: formikHandleSubmit,
    handleBlur,
    handleChange,
    values: { newWordName },
    errors: { newWordName: newWordNameError },
    setFieldValue,
  } = useFormik<IWordInputName>({
    initialValues: { [WordInputName.newWordName]: wordName },
    onSubmit: handleSubmit,
    validationSchema: newWordFormSchema,
  });

  const changeWord = React.useCallback(() => {
    formikHandleSubmit();
  }, [formikHandleSubmit]);

  React.useEffect(() => {
    setFieldValue(WordInputName.newWordName, wordName);
  }, [setFieldValue, wordName]);

  return (
    <StyledEditableWordName>
      <EditableText
        text={wordName}
        name={WordInputName.newWordName}
        value={newWordName}
        onChange={handleChange}
        onPressEnter={changeWord}
        messageOnError={newWordNameError}
        onBlur={handleBlur}
      />
    </StyledEditableWordName>
  );
};
