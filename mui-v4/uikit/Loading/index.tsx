import { CircularProgress, CircularProgressProps } from '@material-ui/core';
import React, { memo } from 'react';

import { KColors } from '../../constants';

const KLoading = (props: CircularProgressProps) => {
  return (
    <div style={styles.wrapper as React.CSSProperties}>
      <CircularProgress
        thickness={2}
        size={30}
        {...props}
        style={{
          color: KColors.primary.normal,
          ...props.style
        }}
      />
    </div>
  );
};

export default memo(KLoading);

const styles = {
  wrapper: {
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    height: '100%',
    background: KColors.opacity.grayLight[10],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};
