import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import React, { memo, useCallback } from 'react';

import { KSwitchProps } from '../types';

const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    overflow: 'unset'
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.success.main,
        borderColor: theme.palette.success.main
      }
    }
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none'
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white
  },
  checked: {}
}))(Switch);

const KSwitch = (props: KSwitchProps) => {
  const { onChange, ...otherProps } = props;

  const onChangeWrapper = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    },
    [onChange]
  );

  return <AntSwitch onChange={onChangeWrapper} {...otherProps} />;
};

export default memo(KSwitch);
