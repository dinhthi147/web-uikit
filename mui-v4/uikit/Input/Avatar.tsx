import React, { forwardRef, memo } from 'react';

import KInput from './TextField';

import KContainer from '../Container';
import KImage from '../Image';
import { KAvatarProps, KInputProps, KViewProps } from '../types';

interface KInputAvatarProps extends KInputProps {
  avatar: KAvatarProps;
  container?: KViewProps;
  cursor?: 'pointer' | 'auto';
}

const Avatar = forwardRef<HTMLInputElement, KInputAvatarProps>((props, ref) => {
  const { avatar, container, cursor = 'pointer', ...rest } = props;

  const Wrapper = !!container ? KContainer.View : React.Fragment;

  return (
    <Wrapper {...container}>
      <label htmlFor={rest?.id || 'contained-button-file'} style={{ cursor }}>
        <KImage.Avatar {...avatar} />
      </label>

      <KInput
        id={rest?.id || 'contained-button-file'}
        {...rest}
        dp="none"
        type="file"
        inputProps={{ accept: 'image/*' }}
        ref={ref}
      />
    </Wrapper>
  );
});

export default memo(Avatar);
