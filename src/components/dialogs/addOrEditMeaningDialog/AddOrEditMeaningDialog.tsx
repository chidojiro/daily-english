import React from 'react';
import { useHistory } from 'react-router';
import { Formik, Field, useFormikContext, FieldProps } from 'formik';
import { Input, Modal, Tooltip } from 'antd';
import * as Yup from 'yup';

import { createWord, updateWord } from '../../../apiClients/apiClients';

interface IPropsWrapped {
  visible: boolean;
  onCancel: () => void;
}

//TODO: try to find a way that makes field's name controllable

const AddOrEditMeaningDialogWrapped: React.FC<IPropsWrapped> = ({ onCancel, visible }) => {
  const { errors, resetForm, handleSubmit } = useFormikContext();

  const enterCatcher = React.useCallback(
    async (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        await handleSubmit();
      }
    },
    [handleSubmit],
  );

  React.useEffect(() => {
    if (visible) {
      window.addEventListener('keypress', enterCatcher);
    }

    return () => {
      window.removeEventListener('keypress', enterCatcher);
    };
  }, [enterCatcher, visible]);

  return (
    <Modal
      visible={visible}
      title='New word'
      destroyOnClose
      onCancel={onCancel}
      onOk={() => handleSubmit()}
      afterClose={resetForm}
    >
      <Tooltip
        title={(errors as any).wordName}
        visible={!!(errors as any).wordName}
        placement='topLeft'
        overlayClassName='tooltip--error'
      >
        <Field name='wordName'>
          {({ field }: FieldProps) => (
            <Input
              {...field}
              autoFocus
              placeholder='Enter word'
              type={(errors as any).wordName ? 'danger' : undefined}
            />
          )}
        </Field>
      </Tooltip>
    </Modal>
  );
};

export const AddOrEditMeaningDialog: React.FC<IPropsWrapped> = (props) => {
  const { onCancel } = props;
  const history = useHistory();

  const handleSubmit = React.useCallback(
    async ({ wordName }) => {
      await updateWord(wordName, null);
      history.push(`/edit-word/${wordName}`);
      onCancel();
    },
    [history, onCancel],
  );

  const newWordFormSchema = Yup.object().shape({
    wordName: Yup.string().required('Empty word not allowed!'),
  });

  return (
    <Formik initialValues={{ wordName: '' }} onSubmit={handleSubmit} validationSchema={newWordFormSchema}>
      <AddOrEditMeaningDialogWrapped {...props} />
    </Formik>
  );
};
