import {
  LinkProps,
  SwitchProps,
  OutlinedTextFieldProps,
  DialogProps,
  PopperProps
} from '@material-ui/core';
import * as MuiIcons from '@material-ui/icons';
import {
  HTMLProps,
  CSSProperties,
  AriaAttributes,
  ComponentPropsWithoutRef
} from 'react';
import { LinkProps as RouterLinkProps } from 'react-router-dom';
import { TinyMCE } from 'tinymce';

import { TypoType } from './Typography';

export type MIcon = keyof typeof MuiIcons;

export type Appearance = 'dark' | 'light';

export type KRadius =
  | 'x' // 4px
  | '2x' // 8px
  | '3x' // 12px
  | '4x' // 16px
  | '6x' // 24px
  | 'round'; // round
export type KSpacing =
  | '0rem' // 0px
  | '0.25rem' // 4px
  | '0.5rem' // 8px
  | '0.75rem' // 12px
  | '1rem' // 16px
  | '1.25rem' // 20px
  | '1.5rem' // 24px
  | '1.75rem' // 28px
  | '2rem' // 32px
  | '2.25rem' // 36px
  | '2.5rem' // 40px
  | '3rem' // 48px
  | '3.5rem' // 56px
  | '4rem' // 64px
  | '5rem' // 80px
  | '6rem' // 96px
  | '8rem' // 128px
  | '10rem' // 160px
  | '12rem' // 192px
  | '14rem' // 234px
  | '16rem'; // 256px

export interface TextModifiers {
  color?: string;
  underline?: true;
  underlineColor?: string;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  typo?: TypographyModifiers;
  textAlign?: true | 'center' | 'left' | 'right';
  numberOfLines?: number;
  italic?: boolean;
}

export interface LayoutModifiers {
  dp?:
    | 'inline'
    | 'block'
    | 'flex'
    | 'inline-block'
    | 'inline-flex'
    | 'none'
    | 'table'
    | 'table-cell';
  flex?: number | true; // flex value, if flex === true, it means flex = 1
  flexS?: number; // flexShirk
  flexG?: number; // flexGrow
  flexW?: 'wrap' | 'nowrap' | 'wrap-reverse';
  row?: boolean;
  reverse?: boolean;
  alignItems?:
    | true
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline'
    | undefined;
  alignSelf?:
    | true
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline';
  justifyContent?:
    | true
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  center?: boolean;
  direction?: 'row' | 'column' | 'column-reverse' | 'row-reverse';
  position?: 'relative' | 'absolute' | 'fixed' | 'static' | 'sticky';
}

export interface MarginModifiers {
  margin?: KSpacing | 0;
  marginL?: KSpacing | 0;
  marginR?: KSpacing | 0;
  marginT?: KSpacing | 0;
  marginB?: KSpacing | 0;
  marginH?: KSpacing | 0;
  marginV?: KSpacing | 0;
}

export interface PaddingModifiers {
  padding?: KSpacing | 0;
  paddingL?: KSpacing | 0;
  paddingR?: KSpacing | 0;
  paddingT?: KSpacing | 0;
  paddingB?: KSpacing | 0;
  paddingH?: KSpacing | 0;
  paddingV?: KSpacing | 0;
}

export interface SpacingModifiers extends MarginModifiers, PaddingModifiers {
  width?: number | string;
  height?: number | string;

  minW?: number | string;
  maxW?: number | string;
  minH?: number | string;
  maxH?: number | string;
  size?: number | string;

  gap?: KSpacing | 0 | number;
}

export interface StylingModifiers {
  background?: string;
  opacity?: number;

  overflow?: boolean | 'unset' | 'hidden' | 'auto' | 'scroll';
  overflowX?: boolean | 'unset' | 'hidden' | 'auto' | 'scroll';
  overflowY?: boolean | 'unset' | 'hidden' | 'auto' | 'scroll';

  cursor?: boolean | 'pointer' | 'auto';

  br?: KRadius | 0; // border radius
  brW?: number; // border width
  brC?: string; // border color
  brS?: 'solid' | 'dashed'; // border style

  brTL?: KRadius | 0; // border top left radius
  brTR?: KRadius | 0; // border top right radius
  brBL?: KRadius | 0; // border bottom left radius
  brBR?: KRadius | 0; // border bottom right radius

  brBW?: number | 0; // border bottom width
  brTW?: number | 0; // border top width
  brLW?: number | 0; // border left width
  brRW?: number | 0; // border right width

  brBS?: 'solid' | 'dashed'; // border bottom style
  brTS?: 'solid' | 'dashed'; // border top style
  brLS?: 'solid' | 'dashed'; // border left style
  brRS?: 'solid' | 'dashed'; // border right style

  brBC?: string; // border bottom color
  brTC?: string; // border top color
  brLC?: string; // border left color
  brRC?: string; // border right color
}

export type TypographyModifiers = TypoType;

export interface KTextProps
  extends SpacingModifiers,
    StylingModifiers,
    LayoutModifiers,
    TextModifiers,
    Omit<HTMLProps<HTMLSpanElement>, 'size' | 'ref'> {
  withTooltip?: boolean;
  tooltipLabel?: JSX.Element | string;
  onPress?: () => void;
  isParagraph?: boolean;
  isLink?: boolean;
  href?: string;
  to?: any;
}

export interface KParagraphProps extends Omit<KTextProps, 'isParagraph'> {}

export interface KLinkProps
  extends LinkProps,
    SpacingModifiers,
    Pick<RouterLinkProps, 'to'> {
  weight?: KButtonLabelWeight;
  title: string;
  typo?: TypoType;
  enhanceStyle?: CSSProperties;
  tintColor?: string;
  children?: any;
}

export interface KViewProps
  extends SpacingModifiers,
    StylingModifiers,
    LayoutModifiers,
    React.PropsWithChildren<
      Omit<React.HTMLAttributes<HTMLDivElement>, 'size' | 'ref'>
    > {
  withTooltip?: boolean;
  tooltipTitle?: string;
  onPress?: React.MouseEventHandler<HTMLButtonElement>;
  avoidParentPress?: boolean;
  disabled?: boolean;
}

export interface KTouchableProps extends KViewProps {
  hoverColor?: string;
}

export interface KCardProps extends KTouchableProps {
  isLoading?: boolean;
  noShadow?: boolean;
  border?: boolean;
  header?: {
    icon?: MIcon | KButtonProps;
    title?: string;
    typo?: TypographyModifiers;
    content?: JSX.Element;
    rightNode?: JSX.Element;
    renderHeader?: () => any;
    border?: boolean;
  };
  contentStretch?: boolean;
  size?: 'lg' | 'md' | 'nm' | 'sm' | 'xs';
  noBody?: boolean;
}

export interface KCardWithAccordionProps extends KCardProps {
  defaultExpanded?: boolean;
  header: {
    renderHeader?: () => any;
    icon?: MIcon;
    title?: string;
    color?: string;
  };
  cb?: () => void;
}

export interface KButtonIconProps {
  vectorName?: string; // for vector icon
  imageSource?: string | number; // for image icon,
  tintColor?: string;
}
export type KThickness = 'thin' | 'thick';
export type KButtonSize = 'xlg' | 'lg' | 'md' | 'sm' | 'xs';
export type KButtonKind =
  | 'primary'
  | 'secondary'
  | 'normal'
  | 'info'
  | 'gray'
  | 'danger';
export type KButtonLabelWeight = 'normal' | 'medium' | 'bold';

export interface KButtonProps
  extends SpacingModifiers,
    LayoutModifiers,
    React.PropsWithChildren<AriaAttributes> {
  type?: string;

  icon?: MIcon;
  assetIcon?: string;
  iconAlignment?: 'left' | 'right';
  iconStyle?: CSSProperties;

  negativePadding?: KSpacing | 0;

  br?: KRadius | 0;
  brW?: number;
  brC?: string;

  brTL?: KRadius | 0; // border top left radius
  brTR?: KRadius | 0; // border top right radius
  brBL?: KRadius | 0; // border bottom left radius
  brBR?: KRadius | 0; // border bottom right radius

  kind?: KButtonKind;
  size?: KButtonSize;
  weight?: KButtonLabelWeight;
  title?: string;

  disabled?: boolean;
  isLoading?: boolean;
  stretch?: boolean | 'left' | 'right';
  revert?: boolean;
  thickness?: KThickness;

  background?: string;
  tintColor?: string;
  iconColor?: string;
  textColor?: string;
  hoverColor?: string;

  edge?: 'start' | 'end' | false;
  tight?: boolean;

  enhanceStyle?: CSSProperties;
  hasShadow?: boolean;
  hasHover?: boolean;

  avoidParentPress?: boolean;
  onPress?: React.MouseEventHandler<HTMLButtonElement>;

  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;

  badge?: number;
}

export interface KListItemBaseItemProps extends Omit<KTouchableProps, 'title'> {
  title: string;
  titleProps?: KTextProps;
  subtitle?: string;
  subtitleProps?: KTextProps;
  contentProps?: KViewProps;
  icon?:
    | MIcon
    | {
        name: MIcon;
        color?: string;
        size?: number;
      };
  iconAlignment?: 'left' | 'right';
  rightNode?: {
    icon?: {
      name: MIcon;
      color?: string;
    };
    button?: {
      type: 'solid' | 'transparent' | 'text' | 'outline' | 'icon';
      props: KButtonProps;
    };
    jsx?: JSX.Element;
  };
}

export interface KListItemBaseProps extends KViewProps {
  data: KListItemBaseItemProps[];
  direction?: 'row' | 'column';
  border?: boolean;
}

export interface KCheckboxProps extends SpacingModifiers, StylingModifiers {
  id?: string;
  name?: string;
  tintColor?: string;
  activeColor?: string;
  typo?: TypographyModifiers;
  checked?: boolean;
  label?: string;
  containerStyle?: CSSProperties;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  textAlign?: 'left' | 'right';
  customLabel?: JSX.Element;
}

export interface KCheckboxGroupProps
  extends Omit<KCheckboxProps, 'checked' | 'label' | 'onChange'> {
  data: Omit<KCheckboxProps, 'tintColor' | 'activeColor' | 'typo'>[];
  direction?: 'row' | 'column';
}

export interface KRadioProps extends KCheckboxProps {}

export interface KRadioGroupProps
  extends Omit<KRadioProps, 'checked' | 'label' | 'onChange'> {
  data: Omit<KRadioProps, 'tintColor' | 'activeColor' | 'typo'>[];
  direction?: 'row' | 'column';
}

export interface KInputProps
  extends Omit<SpacingModifiers, 'size'>,
    StylingModifiers,
    LayoutModifiers,
    Omit<TextModifiers, 'textAlign' | 'color'>,
    Omit<OutlinedTextFieldProps, 'margin' | 'color' | 'size' | 'variant'> {
  size?: 'x-large' | 'large' | 'medium' | 'small' | 'x-small';
  inputType?: 'phone' | 'username' | 'email' | 'password' | 'text';
  shrink?: boolean;
  readOnly?: boolean;
  options?: { key: number | string; label: string; disabled?: boolean }[];
  message?: string;
  hint?: string;
  isWarning?: boolean;
  multiple?: boolean;
  accept?: string;
  onPress?: (e?: any) => void;
}

export interface KTabItemProps {
  key?: string | number;
  label: string;
  tooltipLabel?: string;
  disabled?: boolean;
  code?: string;
}

export interface KTabProps extends KCardProps {
  initialIndex?: number;
  onChangeTab?: (param: any) => void;
  tintColor?: string;
  textColor?: string;
  inactiveTextColor?: string;
  tabs: KTabItemProps[];
  typo?: TypographyModifiers;
  spacing?: KSpacing | 0;
  transition?: boolean;
  kind?: 'indicator' | 'background';
  activeBackground?: string;
  askBeforeLeaveIndexes?: (number | [number, boolean])[];
  onAskBeforeLeave?: (onSuccess: () => void, index: number) => void;
  alwaysAskBeforeLeave?: boolean;
}

export interface KTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface KTabInstance {
  onChange: (index: number, byPass?: boolean) => void;
  setTabIndex: (tabIndex: number) => void;
}

export interface KPickerProps {
  name?: string;
  value?: any;
  message?: string;
  onBlur?: (e: any) => void;
  required?: boolean;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
}

export interface KDividerProps {
  type?: 'line' | 'space';
  size?: 'hairline' | 'xs' | 'sm' | 'md';
  transparent?: boolean;
  background?: string;
  vertical?: boolean;
}

export interface KSwitchProps extends Omit<SwitchProps, 'onChange'> {
  onChange?: (checked: boolean) => void;
}

export interface KChipProps
  extends KTouchableProps,
    Pick<KTextProps, 'textTransform' | 'textAlign' | 'typo'> {
  label: string;
  kind?: 'primary' | 'secondary' | 'warning';
  size?: '2xs' | 'xs' | 'sm' | 'md';
  withTooltip?: boolean;
  tooltipLabel?: JSX.Element | string;
  icon?:
    | MIcon
    | {
        name: MIcon;
        color?: string;
        size?: number;
      };
  isLink?: boolean;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  lineHeight?: number;
}

export type KAvatarSize =
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xlg'
  | '2xlg'
  | '3xlg'
  | '4xlg';

export interface KImageProps extends Omit<KViewProps, 'children' | 'onPress'> {
  source?: string;
  alt?: string;
  size?: number;
  width?: number;
  height?: number;
  br?: KRadius;
  onPress?: () => void;
}

export interface KAvatarProps
  extends React.PropsWithChildren<Omit<KImageProps, 'size'>> {
  variant?: 'circle' | 'circular' | 'rounded' | 'square';
  size?: KAvatarSize;
}

export interface KAlertProps {
  status?: 'success' | 'warning' | 'danger' | 'info';
  message?: ((dismiss: () => void) => JSX.Element) | string;
  messageTypo?: TypoType;
  messageColor?: string;
  buttons?: Array<{
    title: string;
    color?: string;
    kind?: KButtonKind;
    weight?: 'bold' | 'normal' | 'medium';
    onPress?: () => void;
    backgroundColor?: string;
    variant?: 'solid' | 'outline' | 'transparent' | 'text'
  }>;
  vertical?: boolean;
  primaryIndex?: number;
  destructiveIndex?: number;
  touchOutsideToDismiss?: boolean;
  alignment?: 'center' | 'top' | true;
}

export interface KPopupProps
  extends Omit<DialogProps, 'title' | 'content' | 'open'> {
  id?: string;
  touchOutsideToDismiss?: boolean;
  title: string;
  titleProps?: {
    id?: string;
    typo?: TypoType;
    color?: string;
    alignment?: 'center' | 'left';
  };
  content: (dismiss: () => void) => any;
}

export interface KPopperProps
  extends Omit<PopperProps, 'content' | 'open' | 'children'> {
  touchOutsideToDismiss?: boolean;
  content: (dismiss: () => void) => any;
  maxW?: number | string;
  maxH?: number | string;
  padding?: KSpacing | 0;
  cardProps?: KCardProps;
  withMaxZIndex?: boolean;
  onDismiss?: () => void;
}

export interface KSnackBarProps {
  message: string | JSX.Element;
  status?: 'info' | 'success' | 'warning' | 'danger';
  autoHideDuration?: number;
}

export interface KBreadcrumbsProps {
  hasBackIcon?: boolean;
  onBack?: () => void;
  title?: string;
  breadcrumbs?: string[];
  leftNode?: {
    jsx?: JSX.Element;
  };
  rightNode?: {
    buttons?: {
      type: 'solid' | 'transparent' | 'text' | 'outline';
      props: KButtonProps;
      ref?: any;
    }[];
    tools?: KButtonProps & {
      ref: React.RefObject<HTMLButtonElement>;
    };
    jsx?: JSX.Element;
  };
  fb?: string;
}

export interface KFormProps extends ComponentPropsWithoutRef<'form'> {}

export interface KTextEditorInstance {
  getContent: () => string;
  getApi: () => TinyMCE | null;
}

export interface KFieldsetProps extends KViewProps {
  renderHeader?: () => any;
  title?: string;
  required?: boolean;
  error?: boolean;
}
