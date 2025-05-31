export const Colors = {
  light: {
    background: '#FFFFFF',
    surface: '#F8F9FA',
    surfaceSecondary: '#E9ECEF',
    primary: '#6366F1',
    primaryLight: '#A5B4FC',
    primaryDark: '#4338CA',
    secondary: '#EC4899',
    secondaryLight: '#F9A8D4',
    accent: '#F59E0B',
    accentLight: '#FCD34D',
    text: '#1F2937',
    textSecondary: '#6B7280',
    textLight: '#9CA3AF',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    white: '#FFFFFF',
    black: '#000000',
  },
  dark: {
    background: '#0F172A',
    surface: '#1E293B',
    surfaceSecondary: '#334155',
    primary: '#818CF8',
    primaryLight: '#A5B4FC',
    primaryDark: '#6366F1',
    secondary: '#F472B6',
    secondaryLight: '#FBCFE8',
    accent: '#FBBF24',
    accentLight: '#FCD34D',
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textLight: '#94A3B8',
    border: '#475569',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    white: '#FFFFFF',
    black: '#000000',
  },
};

export const Gradients = {
  primary: ['#6366F1', '#8B5CF6'],
  secondary: ['#EC4899', '#F97316'],
  accent: ['#F59E0B', '#EF4444'],
  background: ['#0F172A', '#1E293B'],
  surface: ['#1E293B', '#334155'],
  rainbow: ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B'],
};

export const Typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  fontWeights: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
  '5xl': 80,
};

export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 8,
  },
};
