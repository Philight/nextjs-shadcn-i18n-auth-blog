// TODO Loader / Skeleton

'use client';

import { useTranslations } from 'next-intl';
import {
  useState, useEffect 
} from 'react';

import { getAuthorPosts } from '@/utils/server/actions/posts';
import type { PostResponse } from '@/utils/api/__generated/index.schemas';

import ServerError from '@/molecules/ServerError';
import BlogList from '@/organisms/BlogList';

// ===============================================================

type Props = {
  id: string;
};

export default function AuthorPosts({ id }: Props) {
  const t = useTranslations();
  const [authorPosts, setPosts] = useState<PostResponse>([]);

  // Client Fetch
  useEffect(() => {
    const fetchPosts = async () => {
      if (id) {
        const posts: PostResponse[] = await getAuthorPosts(id);
        setPosts(posts ?? []);
      }
    };
    fetchPosts();
     
  }, [id]);

  if (!authorPosts) {
    return <ServerError />;
  }

  return <BlogList posts={authorPosts} title={t('author.blog_title')} />;
}

// ===============================================================
