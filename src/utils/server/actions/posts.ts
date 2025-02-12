'use server';

import { revalidateTag } from 'next/cache';
import { ZodError } from 'zod';

import { getToken } from '@/utils/server/functions/auth';
import { getUserPosts, createPost } from '@/api/__generated/posts/posts';
import type { PostResponse, PostResponce } from '@/api/__generated/index.schemas';

// =================================================================

/**
 * getAuthorPosts()
 * @description Basic Authorization fetch
 */
export async function getAuthorPosts(authorId: any, options: any) {
  try {
    const token = JSON.parse(await getToken()).accessToken;

    const posts: PostResponse[] = (
      await getUserPosts(String(authorId), {
        headers: {
          // ...(await headers()),
          Authorization: `Bearer ${token}`,
        },
        next: { tags: [`getUserPosts-${authorId}`] },
        // cache: 'no-store',
        ...options,
      })
    ).data;

    return posts;
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return { status: 400, message: error.message, timestamp: Date.now() };
    }

    return { status: 500, message: 'Server Error', timestamp: Date.now() };
  }
}

/**
 * createNewPost()
 * @description Basic Authorization fetch
 */
export async function createNewPost(params: any, options?: any) {
  try {
    const token = JSON.parse(await getToken()).accessToken;

    const response: PostResponce = (
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
