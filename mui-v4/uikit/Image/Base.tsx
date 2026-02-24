import { set } from 'lodash';
import React, { memo, useMemo } from 'react';

import KContainer from '../Container';
import { KImageProps } from '../types';

const KImageBase = (props: KImageProps) => {
  const { source, alt, size, width, height, onPress, ...rest } = props;

  const commonStyle = useMemo(() => {
    const style = {};

    if (size) {
      set(style, 'width', size);
      set(style, 'height', size);
    }
    if (width) {
      set(style, 'width', width);
    }
    if (height) {
      set(style, 'height', height);
      set(style, 'maxWidth', '100%');
    }

    return style;
  }, [height, size, width]);

  const Wrapper = onPress ? KContainer.Touchable : KContainer.View;

  return (
    <Wrapper onPress={onPress} {...rest}>
      <img src={source} alt={alt} style={commonStyle} />
    </Wrapper>
  );
};

export default memo(KImageBase);
