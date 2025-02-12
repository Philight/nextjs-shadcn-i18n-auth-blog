import React from 'react';
import { getTranslations } from 'next-intl/server';

import MainLayout from '@/layouts/Main';

// ----------------------------------------------------------------------

// const src = 'https://www.sanfordandsoncoins.com/sites/default/files/2024-05/antiques%20in%20a%20home.jpeg';
const src = '/assets/images/blog_banner.jpeg';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const t = await getTranslations();
  return (
    <MainLayout
      title={t('blog.title')}
      bannerProps={{
        src,
        alt: 'Blog Background',
        // blurDataURL: base64,
        // placeholder: 'blur',
      }}
    >
      {children}
    </MainLayout>
  );
}

// ----------------------------------------------------------------------
