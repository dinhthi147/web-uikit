import { IconButton } from '@material-ui/core';
import React, { forwardRef, memo } from 'react';

import KTextField from './TextField';

import KContainer from '../Container';
import KImage from '../Image';
import { KInputProps } from '../types';

const KFile = forwardRef<HTMLInputElement, KInputProps>((props, ref) => {
  const { accept, onPress, onChange, ...rest } = props;

  return (
    <KContainer.View position="relative">
      <KTextField
        name="image"
        label={'Image Upload'}
        readOnly
        inputProps={{
          style: {
            cursor: props.disabled && !props.value ? 'auto' : 'pointer',
            paddingRight: '2.5rem'
          }
        }}
        {...rest}
        onClick={onPress ? onPress : undefined}
        ref={ref}
      />

      <KContainer.RenderWhen>
        <KContainer.RenderWhen.If isTrue={!props.disabled}>
          <IconButton
            component="label"
            size="small"
            style={{ position: 'absolute', top: 5, right: 6 }}
          >
            <KImage.MuiIcon icon="CloudUploadOutlined" />

            <input
              style={{ display: 'none' }}
              type="file"
              hidden
              onChange={onChange}
              name={props.name}
              accept={accept}
            />
          </IconButton>
        </KContainer.RenderWhen.If>
      </KContainer.RenderWhen>
    </KContainer.View>
  );
});

export default memo(KFile);
