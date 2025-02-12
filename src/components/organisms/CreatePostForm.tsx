'use client';

import { useTranslations } from 'next-intl';
import React, { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

import { createPostSchema } from '@/lib/zod/ValidationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Card } from '@/shadcn/card';
import { Button } from '@/shadcn/button';
import FormProvider, {
  Field, useForm 
} from '@/molecules/hook-form';

import Container from '@/layouts/Container';

// import { createPost } from '@/api/__generated/posts/posts';
import { createNewPost } from '@/utils/server/actions/posts';
import { PostResponce } from '@/api/__generated/index.schemas';

import { cn } from '@/utils/functions';
import { showToast } from '@/utils/helpers';
import { IS_DEVELOPMENT } from '@/utils/constants';

import type { IGenericProps } from '@/types/generic-types';

// ============================================================================

type ResponseType = PostResponce;

export interface Props extends IGenericProps {}

export default function CreatePostForm({ className }: Props) {
  const t = useTranslations('create_post');
  const [isPending, startTransition] = useTransition();

  const methods = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: '',
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

        const { title, content } = data;

        const response: ResponseType | any = await createNewPost({
          title,
          content,
        });

        const { error, message, statusCode: status } = response;

        // SERVER VALIDATIONS
        if (error) {
          showToast({ status, message: Array.isArray(message) ? message.join('. \n') : message, options: { duration: 10000 } });
        } else {
          // RESPONSE OK
          showToast({ type: 'SUCCESS', message: t('success') });
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
    <Container className={cn('form__c create-post', className)}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Card className={cn('form__card relative')}>
          <div className={'grid grid-cols-1'}>
            <Field field="input" name="title" type="text" label={t('title')} />
            <Field field="textarea" name="content" type="text" label={t('content')} rows="10" />
          </div>

          <div className={'button__wrapper'}>
            <Button type="submit" disabled={isPending || !formState.isDirty} variant="default">
              {isPending && <Loader2 className="animate-spin" />}
              {t('button')}
            </Button>
          </div>
        </Card>
      </FormProvider>
    </Container>
  );
}
