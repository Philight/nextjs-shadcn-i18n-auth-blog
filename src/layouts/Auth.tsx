import {
  DetailedHTMLProps, HTMLAttributes, ReactNode 
} from 'react';

import Header from '@/organisms/Header';
import { Footer } from '@/organisms/Footer';
import Hero from '@/organisms/Hero';

import { cn } from '@/utils/functions';
import type { IGenericProps } from '@/types/generic-types';

// ==================================================================

export interface MainPropsType extends IGenericProps, Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, 'style'> {
  children: ReactNode;
  title: string;
  bannerProps: {
    src: string;
    alt: string;
    blurDataURL?: string;
    placeholder?: string;
  };
}

const Auth = ({ className, children, title = 'Title', bannerProps }: MainPropsType) => {
  return (
    <div className={cn('layout__c layout--auth', className)}>
      <Header />
      <main className={cn('f-col overflow-hidden')}>
        <Hero
          className=""
          title={title}
          imageProps={{
            fill: true,
            ...bannerProps,
          }}
          showSearch={false}
        />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
