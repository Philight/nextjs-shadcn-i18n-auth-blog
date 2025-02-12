import Image, { ImageProps } from 'next/image';
import { generateBlurDataURL } from '@/utils/server/functions/images';

import { Layer } from '@/atoms/Layer';
import type { IGenericProps } from '@/types/generic-types';
import { cn } from '@/utils/functions';

// ============================================================================

export interface LazyLoadImagePropsType extends Omit<IGenericProps, 'style'>, ImageProps {
  src: string;
  alt: string;
  blurDataURL?: string;
  width?: number;
  withOverlay?: boolean;
}

// USE THIS ONLY ON SERVER SIDE COMPONENTS
export default async function LazyLoadImageAsync({ className, src, alt, blurDataURL, withOverlay, ...rest }: LazyLoadImagePropsType) {
  const base64 = await generateBlurDataURL(src);

  return (
    <div className={cn('LazyLoadImage__c', className)}>
      {withOverlay && <Layer className="overlay" />}
      <Image
        src={src}
        alt={alt}
        loading="lazy"
        placeholder="blur"
        blurDataURL={base64}
        {...rest}
        // style={{ height: '100%' }} // optional
      />
    </div>
  );
}
