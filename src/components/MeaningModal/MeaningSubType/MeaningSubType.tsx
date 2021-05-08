import { Checkbox as AntdCheckbox, Space } from 'antd';
import React from 'react';
import { IMeaningType, INounSubType, IVerbSubType } from '../../../types';
import { Controlled } from '../../commons';

interface ISubTypeField<T> {
  field: T;
  label: string;
}

const verbSubTypeFieldsMeta: ISubTypeField<IVerbSubType>[] = [
  { field: 'transitive', label: 'Transitive' },
  { field: 'intransitive', label: 'Intransitive' },
];

const nounSubTypeFieldsMeta: ISubTypeField<INounSubType>[] = [
  { field: 'countable', label: 'Countable' },
  { field: 'uncountable', label: 'Uncountable' },
];

interface IProps {
  type: IMeaningType;
}

export const MeaningSubType: React.FC<IProps> = ({ type }) => {
  return (
    <Space>
      {/**TODO: find a way to have antd styles for checkbox without this line */}
      <AntdCheckbox style={{ display: 'none' }} />

      {type === 'verb' &&
        verbSubTypeFieldsMeta.map(({ field, label }, idx) => (
          <Controlled.Checkbox name={`subType[${idx}]`} key={field}>
            {label}
          </Controlled.Checkbox>
        ))}
      {type === 'noun' &&
        nounSubTypeFieldsMeta.map(({ field, label }, idx) => (
          <Controlled.Checkbox name={`subType[${idx}]`} key={field}>
            {label}
          </Controlled.Checkbox>
        ))}
    </Space>
  );
};
