/**
 * AEP brand theme tokens.
 * Single source of truth for colors used across the site.
 * Tailwind config and CSS variables reference these values.
 */
export const theme = {
  // 主色
  primary: '#00B8D9',
  primaryDark: '#0099B8',
  primaryLight: '#33C6E0',
  // 辅助色
  navy: '#0B132B',
  blue: '#2563EB',
  purple: '#8B5CF6',
  green: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
  // 中性色
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  // 背景
  bgLight: '#FFFFFF',
  bgDark: '#0B132B',
  bgCardLight: '#F8FAFC',
  bgCardDark: '#1E293B',
} as const;
