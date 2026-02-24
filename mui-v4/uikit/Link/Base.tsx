import { Link } from '@material-ui/core';
import { set } from 'lodash';
import React, { ComponentType, CSSProperties, memo, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import KColors from '../../constants/colors';
import KLabel from '../Label';
import { KLinkProps, TypographyModifiers } from '../types';
import { TypoHelper } from '../Typography';

const KLinkBase = (props: KLinkProps) => {
  const {
    margin,
    marginB,
    marginH,
    marginL,
    marginR,
    marginT,
    marginV,
    title,
    typo,
    weight = 'normal',
    tintColor = KColors.link,
    enhanceStyle = {},
    children,
    ...otherProps
  } = props;

  const textTypo = useMemo(() => {
    const postfix =
      weight === 'bold' ? 'Bold' : weight === 'medium' ? 'Medium' : 'Normal';
    return typo || (`TextNm${postfix}` as TypographyModifiers);
  }, [typo, weight]);

  const commonStyle: CSSProperties = useMemo(() => {
    const result = {
      textDecorationColor: tintColor
    };
    if (!TypoHelper.isNullOrUndefined(margin)) {
      set(result, 'margin', TypoHelper.mapKSpacingToNumber(marginH));
    }
    if (!TypoHelper.isNullOrUndefined(marginH)) {
      set(result, 'marginHorizontal', TypoHelper.mapKSpacingToNumber(marginH));
    }
    if (!TypoHelper.isNullOrUndefined(marginV)) {
      set(result, 'marginVertical', TypoHelper.mapKSpacingToNumber(marginV));
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

    return result;
  }, [margin, marginB, marginH, marginL, marginR, marginT, marginV, tintColor]);

  const component = useMemo(() => {
    if (otherProps.href) {
      return 'a';
    }

    return RouterLink;
  }, [otherProps.href]);

  return (
    <Link
      {...otherProps}
      style={{
        ...commonStyle,
        ...enhanceStyle
      }}
      component={component}
    >
      {!children ? (
        <KLabel.Text
          typo={textTypo}
          color={tintColor}
          style={{ lineHeight: 1.5 }}
        >
          {title}
        </KLabel.Text>
      ) : (
        children
      )}
    </Link>
  );
};

(KLinkBase as ComponentType<KLinkProps>).displayName =
  'KLinkBase';

const KLinkText = memo((props: KLinkProps) => {
  return <KLinkBase {...props} underline="none" />;
});

export { KLinkText };

export default memo(KLinkBase);
