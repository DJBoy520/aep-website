import type { Config } from 'tailwindcss';
import { theme } from './src/config/theme';

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        aep: {
          // 品牌色（填充 / 描边 / 装饰）
          primary: theme.primary,
          'primary-dark': theme.primaryDark,
          'primary-light': theme.primaryLight,
          navy: theme.navy,
          blue: theme.blue,
          purple: theme.purple,
          green: theme.green,
          amber: theme.amber,
          red: theme.red,
          // 文字专用强调色：随 data-theme 切换的 CSS 变量，浅底/深底均可安全用作正文色
          'primary-ink': 'var(--aep-ink-primary)',
          'blue-ink': 'var(--aep-ink-blue)',
          'purple-ink': 'var(--aep-ink-purple)',
          'green-ink': 'var(--aep-ink-green)',
          'amber-ink': 'var(--aep-ink-amber)',
          'red-ink': 'var(--aep-ink-red)',
          // 实心填充与其中文字：成对使用（bg-aep-fill-* + text-aep-on-fill）
          'fill-primary': 'var(--aep-fill-primary)',
          'fill-primary-hover': 'var(--aep-fill-primary-hover)',
          'fill-accent': 'var(--aep-fill-accent)',
          'on-fill': 'var(--aep-on-fill)',
        },
      },
      fontFamily: {
        // 拉丁字形走 Inter，其后为中文回退栈；system-ui 放在 CJK 之前以适配各平台默认中文字体
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'PingFang SC',
          'Hiragino Sans GB',
          'Noto Sans SC',
          'Source Han Sans SC',
          'Microsoft YaHei',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
      boxShadow: {
        // 随主题切换的层次令牌（见 src/styles/global.css）
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
      },
      transitionTimingFunction: {
        // 全站统一缓动，避免各处 ease-in-out / linear 混用
        aep: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
