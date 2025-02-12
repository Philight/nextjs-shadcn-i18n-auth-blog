// TODO TOAST

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useTransition } from 'react';
import { setCookie } from 'cookies-next/client';

import { signInSchema } from '@/lib/zod/ValidationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Card } from '@/shadcn/card';
import { Button } from '@/shadcn/button';
import FormProvider, {
  Field, useForm 
} from '@/molecules/hook-form';

import Container from '@/layouts/Container';

import { signIn } from '@/api/__generated/auth/auth';
import type { Auth } from '@/api/__generated/index.schemas.ts';
import {
  type UserType, useGlobalStore, type GlobalStore 
} from '@/store';

import { routes } from 'src/navigation';
import { cn } from '@/utils/functions';
import { showToast } from '@/utils/helpers';
import {
  IS_DEVELOPMENT, TOKEN_COOKIE_NAME 
} from '@/utils/constants';

import type { IGenericProps } from '@/types/generic-types';
import { Loader2 } from 'lucide-react';

// ============================================================================

type ResponseType = Auth & {
  user: UserType;
};

export interface SignInFormProps extends IGenericProps {}

export default function SignInForm({ className }: SignInFormProps) {
  const t = useTranslations('signin');
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();
  const { setUser, setTokens } = useGlobalStore<GlobalStore>();

  const methods = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    // mode: 'onChange',
  });

  const {
    // reset,
    formState,
    handleSubmit,
    // setError,
    clearErrors,
  } = methods;

  const onSubmit = handleSubmit(async (data: any, event?: React.BaseSyntheticEvent) => {
    startTransition(async () => {
      try {
        event?.preventDefault();
        clearErrors();

        if (IS_DEVELOPMENT) {
          showToast({ type: 'OBJECT', message: data, options: { duration: 30000 } });
        }

        // TRANSFORM FIELDS & SEND REQUEST

        const { email, password } = data;

        const response: ResponseType | any = (
          await signIn({
            email,
            password,
          })
        ).data;

        const { user, error, message, statusCode: status, ...tokens } = response;

        // SERVER VALIDATIONS
        if (error) {
          showToast({ status, message: Array.isArray(message) ? message[0] : message });
        } else {
          // RESPONSE OK
          setUser(user);
          // Save tokens in cookies
          setCookie(TOKEN_COOKIE_NAME, JSON.stringify(tokens));
          showToast({ type: 'SUCCESS', message: t('success') });

          setTimeout(() => {
            push(routes.profile.root);
          }, 2000);
        }

        // RESPONSE ERROR
      } catch (error: any) {
        if (error.message && error.message.trim().length !== 0) {
          showToast({ status: error.status, message: error.message, options: { duration: 10000 } });
        }
      }
    });
  });

  return (
    <Container className={cn('sign-in-form__c form__c', className)}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Card className={cn('sign-in-form__card relative')}>
          {/*<CardTitle className="sign-in-form__title">{t('title')}</CardTitle>*/}
          <div className={'grid grid-cols-1'}>
            <Field field="input" name="email" type="text" label={t('email')} />
            <Field field="input" name="password" type="text" label={t('password')} />
          </div>

          <div className={'button__wrapper'}>
            <Button type="submit" disabled={isPending || !formState.isDirty} variant="default">
              {isPending && <Loader2 className="animate-spin" />}
              {t('button')}
            </Button>
          </div>

          <p className="redirect-link">
            {`${t('redirect.title')} `}
            <Link href={routes.auth.signup}>{t('redirect.link')}</Link>
          </p>
        </Card>
      </FormProvider>
    </Container>
  );
}
