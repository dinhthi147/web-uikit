import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers';
import { cloneDeep } from 'lodash';
import { Moment } from 'moment-timezone';
import React, { forwardRef, memo } from 'react';

import KInput from '../Input';
import { KPickerProps } from '../types';

interface Props
  extends Omit<DateTimePickerProps<any, Moment>, 'renderInput' | 'value'>,
    KPickerProps {}

const KDateTimePicker = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    value,
    name,
    message,
    onBlur,
    required,
    startAdornment,
    endAdornment,
    ...rest
  } = props;

  return (
    <DateTimePicker
      inputRef={ref}
      {...rest}
      value={value}
      renderInput={({ inputRef, inputProps, InputProps }) => {
        const _InputProps = InputProps ? cloneDeep(InputProps) : {};
        _InputProps.endAdornment = endAdornment;
        _InputProps.startAdornment = startAdornment;

        return (
          <KInput.TextField
            ref={inputRef}
            inputProps={inputProps}
            // @ts-ignore
            InputProps={_InputProps}
            name={name}
            placeholder="DD/MM/YYYY HH:mm"
            label={rest.label}
            message={message}
            onBlur={onBlur}
            required={required}
            disabled={rest.disabled}
          />
        );
      }}
      inputFormat="DD/MM/YYYY HH:mm"
      disableOpenPicker
      ampm={false}
    />
  );
});

export default memo(KDateTimePicker);
