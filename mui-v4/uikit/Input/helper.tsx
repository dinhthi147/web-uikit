import { InputAdornment, MenuItem } from '@material-ui/core';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useCombineRefs } from 'uikit-common';

import { KColors } from '../../constants';
import KButton from '../Button';
import { KInputProps } from '../types';
import { TypoHelper, TypoType, useTheme } from '../Typography';

const useInputOptions = (
  props: KInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const {
    style,
    type,
    inputType,
    autoFocus,
    autoCapitalize,
    size,
    readOnly,
    inputProps,
    InputProps,
    InputLabelProps,
    SelectProps,
    options,
    message,
    hint,
    onFocus,
    onBlur,
    select,
    error,
    helperText,
    multiple,
    shrink,
    isWarning,
    onClick,
    onPress,
    ...rest
  } = props;

  const innerRef = useRef<HTMLInputElement>();
  const combinedRef = useCombineRefs<HTMLInputElement>(ref, innerRef);

  const [hasFocus, setHasFocus] = useState(autoFocus);
  const [hidden, setHidden] = useState(inputType === 'password');

  const typos = useTheme();

  const typo: TypoType = useMemo(() => {
    switch (size) {
      case 'small':
        return 'TextSmNormal';
      case 'x-small':
        return 'TextXsNormal';
      default:
        return 'TextNmNormal';
    }
  }, [size]);

  const { innerStyle, innerProps } = useMemo(() => {
    const { mStyle: s, mProps: p } = TypoHelper.destructPropsToStyle(rest);
    const typoStyle = typo ? typos[typo] : undefined;
    const mergeStyles = {
      ...typoStyle,
      ...style,
      ...s.layout,
      ...s.spacing,
      ...s.styling,
      ...s.text
    };
    return {
      innerStyle: mergeStyles,
      innerProps: p
    };
  }, [style, rest, typos, typo]);

  const _onFocus = useCallback(
    (e: any) => {
      setHasFocus(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  const _onBlur = useCallback(
    (e: any) => {
      setHasFocus(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  const _onToggleEye = useCallback(() => {
    setHidden(!hidden);
  }, [hidden]);

  const renderEye = useMemo(() => {
    return (
      <KButton.Icon
        icon={!hidden ? 'Visibility' : 'VisibilityOff'}
        edge="end"
        onPress={_onToggleEye}
      />
    );
  }, [_onToggleEye, hidden]);

  const renderOptions = useMemo(() => {
    if (options) {
      return options.map(o => (
        <MenuItem key={o.key} value={o.key} disabled={o.disabled}>
          {o.label}
        </MenuItem>
      ));
    }

    return null;
  }, [options]);

  const _SelectProps = useMemo(() => {
    const mSelectProps = {
      ...SelectProps,
      multiple
    };
    if (renderOptions && rest?.disabled) {
      mSelectProps.IconComponent = () => null;
    }

    return mSelectProps;
  }, [SelectProps, multiple, renderOptions, rest?.disabled]);

  const _inputProps = useMemo(() => {
    const mInputProps = {
      ...inputProps
    };

    return mInputProps;
  }, [inputProps]);

  const _InputProps = useMemo(() => {
    const mInputProps = {
      ...InputProps,
      readOnly
    };
    if (inputType === 'password') {
      mInputProps.endAdornment = (
        <InputAdornment position="end">{renderEye}</InputAdornment>
      );
    }
    return mInputProps;
  }, [InputProps, inputType, readOnly, renderEye]);

  const _InputLabelProps = useMemo(() => {
    return {
      ...InputLabelProps,
      shrink
    };
  }, [InputLabelProps, shrink]);

  const _FormHelperTextProps = useMemo(() => {
    return {
      style: {
        color: isWarning ? KColors.warning.normal : undefined
      }
    };
  }, [isWarning]);

  const _onPress = useMemo(() => {
    return onClick ? onClick : onPress ? onPress : undefined;
  }, [onClick, onPress]);

  return {
    combinedRef,
    hasFocus,
    innerStyle,
    innerProps,
    message,
    hint,
    error: error || (!!message && !isWarning),
    helperText: helperText || message || hint,
    hidden,
    renderOptions,
    inputProps: _inputProps,
    InputProps: _InputProps,
    InputLabelProps: _InputLabelProps,
    SelectProps: _SelectProps,
    FormHelperTextProps: _FormHelperTextProps,
    onBlur: _onBlur,
    onFocus: _onFocus,
    type: hidden ? 'password' : type,
    autoCapitalize:
      !inputType ||
      !['email', 'username', 'password', 'phone'].includes(inputType)
        ? autoCapitalize
        : 'none',
    select: options || select ? true : false,
    onClick: _onPress
  };
};

export default useInputOptions;
