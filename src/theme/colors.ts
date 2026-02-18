export const colors = {
  // Primary palette
  primary: '#6C5CE7',
  primaryLight: '#A29BFE',
  primaryDark: '#5A4BD1',

  // Accent
  accent: '#00CEC9',
  accentLight: '#81ECEC',

  // Status
  success: '#00B894',
  warning: '#FDCB6E',
  danger: '#E17055',
  info: '#74B9FF',

  // Neutrals
  background: '#F8F9FD',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  border: '#E8ECF4',
  borderLight: '#F0F2F8',

  // Text
  text: '#2D3436',
  textSecondary: '#636E72',
  textTertiary: '#B2BEC3',
  textOnPrimary: '#FFFFFF',
  textOnDark: '#FFFFFF',

  // Dark surface (for header/sidebar)
  darkSurface: '#1A1A2E',
  darkSurfaceLight: '#16213E',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const },
  h2: { fontSize: 22, fontWeight: '700' as const },
  h3: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  bodyBold: { fontSize: 15, fontWeight: '600' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
  small: { fontSize: 11, fontWeight: '500' as const },
};
