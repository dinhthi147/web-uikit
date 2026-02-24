import React, { memo, ComponentType, useMemo } from 'react';

import KCheckbox from './Checkbox';

import KContainer from '../Container';
import { KCheckboxGroupProps } from '../types';
import { TypoHelper } from '../Typography';

const KCheckboxGroup = (props: KCheckboxGroupProps) => {
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
            <KCheckbox
              key={`checkbox-${idx}`}
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
          paddingTop: idx === 0 ? 0 : fontSize * 0.5,
          paddingBottom: idx === data.length - 1 ? 0 : fontSize * 0.5
        };

        return (
          <KCheckbox
            key={`checkbox-${idx}`}
            {...i}
            {...rest}
            containerStyle={style}
          />
        );
      })}
    </KContainer.View>
  );
};

(KCheckboxGroup as ComponentType<KCheckboxGroupProps>).displayName =
  'KCheckboxGroup';

export default memo(KCheckboxGroup);
