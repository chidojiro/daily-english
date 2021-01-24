import React from 'react';
import { Select } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { SelectProps } from 'antd/lib/select';

interface IProps extends SelectProps<any> {
  name: string;
}

export const ControlledSelect: React.FC<IProps> = ({
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
      render={({ onBlur, onChange, value }) => (
        <Select
          value={value}
          onChange={(value, option) => {
            onChange(value);
            onChangeProp?.(value, option);
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
