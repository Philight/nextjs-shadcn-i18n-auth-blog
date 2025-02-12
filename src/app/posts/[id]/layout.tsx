import React from 'react';
import { getTranslations } from 'next-intl/server';

import MainLayout from '@/layouts/Main';

// import { BLOG_POST } from '@/assets/data';
import { getPost } from '@/api/__generated/posts/posts';
import type { PostResponse } from '@/api/__generated/index.schemas.ts';

// ----------------------------------------------------------------------

const src = '/assets/images/blog_banner.jpeg';

// ----------------------------------------------------------------------

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const t = await getTranslations('posts');

  const resolvedParams = await params;
  const { id } = resolvedParams;

  let post: PostResponse = {} as PostResponse;

  try {
    // post = BLOG_POST;
    post = (
      await getPost(id, { next: { tags: [`getPost-${id}`] }, })
    ).data;
    console.log('getPost', post);
  } catch (e) {}

  if (!post) {
    post = { title: t('title', { id }) };
  }

  return (
    <MainLayout
      title={post.title}
      bannerProps={{
        src,
        alt: 'Blog Background',
        // blurDataURL: base64,
        // placeholder: 'blur',
      }}
      showSearch={false}
    >
      {children}
    </MainLayout>
  );
}

// ----------------------------------------------------------------------
