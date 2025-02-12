import { cn } from '@/utils/functions';
import {
  DetailedHTMLProps, HTMLAttributes, ReactNode 
} from 'react';

export interface ContainerPropsType extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  children: ReactNode;
}

export default function Container({ children, className }: ContainerPropsType) {
  return <div className={cn('container__c f-col', className)}>{children}</div>;
}
