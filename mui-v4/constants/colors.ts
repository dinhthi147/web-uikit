const palette = {
  primary: {
    w50: '#E4FCFA',
    w100: '#C3F8F5',
    w200: '#8CF2EB',
    w300: '#51EBE1',
    w400: '#19E1D3',
    w500: '#13A89E',
    w600: '#0F857D',
    w700: '#0B655F',
    w800: '#084541',
    w900: '#04201E'
  },
  secondary: {
    w50: '#FEEDEC',
    w100: '#FDDBD8',
    w200: '#FAB2AD',
    w300: '#F88E86',
    w400: '#F66A5F',
    w500: '#F44336',
    w600: '#F22112',
    w700: '#D0190B',
    w800: '#A91409',
    w900: '#871007'
  },
  blue: {
    w50: '#EBF4F9',
    w100: '#D7EAF4',
    w200: '#B0D4E8',
    w300: '#88BFDD',
    w400: '#61AAD1',
    w500: '#3995C5',
    w600: '#3283AE',
    w700: '#2C7196',
    w800: '#255F7F',
    w900: '#1E4D67'
  },
  warning: {
    w50: '#FFF5E5',
    w100: '#FFEBCC',
    w200: '#FFD699',
    w300: '#FFC266',
    w400: '#FFAD33',
    w500: '#FF9800',
    w600: '#E08700',
    w700: '#C27400',
    w800: '#A36200',
    w900: '#855000'
  },
  gray: {
    w25: '#EFEFEF',
    w50: '#DDDEDF',
    w100: '#C2C5C7',
    w200: '#A8ADAF',
    w300: '#8E9496',
    w400: '#747B7E',
    w500: '#686F72',
    w600: '#5C6366',
    w700: '#505759',
    w800: '#444A4D',
    w900: '#393E40'
  }
};

const opacity = {
  primary: {
    16: 'rgba(19, 168, 158, 0.16)'
  },
  secondary: {
    16: 'rgba(244,67,54, 0.16)'
  },
  warning: {
    16: 'rgba(255,152,0, 0.16)'
  },
  blue: {
    16: 'rgba(57,149,197, 0.16)'
  },
  black: {
    54: 'rgba(0, 0, 0, 0.54)'
  },
  grayDarker: {
    10: 'rgba(0, 0, 0, 0.12)',
    20: 'rgba(0, 0, 0, 0.26)'
  },
  grayDark: {
    10: 'rgba(57, 62, 64, 0.1)',
    20: 'rgba(57, 62, 64, 0.2)'
  },
  gray: {
    10: 'rgba(116, 123, 126, 0.1)',
    20: 'rgba(116, 123, 126, 0.2)'
  },
  grayLight: {
    10: 'rgba(168, 173, 175, 0.1)',
    20: 'rgba(168, 173, 175, 0.2)'
  },
  grayLighter: {
    10: 'rgba(221, 222, 223, 0.1)',
    20: 'rgba(221, 222, 223, 0.2)'
  }
};

const brand = {
  primary: {
    dark: palette.primary.w700,
    normal: palette.primary.w500,
    light: palette.primary.w300
  },
  secondary: {
    dark: palette.secondary.w700,
    normal: palette.secondary.w500,
    light: palette.secondary.w300
  },
  blue: {
    dark: palette.blue.w700,
    normal: palette.blue.w500,
    light: palette.blue.w300
  },
  normal: {
    dark: palette.gray.w900,
    normal: palette.gray.w100,
    light: palette.gray.w25
  },
  warning: {
    dark: palette.warning.w700,
    normal: palette.warning.w500,
    light: palette.warning.w300
  },
  info: {
    dark: palette.blue.w700,
    normal: palette.blue.w500,
    light: palette.blue.w300
  },
  success: {
    dark: palette.primary.w700,
    normal: palette.primary.w500,
    light: palette.primary.w300
  },
  danger: {
    dark: palette.secondary.w700,
    normal: palette.secondary.w500,
    light: palette.secondary.w300
  },
  border: {
    dark: palette.gray.w200,
    normal: palette.gray.w50,
    light: palette.gray.w25
  },
  gray: {
    dark: palette.gray.w900,
    normal: palette.gray.w600,
    light: palette.gray.w400
  }
};

const KColors = {
  background: '#EEEEEE',
  black: '#263238',
  white: '#FFFFFF',
  transparent: 'transparent',
  overlay: 'rgba(0,0,0,0.2)',
  link: '#1976d2',
  palette,
  //   gradients,
  opacity,
  hexToRgba: (hex: string, alpha: number) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)}, ${parseInt(
          result[3],
          16
        )}, ${alpha})`
      : hex;
  },
  ...brand
};

export default KColors;
