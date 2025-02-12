'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '../shadcn/card';
import BlogListItem from '@/components/molecules/BlogListItem';
import Heading from '@/components/atoms/Heading';

import { useGlobalStore } from '@/store';
import { cn } from '@/utils/functions';
import { PostResponse } from '@/api/__generated/index.schemas.ts';
import type { IGenericProps } from '@/types/generic-types';
// import { PAGINATIOIN_LIMIT } from '@/utils/constants';

// ============================================================================

export interface BlogListProps extends IGenericProps {
  posts: PostResponse[];
  title?: string;
}

export default function BlogList({ posts, className, title }: BlogListProps) {
  const t = useTranslations();
  const { filters = { title: '' } } = useGlobalStore((state) => state);

  const filtered = useMemo(
    () => posts.filter((p: PostResponse) => [p.title, p.content].some((text: string) => (filters ? text.includes(filters.title) : true))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [posts.length, JSON.stringify(filters)?.length],
  );

  const noBlogPosts = (
    <Card className="no-blog-posts__c">
      <CardHeader>
        <CardTitle>{t('no_blog_posts.title')}</CardTitle>
        <CardDescription>{t('no_blog_posts.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{t('no_blog_posts.content')}</p>
      </CardContent>
    </Card>
  );

  if (!posts || posts.length === 0) {
    return noBlogPosts;
  }

  return (
    <section className={cn('blog-list__c', className)}>
      <Heading tag="h2">{title ?? t('blog.blog_title')}</Heading>
      <div className={cn('blog-list__grid masonry-grid cols-3')}>
        {filtered.map(
          (post: PostResponse, index: number) =>
            post?.published && (
              // index < PAGINATIOIN_LIMIT && (
              <div key={index} className="masonry-grid-item">
                <BlogListItem {...post} />
              </div>
            ),
        )}
      </div>
    </section>
  );
}
