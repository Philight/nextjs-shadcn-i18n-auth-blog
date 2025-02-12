'use client';

import React, {
  useEffect, useState 
} from 'react';
import { useTheme } from 'next-themes';
import {
  Languages, Moon, Sun 
} from 'lucide-react';

import {
  AVAILABLE_LOCALES, ICONS_SIZES 
} from '@/utils/constants';
import { setUserLocale } from '@/utils/server/functions/locale';
import type { IGenericProps } from '@/types/generic-types';
import { cn } from '@/utils/functions';

import {
  Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger 
} from '@/shadcn/menubar';

// ================================================================

interface FloatingMenuProps extends IGenericProps {}

export default function FloatingMenu({ className }: FloatingMenuProps) {
  const { setTheme, theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Menubar className={cn('floating-menu__c ', className)}>
      <MenubarMenu key="theme">
        <MenubarTrigger aria-label="theme" onClick={() => setTheme(!mounted || theme === 'light' ? 'dark' : 'light')}>
          {!mounted || theme === 'light' ? <Moon size={ICONS_SIZES.sm} /> : <Sun size={ICONS_SIZES.sm} />}
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu key={'lang'}>
        <MenubarTrigger aria-label="translate">
          <Languages size={ICONS_SIZES.sm} />
        </MenubarTrigger>
        <MenubarContent>
          {AVAILABLE_LOCALES.map((locale) => (
            <MenubarItem key={`locale_${locale.tag}`} onClick={() => setUserLocale(locale.tag)}>
              {locale.label}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
