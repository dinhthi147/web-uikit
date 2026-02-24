import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { cloneDeep } from 'lodash';
import { Moment } from 'moment-timezone';
import React, { forwardRef, memo } from 'react';

import { KColors } from '../../constants';
import KInput from '../Input';
import { KPickerProps } from '../types';

interface Props
  extends Omit<DatePickerProps<any, Moment>, 'renderInput' | 'value'>,
    KPickerProps {}

const KDatePicker = forwardRef<HTMLInputElement, Props>((props, ref) => {
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
    <DatePicker
      inputRef={ref}
      {...rest}
      value={value}
      renderInput={({ inputRef, inputProps, InputProps }) => {
        const _InputProps = InputProps ? cloneDeep(InputProps) : {};
        _InputProps.endAdornment = (
          <>
            {_InputProps.endAdornment}
            {endAdornment}
          </>
        );
        _InputProps.startAdornment = startAdornment;

        return (
          <KInput.TextField
            ref={inputRef}
            inputProps={inputProps}
            InputProps={_InputProps as any}
            name={name}
            placeholder="DD/MM/YYYY"
            label={rest.label}
            message={message}
            onBlur={onBlur}
            required={required}
            disabled={rest.disabled}
          />
        );
      }}
      inputFormat="DD/MM/YYYY"
      reduceAnimations
      disableOpenPicker
      PaperProps={{
        sx: {
          '.MuiDayPicker-weekDayLabel': {
            fontWeight: 500,
            fontSize: '0.875rem'
          },
          '.MuiPickersDay-root': {
            fontWeight: 500,
            color: KColors.black,
            fontSize: '0.75rem',

            '&.Mui-selected': {
              color: KColors.white,
              backgroundColor: `${KColors.primary.normal} !important`
            },

            '&.Mui-disabled': {
              backgroundColor: KColors.palette.gray.w50
            },

            '&.MuiPickersDay-dayOutsideMonth': {
              color: '#9291a5'
            },

            '&.MuiPickersDay-today': {
              backgroundColor: 'yellow',
              borderColor: KColors.black
            }
          }
        }
      }}
    />
  );
});

export default memo(KDatePicker);
