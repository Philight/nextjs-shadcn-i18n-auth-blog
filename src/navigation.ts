import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';

import {
  locales, pathnames, localePrefix 
} from './config-global';
// import { locale, messages } from '../i18n/request';

export const { Link, getPathname, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation({
  locales,
  pathnames,
  localePrefix,
});

const ROOTS = {
  HOME: '/',
  BLOG: '/blog',
  AUTH: '/auth',
  POSTS: '/posts',
  PROFILE: '/profile',
  LEGAL: '/legal',
};

export const routes = {
  home: '/',
  landing: { root: ROOTS.HOME },
  // AUTH
  auth: {
    root: ROOTS.AUTH,
    signin: `${ROOTS.AUTH}/signin`,
    signup: `${ROOTS.AUTH}/signup`,
  },
  // PROFILE
  profile: { root: ROOTS.PROFILE, },
  // BLOG
  blog: { root: ROOTS.BLOG },
  posts: {
    root: ROOTS.POSTS,
    id: `${ROOTS.POSTS}/{$id}`,
    user: `${ROOTS.POSTS}/author/{$id}`,
  },
  // LEGAL
  legal: {
    termsConditions: `${ROOTS.LEGAL}/terms-and-conditions`,
    privacyPolicy: `${ROOTS.LEGAL}/privacy-policy`,
  },
};

type NavItem = { title: (_t: any) => string; href: string; description: string };

export const navigation: { [key: string]: NavItem[] } = {
  home: [
    {
      title: (translations: any) => translations('navigation.home'),
      href: routes.home,
      description: (translations: any) => translations('login.title'),
    },
  ],
  profile: [
    {
      title: (translations: any) => translations('navigation.profile'),
      href: routes.profile.root,
      description: (translations: any) => translations('login.title'),
    },
  ],
  auth: [
    {
      title: (translations: any) => translations('navigation.login'),
      href: routes.auth.signin,
      description: (translations: any) => translations('login.title'),
    },
    {
      title: (translations: any) => translations('navigation.signup'),
      href: routes.auth.signup,
      description: (translations: any) => translations('signup.title'),
    },
  ],
};
