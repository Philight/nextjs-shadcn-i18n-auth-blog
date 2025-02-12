'use server';

import bcrypt from 'bcryptjs';

import { cookies } from 'next/headers';
import { getCookie, setCookie } from 'cookies-next/server';

import { TOKEN_COOKIE_NAME } from '@/utils/constants';

// ================================================

export type Tokens = {
  accessToken: string;
  refreshToken: string;
  // tokenExpires: number;
} | null;

export async function saltAndHashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(password, salt);
}

export async function saveToken(tokenData: Tokens, options?: any) {
  await setCookie(TOKEN_COOKIE_NAME, JSON.stringify(tokenData), {
    cookies,
    path: '/',
    maxAge: 60 * 60 * 24,
    ...options,
  });
}

export async function getToken() {
  return await getCookie(TOKEN_COOKIE_NAME, { cookies });
}
