'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useTransition } from 'react';
import { setCookie } from 'cookies-next/client';

import { signUpSchema } from '@/lib/zod/ValidationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Card } from '@/shadcn/card';
import { Button } from '@/shadcn/button';
import FormProvider, {
  Field, useForm 
} from '@/molecules/hook-form';
import Container from '@/layouts/Container';
import { Loader2 } from 'lucide-react';

import { signUp } from '@/api/__generated/auth/auth';
import { Auth } from '@/api/__generated/index.schemas';

import { routes } from 'src/navigation';
import { cn } from '@/utils/functions';
import { showToast } from '@/utils/helpers';
import {
  IS_DEVELOPMENT, TOKEN_COOKIE_NAME 
} from '@/utils/constants';

import type { IGenericProps } from '@/types/generic-types';

// ============================================================================

type ResponseType = Auth;

export interface Props extends IGenericProps {}

export default function SignUpForm({ className }: Props) {
  const t = useTranslations('signup');
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();

  const methods = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      password_confirm: '',
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
          showToast({ type: 'OBJECT', message: data });
        }

        // TRANSFORM FIELDS & SEND REQUEST

        const { email, firstname, lastname, password } = data;

        const response: ResponseType | any = (
          await signUp({
            email,
            firstname,
            lastname,
            password,
          })
        ).data;

        const { error, message, statusCode: status, ...tokens } = response;

        // SERVER VALIDATIONS
        if (error) {
          showToast({ status, message: Array.isArray(message) ? message[0] : message });
        } else {
          // RESPONSE OK
          // Save tokens in cookies
          setCookie(TOKEN_COOKIE_NAME, JSON.stringify(tokens));
          showToast({ type: 'SUCCESS', message: t('success') });

          setTimeout(() => {
            push(routes.auth.signin);
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
    <Container className={cn('form__c form--signup', className)}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Card className={cn('form__card relative')}>
          <div className={'grid grid-cols-1'}>
            <Field field="input" name="email" type="text" label={t('email')} />
            <Field field="input" name="firstname" type="text" label={t('firstname')} />
            <Field field="input" name="lastname" type="text" label={t('lastname')} />
            <Field field="input" name="password" type="password" label={t('password')} />
            <Field field="input" name="password_confirm" type="password" label={t('password_confirm')} />
          </div>

          <div className={'button__wrapper'}>
            <Button type="submit" disabled={isPending || !formState.isDirty} variant="default">
              {isPending && <Loader2 className="animate-spin" />}
              {t('button')}
            </Button>
          </div>

          <p className="redirect-link">
            {`${t('redirect.title')} `}
            <Link href={routes.auth.signin}>{t('redirect.link')}</Link>
          </p>
        </Card>
      </FormProvider>
    </Container>
  );
}
