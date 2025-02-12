// TODO: add placeholder image generated

'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import {
  Card, CardContent, CardHeader, CardTitle 
} from '@/shadcn/card';
import {
  Tooltip, TooltipContent, TooltipTrigger 
} from '@/shadcn/tooltip';
import LazyLoadImageClient from '@/atoms/LazyLoadImageClient';
import { Separator } from '@/shadcn/separator';
import {
  Avatar, AvatarFallback, AvatarImage 
} from '@/shadcn/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/shadcn/dropdown-menu';

import { Notebook } from 'lucide-react';

import { cn } from '@/utils/functions';
import { fDate } from '@/utils/date';
import { ICONS_SIZES } from '@/utils/constants';

import type { PostType } from '@/utils/api/types';
import { routes } from 'src/navigation';

import type { IGenericProps } from '@/types/generic-types';

// ============================================================================

const NO_IMAGE = '/assets/images/no_image.jpg';

// ============================================================================

interface BlogListItemProps extends IGenericProps, PostType {}

export default function BlogListItem({ id = '', className, title, content, author, authorId, avatar, updatedAt, createdAt, image }: BlogListItemProps) {
  const t = useTranslations('home');
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: '0px 0px -200px 0px' });

  const dropdownMenu = (
    <DropdownMenu className="blog-list-item__dropdown">
      <DropdownMenuTrigger className="blog-list-item__dropdown-trigger">
        <Notebook size={ICONS_SIZES.sm} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>See more</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`${routes.posts.user.replace('{$id}', String(authorId))}`} className="contents">
            {`Check author's posts`}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const cardContent = (
    <div ref={ref} className="h-full">
      <Link href={`${routes.posts.id.replace('{$id}', String(id))}`} className="contents">
        {isInView && (
          <Card ref={ref} htmlTag="article" className={cn('blog-list-item__c relative', className, isInView && 'in-view')}>
            <LazyLoadImageClient
              // layout="responsive"
              layout="fill"
              fill={true}
              src={image ?? NO_IMAGE}
              alt="BlogPost Image"
            />
            <div className="blog-list-item__card card-content">
              <CardHeader className="blog-list-item__author">
                <Avatar>
                  <AvatarImage src={avatar} alt={`${author ?? 'Author'}'s Image`} height={32} width={32} />
                  <AvatarFallback>AA</AvatarFallback>
                </Avatar>
                <span rel="author">{author ?? 'Author'}</span>
                {dropdownMenu}
              </CardHeader>
              <CardTitle className="blog-list-item__title">{title}</CardTitle>
              <CardContent className="blog-list-item__content">
                <p className="blog-list-item__text">{content}</p>
                <Separator className="divider" orientation="horizontal" />
                <time pubdate="pubdate" dateTime="2011-08-28" title="August 28th, 2011">
                  {fDate(new Date(updatedAt || createdAt))}
                </time>
              </CardContent>
            </div>
          </Card>
        )}
      </Link>
    </div>
  );

  return (
    <Tooltip>
      <TooltipTrigger aria-label="visit user profile">{cardContent}</TooltipTrigger>
      <TooltipContent className="blog-list-item__tooltip">
        <p>{t('visit_blog_post', { author })}</p>
      </TooltipContent>
    </Tooltip>
  );
}
