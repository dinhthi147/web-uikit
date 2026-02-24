import { TypographyProps } from '@material-ui/core';
import { get } from 'lodash';
import { CSSProperties, useMemo } from 'react';

import {
  Appearance,
  KRadius,
  KSpacing,
  LayoutModifiers,
  SpacingModifiers,
  StylingModifiers,
  TextModifiers
} from './types';

import { KColors, KFontWeights } from '../constants';

class Typography {
  private _appearance: Appearance = 'light';
  private _KFontscale = 1;

  Page: CSSProperties = {};

  H1: CSSProperties = {};
  H2: CSSProperties = {};
  H3: CSSProperties = {};
  H4: CSSProperties = {};
  H5: CSSProperties = {};
  H6: CSSProperties = {};

  Card: CSSProperties = {};

  BreadcrumbTitle: CSSProperties = {};

  TableHeader: CSSProperties = {};

  Text4xLgBold: CSSProperties = {};
  Text3xLgBold: CSSProperties = {};
  Text2xLgBold: CSSProperties = {};
  TextXLgBold: CSSProperties = {};
  TextLgBold: CSSProperties = {};
  TextXMdBold: CSSProperties = {};
  TextMdBold: CSSProperties = {};
  TextXNmBold: CSSProperties = {};
  TextNmBold: CSSProperties = {};
  TextSmBold: CSSProperties = {};
  TextXsBold: CSSProperties = {};
  Text2XsBold: CSSProperties = {};

  Text4xLgMedium: CSSProperties = {};
  Text3xLgMedium: CSSProperties = {};
  Text2xLgMedium: CSSProperties = {};
  TextXLgMedium: CSSProperties = {};
  TextLgMedium: CSSProperties = {};
  TextXMdMedium: CSSProperties = {};
  TextMdMedium: CSSProperties = {};
  TextXNmMedium: CSSProperties = {};
  TextNmMedium: CSSProperties = {};
  TextSmMedium: CSSProperties = {};
  TextXsMedium: CSSProperties = {};
  Text2XsMedium: CSSProperties = {};

  Text4xLgNormal: CSSProperties = {};
  Text3xLgNormal: CSSProperties = {};
  Text2xLgNormal: CSSProperties = {};
  TextXLgNormal: CSSProperties = {};
  TextLgNormal: CSSProperties = {};
  TextXMdNormal: CSSProperties = {};
  TextMdNormal: CSSProperties = {};
  TextXNmNormal: CSSProperties = {};
  TextNmNormal: CSSProperties = {};
  TextSmNormal: CSSProperties = {};
  TextXsNormal: CSSProperties = {};
  Text2XsNormal: CSSProperties = {};

  get appearance() {
    return this._appearance;
  }

  get KFontscale() {
    return this._KFontscale;
  }

  getColor = () =>
    this._appearance === 'light' ? KColors.black : KColors.white;

  calSize = (size: number) => {
    return TypoHelper.scaleFont(size * this._KFontscale);
  };

  generateTextStyle = (
    KFontsize: number,
    fontWeight: string | number,
    lineHeight: number | string,
    factor = 1,
    customStyle: any = {}
  ): any => ({
    fontFamily: 'Roboto',
    fontSize: this.calSize(KFontsize) * factor,
    fontWeight,
    // lineHeight,
    color: this.getColor(),
    ...customStyle
  });

  updateValue(appearance: Appearance, KFontscale: number) {
    this._appearance = appearance;
    this._KFontscale = KFontscale;

    this.H1 = this.generateTextStyle(36, KFontWeights.bold, 1.2);
    this.H2 = this.generateTextStyle(32, KFontWeights.bold, 1.2);
    this.H3 = this.generateTextStyle(28, KFontWeights.bold, 1.2);
    this.H4 = this.generateTextStyle(24, KFontWeights.bold, 1.2);
    this.H5 = this.generateTextStyle(20, KFontWeights.bold, 1.2);
    this.H6 = this.generateTextStyle(16, KFontWeights.bold, 1.5);

    this.Card = {
      color: this._appearance === 'light' ? KColors.black : KColors.white,
      background: this._appearance === 'light' ? KColors.white : '#424242',
      wordWrap: 'break-word',
      boxShadow: `0 4px 4px ${KColors.overlay}`,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    };

    this.BreadcrumbTitle = this.generateTextStyle(18, KFontWeights.medium, 1.4);

    this.TableHeader = this.generateTextStyle(12, KFontWeights.medium, 1.75);

    this.Text4xLgBold = this.generateTextStyle(28, KFontWeights.bold, 1.4);
    this.Text3xLgBold = this.generateTextStyle(24, KFontWeights.bold, 1.4);
    this.Text2xLgBold = this.generateTextStyle(20, KFontWeights.bold, 1.4);
    this.TextXLgBold = this.generateTextStyle(18, KFontWeights.bold, 1.4);
    this.TextLgBold = this.generateTextStyle(16, KFontWeights.bold, 1.4);
    this.TextXMdBold = this.generateTextStyle(15, KFontWeights.bold, 1.4);
    this.TextMdBold = this.generateTextStyle(14, KFontWeights.bold, 1.4);
    this.TextXNmBold = this.generateTextStyle(13, KFontWeights.bold, 1.5);
    this.TextNmBold = this.generateTextStyle(12, KFontWeights.bold, 1.5);
    this.TextSmBold = this.generateTextStyle(11, KFontWeights.bold, 1.4);
    this.TextXsBold = this.generateTextStyle(10, KFontWeights.bold, 1.4);
    this.Text2XsBold = this.generateTextStyle(8, KFontWeights.bold, 1.4);

    this.Text4xLgMedium = this.generateTextStyle(28, KFontWeights.medium, 1.4);
    this.Text3xLgMedium = this.generateTextStyle(24, KFontWeights.medium, 1.4);
    this.Text2xLgMedium = this.generateTextStyle(20, KFontWeights.medium, 1.4);
    this.TextXLgMedium = this.generateTextStyle(18, KFontWeights.medium, 1.4);
    this.TextLgMedium = this.generateTextStyle(16, KFontWeights.medium, 1.4);
    this.TextXMdMedium = this.generateTextStyle(15, KFontWeights.medium, 1.4);
    this.TextMdMedium = this.generateTextStyle(14, KFontWeights.medium, 1.4);
    this.TextXNmMedium = this.generateTextStyle(13, KFontWeights.medium, 1.5);
    this.TextNmMedium = this.generateTextStyle(12, KFontWeights.medium, 1.5);
    this.TextSmMedium = this.generateTextStyle(11, KFontWeights.medium, 1.4);
    this.TextXsMedium = this.generateTextStyle(10, KFontWeights.medium, 1.4);
    this.Text2XsMedium = this.generateTextStyle(8, KFontWeights.medium, 1.4);

    this.Text4xLgNormal = this.generateTextStyle(28, KFontWeights.regular, 1.4);
    this.Text3xLgNormal = this.generateTextStyle(24, KFontWeights.regular, 1.4);
    this.Text2xLgNormal = this.generateTextStyle(20, KFontWeights.regular, 1.4);
    this.TextXLgNormal = this.generateTextStyle(18, KFontWeights.regular, 1.4);
    this.TextLgNormal = this.generateTextStyle(16, KFontWeights.regular, 1.4);
    this.TextXMdNormal = this.generateTextStyle(15, KFontWeights.regular, 1.4);
    this.TextMdNormal = this.generateTextStyle(14, KFontWeights.regular, 1.4);
    this.TextXNmNormal = this.generateTextStyle(13, KFontWeights.regular, 1.5);
    this.TextNmNormal = this.generateTextStyle(12, KFontWeights.regular, 1.5);
    this.TextSmNormal = this.generateTextStyle(11, KFontWeights.regular, 1.4);
    this.TextXsNormal = this.generateTextStyle(10, KFontWeights.regular, 1.4);
    this.Text2XsNormal = this.generateTextStyle(8, KFontWeights.regular, 1.4);
  }
}

const instance = new Typography();

class TypoHelper {
  static isNullOrUndefined = (item: any) =>
    item === null || item === undefined || item === 'undefined';

  static removeObjectProperties = (obj: any, fields: string[]) => {
    for (const f of fields) {
      delete obj[f];
    }
  };

  static destructLayoutProps = (props: LayoutModifiers = {}) => {
    const style: any = {};

    if (props.dp) {
      style.display = props.dp;
      if (props.dp === 'flex') {
        style.flexDirection = 'column';
      }
    }
    delete props.dp;

    let direction: any = props.row ? 'row' : '';
    if (direction && props.reverse) {
      direction += '-reverse';
    }
    if (direction) {
      style.display = style.display || 'flex';
      style.flexDirection = direction;
    }
    this.removeObjectProperties(props, ['row', 'direction', 'reverse']);

    if (props.center) {
      style.alignItems = 'center';
      style.justifyContent = 'center';
    } else {
      if (props.alignItems) {
        style.alignItems =
          props.alignItems === true ? 'center' : props.alignItems;
      }

      if (props.justifyContent) {
        style.justifyContent =
          props.justifyContent === true ? 'center' : props.justifyContent;
      }
    }
    this.removeObjectProperties(props, [
      'center',
      'justifyContent',
      'alignItems'
    ]);

    if (props.alignSelf) {
      style.alignSelf = props.alignSelf === true ? 'center' : props.alignSelf;
    }
    delete props.alignSelf;

    if (props.flex) {
      style.flex = props.flex === true ? 1 : props.flex;
    }
    delete props.flex;

    if (props.flexW) {
      style.flexWrap = props.flexW;
    }
    delete props.flexW;

    if (props.flexS) {
      style.flexShrink = props.flexS;
    }
    delete props.flexS;

    if (props.flexG) {
      style.flexGrow = props.flexG;
    }
    delete props.flexG;

    if (props.position) {
      style.position = props.position;
    }
    delete props.position;

    return style;
  };

  static destructSpacingProps = (props: SpacingModifiers = {}) => {
    const style: CSSProperties = {};
    if (!this.isNullOrUndefined(props.margin)) {
      style.margin = this.mapKSpacingToNumber(props.margin);
      delete props.margin;
    }
    if (!this.isNullOrUndefined(props.marginV)) {
      style.marginTop = this.mapKSpacingToNumber(props.marginV);
      style.marginBottom = this.mapKSpacingToNumber(props.marginV);
      delete props.marginV;
    }
    if (!this.isNullOrUndefined(props.marginH)) {
      style.marginLeft = this.mapKSpacingToNumber(props.marginH);
      style.marginRight = this.mapKSpacingToNumber(props.marginH);
      delete props.marginH;
    }
    if (!this.isNullOrUndefined(props.marginL)) {
      style.marginLeft = this.mapKSpacingToNumber(props.marginL);
      delete props.marginL;
    }
    if (!this.isNullOrUndefined(props.marginR)) {
      style.marginRight = this.mapKSpacingToNumber(props.marginR);
      delete props.marginR;
    }
    if (!this.isNullOrUndefined(props.marginB)) {
      style.marginBottom = this.mapKSpacingToNumber(props.marginB);
      delete props.marginB;
    }
    if (!this.isNullOrUndefined(props.marginT)) {
      style.marginTop = this.mapKSpacingToNumber(props.marginT);
      delete props.marginT;
    }
    if (!this.isNullOrUndefined(props.padding)) {
      style.padding = this.mapKSpacingToNumber(props.padding);
      delete props.padding;
    }
    if (!this.isNullOrUndefined(props.paddingV)) {
      style.paddingTop = this.mapKSpacingToNumber(props.paddingV);
      style.paddingBottom = this.mapKSpacingToNumber(props.paddingV);
      delete props.paddingV;
    }
    if (!this.isNullOrUndefined(props.paddingH)) {
      style.paddingLeft = this.mapKSpacingToNumber(props.paddingH);
      style.paddingRight = this.mapKSpacingToNumber(props.paddingH);
      delete props.paddingH;
    }
    if (!this.isNullOrUndefined(props.paddingL)) {
      style.paddingLeft = this.mapKSpacingToNumber(props.paddingL);
      delete props.paddingL;
    }
    if (!this.isNullOrUndefined(props.paddingR)) {
      style.paddingRight = this.mapKSpacingToNumber(props.paddingR);
      delete props.paddingR;
    }
    if (!this.isNullOrUndefined(props.paddingB)) {
      style.paddingBottom = this.mapKSpacingToNumber(props.paddingB);
      delete props.paddingB;
    }
    if (!this.isNullOrUndefined(props.paddingT)) {
      style.paddingTop = this.mapKSpacingToNumber(props.paddingT);
      delete props.paddingT;
    }
    this.removeObjectProperties(props, [
      'margin',
      'marginH',
      'marginV',
      'marginL',
      'marginR',
      'marginT',
      'marginB',
      'padding',
      'paddingH',
      'paddingV',
      'paddingL',
      'paddingR',
      'paddingT',
      'paddingB'
    ]);

    if (!this.isNullOrUndefined(props.size)) {
      style.width = props.size;
      style.height = props.size;
    }
    if (!this.isNullOrUndefined(props.minH)) {
      style.minHeight = props.minH;
    }
    if (!this.isNullOrUndefined(props.maxH)) {
      style.maxHeight = props.maxH;
    }
    if (!this.isNullOrUndefined(props.minW)) {
      style.minWidth = props.minW;
    }
    if (!this.isNullOrUndefined(props.maxW)) {
      style.maxWidth = props.maxW;
    }
    if (!this.isNullOrUndefined(props.width)) {
      style.width = props.width;
    }
    if (!this.isNullOrUndefined(props.height)) {
      style.height = props.height;
    }
    this.removeObjectProperties(props, [
      'size',
      'minH',
      'maxH',
      'minW',
      'maxW',
      'width',
      'height'
    ]);

    if (!this.isNullOrUndefined(props.gap)) {
      style.gap = props.gap;
    }
    delete props.gap;

    return style;
  };

  static destructStylingProps = (props: StylingModifiers = {}) => {
    const style: CSSProperties = {};
    if (props.background) {
      style.background = props.background;
    }
    delete props.background;

    if (!this.isNullOrUndefined(props.br)) {
      style.borderRadius = this.mapKRadiusToNumber(props.br);
    }
    if (!this.isNullOrUndefined(props.brTL)) {
      style.borderTopLeftRadius = this.mapKRadiusToNumber(props.brTL);
    }
    if (!this.isNullOrUndefined(props.brTR)) {
      style.borderTopRightRadius = this.mapKRadiusToNumber(props.brTR);
    }
    if (!this.isNullOrUndefined(props.brBL)) {
      style.borderBottomLeftRadius = this.mapKRadiusToNumber(props.brBL);
    }
    if (!this.isNullOrUndefined(props.brBR)) {
      style.borderBottomRightRadius = this.mapKRadiusToNumber(props.brBR);
    }
    this.removeObjectProperties(props, ['br', 'brTL', 'brTR', 'brBL', 'brBR']);

    if (props.brW) {
      style.borderWidth = props.brW;
      style.borderStyle = 'solid';
    }
    if (!this.isNullOrUndefined(props.brBW)) {
      style.borderBottomWidth = props.brBW;
      style.borderBottomStyle = 'solid';
    }
    if (!this.isNullOrUndefined(props.brTW)) {
      style.borderTopWidth = props.brTW;
      style.borderTopStyle = 'solid';
    }
    if (!this.isNullOrUndefined(props.brLW)) {
      style.borderLeftWidth = props.brLW;
      style.borderLeftStyle = 'solid';
    }
    if (!this.isNullOrUndefined(props.brRW)) {
      style.borderRightWidth = props.brRW;
      style.borderRightStyle = 'solid';
    }
    this.removeObjectProperties(props, ['brW', 'brBW', 'brTW', 'brLW', 'brRW']);

    if (props.brS) {
      style.borderStyle = props.brS;
    }
    if (props.brBS) {
      style.borderBottomStyle = props.brBS;
    }
    if (props.brTS) {
      style.borderTopStyle = props.brTS;
    }
    if (props.brLS) {
      style.borderLeftStyle = props.brLS;
    }
    if (props.brRS) {
      style.borderRightStyle = props.brRS;
    }
    this.removeObjectProperties(props, ['brS', 'brBS', 'brTS', 'brLS', 'brRS']);

    if (props.brC) {
      style.borderColor = props.brC;
    }
    if (props.brBC) {
      style.borderBottomColor = props.brBC;
    }
    if (props.brTC) {
      style.borderTopColor = props.brTC;
    }
    if (props.brLC) {
      style.borderLeftColor = props.brLC;
    }
    if (props.brRC) {
      style.borderRightColor = props.brRC;
    }
    this.removeObjectProperties(props, ['brC', 'brBC', 'brTC', 'brLC', 'brRC']);

    if (props.overflow) {
      style.overflow = props.overflow === true ? 'auto' : props.overflow;
    }
    if (props.overflowY) {
      style.overflowY = props.overflowY === true ? 'auto' : props.overflowY;
    }
    if (props.overflowX) {
      style.overflowX = props.overflowX === true ? 'auto' : props.overflowX;
    }
    delete props.overflow;
    delete props.overflowY;
    delete props.overflowX;

    if (props.cursor) {
      style.cursor = props.cursor === true ? 'pointer' : props.cursor;
    }
    delete props.cursor;

    return style;
  };

  static destructTextProps = (props: TextModifiers & TypographyProps = {}) => {
    const style: CSSProperties = {};

    if (props.color) {
      style.color = props.color;
    }
    delete props.color;

    if (props.textAlign) {
      style.textAlign = props.textAlign === true ? 'center' : props.textAlign;
    }
    delete props.textAlign;

    if (props.underlineColor) {
      style.textDecorationColor = props.underlineColor;
    }
    delete props.underlineColor;

    if (props.underline) {
      style.textDecorationLine = props.underline ? 'underline' : undefined;
    }
    delete props.underline;

    if (props.textTransform) {
      style.textTransform = props.textTransform;
    }
    delete props.textTransform;

    if (props.numberOfLines) {
      style.overflow = 'hidden';
      style.textOverflow = 'ellipsis';
      style.display = '-webkit-box';
      style.WebkitLineClamp = props.numberOfLines;
      style.lineClamp = props.numberOfLines;
      style.WebkitBoxOrient = 'vertical';
    }
    delete props.numberOfLines;

    if (props.italic) {
      style.fontStyle = 'italic';
    }
    delete props.italic;

    const flatten = { ...style, ...props.style };
    return flatten;
  };

  static destructPropsToStyle = <T extends {}>(props: T) => {
    const layout = this.destructLayoutProps(props);
    const spacing = this.destructSpacingProps(props);
    const styling = this.destructStylingProps(props);
    const text = this.destructTextProps(props);

    return {
      mStyle: {
        layout,
        spacing,
        styling,
        text
      },
      mProps: props
    };
  };

  static scaleFont = (KFontsize: number) => KFontsize;

  static mapKSpacingToNumber = (spacing?: KSpacing | number) => {
    if (typeof spacing === 'number') {
      return spacing;
    }
    if (this.isNullOrUndefined(spacing)) {
      return 0;
    }
    const base = 16;
    let factor = 0;
    try {
      const factorString = spacing?.split('rem')?.[0] || '';
      const factorFloat = parseFloat(factorString);
      if (typeof factorFloat === 'number') {
        factor = factorFloat;
      }
    } catch (error) {
      //
    }
    return factor * base;
  };

  static mapKRadiusToNumber = (radius?: KRadius | 0) => {
    const base = 4;
    switch (radius) {
      case 'x':
        return base;
      case '2x':
        return base * 2;
      case '3x':
        return base * 3;
      case '4x':
        return base * 4;
      case '6x':
        return base * 6;
      case 'round':
        return 10000;
      default:
        return 0;
    }
  };

  static ratio = 1.2;

  static getKFontSizeByTypo = (typo: TypoType = 'TextNmNormal') => {
    const style = instance[typo];
    return get(style, 'KFontsize', 12);
  };
}

const useTheme = (theme: Appearance = 'light', KFontscale = 1) => {
  const typo = useMemo(() => {
    instance.updateValue(theme, KFontscale);
    return instance;
  }, [theme, KFontscale]);

  return typo;
};

export type TypoType = Exclude<
  keyof Typography,
  | 'generateCSSProperties'
  | 'appearance'
  | 'calSize'
  | 'KFontscale'
  | 'updateValue'
  | 'getColor'
  | 'getKFontSizeByTypo'
>;

const KSpacingValue = {
  0: 0,
  '0rem': 0,
  '0.25rem': TypoHelper.mapKSpacingToNumber('0.25rem'),
  '0.5rem': TypoHelper.mapKSpacingToNumber('0.5rem'),
  '0.75rem': TypoHelper.mapKSpacingToNumber('0.75rem'),
  '1rem': TypoHelper.mapKSpacingToNumber('1rem'),
  '1.25rem': TypoHelper.mapKSpacingToNumber('1.25rem'),
  '1.5rem': TypoHelper.mapKSpacingToNumber('1.5rem'),
  '1.75rem': TypoHelper.mapKSpacingToNumber('1.75rem'),
  '2rem': TypoHelper.mapKSpacingToNumber('2rem'),
  '2.25rem': TypoHelper.mapKSpacingToNumber('2.25rem'),
  '2.5rem': TypoHelper.mapKSpacingToNumber('2.5rem'),
  '3rem': TypoHelper.mapKSpacingToNumber('3rem'),
  '3.5rem': TypoHelper.mapKSpacingToNumber('3.5rem'),
  '4rem': TypoHelper.mapKSpacingToNumber('4rem'),
  '5rem': TypoHelper.mapKSpacingToNumber('5rem'),
  '6rem': TypoHelper.mapKSpacingToNumber('6rem'),
  '8rem': TypoHelper.mapKSpacingToNumber('8rem'),
  '10rem': TypoHelper.mapKSpacingToNumber('10rem'),
  '12rem': TypoHelper.mapKSpacingToNumber('12rem'),
  '14rem': TypoHelper.mapKSpacingToNumber('14rem'),
  '16rem': TypoHelper.mapKSpacingToNumber('16rem')
};

const KRadiusValue = {
  0: 0,
  x: TypoHelper.mapKRadiusToNumber('x'),
  '2x': TypoHelper.mapKRadiusToNumber('2x'),
  '3x': TypoHelper.mapKRadiusToNumber('3x'),
  '4x': TypoHelper.mapKRadiusToNumber('4x'),
  '6x': TypoHelper.mapKRadiusToNumber('6x'),
  round: TypoHelper.mapKRadiusToNumber('round')
};

export default instance;

export { TypoHelper, useTheme, KSpacingValue, KRadiusValue };
