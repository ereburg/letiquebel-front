export const colors = {
  accent: '#00b8d4',
  accentLight: '#48cadd',
  black: '#000000',
  white: '#ffffff',
  grey: '#cccccc',
  greyLight: '#f5f5f5',
  greyMiddle: '#ededed',
  greyDark: '#888888',
  redLight: '#ff5252',
  silver: '#4f4f4f',
  delta: '#a3a3a3',
  brownLight: '#FBF4F4',
  brown: '#B07773',
  brownDark: '#9B504B',
  outline: 'rgba(77, 144, 254, 0.6)',
  red: 'red',
} as const;

/** Source: https://htmlacademy.ru/blog/useful/css/short-14 */
const fallbackFont = [
  '-apple-system',
  "'BlickMacSystemFont'",
  "'Segoe UI'",
  "'Roboto'",
  "'Oxygen'",
  "'Ubuntu'",
  "'Cantarell'",
  "'Fira Sans'",
  "'Droid Sans'",
  "'Helvetica Neue'",
  'sans-serif',
].join(',');

export const fonts = {
  Harmonia: `'Harmonia', ${fallbackFont}`,
};

export const breakpoints = {
  mobileS: 335,
  mobileM: 375,
  mobileL: 514,
  mobile: 767,
  tablet: 1024,
  laptop: 1260,
  desktop: 1500,
};

export const timingFn = {
  ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)',
  easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  easeOut2: 'cubic-bezier(0.16, 0, 0, 1.01)',
};
