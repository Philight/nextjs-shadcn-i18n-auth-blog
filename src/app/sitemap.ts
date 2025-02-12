import type { MetadataRoute } from 'next';

import { getPosts } from '@/api/__generated/posts/posts';
import type { PostResponse } from '@/utils/api/__generated/index.schemas';
import { fDate } from '@/utils/date';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: PostResponse[] =
    (
      await getPosts({
        next: { tags: [`getPosts`] },
        cache: 'force-cache',
      })
    ).data ?? [];

  // @ts-ignore
  const blogPosts: MetadataRoute.Sitemap = posts.map((p) => {
    const { title, content, published, createdAt, updatedAt } = p;
    return {
      title,
      content,
      lastModified: fDate(new Date(updatedAt || createdAt)),
    };
  });

  return [
    {
      url: 'https://addwebsite.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://addwebsite.com/profile',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://addwebsite.com/login',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    {
      url: 'https://addwebsite.com/signup',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    ...blogPosts,
  ];
}
