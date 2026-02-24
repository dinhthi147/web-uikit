import { InputAdornment } from '@material-ui/core';
import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';

import TextField from './TextField';

import KButton from '../Button';
import { KInputProps } from '../types';

const KInputPassword = forwardRef<HTMLInputElement, KInputProps>(
  (props, ref) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const showPassword = useCallback(() => {
      setSecureTextEntry(!secureTextEntry);
    }, [secureTextEntry]);

    const renderIcon = useMemo(() => {
      return (
        <KButton.Icon
          icon={!secureTextEntry ? 'Visibility' : 'VisibilityOff'}
          edge="end"
          onPress={showPassword}
          // @ts-ignore
          marginR={-4}
        />
      );
    }, [secureTextEntry, showPassword]);

    return (
      <TextField
        label={'Password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{renderIcon}</InputAdornment>
          )
        }}
        {...props}
        type={!secureTextEntry ? 'text' : 'password'}
        ref={ref}
      />
    );
  }
);

export default memo(KInputPassword);
