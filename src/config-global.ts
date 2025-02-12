import {
  Pathnames, LocalePrefix 
} from 'next-intl/routing';

export const defaultPerPage = 25;
export const defaultPage = 1;

export const defaultLocale = 'cs' as const;
export const locales = ['cs'] as const;

export const pathnames: Pathnames<typeof locales> = { '/': '/' };

// export const localePrefix: LocalePrefix<typeof locales> = 'as-needed';
export const localePrefix = 'as-needed' as LocalePrefix;
