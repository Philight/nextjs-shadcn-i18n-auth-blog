import React from 'react';

import { cn } from '@/utils/functions';

import type {
  IGenericProps, IGenericComponent 
} from '@/types/generic-types';

// ============================================================================

interface IComponentProps extends IGenericProps {
  onClick?: React.MouseEventHandler<HTMLCanvasElement> | undefined;
}

export function Layer({ className, style, onClick }: IComponentProps): IGenericComponent {
  return <canvas className={cn(`layer__c`, className)} style={{ ...style }} onClick={onClick} />;
}
