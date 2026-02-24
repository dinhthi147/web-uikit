import { TextField } from '@material-ui/core';
import React, { forwardRef, memo } from 'react';

import useInputOptions from './helper';

import { KInputProps } from '../types';

const KTextField = forwardRef<HTMLInputElement, KInputProps>((props, ref) => {
  const {
    combinedRef,
    innerStyle,
    innerProps,
    renderOptions,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hasFocus,
    ...rest
  } = useInputOptions(props, ref);

  const { children } = props;

  return (
    // @ts-ignore
    <TextField
      id={innerProps.name}
      size="small"
      fullWidth
      {...innerProps}
      style={innerStyle}
      inputRef={combinedRef}
      spellCheck={false}
      autoComplete="off"
      variant="outlined"
      autoFocus={false}
      {...rest}
    >
      {children || renderOptions}
    </TextField>
  );
});

export default memo(KTextField);
