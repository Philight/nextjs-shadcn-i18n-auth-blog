import { Metadata } from 'next';

import AuthorPosts from '@/organisms/AuthorPosts';

// ===============================================================

// Force static generation
// export const dynamic = 'force-static';

// invalidate every hour
// export const revalidate = 3600;

// ===============================================================

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const { id: authorId } = resolvedParams;

  return <AuthorPosts id={authorId} />;
}

// ===============================================================

export const metadata: Metadata = {
  title: 'Author posts',
  description: 'Newest blog posts from the author',
};
