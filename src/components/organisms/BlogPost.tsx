import { useTranslations } from 'next-intl';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shadcn/card';
import Heading from '@/atoms/Heading';
import { Separator } from '@/shadcn/separator';
import { cn } from '@/utils/functions';
import { fDate } from '@/utils/date';

import type { PostResponse } from '@/api/__generated/index.schemas.ts';

import type { IGenericProps } from '@/types/generic-types';

// ============================================================================

export interface BlogPostProps extends IGenericProps, PostResponse {
  author?: any;
}

export default function BlogPost({ className, content, author = 'Author', authorId, title, updatedAt, createdAt }: BlogPostProps) {
  const t = useTranslations();

  const noBlogPosts = (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      <Card>
        <CardHeader>
          <CardTitle>{t('no_blog_posts.title')}</CardTitle>
          <CardDescription>{t('no_blog_posts.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{t('no_blog_posts.content')}</p>
        </CardContent>
      </Card>
    </div>
  );

  if (!content) {
    return noBlogPosts;
  }

  return (
    <article className={cn('blog-post__c', className)}>
      <div className="blog-post__header">
        <Heading tag="h1">{title}</Heading>
        <Separator className="divider top" orientation="horizontal" />
        <Heading tag="h2">{author}</Heading>
        <Separator className="divider bottom" orientation="horizontal" />
        {/* @ts-ignore */}
        <time pubdate="pubdate" dateTime="2011-08-28" title="August 28th, 2011">
          {fDate(new Date(updatedAt || createdAt))}
        </time>
      </div>
      <p>{content}</p>
    </article>
  );
}
