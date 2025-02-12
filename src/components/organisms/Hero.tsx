import Heading from '@/atoms/Heading';
import LazyLoadImage from '@/atoms/LazyLoadImage';
import SearchBar from '@/molecules/SearchBar';

import { cn } from '@/utils/functions';
import type { IGenericProps } from '@/types/generic-types';

// ============================================================================

export interface HeroPropsType extends IGenericProps {
  title: string;
  imageProps: {
    src: string;
    alt: string;
    blurDataUrl: string;
    fill?: any;
  };
  showSearch?: boolean;
}

export default function Hero({ title, className, imageProps, showSearch = false }: HeroPropsType) {
  return (
    <section className={cn('hero__c ', className)}>
      <LazyLoadImage fill {...(imageProps ?? {})} withOverlay />
      {title && <Heading tag="h1">{title}</Heading>}
      {showSearch && <SearchBar className="" id="search-bar" />}
    </section>
  );
}
