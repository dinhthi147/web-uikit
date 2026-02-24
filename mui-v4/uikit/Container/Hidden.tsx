import { Hidden, HiddenProps } from '@material-ui/core';
import React, { memo } from 'react';

interface IProps extends React.PropsWithChildren<HiddenProps> {}

const KHidden = (props: IProps) => {
  const { children, ...rest } = props;

  return <Hidden {...rest}>{children}</Hidden>;
};

export default memo(KHidden);
