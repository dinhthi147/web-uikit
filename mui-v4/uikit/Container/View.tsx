import { Tooltip } from '@material-ui/core';
import { omit } from 'lodash';
import React, { ComponentType, forwardRef, memo, useMemo } from 'react';

import { KViewProps } from '../types';
import { TypoHelper } from '../Typography';

const KView = forwardRef<HTMLDivElement, KViewProps>((props, ref) => {
  const { withTooltip, tooltipTitle, ...rest } = props;

  const { innerProps, innerStyle } = useMemo(() => {
    const { style, ..._rest } = rest;
    const { mStyle, mProps } = TypoHelper.destructPropsToStyle(_rest);
    const mergeStyles = {
      ...style,
      ...mStyle.layout,
      ...mStyle.spacing,
      ...mStyle.styling
    };

    return {
      innerProps: mProps,
      innerStyle: mergeStyles
    };
  }, [rest]);

  if (withTooltip && tooltipTitle) {
    return (
      <Tooltip title={tooltipTitle}>
        <div {...omit(innerProps, 'onPress')} style={innerStyle} ref={ref} />
      </Tooltip>
    );
  }

  return <div {...omit(innerProps, 'onPress')} style={innerStyle} ref={ref} />;
});

(KView as ComponentType<KViewProps>).displayName = 'KView';

export default memo(KView);
