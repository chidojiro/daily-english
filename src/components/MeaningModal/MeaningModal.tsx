import { Collapse, Space } from 'antd';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { addMeaning, updateMeaning } from '../../apiClients';
import { IBaseModalContainerProps } from '../../hooks';
import { IMeaning, IMeaningType, IOption } from '../../types';
import { Controlled, Modal } from '../commons';
import { MeaningSubType } from './MeaningSubType/MeaningSubType';

type IMeaningForm = Pick<
  IMeaning,
  'type' | 'meaning' | 'example' | 'note' | 'extension' | 'extensionMeaning' | 'extensionExample'
>;

type IMeaningFormKeys = keyof IMeaningForm;

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
  const defaultType = typeOptions[0].value;

  const [type, setType] = React.useState(defaultType);

  const methods = useForm<IMeaningForm>({
    defaultValues: meaning || { type: defaultType },
  });

  const onSubmit = (formValues: IMeaningForm) => {
    if (isEditMode) {
      return updateMeaning(wordName, { id: meaning.id, ...formValues });
    }

    return addMeaning(wordName, formValues);
  };

  return (
    <Modal>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Modal.Header>
            <Modal.Title>
              {isEditMode ? `Edit a meaning of "${wordName}"` : `Add a meaning to "${wordName}"`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Space direction='vertical' style={{ width: '100%' }}>
              <Space>
                <Controlled.Select
                  name={'type'}
                  options={typeOptions}
                  onChange={(type) => setType(type)}
                />
                <MeaningSubType type={type} />
              </Space>
              <Controlled.TextArea name={'meaning'} autoSize placeholder='Enter a meaning' />
              <Controlled.TextArea name={'example'} autoSize placeholder='Enter an example' />
              <Controlled.TextArea name={'note'} autoSize placeholder='Enter a note' />

              <Collapse>
                <Collapse.Panel header='Extension' key={null} collapsible='header'>
                  <Space direction='vertical' style={{ width: '100%' }}>
                    <Controlled.TextArea
                      name={'extension'}
                      autoSize
                      placeholder='Enter an extension'
                    />
                    <Controlled.TextArea
                      name={'extensionMeaning'}
                      autoSize
                      placeholder='Enter an extension meaning'
                    />
                    <Controlled.TextArea
                      name={'extensionExample'}
                      autoSize
                      placeholder='Enter an extension example'
                    />
                  </Space>
                </Collapse.Panel>
              </Collapse>
            </Space>
          </Modal.Body>
          <Modal.Footer />
        </form>
      </FormProvider>
    </Modal>
  );
};
