import Icon from '@/atoms/Icon';

import { cn } from '@/utils/functions';
import type { IGenericProps } from '@/types/generic-types';
import { Layer } from '@/atoms/Layer';

// ============================================================================

export interface FooterProps extends IGenericProps {}

export async function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('footer__c', className)}>
      <div className="logo-wrapper relative">
        <Icon.TELogo className="logo te" />
        <Layer />
      </div>

      <time>{`${new Date().getFullYear()}`}</time>

      <div className="logo-wrapper">
        <Icon.FLLogo className="logo fl" />
      </div>
    </footer>
  );
}
