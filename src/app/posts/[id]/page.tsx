import { Metadata } from 'next';

import BlogPost from '@/organisms/BlogPost';
import ServerError from '@/molecules/ServerError';

// import { BLOG_POST } from '@/assets/data';
import { getPost } from '@/api/__generated/posts/posts';
import type { PostResponse } from '@/api/__generated/index.schemas.ts';

// ===============================================================

// export const dynamic = 'force-dynamic';

// invalidate every day
// export const revalidate = 60 * 60 * 24;

// ===============================================================

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  let post: PostResponse = {} as PostResponse;

  try {
    // post = BLOG_POST;
    post = (await getPost(id, { next: { tags: [`getPost-${id}`] } })).data;
  } catch (e) {}

  if (!post || !Object.keys(post).length) {
    return <ServerError />;
  }

  return <BlogPost {...post} />;
}

// ===============================================================

export const metadata: Metadata = {
  title: 'Post article',
  description: 'Content',
};
