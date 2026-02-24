import React, { memo, useCallback, useMemo } from 'react';

import { useGoBackWithFallback } from '../../hooks';
import KButton from '../Button';
import KContainer from '../Container';
import KImage from '../Image';
import KLabel from '../Label';
import { KBreadcrumbsProps } from '../types';
import { KSpacingValue } from '../Typography';

const KBreadcrumbs = (props: KBreadcrumbsProps) => {
  const {
    hasBackIcon = true,
    onBack,
    title,
    breadcrumbs,
    leftNode,
    rightNode,
    fb
  } = props;

  const goBack = useGoBackWithFallback(fb);

  const onBackWrapper = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  }, [goBack, onBack]);

  const renderBackIcon = useMemo(() => {
    if (!hasBackIcon) {
      return null;
    }

    return (
      <KButton.Icon
        icon="ArrowBack"
        onPress={onBackWrapper}
        padding="0.5rem"
        marginR="0.25rem"
        enhanceStyle={styles.backIcon}
      />
    );
  }, [hasBackIcon, onBackWrapper]);

  const renderLeftNode = useMemo(() => {
    return (
      <KContainer.View flex row alignItems>
        {renderBackIcon}

        {breadcrumbs && Array.isArray(breadcrumbs) ? (
          <KContainer.View row alignItems>
            {breadcrumbs
              .filter(i => i)
              .map<React.ReactNode>(i => (
                <KLabel.Text key={i} typo="TextLgMedium">
                  {i}
                </KLabel.Text>
              ))
              .reduce((prev, curr, idx) => [
                prev,
                <KImage.MuiIcon
                  key={`${idx}`}
                  icon="ChevronRight"
                  marginH="0.25rem"
                />,
                curr
              ])}
          </KContainer.View>
        ) : (
          <KLabel.Text typo="TextLgMedium">{title}</KLabel.Text>
        )}

        {leftNode?.jsx}
      </KContainer.View>
    );
  }, [breadcrumbs, leftNode?.jsx, renderBackIcon, title]);

  const renderRightNode = useMemo(() => {
    if (!rightNode) {
      return null;
    }

    if (rightNode.tools) {
      const { ref: toolsRef, ...toolsProps } = rightNode.tools;

      return (
        <KButton.Outline
          ref={toolsRef}
          {...toolsProps}
          title={'Tools'}
          icon="ArrowDropDown"
          iconAlignment="right"
        />
      );
    }

    if (rightNode.buttons) {
      return (
        <KContainer.View row alignItems>
          {rightNode.buttons.map((i, idx) => {
            const { props: bProps, type, ref } = i;

            const Wrapper =
              type === 'text'
                ? KButton.Text
                : type === 'outline'
                ? KButton.Outline
                : type === 'transparent'
                ? KButton.Transparent
                : KButton.Solid;

            return (
              <Wrapper
                key={bProps.title}
                ref={ref}
                marginL={idx !== 0 ? '0.5rem' : 0}
                {...bProps}
              />
            );
          })}
        </KContainer.View>
      );
    }

    return rightNode.jsx ?? null;
  }, [rightNode]);

  return (
    <KContainer.Card
      size="nm"
      brBL="2x"
      brBR="2x"
      height={50}
      paddingH="1rem"
      justifyContent
      // @ts-ignore
      marginT={1}
    >
      <KContainer.View row alignItems>
        {renderLeftNode}

        {renderRightNode}
      </KContainer.View>
    </KContainer.Card>
  );
};

export default memo(KBreadcrumbs);

const styles = {
  backIcon: {
    marginLeft: -KSpacingValue['0.5rem']
  }
};
