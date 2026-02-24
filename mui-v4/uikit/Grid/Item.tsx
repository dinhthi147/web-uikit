import { Grid, GridProps } from '@material-ui/core';
import React, { memo } from 'react';

interface Props extends GridProps {}

const KGridItem = (props: Props) => {
  return <Grid item {...props} />;
};

export default memo(KGridItem);
