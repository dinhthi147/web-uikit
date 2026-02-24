import React, { memo, ComponentType, useMemo } from 'react';

import KRadio from './Radio';

import KContainer from '../Container';
import { KRadioGroupProps } from '../types';
import { TypoHelper } from '../Typography';

const KRadioGroup = (props: KRadioGroupProps) => {
  const { containerStyle, direction = 'column', data, ...rest } = props;

  const fontSize = useMemo(() => TypoHelper.getKFontSizeByTypo(rest.typo), [
    rest.typo
  ]);

  if (direction === 'row') {
    return (
      <KContainer.View row alignItems style={containerStyle}>
        {data.map((i, idx) => {
          const style =
            idx > 0
              ? {
                  marginLeft: fontSize
                }
              : {};

          return (
            <KRadio
              key={`radio-${idx}`}
              {...i}
              {...rest}
              containerStyle={style}
            />
          );
        })}
      </KContainer.View>
    );
  }

  return (
    <KContainer.View style={containerStyle}>
      {data.map((i, idx) => {
        const style = {
          paddingTop: fontSize * 0.5,
          paddingBottom: fontSize * 0.5
        };

        return (
          <KRadio
            key={`radio-${idx}`}
            {...i}
            {...rest}
            containerStyle={style}
          />
        );
      })}
    </KContainer.View>
  );
};

(KRadioGroup as ComponentType<KRadioGroupProps>).displayName = 'KRadioGroup';

export default memo(KRadioGroup);
