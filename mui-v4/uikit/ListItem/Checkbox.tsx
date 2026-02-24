import React, { memo, useCallback, useMemo } from 'react';

import { KColors } from '../../constants';
import KContainer from '../Container';
import KImage from '../Image';
import KLabel from '../Label';
import { KCheckboxProps } from '../types';

const KCheckbox = (props: KCheckboxProps) => {
  const {
    activeColor = KColors.primary.normal,
    typo,
    checked,
    label,
    containerStyle,
    onChange,
    disabled,
    textAlign = 'right',
    tintColor,
    customLabel,
    ...rest
  } = props;

  const toggle = useCallback(() => {
    onChange?.(!checked);
  }, [checked, onChange]);

  const renderCheckbox = useCallback(() => {
    if (checked) {
      return (
        <KImage.MuiIcon
          icon="CheckBoxOutlined"
          width={20}
          color={activeColor}
        />
      );
    } else {
      return <KImage.MuiIcon icon="CheckBoxOutlineBlankOutlined" width={20} />;
    }
  }, [activeColor, checked]);

  const renderLabel = useMemo(() => {
    if (customLabel) {
      return customLabel;
    }

    return (
      <KLabel.Text
        typo={typo}
        marginL={textAlign === 'left' ? 0 : '0.25rem'}
        marginR={textAlign === 'left' ? '0.25rem' : 0}
        color={tintColor}
      >
        {label}
      </KLabel.Text>
    );
  }, [customLabel, label, textAlign, tintColor, typo]);

  const Wrapper = disabled ? KContainer.View : KContainer.Touchable;

  return (
    <Wrapper
      onPress={toggle}
      row
      alignItems
      style={containerStyle}
      avoidParentPress
      width="fit-content"
      {...rest}
    >
      {textAlign === 'left' && renderLabel}

      {renderCheckbox()}

      {textAlign === 'right' && renderLabel}
    </Wrapper>
  );
};

export default memo(KCheckbox);
