import { Chip } from '@material-ui/core';
import { get } from 'lodash';
import React, { memo, useMemo } from 'react';

import { KColors } from '../../constants';
import KContainer from '../Container';
import KImage from '../Image';
import KLabel from '../Label';
import { KChipProps } from '../types';

const KChip = (props: KChipProps) => {
  const {
    label,
    typo,
    textTransform,
    textAlign,
    lineHeight = 1,
    color,
    onPress,
    kind = 'warning',
    size,
    withTooltip,
    tooltipLabel,
    icon,
    isLink,
    ...rest
  } = props;

  const options = useMemo(() => {
    const tintColor = get(KColors, `${kind}.normal`, KColors.primary.normal);
    const background = get(
      KColors,
      `opacity.${kind}[16]`,
      KColors.opacity.primary[16]
    );

    return {
      typo:
        typo ||
        (size === '2xs'
          ? 'Text2XsNormal'
          : size === 'xs'
          ? 'TextXsNormal'
          : size === 'sm'
          ? 'TextSmNormal'
          : size === 'md'
          ? 'TextMdNormal'
          : 'TextNmNormal'),
      tintColor: color || tintColor,
      brC: tintColor,
      background
    };
  }, [color, kind, size, typo]);

  const Wrapper = onPress ? KContainer.Touchable : KContainer.View;

  const renderIcon = useMemo(() => {
    if (!icon) {
      return null;
    }

    if (typeof icon === 'string') {
      return <KImage.MuiIcon icon={icon} color={options.tintColor} />;
    }

    return (
      <KImage.MuiIcon
        icon={icon.name}
        color={icon.color}
        size={icon.size || 16}
      />
    );
  }, [icon, options.tintColor]);

  if (isLink && onPress) {
    return (
      <Chip
        label={label}
        // component="a"
        // target="_blank"
        // clickable
        {...(rest as any)}
        color={color as any}
        onClick={onPress as any}
      />
    );
  }

  return (
    <Wrapper
      onPress={onPress}
      br={'x'}
      brW={1}
      brC={options.brC}
      width="fit-content"
      dp="inline-flex"
      padding="0.25rem"
      background={options.background}
      center
      row
      {...rest}
    >
      {icon && (
        <KContainer.View marginR="0.25rem" center height={20}>
          {renderIcon}
        </KContainer.View>
      )}

      <KLabel.Text
        typo={options.typo}
        color={options.tintColor}
        textTransform={textTransform}
        textAlign={textAlign}
        style={{ lineHeight }}
        withTooltip={withTooltip}
        tooltipLabel={tooltipLabel}
      >
        {label}
      </KLabel.Text>
    </Wrapper>
  );
};

export default memo(KChip);
