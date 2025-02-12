import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

export interface CustomLinkPropsType extends LinkProps {
  children: ReactNode;
}
export const CustomLink = (props: CustomLinkPropsType) => {
  const { children, ...rest } = props;

  return (
    <Link {...rest} className="">
      {children}
    </Link>
  );
};
