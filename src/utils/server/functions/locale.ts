'use server';

import { Locale } from '@/i18n/request';
import {
  DEFAULT_LOCALE, LOCALE_COOKIE_NAME 
} from '@/utils/constants';
import { cookies } from 'next/headers';

export async function getUserLocale(): Promise<Locale> {
  const currentCookies = await cookies();
  const currentLocale = currentCookies.get(LOCALE_COOKIE_NAME)?.value || DEFAULT_LOCALE;

  return currentLocale as Locale;
}

export async function setUserLocale(locale: Locale): Promise<void> {
  const currentCookies = await cookies();

  currentCookies.set(LOCALE_COOKIE_NAME, locale, { maxAge: 5, httpOnly: true, secure: true, sameSite: 'strict' });
}
