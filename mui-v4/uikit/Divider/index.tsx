import React, { memo } from 'react';

import { KColors } from '../../constants';
import KContainer from '../Container';
import { KDividerProps } from '../types';

const KDivider = (props: KDividerProps) => {
  const { background = KColors.border.light, size, type, vertical } = props;

  if (type === 'line') {
    if (vertical) {
      return (
        <KContainer.View
          height={'100%'}
          marginH={
            size === 'hairline'
              ? undefined
              : size === 'xs'
              ? '0.25rem'
              : size === 'sm'
              ? '0.5rem'
              : '1rem'
          }
          width={1}
          background={background}
        />
      );
    }
    return (
      <KContainer.View
        width={'100%'}
        marginV={
          size === 'hairline'
            ? undefined
            : size === 'xs'
            ? '0.25rem'
            : size === 'sm'
            ? '0.5rem'
            : '1rem'
        }
        height={1}
        background={background}
      />
    );
  }

  if (vertical) {
    <KContainer.View
      background={background}
      height={'100%'}
      marginH={
        size === 'hairline'
          ? undefined
          : size === 'xs'
          ? '0.25rem'
          : size === 'sm'
          ? '0.5rem'
          : '1rem'
      }
    >
      <KContainer.View width={1} />
    </KContainer.View>;
  }
  return (
    <KContainer.View
      background={background}
      width={'100%'}
      marginV={
        size === 'hairline'
          ? undefined
          : size === 'xs'
          ? '0.25rem'
          : size === 'sm'
          ? '0.5rem'
          : '1rem'
      }
    >
      <KContainer.View height={1} />
    </KContainer.View>
  );
};

export default memo(KDivider);
