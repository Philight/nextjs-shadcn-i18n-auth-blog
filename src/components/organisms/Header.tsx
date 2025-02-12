'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  usePathname, useRouter 
} from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import {
  Link as ScrollLink, scroller 
} from 'react-scroll';

import Icon from '@/atoms/Icon';
import FloatingMenu from '@/organisms/FloatingMenu';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/shadcn/navigation-menu';
import { Button } from '@/shadcn/button';
import {
  Avatar, AvatarFallback, AvatarImage 
} from '@/shadcn/avatar';

import { useGlobalStore } from '@/store';
import { useOffSetTop } from '@/hooks/useOffSetTop';

import { ICONS_SIZES } from '@/utils/constants';
import {
  routes, navigation 
} from 'src/navigation';
import { cn } from '@/utils/functions';
import type { IGenericProps } from '@/types/generic-types';

import {
  List, Search 
} from 'lucide-react';
import { montserrat } from 'public/fonts/montserrat';

// ================================================================

const OFFSET_TOP = 48 + 80;
const SEARCHBAR_ID = 'search-bar';

const durationFn = function (deltaTop): number {
  return deltaTop;
};

const scrollToElement = ({ element = null, duration = 1000, delay = 0, smooth = 'easeInOutQuart', offset = 0 }: any) => {
  if (typeof document === 'undefined') {
    return;
  }
  scroller.scrollTo(element, {
    duration,
    delay,
    smooth,
    offset,
  });
};

const fontClassName = montserrat.className;

// ================================================================

interface Props extends IGenericProps {}

export default function Header({ className }: Props) {
  const t = useTranslations();
  const pathname = usePathname();
  const offset = useOffSetTop(OFFSET_TOP);

  const isAuth = pathname.startsWith(routes.auth.root);

  return (
    <header className={cn('header__c', fontClassName, className, offset && 'moving')}>
      {/* TOP NAVIGATION */}
      {!isAuth && <TopNavigation />}

      {/* BOTTOM NAVIGATION */}
      <nav className="navigation__c navigation__center navigation--desktop show-desktop">
        {isAuth && (
          <Link href={routes.home} className="contents">
            Home
          </Link>
        )}

        <Link href={routes.home} className="contents">
          <Icon.TBLogo className="logo" />
        </Link>

        {isAuth && <div className="placeholder" />}
      </nav>

      {/* FLOATING */}
      <FloatingMenu />

      {/*<BurgerMenu className="navigation--mobile show-mobile" />*/}
    </header>
  );
}

// ================================================================

interface TopNavigationProps extends IGenericProps {}

function TopNavigation({ className }: TopNavigationProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useGlobalStore((state) => state);

  const navigateTo = (href: string) => () => {
    router.push(href);
  };

  return (
    <nav className={cn('navigation__c navigation__top navigation--desktop show-desktop', user && 'signed-in')}>
      {/* SEARCH */}
      <ScrollLink
        activeClass="active"
        className="search-wrapper contents"
        to={SEARCHBAR_ID}
        spy={true}
        smooth={true}
        duration={durationFn}
        offset={-96}
        // onSetActive={handleSetActive(l.scrollTo)}
        onClick={scrollToElement(SEARCHBAR_ID)}
      >
        <Search
          size={ICONS_SIZES.md}
          //  className="search-wrapper"
          // onClick={() => scrollToElement({ id: 'search-bar' })}
        />
      </ScrollLink>

      {/* HOME */}
      <li className={cn('', pathname.includes(routes.home) && 'active')}>
        <Link href={routes.home}>Home</Link>
      </li>

      {/* AUTH */}
      <ul>
        {user ? (
          <li key={navigation.profile[0].title(t)} className={cn('', pathname.includes(navigation.profile[0].href) && 'active')}>
            <Link href={navigation.profile[0].href} className="contents">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>{navigation.profile[0].title(t)}</AvatarFallback>
              </Avatar>
            </Link>
          </li>
        ) : (
          navigation.auth.map((item, index) => (
            <li key={item.title(t)} className={cn('', pathname.includes(item.href) && 'active')}>
              <Button type="button" variant={item.href === routes.auth.signin ? 'default' : 'outline'} onClick={navigateTo(item.href)}>
                {item.title(t)}
              </Button>
            </li>
          ))
        )}
      </ul>
    </nav>
  );
}

// ================================================================

interface BurgerMenuProps extends IGenericProps {}

function BurgerMenu({ className }: BurgerMenuProps) {
  const t = useTranslations();

  return (
    <NavigationMenu className={cn('navigation__c', className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <List size={ICONS_SIZES.sm} />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="navigation__menu">
            <ul className="grid w-[200px] gap-3 p-4  ">
              {navigation
                // @ts-ignore
                .values()
                .flat()
                .map((item: any) => (
                  <ListItem key={uuidv4()} title={item.title(t)} href={item.href}>
                    {item.description}
                  </ListItem>
                ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// ================================================================

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = 'ListItem';

// ================================================================
