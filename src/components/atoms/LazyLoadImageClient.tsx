import React, {
  useState, useEffect 
} from 'react';

import Image, { ImageProps } from 'next/image';
import { generateBlurDataURL } from '@/utils/server/functions/images';

import { Layer } from '@/atoms/Layer';
import type { IGenericProps } from '@/types/generic-types';
import { cn } from '@/utils/functions';

// ============================================================================

const BASE64_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

// ============================================================================

export interface LazyLoadImagePropsType extends IGenericProps, ImageProps {
  src: string;
  alt: string;
  blurDataURL: string;
  width?: number;
  withOverlay?: boolean;
}

export default function LazyLoadImageClient({ className, src, alt, blurDataURL, withOverlay, ...rest }: LazyLoadImagePropsType) {
  const [base64, setBase64] = useState(BASE64_PLACEHOLDER);

  // const base64 = await generateBlurDataURL(src);
  useEffect(() => {
    (async () => {
      const _base64 = await generateBlurDataURL(src);
      setBase64(_base64);
    })();
  });

  return (
    <div className={cn('LazyLoadImage__c', className)}>
      {withOverlay && <Layer className="overlay" />}
      <Image
        src={src}
        alt={alt}
        loading="lazy"
        placeholder="blur"
        blurDataURL={BASE64_PLACEHOLDER}
        {...rest}
        // style={{ height: '100%' }} // optional
      />
    </div>
  );
}
