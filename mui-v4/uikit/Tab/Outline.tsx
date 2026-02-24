import { usePrevious } from '@dwarvesf/react-hooks';
import { Tooltip } from '@material-ui/core';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { KColors } from '../../constants';
import KContainer from '../Container';
import KLabel from '../Label';
import { KTabItemProps, KTabProps } from '../types';

interface IProps extends KTabProps {
  hasTooltip?: boolean;
  onChangeTab?: (tab?: string | number) => void;
}

const KTabOutline = (props: IProps) => {
  const { tabs = [], initialIndex, onChangeTab, hasTooltip, ...rest } = props;

  const [tabIndex, setTabIndex] = useState(initialIndex ?? 0);

  const prevIndex = usePrevious(initialIndex);

  useEffect(() => {
    if (initialIndex && initialIndex !== prevIndex) {
      setTabIndex(initialIndex);
    }
  }, [initialIndex, prevIndex]);

  const onChangeWrapper = useCallback(
    (index: number) => {
      setTabIndex(index);
      onChangeTab?.(tabs[index].key);
    },
    [onChangeTab, tabs]
  );

  const renderItem = useCallback(
    (item: KTabItemProps, index: number) => {
      const isActive = index === tabIndex;

      let content = (
        <KContainer.Touchable
          key={`${item.key}-${isActive}`}
          dp="flex"
          center
          height={30}
          minW={100}
          br={'x'}
          brW={1}
          brC={KColors.primary.normal}
          background={isActive ? KColors.primary.normal : KColors.transparent}
          hoverColor={isActive ? KColors.primary.light : undefined}
          onPress={onChangeWrapper.bind(null, index)}
          marginL={index === 0 ? 0 : '0.75rem'}
          disabled={item.disabled}
        >
          <KLabel.Text
            typo="TextMdNormal"
            textAlign
            color={isActive ? KColors.white : KColors.black}
          >
            {item.label}
          </KLabel.Text>
        </KContainer.Touchable>
      );

      if (hasTooltip) {
        content = (
          <Tooltip
            key={item.key}
            title={(item.tooltipLabel as string) || item.label}
          >
            {content}
          </Tooltip>
        );
      }

      return content;
    },
    [hasTooltip, onChangeWrapper, tabIndex]
  );

  return (
    <KContainer.View row alignItems marginT={'0.5rem'} {...rest}>
      {tabs.map((i, idx) => renderItem(i, idx))}
    </KContainer.View>
  );
};

export default memo(KTabOutline);
