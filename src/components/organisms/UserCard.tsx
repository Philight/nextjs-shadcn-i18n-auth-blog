'use client';

import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/shadcn/card';
import { Button } from '@/shadcn/button';
import { Input } from '@/shadcn/input';
import { Label } from '@/shadcn/label';

import { cn } from '@/utils/functions';
import type { IGenericProps } from '@/types/generic-types';
import { useGlobalStore } from '@/store';
import { useTranslations } from 'next-intl';

// ============================================================================

export interface Props extends IGenericProps {
  title: string;
}

export default function UserCard({ className }: Props) {
  const t = useTranslations('');
  const { user } = useGlobalStore((state) => state);
  const { firstname, lastname, email } = user ?? {};
  return (
    <Card className={cn('user-card__c', className)}>
      <CardHeader>
        <CardTitle>{t('profile.title')}</CardTitle>
        <CardDescription className="mt-2">{t('profile.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 mt-8">
        <div className="space-y-2">
          <Label htmlFor="firstname">{t('signup.firstname')}</Label>
          <Input id="firstname" defaultValue={firstname ?? 'Pedro'} disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastname">{t('signup.lastname')}</Label>
          <Input id="lastname" defaultValue={lastname ?? 'Peduarte'} disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t('signup.email')}</Label>
          <Input id="email" defaultValue={email ?? '@gmail.com'} disabled />
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled>{t('profile.button')}</Button>
      </CardFooter>
    </Card>
  );
}
