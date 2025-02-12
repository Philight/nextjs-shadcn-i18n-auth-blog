'use server';


import { ZodError } from 'zod';

import { signIn } from '@/api/__generated/auth/auth';
import { saveToken } from '@/utils/server/functions/auth';

export async function signInAndSave(params: any, options?: any) {
  try {
    const response: ResponseType = (await signIn(params, options)).data;

    console.log('signInAndSave', response);

    const { accessToken, refreshToken } = response;

    if (accessToken) {
      console.log('signInAndSave yes, accessToken');
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

  // revalidateTag(`getUserPosts-${authorId}`);
}
