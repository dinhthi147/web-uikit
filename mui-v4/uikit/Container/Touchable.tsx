import { debounce } from 'lodash';
import React, {
  ComponentType,
  CSSProperties,
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useState
} from 'react';

import KView from './View';

import { KColors } from '../../constants';
import { KTouchableProps } from '../types';
import { TypoHelper } from '../Typography';

const KTouchable = forwardRef<HTMLDivElement, KTouchableProps>((props, ref) => {
  const { onPress, avoidParentPress, hoverColor, ...otherProps } = props;

  const [isHovering, setIsHovering] = useState(false);

  const { innerProps, innerStyle } = useMemo(() => {
    const { style, ...rest } = otherProps;
    const { mStyle, mProps } = TypoHelper.destructPropsToStyle(rest);
    const mergeStyles = {
      ...(rest?.disabled || !onPress ? undefined : touchableStyle),
      ...style,
      ...mStyle.layout,
      ...mStyle.spacing,
      ...mStyle.styling
    };

    return {
      innerProps: mProps,
      innerStyle: mergeStyles
    };
  }, [onPress, otherProps]);

  const onPressWrapper = useCallback(
    (e?: any) => {
      if (!innerProps?.disabled) {
        if (avoidParentPress) {
          (
            e as React.MouseEvent<HTMLDivElement, MouseEvent>
          )?.stopPropagation?.();
        }
        onPress?.(e);
      }
    },
    [avoidParentPress, innerProps?.disabled, onPress]
  );

  const onMouseOver = () => {
    setIsHovering(true);
  };

  const onMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <KView
      {...innerProps}
      onClick={debounce(onPressWrapper, 300, {
        leading: true,
        trailing: false
      })}
      style={{
        ...innerStyle,
        ...(isHovering
          ? { background: hoverColor || KColors.opacity.grayLight[10] }
          : undefined)
      }}
      ref={ref}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />
  );
});

(KTouchable as ComponentType<KTouchableProps>).displayName = 'KTouchable';

export default memo(KTouchable);

const touchableStyle: CSSProperties = {
  cursor: 'pointer'
};
