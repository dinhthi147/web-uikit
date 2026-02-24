import Avatar from '@material-ui/core/Avatar';
import React, { memo, useMemo } from 'react';

import KContainer from '../Container';
import { KAvatarProps } from '../types';

const KAvatar = (props: KAvatarProps) => {
  const {
    size,
    onPress,
    source,
    alt,
    variant = 'circular',
    children,
    ...rest
  } = props;

  const mSize = useMemo(() => {
    switch (size) {
      case 'xs':
        return 24;
      case 'sm':
        return 32;
      case 'lg':
        return 48;
      case 'xlg':
        return 56;
      case '2xlg':
        return 64;
      case '3xlg':
        return 96;
      case '4xlg':
        return 112;
      default:
        return 40;
    }
  }, [size]);

  const commonStyle = useMemo(() => {
    const style = { width: mSize, height: mSize };
    return style;
  }, [mSize]);

  const Wrapper = onPress ? KContainer.Touchable : KContainer.View;

  return (
    <Wrapper onPress={onPress} br="round" {...rest}>
      <Avatar src={source} alt={alt} variant={variant} style={commonStyle}>
        {children}
      </Avatar>
    </Wrapper>
  );
};

export default memo(KAvatar);
