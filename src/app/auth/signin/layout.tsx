import React from 'react';
import { getTranslations } from 'next-intl/server';

import AuthLayout from '@/layouts/Auth';

// ----------------------------------------------------------------------

const src = '/assets/images/blog_banner.jpeg';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const t = await getTranslations();
  return (
    <AuthLayout
      title={t('signin.title')}
      bannerProps={{
        src,
        alt: 'Blog Background',
        // blurDataURL: base64,
        // placeholder: 'blur',
      }}
    >
      {children}
    </AuthLayout>
  );
}

// ----------------------------------------------------------------------
