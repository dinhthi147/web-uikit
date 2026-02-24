import React, { memo, useCallback } from 'react';

import { KColors } from '../../constants';
import KContainer from '../Container';
import KImage from '../Image';
import KLabel from '../Label';
import { KRadioProps } from '../types';

const KRadio = (props: KRadioProps) => {
  const {
    activeColor = KColors.primary.normal,
    typo,
    checked,
    label,
    containerStyle,
    onChange,
    disabled,
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
          icon="RadioButtonChecked"
          size={18}
          color={activeColor}
        />
      );
    } else {
      return <KImage.MuiIcon icon="RadioButtonUnchecked" size={18} />;
    }
  }, [activeColor, checked]);

  const Wrapper = disabled ? KContainer.View : KContainer.Touchable;

  return (
    <Wrapper onPress={toggle} row alignItems style={containerStyle} {...rest}>
      {renderCheckbox()}

      {customLabel ||
        (label && (
          <KLabel.Text typo={typo} marginL="0.5rem">
            {label}
          </KLabel.Text>
        ))}
    </Wrapper>
  );
};

export default memo(KRadio);
