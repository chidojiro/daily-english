import React from 'react';
import { Space, Select as AntdSelect, Button, Collapse } from 'antd';
import { Formik, Field, FieldProps } from 'formik';
import { Select } from 'formik-antd';

import { useDialog } from '../dialogs';
import { TextArea } from '../inputs';
import { StyledMeaningDialog, StyledEditMeaningDialogFooter } from './MeaningDialog.styled';
import { CategoryMeta } from './categoryMeta';
import { IMeaningCategoryKeys, IMeaningCategoryMeta, IMeaning } from '../../types';
import { functionPlaceholder } from '../../constants';

export enum WordMeaningFormFields {
  category = 'category',
  categoryMeta = 'categoryMeta',
  meaning = 'meaning',
  example = 'example',
  note = 'note',
  extension = 'extension',
  extensionMeaning = 'extensionMeaning',
  extensionExample = 'extensionExample',
}

interface ICategoryProperties {
  value: IMeaningCategoryKeys;
  label: string;
}

export interface IWordMeaningForm {
  [WordMeaningFormFields.category]: IMeaningCategoryKeys;
  [WordMeaningFormFields.meaning]: string;
  [WordMeaningFormFields.categoryMeta]: IMeaningCategoryMeta;
  [WordMeaningFormFields.example]: string;
  [WordMeaningFormFields.note]: string;
  [WordMeaningFormFields.extension]: string;
  [WordMeaningFormFields.extensionMeaning]: string;
  [WordMeaningFormFields.extensionExample]: string;
}

const wordFormProperties: ICategoryProperties[] = [
  { value: 'adjective', label: 'Adjective' },
  { value: 'adverb', label: 'Adverb' },
  { value: 'noun', label: 'Noun' },
  { value: 'verb', label: 'Verb' },
  { value: 'conjunction', label: 'Conjunction' },
  { value: 'idiom', label: 'Idiom' },
  { value: 'phrasal', label: 'Phrasal' },
];

type IMeaningDialogMode = 'edit' | 'create';

const MeaningDialogContent = () => {
  const { syncUserInput, userInput } = useDialog();

  return (
    <StyledMeaningDialog>
      <Formik
        initialValues={
          (userInput || {
            example: '',
            meaning: '',
            categoryMeta: {},
            note: '',
            category: 'adjective',
            extension: '',
            extensionMeaning: '',
            extensionExample: '',
          }) as IWordMeaningForm
        }
        onSubmit={functionPlaceholder}
      >
        {({ values }) => (
          <Space direction='vertical' style={{ width: '100%' }}>
            <Space>
              <Field name='category'>
                {({ field, form: { setFieldValue } }: FieldProps) => {
                  const handleChange = (event: unknown) => {
                    setFieldValue(WordMeaningFormFields.categoryMeta, {});
                    field.onChange(event);
                  };
                  return (
                    <Select {...field} onChange={handleChange}>
                      {wordFormProperties.map(({ value, label }) => (
                        <AntdSelect.Option value={value} key={value}>
                          {label}
                        </AntdSelect.Option>
                      ))}
                    </Select>
                  );
                }}
              </Field>
              <CategoryMeta category={values.category} />
            </Space>
            <Field name={WordMeaningFormFields.meaning}>
              {({ field, meta: { error } }: FieldProps) => (
                <TextArea messageOnError={error} autoSize placeholder='Enter a meaning' {...field} />
              )}
            </Field>
            <Field name={WordMeaningFormFields.example}>
              {({ field, meta: { error } }: FieldProps) => (
                <TextArea messageOnError={error} autoSize placeholder='Enter an example' {...field} />
              )}
            </Field>
            <Field name={WordMeaningFormFields.note}>
              {({ field, meta: { error } }: FieldProps) => (
                <TextArea messageOnError={error} autoSize placeholder='Enter a note' {...field} />
              )}
            </Field>
            <Collapse>
              <Collapse.Panel header='Extension' key='1' collapsible='header'>
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Field name={WordMeaningFormFields.extension}>
                    {({ field, meta: { error } }: FieldProps) => (
                      <TextArea messageOnError={error} autoSize placeholder='Enter an extension' {...field} />
                    )}
                  </Field>
                  <Field name={WordMeaningFormFields.extensionMeaning}>
                    {({ field, meta: { error } }: FieldProps) => (
                      <TextArea messageOnError={error} autoSize placeholder='Enter an extension meaning' {...field} />
                    )}
                  </Field>
                  <Field name={WordMeaningFormFields.extensionExample}>
                    {({ field, meta: { error } }: FieldProps) => (
                      <TextArea messageOnError={error} autoSize placeholder='Enter an extension example' {...field} />
                    )}
                  </Field>
                </Space>
              </Collapse.Panel>
            </Collapse>
            {syncUserInput<IWordMeaningForm>(values)}
          </Space>
        )}
      </Formik>
    </StyledMeaningDialog>
  );
};

interface IMeaningDialogFooterProps {
  onDeleteClick: () => void;
}

const EditMeaningDialogFooter: React.FC<IMeaningDialogFooterProps> = ({ onDeleteClick }) => {
  const [isHandlingDelete, setIsHandlingDelete] = React.useState(false);

  const { clickOk, closeDialog } = useDialog();

  const handleDelete = React.useCallback(async () => {
    setIsHandlingDelete(true);
    await onDeleteClick();
    setIsHandlingDelete(false);
    closeDialog();
  }, [closeDialog, onDeleteClick]);

  return (
    <StyledEditMeaningDialogFooter>
      <Button danger onClick={handleDelete} type='primary' loading={isHandlingDelete}>
        Delete
      </Button>
      <Space>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button type='primary' onClick={clickOk}>
          OK
        </Button>
      </Space>
    </StyledEditMeaningDialogFooter>
  );
};

interface IOpenMeaningDialogProps {
  wordName: string;
  onOk: (userInput: IWordMeaningForm) => Promise<void>;
  mode: IMeaningDialogMode;
  onDelete?: () => Promise<void>;
  meaning?: IMeaning;
}

export const useMeaningDialog = () => {
  const { openCommonDialog, closeDialog, syncUserInput } = useDialog();

  return {
    openMeaningDialog: ({ wordName, onOk, meaning, onDelete, mode }: IOpenMeaningDialogProps) => {
      const isEditMode = mode === 'edit';
      syncUserInput(meaning);
      openCommonDialog({
        title: isEditMode ? `Edit a meaning of "${wordName}"` : `Add a meaning to "${wordName}"`,
        content: <MeaningDialogContent />,
        footer: isEditMode ? <EditMeaningDialogFooter onDeleteClick={onDelete} /> : undefined,
        onOk,
      });
    },
    closeDialog,
  };
};
