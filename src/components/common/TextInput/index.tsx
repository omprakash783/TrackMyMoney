import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

interface Props extends Omit<TextFieldProps, 'name' | 'label' | 'type'> {
  id: string;
  name: string;
  label: string;
  type: string;
  startIcon: JSX.Element;
  endIcon: JSX.Element;
  endIconSwap: JSX.Element;
}

export const IconInputField: React.FC<Props> = ({
  id,
  name,
  label,
  type,
  startIcon,
  endIcon,
  endIconSwap,
  ...rest
}) => {
  const { control, formState } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  let inputType = type;

  return (
    <FormControl>
      <TextField
        id={id}
        label={label}
        type={inputType}
        InputProps={{
          startAdornment: <InputAdornment position="start">{startIcon}</InputAdornment>,
        }}
        {...field}
        {...rest}
        error={!!formState.errors[name]}
        helperText={fieldState.error?.message}
      />
    </FormControl>
  );
};
