'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { ZodError } from 'zod';

import { getToken } from '@/utils/server/functions/auth';
import {
  getUserPosts, createPost 
} from '@/api/__generated/posts/posts';
import type {
  PostResponse, PostResponce 
} from '@/api/__generated/index.schemas';

import { routes } from 'src/navigation';

// =================================================================

/**
 * getAuthorPosts()
 * @description Basic Authorization fetch
 */
export async function getAuthorPosts(authorId: any, options?: any) {
  try {
    const token = await JSON.parse((await getToken()) ?? '{}')?.accessToken;

    const posts: PostResponse[] | any = (
      await getUserPosts(String(authorId), {
        headers: {
          // ...(await headers()),
          Authorization: `Bearer ${token}`,
        },
        next: { tags: [`getUserPosts-${authorId}`] },
        credentials: 'include',
        // cache: 'no-store',
        ...options,
      })
    ).data;

    // Authorized, send data
    if (posts?.statusCode !== 401) {
      return posts;
    }
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return { status: 400, message: error.message, timestamp: Date.now() };
    }

    return { status: 500, message: 'Server Error', timestamp: Date.now() };
  }

  // 401 - redirect to Login
  redirect(routes.auth.signin);
}

/**
 * createNewPost()
 * @description Basic Authorization fetch
 */
export async function createNewPost(params: any, options?: any) {
  try {
    const token = await JSON.parse((await getToken()) ?? '{}')?.accessToken;

    const response: PostResponce | any = (
      await createPost(params, {
        headers: { Authorization: `Bearer ${token}` },
        ...options,
      })
    ).data;

    // Revalidate fetches
    if (response.authorId) {
      revalidateTag(`getPosts`);
      revalidateTag(`getUserPosts-${response.authorId}`);
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
