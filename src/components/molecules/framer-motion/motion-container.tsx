import { m } from 'framer-motion';

import { varContainer } from './variants';

import type { IGenericProps } from '@/types/generic-types';
// ----------------------------------------------------------------------

export interface Props extends IGenericProps {
  animate?: boolean;
  action?: boolean;
}

export default function MotionContainer({ animate, action = false, children, ...other }: Props) {
  if (action) {
    return (
      <m.div initial={false} animate={animate ? 'animate' : 'exit'} variants={varContainer()} {...other}>
        {children}
      </m.div>
    );
  }

  return (
    <m.div initial="initial" animate="animate" exit="exit" variants={varContainer()} {...other}>
      {children}
    </m.div>
  );
}
