import { getUsersWithPaginationAndFilter } from '@/utils/api/usersApi';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const usersAndPagination = await getUsersWithPaginationAndFilter();
  // @ts-ignore
  const usersURL: MetadataRoute.Sitemap = usersAndPagination.users.map((user) => {
    return {
      url: `https://addwebsite.com/${user}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
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
    ...usersURL,
  ];
}
