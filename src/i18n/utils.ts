import zh from './locales/zh-cn.json';
import en from './locales/en.json';
import { defaultLocale, locales, type Locale } from './config';
import type { Translation } from './config';

// en.json 结构与 zh-cn.json 完全一致（satisfies 编译期校验）
const translations: Record<Locale, Translation> = {
  'zh-cn': zh,
  en: en satisfies Translation,
};

/**
 * 从 URL pathname 推断当前语言。
 * pathname 以 /en 开头（含 /en 与 /en/...）返回 'en'，否则返回 'zh-cn'。
 */
export function getLangFromPath(pathname: string): Locale {
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return 'en';
  }
  return defaultLocale;
}

/**
 * 按当前 pathname 返回对应语言的翻译对象（t.xxx.yyy 有完整类型提示）。
 */
export function getTranslation(pathname: string): Translation {
  return translations[getLangFromPath(pathname)];
}

/**
 * 计算切换到目标语言后的 URL。
 * 规则：中文无前缀、英文加 /en 前缀。
 * 例：'/protocol' → en 时 '/en/protocol'；'/en/protocol' → zh 时 '/protocol'；'/' → en 时 '/en'；'/en' → zh 时 '/'。
 */
export function getAlternatePath(pathname: string, targetLang: Locale): string {
  const stripped = getLocalizedPath(pathname, 'zh-cn');
  if (targetLang === 'zh-cn') {
    return stripped;
  }
  return stripped === '/' ? '/en' : `/en${stripped}`;
}

/**
 * 给站内链接加当前语言前缀（导航、Footer 链接用）。
 * path 以 / 开头；lang='zh-cn' 时返回原 path；lang='en' 时返回 '/en' + path（path 为 '/' 时返回 '/en'）。
 * path 本身带 /en 前缀时先去掉再处理，避免双重前缀。
 */
export function getLocalizedPath(path: string, lang: Locale): string {
  const stripped = path.startsWith('/en') ? path.replace(/^\/en/, '') || '/' : path;
  if (lang === 'zh-cn') {
    return stripped;
  }
  return stripped === '/' ? '/en' : `/en${stripped}`;
}
