import type { Config } from 'tailwindcss';
import { theme } from './src/config/theme';

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        aep: {
          primary: theme.primary,
          'primary-dark': theme.primaryDark,
          'primary-light': theme.primaryLight,
          navy: theme.navy,
          blue: theme.blue,
          purple: theme.purple,
          green: theme.green,
          amber: theme.amber,
          red: theme.red,
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
