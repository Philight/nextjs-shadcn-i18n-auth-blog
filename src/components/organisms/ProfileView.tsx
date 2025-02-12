// TODO Loader / SKeleton

'use client';

import { useTranslations } from 'next-intl';
import {
  useState, useEffect 
} from 'react';

import {
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/shadcn/tabs';
import CreatePostForm from '@/organisms/CreatePostForm';
import UserCard from '@/organisms/UserCard';
import BlogList from '@/organisms/BlogList';

import { useGlobalStore } from '@/store';
import { getAuthorPosts } from '@/utils/server/actions/posts';
import type { PostResponse } from '@/api/__generated/index.schemas.ts';

import { cn } from '@/utils/functions';
import type { IGenericProps } from '@/types/generic-types';

// ============================================================================

const TABS = [
  { key: 'profile', label: 'Profile' },
  { key: 'my-posts', label: 'My Posts' },
  { key: 'create-post', label: 'Create Post' },
];

// ============================================================================

export interface Props extends IGenericProps {
  title: string;
  imageProps: {
    src: string;
    alt: string;
    blurDataUrl: string;
    fill?: any;
  };
  showSearch?: boolean;
}

export default function ProfileView({ title, className, imageProps }: Props) {
  const t = useTranslations();
  const { user } = useGlobalStore((state) => state);
  const [userPosts, setPosts] = useState([]);

  // Client Fetch
  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        const posts: PostResponse[] = await getAuthorPosts(user.id);
        console.log('ProfileView getAuthorPosts', posts);
        setPosts(posts ?? []);
      }
    };
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(user).length]);

  return (
    <section className={cn('profile-view__c', className)}>
      <Tabs defaultValue={TABS[0].key} className="profile-view__tabs">
        <TabsList className="profile-view__tabs-list">
          {TABS.map((t) => (
            <TabsTrigger key={t.key} value={t.key}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile" className="profile-view__tabs-content profile">
          <UserCard className="" />
        </TabsContent>

        <TabsContent value="my-posts" className="profile-view__tabs-content my-posts">
          <BlogList className="" posts={userPosts} title={t('author.blog_title')} />
        </TabsContent>

        <TabsContent value="create-post" className="profile-view__tabs-content create-post">
          <CreatePostForm className="" />
        </TabsContent>
      </Tabs>
    </section>
  );
}
