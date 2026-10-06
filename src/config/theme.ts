/**
 * AEP brand theme tokens.
 * Single source of truth for colors used across the site.
 * Tailwind config and CSS variables reference these values.
 *
 * 令牌分三层，请按用途取用，不要混用：
 *  1. brand  —— 品牌色：用于填充、描边、装饰、图形（浅底上的文字请改用 ink 层）
 *  2. ink    —— 文字专用强调色：在对应主题底色上对比度均 ≥ 4.5:1（WCAG AA 正文）
 *  3. surface—— 背景 / 中性灰阶 / 边框 / 语义色
 *
 * 对比度数值标注格式为「浅色主题 白底 / 卡片底」或「深色主题 深底 / 卡片底」。
 */
export const theme = {
  /* ---------- 1. 品牌色（填充 / 描边 / 装饰） ---------- */
  primary: '#00B8D9', // 品牌主色：填充、描边、图形（白底文字仅 2.37:1，禁止直接用于浅底文字）
  primaryDark: '#0099B8', // 主色 hover / active 填充
  primaryLight: '#33C6E0', // 主色浅色变体：渐变、装饰

  /* ---------- 2. 文字专用强调色 ---------- */
  // 浅色主题（对 #FFFFFF / #F8FAFC 的对比度）
  primaryInkLight: '#0E7490', // cyan-700   5.36:1 / 5.12:1
  greenInkLight: '#047857', // emerald-700 5.48:1 / 5.24:1
  amberInkLight: '#92400E', // amber-800   7.09:1 / 6.78:1（琥珀标签底上 6.07:1）
  purpleInkLight: '#6D28D9', // violet-700  7.10:1 / 6.79:1
  blueInkLight: '#1D4ED8', // blue-700    6.70:1 / 6.41:1
  redInkLight: '#B91C1C', // red-700     6.47:1 / 6.18:1
  // 深色主题（对 #0B132B / #16213E 的对比度）
  primaryInkDark: '#22D3EE', // cyan-400    10.17:1 / 8.80:1
  greenInkDark: '#34D399', // emerald-400  9.56:1 / 8.27:1
  amberInkDark: '#FBBF24', // amber-400   11.01:1 / 9.52:1
  purpleInkDark: '#A78BFA', // violet-400   6.76:1 / 5.84:1
  blueInkDark: '#60A5FA', // blue-400     7.23:1 / 6.25:1
  redInkDark: '#F87171', // red-400      6.65:1 / 5.75:1

  /* ---------- 3. 中性色 / 语义色（非文字用途） ---------- */
  navy: '#0B132B',
  blue: '#2563EB',
  purple: '#8B5CF6',
  green: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
  // 中性灰阶
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

  /* ---------- 4. 背景 / 表面 ---------- */
  // 浅色主题
  bgLight: '#FFFFFF', // 页面底
  bgSubtleLight: '#F8FAFC', // 次级表面（页脚、柔和高亮）
  bgCardLight: '#F8FAFC', // 卡片
  borderLight: '#D6DFEA', // 浅色边框（1.35:1 白底 / 1.29:1 卡片底）
  codeBgLight: '#0F1C33', // 代码块底色（浅色主题下仍为深色块）
  codeTextLight: '#E2E8F0',
  codeBorderLight: '#1E2E4A',
  // 深色主题
  bgDark: '#0B132B', // 页面底
  bgSubtleDark: '#121C36', // 次级表面（页脚、hover 填充）
  bgCardDark: '#16213E', // 卡片（与页面底 1.16:1，配合边框拉开层次）
  borderDark: '#3B4A70', // 深色边框（对页面底 2.10:1，对卡片 1.82:1）
  codeBgDark: '#0A1122', // 代码块底色（比页面底更深，形成下凹层次）
  codeTextDark: '#E2E8F0',
  codeBorderDark: '#2B3A5E',
} as const;
