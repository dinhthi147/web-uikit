import React, { KeyboardEvent, memo, useCallback } from 'react';
import RNumberFormat, { NumberFormatValues } from 'react-number-format';

const NumberFormat = (props: any) => {
  const { inputRef, onChange, ...other } = props;

  const onValueChange = useCallback((v: NumberFormatValues) => {
    onChange({
      target: {
        name: props.name,
        value: v.value
      }
    });
  }, []);

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (
      !(
        e.key &&
        (parseInt(e.key) >= 0 ||
          ['.', 'Backspace'].includes(e.key) ||
          ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x'].includes(e.key)))
      )
    ) {
      e.preventDefault();
    }
  }, []);

  return (
    <RNumberFormat
      getInputRef={inputRef}
      onValueChange={onValueChange}
      onKeyDown={onKeyDown}
      thousandSeparator
      isNumericString
      allowNegative
      prefix="$ "
      {...other}
    />
  );
};

export default memo(NumberFormat);
