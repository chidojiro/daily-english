import React from 'react';
import { Space, Collapse } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';

import { Modal, Controlled } from '../commons';
import { IMeaningType, IMeaning, IOption } from '../../types';
import { IBaseModalContainerProps } from '../../hooks';

import { StyledMeaningDialog, StyledEditMeaningDialogFooter } from './MeaningModal.styled';
import { addMeaning, updateMeaning } from '../../apiClients';

type IMeaningForm = Pick<
  IMeaning,
  'type' | 'subType' | 'meaning' | 'example' | 'note' | 'extension' | 'extensionMeaning' | 'extensionExample'
>;

type IMeaningFormKeys = keyof IMeaningForm;

const meaningFormNames: { [key in IMeaningFormKeys]: IMeaningFormKeys } = {
  type: 'type',
  subType: 'subType',
  meaning: 'meaning',
  example: 'example',
  note: 'note',
  extension: 'extension',
  extensionMeaning: 'extensionMeaning',
  extensionExample: 'extensionExample',
};

interface IProps extends IBaseModalContainerProps {
  meaning?: IMeaning;
  wordName: string;
}

const typeOptions: IOption<IMeaningType>[] = [
  { value: 'adjective', label: 'Adjective' },
  { value: 'adverb', label: 'Adverb' },
  { value: 'noun', label: 'Noun' },
  { value: 'verb', label: 'Verb' },
  { value: 'conjunction', label: 'Conjunction' },
  { value: 'idiom', label: 'Idiom' },
  { value: 'phrasal', label: 'Phrasal' },
];

export const MeaningModal: React.FC<IProps> = ({ meaning, wordName }) => {
  const isEditMode = !!meaning?.id;

  const methods = useForm<IMeaningForm>({ defaultValues: meaning });

  const onSubmit = (formValues: IMeaningForm) => {
    if (isEditMode) {
      return updateMeaning(wordName, { id: meaning.id, ...formValues });
    }

    return addMeaning(wordName, formValues);
  };

  return (
    <Modal>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>{isEditMode ? `Edit a meaning of "${wordName}"` : `Add a meaning to "${wordName}"`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormProvider {...methods}>
            <Space direction='vertical' style={{ width: '100%' }}>
              <Space>
                <Controlled.Select name={meaningFormNames.type} options={typeOptions} />
                {/* <CategoryMeta category={values.category} /> */}
              </Space>
              <Controlled.TextArea name={meaningFormNames.meaning} autoSize placeholder='Enter a meaning' />
              <Controlled.TextArea name={meaningFormNames.example} autoSize placeholder='Enter an example' />
              <Controlled.TextArea name={meaningFormNames.note} autoSize placeholder='Enter a note' />

              <Collapse>
                <Collapse.Panel header='Extension' key={null} collapsible='header'>
                  <Space direction='vertical' style={{ width: '100%' }}>
                    <Controlled.TextArea name={meaningFormNames.extension} autoSize placeholder='Enter an extension' />
                    <Controlled.TextArea
                      name={meaningFormNames.extensionMeaning}
                      autoSize
                      placeholder='Enter an extension meaning'
                    />
                    <Controlled.TextArea
                      name={meaningFormNames.extensionExample}
                      autoSize
                      placeholder='Enter an extension example'
                    />
                  </Space>
                </Collapse.Panel>
              </Collapse>
            </Space>
          </FormProvider>
        </Modal.Body>
        <Modal.Footer />
      </form>
    </Modal>
  );
};
