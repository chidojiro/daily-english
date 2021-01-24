import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '../../inputs';
import { InputProps } from 'antd/lib/input';

type IProps = InputProps;

export const ControlledInput: React.FC<IProps> = ({
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
        <Input
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
