import zh from './locales/zh-cn.json';

/** 支持的语言列表（Astro i18n locale 代码） */
export const locales = ['zh-cn', 'en'] as const;

/** 语言代码联合类型 */
export type Locale = (typeof locales)[number];

/** 默认语言：中文（无 URL 前缀） */
export const defaultLocale: Locale = 'zh-cn';

/** 语言展示名（用于切换器显示） */
export const localeLabels: Record<Locale, string> = {
  'zh-cn': '中文',
  en: 'EN',
};

/** 翻译结构类型（从 zh-cn.json 推断，en.json 用 satisfies 校验一致） */
export type Translation = typeof zh;
