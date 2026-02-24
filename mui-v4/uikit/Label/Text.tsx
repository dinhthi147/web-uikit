import { Tooltip, Link } from '@material-ui/core';
import React, { CSSProperties, memo, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { KColors } from '../../constants';
import { KTextProps } from '../types';
import { TypoHelper, useTheme } from '../Typography';

const KText = (props: KTextProps) => {
  const {
    typo = 'TextNmNormal',
    style,
    withTooltip,
    tooltipLabel,
    onPress,
    isParagraph,
    isLink,
    ...rest
  } = props;

  const typos = useTheme();

  const { innerStyle, innerProps } = useMemo(() => {
    const { mStyle: s, mProps: p } = TypoHelper.destructPropsToStyle(rest);
    const typoStyle = typo ? typos[typo] : undefined;
    const mergeStyles = {
      ...(typoStyle as object),
      ...(!onPress && !isLink ? undefined : touchableStyle),
      ...style,
      ...{ userSelect: 'text' },
      ...s.layout,
      ...s.spacing,
      ...s.styling,
      ...s.text
    };

    return {
      innerStyle: mergeStyles,
      innerProps: {
        ...p,
        ...(isLink && rest.to ? { component: RouterLink } : undefined)
      }
    };
  }, [rest, typo, typos, onPress, style, isLink]);

  const Wrapper = (isLink
    ? rest?.href
      ? 'a'
      : Link
    : isParagraph
    ? 'p'
    : 'span') as any;

  if (withTooltip) {
    return (
      <Tooltip
        title={tooltipLabel || (innerProps.children as JSX.Element | string)}
      >
        <Wrapper
          {...innerProps}
          style={innerStyle}
          onClick={onPress ? onPress : undefined}
        />
      </Tooltip>
    );
  }

  return (
    <Wrapper
      {...innerProps}
      style={innerStyle}
      onClick={onPress ? onPress : undefined}
    />
  );
};

export default memo(KText);

const touchableStyle: CSSProperties = {
  cursor: 'pointer',
  color: KColors.primary.normal
};
