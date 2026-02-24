import React, { memo, useCallback } from 'react';

import { KColors } from '../../constants';
import KButton from '../Button';
import KContainer from '../Container';
import KImage from '../Image';
import KLabel from '../Label';
import { KListItemBaseItemProps, KListItemBaseProps } from '../types';

const KListItemBase = (props: KListItemBaseProps) => {
  const { data, direction, border, ...rest } = props;

  const renderRightNode = useCallback(
    (node: KListItemBaseItemProps['rightNode']) => {
      if (!node) {
        return null;
      }

      if (node.icon?.name) {
        return (
          <KContainer.View size={32} dp="flex" center>
            <KImage.MuiIcon icon={node.icon.name} color={node.icon.color} />
          </KContainer.View>
        );
      }

      if (node.button) {
        const { type, props: btnProps } = node.button;
        const Wrapper =
          type === 'icon'
            ? KButton.Icon
            : type === 'outline'
            ? KButton.Outline
            : type === 'transparent'
            ? KButton.Transparent
            : KButton.Solid;
        return <Wrapper {...btnProps} />;
      }

      return node.jsx ?? null;
    },
    []
  );

  const renderIcon = useCallback((icon: KListItemBaseItemProps['icon']) => {
    if (!icon) {
      return null;
    }

    if (typeof icon === 'string') {
      icon = {
        name: icon,
        color:
          icon === 'Delete' || icon === 'DeleteForever'
            ? KColors.secondary.normal
            : KColors.primary.normal
      };
    }

    return (
      <KContainer.View size={(icon.size ?? 20) + 12} dp="flex" center>
        <KImage.MuiIcon icon={icon.name} color={icon.color} {...icon} />
      </KContainer.View>
    );
  }, []);

  const renderItem = useCallback(
    (i: KListItemBaseItemProps, index: number) => {
      const {
        title,
        titleProps,
        subtitle,
        subtitleProps,
        contentProps,
        icon,
        iconAlignment = 'left',
        rightNode,
        onPress,
        ...others
      } = i;

      const Wrapper = onPress ? KContainer.Touchable : KContainer.View;

      return (
        <Wrapper
          onPress={onPress}
          key={title}
          alignItems
          {...others}
          row
          marginT={index === 0 || border ? 0 : others.marginT || '0.25rem'}
          brTW={border ? 1 : undefined}
          brTC={border ? KColors.border.light : undefined}
        >
          {iconAlignment === 'left' && renderIcon(icon)}

          <KContainer.View flex marginH="0.5rem" {...contentProps}>
            <KLabel.Text
              typo={'TextMdNormal'}
              numberOfLines={1}
              {...titleProps}
            >
              {title}
            </KLabel.Text>

            {subtitle && (
              <KContainer.View marginT="0.25rem">
                <KLabel.Text numberOfLines={1} {...subtitleProps}>
                  {subtitle}
                </KLabel.Text>
              </KContainer.View>
            )}
          </KContainer.View>

          {iconAlignment === 'right' && renderIcon(icon)}

          {renderRightNode(rightNode)}
        </Wrapper>
      );
    },
    [renderIcon, renderRightNode]
  );

  if (direction === 'row') {
    return (
      <KContainer.View row alignItems {...rest}>
        {data.map((i, index) => renderItem(i, index))}
      </KContainer.View>
    );
  }

  return (
    <KContainer.View {...rest}>
      {data.map((i, index) => renderItem(i, index))}
    </KContainer.View>
  );
};

export default memo(KListItemBase);
