import React from 'react';
import { cn } from '@/utils/functions';
import { Button } from '@/shadcn/button';

import type { IGenericProps } from '@/types/generic-types';

// ============================================================================

interface Props extends IGenericProps {
  onClick?: (e: React.SyntheticEvent) => void;
}

export default function ServerError({ onClick }: Props) {
  return (
    <div className={cn('h-lvh f-col f-center')}>
      <h2>Something went wrong!</h2>
      <Button className="mt-8" type="button" variant="link" onClick={onClick}>
        Try again
      </Button>
    </div>
  );
}
