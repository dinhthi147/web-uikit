import { Grid, GridProps } from '@material-ui/core';
import React, { memo, useMemo, forwardRef } from 'react';

interface IProps extends GridProps {
  noPadding?: boolean;
  position?: 'relative' | 'absolute' | 'fixed' | 'static' | 'sticky';
}

const KGridContainer = forwardRef<any, IProps>((props, ref) => {
  const { noPadding = true, style, position, ...otherProps } = props;

  const commonStyle = useMemo(() => {
    const result: any = {
      width: 'unset',
      padding: '0 12px'
    };
    if (noPadding) {
      result.padding = '0';
    }
    if (position) {
      result.position = position;
    }
    return { ...result, ...style };
  }, [noPadding, position, style]);

  return (
    <Grid
      container
      spacing={3}
      alignItems="center"
      {...otherProps}
      style={commonStyle}
    />
  );
});

export default memo(KGridContainer);
