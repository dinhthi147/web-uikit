import { SvgIconProps, SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import * as MuiIcons from '@material-ui/icons';
import { set } from 'lodash';
import React, { CSSProperties, memo, useMemo } from 'react';

import { MarginModifiers, MIcon, PaddingModifiers } from '../types';
import { TypoHelper } from '../Typography';

interface Props
  extends Omit<SvgIconProps, 'color' | 'fontSize'>,
    MarginModifiers,
    PaddingModifiers {
  icon: MIcon;
  color?: string;
  style?: CSSProperties;
  size?: number;
  background?: string;
}

const KMuiIcon = (props: Props) => {
  const {
    icon,
    margin,
    marginB,
    marginH,
    marginL,
    marginR,
    marginT,
    marginV,

    padding,
    paddingB,
    paddingH,
    paddingL,
    paddingR,
    paddingT,
    paddingV,

    background,
    color,
    size,
    style,
    ...rest
  } = props;

  const KIcon = MuiIcons[icon] as OverridableComponent<
    SvgIconTypeMap<{}, 'svg'>
  >;

  const commonStyle: CSSProperties = useMemo(() => {
    const result = { backgroundColor: background, color, fontSize: size };
    if (!TypoHelper.isNullOrUndefined(margin)) {
      set(result, 'margin', TypoHelper.mapKSpacingToNumber(margin));
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

    if (!TypoHelper.isNullOrUndefined(padding)) {
      set(result, 'padding', TypoHelper.mapKSpacingToNumber(padding));
    }
    if (!TypoHelper.isNullOrUndefined(paddingH)) {
      set(result, 'paddingLeft', TypoHelper.mapKSpacingToNumber(paddingH));
      set(result, 'paddingRight', TypoHelper.mapKSpacingToNumber(paddingH));
    }
    if (!TypoHelper.isNullOrUndefined(paddingV)) {
      set(result, 'paddingBottom', TypoHelper.mapKSpacingToNumber(paddingV));
      set(result, 'paddingTop', TypoHelper.mapKSpacingToNumber(paddingV));
    }
    if (!TypoHelper.isNullOrUndefined(paddingB)) {
      set(result, 'paddingBottom', TypoHelper.mapKSpacingToNumber(paddingB));
    }
    if (!TypoHelper.isNullOrUndefined(paddingT)) {
      set(result, 'paddingTop', TypoHelper.mapKSpacingToNumber(paddingT));
    }
    if (!TypoHelper.isNullOrUndefined(paddingL)) {
      set(result, 'paddingLeft', TypoHelper.mapKSpacingToNumber(paddingL));
    }
    if (!TypoHelper.isNullOrUndefined(paddingR)) {
      set(result, 'paddingRight', TypoHelper.mapKSpacingToNumber(paddingR));
    }

    return result;
  }, [
    background,
    color,
    margin,
    marginB,
    marginH,
    marginL,
    marginR,
    marginT,
    marginV,
    padding,
    paddingB,
    paddingH,
    paddingL,
    paddingR,
    paddingT,
    paddingV,
    size
  ]);

  return <KIcon {...rest} style={{ ...commonStyle, ...style }} />;
};

export default memo(KMuiIcon);
