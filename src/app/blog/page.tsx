import { Metadata } from 'next';

// import { BLOG_POSTS } from '@/assets/data';
import { getPosts } from '@/api/__generated/posts/posts';
import type { PostResponse } from '@/utils/api/__generated/index.schemas';

import BlogList from '@/organisms/BlogList';
import ServerError from '@/molecules/ServerError';

// ===============================================================

// export const dynamic = 'force-dynamic';
export const dynamic = 'force-static';

// invalidate every hour
export const revalidate = 60 * 60;

// ===============================================================

export default async function Home() {
  let posts: PostResponse[] = [];

  try {
    // posts = BLOG_POSTS;
    posts = (
      await getPosts({
        next: { tags: [`getPosts`] },
        cache: 'force-cache',
      })
    ).data;
  } catch (e) {
    console.error(e);
  }

  if (!posts || !posts.length) {
    return <ServerError />;
  }

  return <BlogList posts={posts} />;
}

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Newest blog posts',
};
