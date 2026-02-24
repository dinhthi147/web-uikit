import React, { forwardRef, memo } from 'react';

import NumberFormat from './NumberFormat';
import KTextField from './TextField';

import { KInputProps } from '../types';

const KInputCurrency = memo(
  forwardRef<HTMLInputElement, KInputProps>((props, ref) => {
    return (
      <KTextField
        {...props}
        ref={ref}
        InputProps={{
          ...props.InputProps,
          inputComponent: NumberFormat
        }}
      />
    );
  })
);

export default memo(KInputCurrency);
