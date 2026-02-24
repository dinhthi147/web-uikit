import React, { memo } from 'react';

import { KTabPanelProps } from '../types';

const KTabPanel = (props: KTabPanelProps) => {
  const { value, index, children, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-label={`tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export default memo(KTabPanel);
