import React, { ComponentType, forwardRef, memo, useMemo } from 'react';

import KTouchable from './Touchable';
import KView from './View';

import { KColors } from '../../constants';
import KButton from '../Button';
import KIcon from '../Icon';
import KLabel from '../Label';
import KLoading from '../Loading';
import { KCardProps, KSpacing } from '../types';
import { KSpacingValue, useTheme } from '../Typography';

const KCard = forwardRef<HTMLDivElement, KCardProps>((props, ref) => {
  const { Card } = useTheme();
  const {
    children,
    isLoading,
    header,
    noShadow,
    border,
    contentStretch,
    size,
    noBody,
    ...others
  } = props;

  const iconSize = 30;

  const cardPadding = useMemo(() => {
    let _cardPadding: KSpacing = '1rem';
    switch (size) {
      case 'lg':
        _cardPadding = '1.25rem';
        break;

      case 'nm':
        _cardPadding = '0.75rem';
        break;

      case 'sm':
        _cardPadding = '0.5rem';
        break;

      case 'xs':
        _cardPadding = '0.25rem';
        break;

      default:
        break;
    }
    return _cardPadding;
  }, [size]);

  const _cardPadding = others.padding
    ? KSpacingValue[others.padding]
    : KSpacingValue[cardPadding];

  const renderIcon = useMemo(() => {
    if (!header || !header.icon) {
      return null;
    }

    const { icon } = header;

    if (typeof icon === 'string') {
      return <KIcon.Card icon={icon} />;
    }

    return (
      <KButton.Icon
        marginR={'0.5rem'}
        padding={'0.5rem'}
        enhanceStyle={styles.icon}
        {...icon}
      />
    );
  }, [header]);

  const renderHeader = useMemo(() => {
    if (header) {
      const {
        renderHeader: _renderHeader,
        icon,
        title,
        rightNode,
        border: headerBorder,
        content,
        typo
      } = header;

      if (_renderHeader) {
        return _renderHeader();
      }

      return (
        <KView marginB={noBody ? 0 : cardPadding}>
          <KView dp="flex" width="100%" row alignItems maxH={36}>
            <KView flex row alignItems>
              {icon && renderIcon}

              {title && (
                <KLabel.Text
                  typo={
                    typo || (headerBorder ? 'TextXNmMedium' : 'TextMdMedium')
                  }
                  style={{ lineHeight: 1 }}
                >
                  {title}
                </KLabel.Text>
              )}

              {content}
            </KView>

            {rightNode}
          </KView>

          {headerBorder && (
            <KView
              width={`calc(100% + ${_cardPadding * 2}px)`}
              height={1}
              background={KColors.border.normal}
              // @ts-ignore
              marginL={-_cardPadding}
              marginT={cardPadding}
            />
          )}
        </KView>
      );
    }

    return null;
  }, [_cardPadding, cardPadding, header, noBody, renderIcon]);

  if (border) {
    others.brW = 1;
    others.brC = others.brC || KColors.border.normal;
    others.brS = 'solid';
  }

  const renderContent = useMemo(() => {
    if (contentStretch) {
      <KView
        // @ts-ignore
        marginL={contentStretch ? -_cardPadding : 0}
        width={`calc(100% + ${_cardPadding * 2}px)`}
      >
        {children}
      </KView>;
    }

    return children;
  }, [_cardPadding, children, contentStretch]);

  const Wrapper = others?.onPress ? KTouchable : KView;

  return (
    <Wrapper
      br={'x'}
      {...others}
      style={{
        ...Card,
        ...((noShadow || border) && { boxShadow: 'none' }),
        ...others?.style
      }}
      padding={others.padding || cardPadding}
      ref={ref}
    >
      {isLoading && <KLoading size={iconSize} />}

      {renderHeader}

      {renderContent}
    </Wrapper>
  );
});

(KCard as ComponentType<KCardProps>).displayName = 'KCard';

export default memo(KCard);

const styles = {
  icon: {
    marginLeft: -KSpacingValue['0.5rem']
  }
};
