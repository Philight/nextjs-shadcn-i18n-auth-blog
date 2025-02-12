'use server';

// import { redirect } from 'next/navigation';
import { ZodError } from 'zod';

import { signIn } from '@/api/__generated/auth/auth';
import type { Auth } from '@/api/__generated/index.schemas';
import { saveToken } from '@/utils/server/functions/auth';

// =================================================================

type ResponseType = Auth;

export async function signInAndSave(params: any, options?: any) {
  try {
    const response: ResponseType = (await signIn(params, options)).data;

    const { accessToken, refreshToken } = response;

    if (accessToken) {
      saveToken({ accessToken, refreshToken });
      // const cookieStore = await cookies();
      // cookieStore.set(TOKEN_COOKIE_NAME, JSON.stringify({ accessToken, refreshToken }));
    }

    return response;
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return { status: 400, message: error.message, timestamp: Date.now() };
    }

    return { status: 500, message: 'Server Error', timestamp: Date.now() };
  }
}
