import { usePrevious } from '@dwarvesf/react-hooks';
import { isEqual, isNumber } from 'lodash';
import React, {
  ComponentType,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { useMount } from 'uikit-common';

import KColors from '../../constants/colors';
import KContainer from '../Container';
import KLabel from '../Label';
import { KTabInstance, KTabProps } from '../types';
import { KSpacingValue } from '../Typography';

const TAB_WIDTH = 100;

const KTabBase = memo(
  forwardRef<KTabInstance, KTabProps>((props, ref) => {
    const {
      tabs = [],
      initialIndex,
      onChangeTab,
      tintColor,
      activeBackground,
      textColor,
      inactiveTextColor,
      typo,
      spacing = '0.5rem',
      kind = 'indicator',
      askBeforeLeaveIndexes = [],
      onAskBeforeLeave,
      alwaysAskBeforeLeave,
      background = KColors.white,
      ...rest
    } = props;

    const indicatorRef = useRef<HTMLDivElement>(null);
    const tabRef = useRef(tabs.map(() => React.createRef<HTMLDivElement>()));

    const [tabIndex, setTabIndex] = useState(initialIndex ?? 0);

    const prevIndex = usePrevious(initialIndex);

    useEffect(() => {
      if (isNumber(initialIndex) && initialIndex !== prevIndex) {
        setTabIndex(initialIndex);
      }
    }, [initialIndex, prevIndex]);

    useMount(() => {
      if (indicatorRef.current) {
        indicatorRef.current.style.width = `${
          tabRef.current?.[tabIndex]?.current?.offsetWidth ?? TAB_WIDTH
        }px`;
      }
    });

    const onChangeWrapper = useCallback(
      (index: number, byPass?: boolean) => {
        if (index !== tabIndex) {
          const onSuccess = () => {
            if (indicatorRef.current) {
              const tabWidth =
                tabRef.current?.[index]?.current?.offsetWidth ?? TAB_WIDTH;

              let width = 0;
              if (index > 0) {
                for (let i = 0; i < index; i++) {
                  width +=
                    (tabRef.current?.[i]?.current?.offsetWidth ?? 0) +
                    (spacing ? KSpacingValue[spacing] : 0);
                }
              }

              indicatorRef.current.style.transition =
                'transform 0.5s, width 0.5s';
              indicatorRef.current.style.transform = `translate(${width}px, 0px)`;
              indicatorRef.current.style.width = `${tabWidth}px`;
            }

            setTabIndex(index);

            onChangeTab?.(index);
          };

          if (
            (alwaysAskBeforeLeave ||
              askBeforeLeaveIndexes.includes(tabIndex) ||
              askBeforeLeaveIndexes.some(a => isEqual(a, [tabIndex, true]))) &&
            !!onAskBeforeLeave &&
            !byPass
          ) {
            onAskBeforeLeave(onSuccess, index);
          } else {
            onSuccess();
          }
        }
      },
      [
        alwaysAskBeforeLeave,
        askBeforeLeaveIndexes,
        onAskBeforeLeave,
        onChangeTab,
        spacing,
        tabIndex
      ]
    );

    useImperativeHandle(ref, () => ({
      onChange: onChangeWrapper,
      setTabIndex
    }));

    const renderIndicator = useMemo(() => {
      return (
        <KContainer.View
          ref={indicatorRef}
          style={{
            position: 'absolute',
            bottom: 4,
            transition: 'transform 500ms'
          }}
          height={2}
          width={TAB_WIDTH}
          background={tintColor}
        />
      );
    }, [indicatorRef, tintColor]);

    return (
      <KContainer.Card
        dp="flex"
        row
        alignItems
        paddingV={kind === 'background' ? 0 : '0.5rem'}
        height={43}
        noShadow
        overflow
        overflowY="hidden"
        background={background}
        {...rest}
      >
        {tabs.map((i, idx) => {
          const { key, label, code } = i;
          const isActive = idx === tabIndex;
          const color = i.disabled
            ? KColors.hexToRgba(KColors.black, 0.25)
            : isActive
            ? textColor
            : inactiveTextColor;

          return (
            <React.Fragment key={key || code}>
              {idx !== 0 && spacing && (
                <KContainer.View width={KSpacingValue[spacing]} height="100%" style={{ flexShrink: 0 }} />
              )}

              <KContainer.Touchable
                ref={tabRef.current[idx]}
                paddingV="0.5rem"
                paddingH="0.75rem"
                minW={TAB_WIDTH}
                onPress={() => onChangeWrapper(idx)}
                dp="flex"
                center
                disabled={i.disabled}
                cursor={i.disabled ? 'auto' : 'pointer'}
                height={kind === 'background' ? '100%' : undefined}
                background={
                  isActive && kind === 'background'
                    ? activeBackground
                    : KColors.transparent
                }
                hoverColor={
                  isActive && kind === 'background'
                    ? activeBackground
                    : undefined
                }
              >
                <KLabel.Text
                  typo={typo || 'TextNmMedium'}
                  color={color}
                  textTransform="uppercase"
                  textAlign
                >
                  {label}
                </KLabel.Text>
              </KContainer.Touchable>
            </React.Fragment>
          );
        })}

        {kind === 'indicator' && renderIndicator}
      </KContainer.Card>
    );
  })
);

const KTabSolid = memo(
  forwardRef<KTabInstance, KTabProps>((props, ref) => {
    return (
      <KTabBase
        background={KColors.primary.normal}
        tintColor={KColors.white}
        textColor={KColors.white}
        inactiveTextColor={KColors.white}
        {...props}
        ref={ref}
      />
    );
  })
);

const KTabWhite = memo(
  forwardRef<KTabInstance, KTabProps>((props, ref) => {
    return (
      <KTabBase
        background={KColors.white}
        tintColor={KColors.primary.normal}
        textColor={KColors.black}
        inactiveTextColor={KColors.hexToRgba(KColors.black, 0.54)}
        height={48}
        {...props}
        ref={ref}
      />
    );
  })
);

const KTabTransparent = memo(
  forwardRef<KTabInstance, KTabProps>((props, ref) => {
    return (
      <KTabBase
        background={KColors.transparent}
        tintColor={KColors.primary.normal}
        textColor={KColors.black}
        inactiveTextColor={KColors.opacity.black[54]}
        {...props}
        ref={ref}
      />
    );
  })
);

(KTabBase as ComponentType<KTabProps>).displayName = 'KTabBase';
(KTabSolid as ComponentType<KTabProps>).displayName = 'KTabSolid';
(KTabTransparent as ComponentType<KTabProps>).displayName = 'KTabTransparent';

export { KTabBase, KTabSolid, KTabTransparent, KTabWhite };
