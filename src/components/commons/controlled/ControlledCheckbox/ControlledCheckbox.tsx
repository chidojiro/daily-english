import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckboxProps } from 'antd/lib/checkbox';
import { Checkbox } from 'antd';

type IProps = CheckboxProps;

export const ControlledCheckbox: React.FC<IProps> = ({
  onChange: onChangeProp,
  name,
  ...restProps
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, name, value }) => (
        <Checkbox
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            onChangeProp?.(e);
          }}
          {...restProps}
        />
      )}
    />
  );
};
