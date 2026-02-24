import { TimePicker, TimePickerProps } from '@mui/x-date-pickers';
import { cloneDeep } from 'lodash';
import { Moment } from 'moment-timezone';
import React, { forwardRef, memo } from 'react';

import KInput from '../Input';
import { KPickerProps } from '../types';

interface Props
  extends Omit<TimePickerProps<any, Moment>, 'renderInput' | 'value'>,
    KPickerProps {}

const KTimePicker = forwardRef<HTMLInputElement, Props>((props, ref) => {
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
    <TimePicker
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
            InputProps={InputProps}
            name={name}
            placeholder="HH:mm"
            label={rest.label}
            message={message}
            onBlur={onBlur}
            required={required}
            disabled={rest.disabled}
          />
        );
      }}
      inputFormat="HH:mm"
      ampm={false}
      disableOpenPicker
    />
  );
});

export default memo(KTimePicker);
