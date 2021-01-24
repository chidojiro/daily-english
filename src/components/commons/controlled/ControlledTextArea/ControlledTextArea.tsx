import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextArea } from '../../inputs';
import { TextAreaProps } from 'antd/lib/input';

type IProps = TextAreaProps;

export const ControlledTextArea: React.FC<IProps> = ({
  onChange: onChangeProp,
  onBlur: onBlurProp,
  name,
  ...restProps
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ onBlur, onChange, name, value }) => (
        <TextArea
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            onChangeProp?.(e);
          }}
          onBlur={(e) => {
            onBlur();
            onBlurProp?.(e);
          }}
          {...restProps}
        />
      )}
    />
  );
};
