import { Button, Icon } from '@material-ui/core';
import * as MuiIcons from '@material-ui/icons';
import { debounce, pickBy, set } from 'lodash';
import React, {
  memo,
  useMemo,
  ComponentType,
  CSSProperties,
  useCallback,
  useState,
  forwardRef,
  useRef
} from 'react';
import { useCombineRefs } from 'uikit-common';

import { KColors } from '../../constants';
import KContainer from '../Container';
import KLabel from '../Label';
import KLoading from '../Loading';
import {
  KButtonKind,
  KButtonProps,
  KSpacing,
  TypographyModifiers
} from '../types';
import { KSpacingValue, TypoHelper } from '../Typography';

const KButtonBase = forwardRef<HTMLButtonElement, KButtonProps>(
  (props, ref) => {
    const {
      icon,
      assetIcon,
      iconAlignment = 'left',
      brW = 0,
      brC,
      title,
      weight = 'medium',
      size,
      kind = 'primary',
      disabled,
      isLoading,
      stretch,
      background,
      tintColor,
      textColor,
      iconColor,
      hoverColor,
      enhanceStyle = {},
      hasShadow = true,
      hasHover = true,
      paddingH = '1rem',
      br = 'x',

      onPress,
      ...rest
    } = props;

    const innerRef = useRef<HTMLButtonElement>();
    const combinedRef = useCombineRefs<HTMLButtonElement>(ref, innerRef);

    const [isHover, setIsHover] = useState(false);

    const { height, icon: iconSize, spacing, text } = useMemo(() => {
      switch (size) {
        case 'lg':
          return {
            height: 42,
            icon: 24,
            text: 'TextLg',
            spacing: '0.5rem'
          };
        case 'md':
          return {
            height: 38,
            icon: 22,
            text: 'TextMd',
            spacing: '0.5rem'
          };
        case 'sm':
          return {
            height: 30,
            icon: 18,
            text: 'TextSm',
            spacing: '0.5rem'
          };
        case 'xs':
          return {
            height: 26,
            icon: 16,
            text: 'TextXs',
            spacing: '0.5rem'
          };
        default:
          return {
            height: 34,
            icon: 20,
            text: 'TextNm',
            spacing: '0.5rem'
          };
      }
    }, [size]);

    const mgDefault = useMemo(() => KSpacingValue[spacing as KSpacing], [
      spacing
    ]);

    const textTypo = useMemo(() => {
      const postfix =
        weight === 'bold' ? 'Bold' : weight === 'normal' ? 'Normal' : 'Medium';
      return `${text}${postfix}` as TypographyModifiers;
    }, [weight, text]);

    const { innerStyle, innerProps } = useMemo(() => {
      const { mStyle: s, mProps: p } = TypoHelper.destructPropsToStyle({
        ...rest,
        paddingH,
        br
      });
      const mergeStyles = {
        ...s.layout,
        ...s.spacing,
        ...s.styling
      };
      return { innerStyle: mergeStyles, innerProps: p };
    }, [rest]);

    const commonStyle: CSSProperties = useMemo(() => {
      const result = {
        backgroundColor:
          hasHover && isHover && !disabled && !isLoading
            ? hoverColor || KColors[kind as KButtonKind].light
            : background,
        ...innerStyle
      };

      set(result, 'opacity', disabled ? 0.5 : 1);
      set(
        result,
        'alignSelf',
        stretch === 'left'
          ? 'flex-start'
          : stretch === 'right'
          ? 'flex-end'
          : stretch
          ? 'stretch'
          : 'center'
      );

      return result;
    }, [
      hasHover,
      isHover,
      disabled,
      isLoading,
      hoverColor,
      kind,
      background,
      innerStyle,
      stretch
    ]);

    const styledButton: CSSProperties = useMemo(() => {
      const clone = { ...commonStyle };

      set(clone, 'height', height);

      if (!title) {
        set(clone, 'width', height);
      } else {
        set(clone, 'minWidth', height);
      }

      if (brW) {
        set(clone, 'borderColor', brC || tintColor);
        set(clone, 'borderWidth', brW);
        set(clone, 'borderStyle', 'solid');
      }

      return clone;
    }, [commonStyle, height, title, brW, brC, tintColor]);

    const renderIcon = useMemo(() => {
      if ((!icon && !assetIcon) || isLoading) {
        return null;
      }

      const style = {
        color: iconColor || textColor,
        width: iconSize,
        height: iconSize
      };
      if (title) {
        if (iconAlignment === 'left') {
          set(style, 'marginRight', mgDefault);
          set(style, 'marginLeft', -mgDefault / 2);
        } else if (iconAlignment === 'right') {
          set(style, 'marginLeft', mgDefault);
          set(style, 'marginRight', -mgDefault / 2);
        }
      }

      if (assetIcon) {
        return <Icon style={style}>{assetIcon}</Icon>;
      }

      if (icon) {
        const KIcon = MuiIcons[icon] as ComponentType<{
          style?: CSSProperties;
        }>;

        return <KIcon style={style} />;
      }
    }, [
      icon,
      assetIcon,
      isLoading,
      iconColor,
      textColor,
      iconSize,
      title,
      iconAlignment,
      mgDefault
    ]);

    const onPressWrapper = useCallback(
      (e: any) => {
        if (!isLoading) {
          setIsHover(false);
          onPress?.(e);
        }
      },
      [onPress, isLoading]
    );

    return (
      <Button
        ref={combinedRef}
        {...pickBy(innerProps, v => v !== undefined)}
        disabled={disabled || isLoading}
        onClick={debounce(onPressWrapper, 300, {
          leading: true,
          trailing: false
        })}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{
          boxShadow:
            isLoading || disabled || !hasShadow
              ? 'none'
              : '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
          ...styledButton,
          ...enhanceStyle
        }}
      >
        {isLoading && (
          <KContainer.View
            style={{
              display: 'flex',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <KLoading size={iconSize - 4} />
          </KContainer.View>
        )}

        {iconAlignment === 'left' && renderIcon}
        {title && (
          <KLabel.Text
            typo={textTypo}
            color={isLoading ? KColors.transparent : textColor}
            style={{ lineHeight: 1.75 }}
          >
            {title}
          </KLabel.Text>
        )}
        {iconAlignment === 'right' && renderIcon}
      </Button>
    );
  }
);

const KButtonTransparent = memo(
  forwardRef<HTMLButtonElement, KButtonProps>((props, ref) => {
    const { kind = 'primary' } = props;

    const tintColor = useMemo(() => {
      return KColors[kind]?.normal;
    }, [kind]);

    const textColor = useMemo(() => {
      return kind === 'normal' ? KColors.black : KColors[kind]?.normal;
    }, [kind]);

    return (
      <KButtonBase
        ref={ref}
        {...props}
        background={KColors.transparent}
        tintColor={tintColor}
        textColor={textColor}
        hoverColor={KColors.normal.light}
        hasShadow={false}
      />
    );
  })
);

const KButtonSolid = memo(
  forwardRef<HTMLButtonElement, KButtonProps>((props, ref) => {
    const { kind = 'primary', revert, disabled, isLoading } = props;

    const backgroundColor = useMemo(() => {
      return disabled || isLoading
        ? KColors.opacity.grayDarker[10]
        : props.background || KColors[kind]?.normal;
    }, [disabled, isLoading, kind, props.background]);

    const tintColor = useMemo(() => {
      return disabled
        ? KColors.opacity.grayDarker[20]
        : props.tintColor || KColors.white;
    }, [disabled, props.tintColor]);

    const textColor = useMemo(() => {
      return disabled
        ? KColors.opacity.grayDarker[20]
        : props.textColor || KColors.white;
    }, [disabled, props.textColor]);

    return (
      <KButtonBase
        ref={ref}
        {...props}
        background={revert ? tintColor : backgroundColor}
        tintColor={revert ? backgroundColor : tintColor}
        textColor={revert ? backgroundColor : textColor}
      />
    );
  })
);

const KButtonOutline = memo(
  forwardRef<HTMLButtonElement, KButtonProps>((props, ref) => {
    const {
      kind = 'primary',
      thickness = 'thin',
      disabled,
      background
    } = props;

    const tintColor = useMemo(() => {
      return disabled
        ? KColors.opacity.grayDarker[10]
        : props.tintColor || KColors[kind]?.normal;
    }, [disabled, kind, props.tintColor]);

    const textColor = useMemo(() => {
      return disabled
        ? KColors.opacity.grayDarker[20]
        : props.textColor || KColors.black;
    }, [disabled, props.textColor]);

    const iconColor = useMemo(() => {
      return disabled
        ? KColors.opacity.grayDarker[10]
        : kind === 'normal'
        ? KColors.normal.dark
        : KColors[kind]?.normal;
    }, [disabled, kind]);

    return (
      <KButtonBase
        ref={ref}
        hasShadow={false}
        {...props}
        background={background || KColors.white}
        tintColor={tintColor}
        textColor={textColor}
        iconColor={iconColor}
        hoverColor={KColors.normal.light}
        brW={thickness === 'thin' ? 1 : 2}
      />
    );
  })
);

const KButtonText = memo(
  forwardRef<HTMLButtonElement, KButtonProps>((props, ref) => {
    const { kind = 'primary', disabled } = props;

    const textColor = useMemo(() => {
      return disabled ? KColors.opacity.grayDarker[20] : KColors[kind]?.normal;
    }, [disabled, kind]);

    return (
      <KButtonBase
        ref={ref}
        {...props}
        background={KColors.transparent}
        textColor={textColor}
        paddingH={0}
        paddingV={0}
        hasShadow={false}
        hasHover={false}
        height={24}
      />
    );
  })
);

export {
  KButtonBase,
  KButtonSolid,
  KButtonOutline,
  KButtonText,
  KButtonTransparent
};
