// TODO Auth client redirects

'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  console.log('AuthProvider');
  return <SessionProvider>{children}</SessionProvider>;
};
