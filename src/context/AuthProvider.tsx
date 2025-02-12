'use client';

import { SessionProvider } from 'next-auth/react';
import {
  ReactNode, useEffect 
} from 'react';
import {
  useRouter, usePathname 
} from 'next/navigation';
import { deleteCookie } from 'cookies-next/client';

import { useGlobalStore } from '@/store';
import { routes } from 'src/navigation';
import { TOKEN_COOKIE_NAME } from '@/utils/constants';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const { user } = useGlobalStore((state) => state);

  // Init
  useEffect(() => {
    if (!user) {
      deleteCookie(TOKEN_COOKIE_NAME);
    }
  }, [user]);

  useEffect(() => {
    if (String(pathname).startsWith(routes.posts.user.replace('{$id}', ''))) {
      if (!user) {
        push(routes.auth.signin);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <SessionProvider>{children}</SessionProvider>;
};
