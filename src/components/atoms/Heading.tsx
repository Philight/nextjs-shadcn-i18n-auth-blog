import { cn } from '@/utils/functions';
import {
  HTMLAttributes, ReactNode 
} from 'react';

export interface HeadingPropsType extends HTMLAttributes<HTMLHeadingElement> {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl' | 'text-6xl' | 'text-7xl' | 'text-8xl';
  children: ReactNode;
}

const Heading = (props: HeadingPropsType) => {
  const { tag = 'h1', size = 'text-lg', className, children, ...rest } = props;
  const Tag = tag;

  return (
    <Tag {...rest} style={{ overflowWrap: 'anywhere' }} className={cn('font-medium', size, className)}>
      {children}
    </Tag>
  );
};

export default Heading;
