import React from 'react';
import { getTranslations } from 'next-intl/server';

import MainLayout from '@/layouts/Main';

// ----------------------------------------------------------------------

const src = '/assets/images/blog_banner.jpeg';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const t = await getTranslations();
  return (
    <MainLayout
      title={t('profile.title')}
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
