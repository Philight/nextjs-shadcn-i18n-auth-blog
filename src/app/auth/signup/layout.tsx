import React from 'react';
import { getTranslations } from 'next-intl/server';

import AuthLayout from '@/layouts/Auth';

// ----------------------------------------------------------------------

const bannerProps = {
  src: '/assets/images/blog_banner.jpeg',
  alt: 'Blog Background',
  // placeholder: 'blur',
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const t = await getTranslations();
  return (
    <AuthLayout
      title={t('signup.title')}
      bannerProps={{
        ...bannerProps,
        // blurDataURL: base64,
      }}
    >
      {children}
    </AuthLayout>
  );
}

// ----------------------------------------------------------------------
