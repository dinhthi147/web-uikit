import { Badge, Icon, IconButton } from '@material-ui/core';
import { debounce, isNumber, set } from 'lodash';
import React, {
  memo,
  useMemo,
  CSSProperties,
  useCallback,
  forwardRef,
  useRef
} from 'react';
import { useCombineRefs } from 'uikit-common';

import KColors from '../../constants/colors';
import KImage from '../Image';
import KLoading from '../Loading';
import { KButtonProps } from '../types';
import { KRadiusValue, KSpacingValue, TypoHelper } from '../Typography';

const KButtonIcon = forwardRef<HTMLButtonElement, KButtonProps>(
  (props, ref) => {
    const {
      icon,
      assetIcon,
      margin,
      marginB,
      marginH,
      marginL,
      marginR,
      marginT,
      marginV,
      padding,
      br = 'round',
      kind,
      size,
      disabled,
      isLoading,
      stretch,
      background,
      tintColor,
      enhanceStyle = {},
      brW = 0,
      brC,
      hasShadow: shadow = false,
      tight = false,

      alignSelf,
      avoidParentPress,
      onPress,
      children,

      badge,
      ...otherProps
    } = props;

    const innerRef = useRef<HTMLButtonElement>();
    const combinedRef = useCombineRefs<HTMLButtonElement>(ref, innerRef);

    const { height, icon: iconSize } = useMemo(() => {
      switch (size) {
        case 'xlg':
          return {
            height: 40,
            icon: 32
          };
        case 'lg':
          return {
            height: 36,
            icon: 28
          };
        case 'md':
          return {
            height: 32,
            icon: 24
          };
        case 'sm':
          return {
            height: 24,
            icon: 16
          };
        case 'xs':
          return {
            height: 20,
            icon: 12
          };
        default:
          return {
            height: 28,
            icon: 20
          };
      }
    }, [size]);

    const iconColor = useMemo(() => {
      return disabled
        ? KColors.opacity.grayDarker[10]
        : kind
        ? KColors[kind]?.normal
        : tintColor;
    }, [disabled, kind, tintColor]);

    const commonStyle: CSSProperties = useMemo(() => {
      const result = { backgroundColor: background, color: iconColor };
      if (!TypoHelper.isNullOrUndefined(margin)) {
        set(result, 'margin', TypoHelper.mapKSpacingToNumber(marginH));
      }
      if (!TypoHelper.isNullOrUndefined(marginH)) {
        set(result, 'marginLeft', TypoHelper.mapKSpacingToNumber(marginH));
        set(result, 'marginRight', TypoHelper.mapKSpacingToNumber(marginH));
      }
      if (!TypoHelper.isNullOrUndefined(marginV)) {
        set(result, 'marginBottom', TypoHelper.mapKSpacingToNumber(marginV));
        set(result, 'marginTop', TypoHelper.mapKSpacingToNumber(marginV));
      }
      if (!TypoHelper.isNullOrUndefined(marginB)) {
        set(result, 'marginBottom', TypoHelper.mapKSpacingToNumber(marginB));
      }
      if (!TypoHelper.isNullOrUndefined(marginT)) {
        set(result, 'marginTop', TypoHelper.mapKSpacingToNumber(marginT));
      }
      if (!TypoHelper.isNullOrUndefined(marginL)) {
        set(result, 'marginLeft', TypoHelper.mapKSpacingToNumber(marginL));
      }
      if (!TypoHelper.isNullOrUndefined(marginR)) {
        set(result, 'marginRight', TypoHelper.mapKSpacingToNumber(marginR));
      }
      set(result, 'opacity', disabled ? 0.5 : 1);
      set(
        result,
        'alignSelf',
        alignSelf ? alignSelf : stretch ? 'stretch' : 'center'
      );

      return result;
    }, [
      background,
      iconColor,
      margin,
      marginH,
      marginV,
      marginB,
      marginT,
      marginL,
      marginR,
      disabled,
      alignSelf,
      stretch
    ]);

    const styledButton: CSSProperties = useMemo(() => {
      const clone = { ...commonStyle };

      set(
        clone,
        'height',
        tight ? iconSize : padding ? KSpacingValue[padding] + height : height
      );
      set(
        clone,
        'width',
        tight ? iconSize : padding ? KSpacingValue[padding] + height : height
      );
      set(clone, 'padding', 0);

      if (brW) {
        set(clone, 'borderColor', brC || tintColor);
        set(clone, 'borderWidth', brW);
        set(clone, 'borderStyle', 'solid');
      }

      set(clone, 'borderRadius', KRadiusValue[br]);

      return clone;
    }, [
      commonStyle,
      tight,
      iconSize,
      height,
      padding,
      brW,
      br,
      brC,
      tintColor
    ]);

    const onPressWrapper = useCallback(
      (e?: any) => {
        if (avoidParentPress) {
          e?.stopPropagation?.();
        }
        if (!isLoading) {
          onPress?.(e);
        }
      },
      [avoidParentPress, isLoading, onPress]
    );

    const renderIcon = useMemo(() => {
      if (!icon && !assetIcon) {
        return null;
      }

      if (isLoading) {
        return <KLoading size={iconSize - 4} />;
      }

      const style = { fontSize: iconSize };

      if (assetIcon) {
        return <Icon style={style}>{assetIcon}</Icon>;
      }

      if (icon) {
        if (isNumber(badge) && badge > 0) {
          return (
            <Badge overlap="rectangular" badgeContent={badge} color="error">
              <KImage.MuiIcon icon={icon} style={style} />
            </Badge>
          );
        }

        return <KImage.MuiIcon icon={icon} style={style} />;
      }
    }, [assetIcon, badge, icon, iconSize, isLoading, tintColor]);

    return (
      // @ts-ignore
      <IconButton
        ref={combinedRef}
        {...otherProps}
        disabled={disabled}
        onClick={debounce(onPressWrapper, 300, {
          leading: true,
          trailing: false
        })}
        style={{
          boxShadow: !shadow
            ? 'none'
            : '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
          ...styledButton,
          ...enhanceStyle
        }}
      >
        {children || renderIcon}
      </IconButton>
    );
  }
);

export default memo(KButtonIcon);
