import { cn } from '@/utils/functions';
import * as React from 'react';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { htmlTag?: string | any }>(({ className, htmlTag, ...props }, ref) => {
  const HTMLElement: any = htmlTag ?? 'div';

  return <HTMLElement ref={ref} className={cn('rounded-xl border bg-card text-card-foreground shadow p-6 space-y-4', className)} {...props} />;
});

Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-1', className)} {...props} />
));

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('font-semibold leading-none tracking-tight', className)} {...props} />
));

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));

CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { htmlTag?: string | any }>(
  ({ className, htmlTag, ...props }, ref) => {
    const HTMLElement: any = htmlTag ?? 'div';

    return <HTMLElement ref={ref} className={cn(className)} {...props} />;
  },
);

CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center', className)} {...props} />
));

CardFooter.displayName = 'CardFooter';

export {
  Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent 
};
