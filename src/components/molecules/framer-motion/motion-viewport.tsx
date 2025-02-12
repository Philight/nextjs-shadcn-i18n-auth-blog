import React from 'react';
import { m } from 'framer-motion';

import { varContainer } from './variants';

// ----------------------------------------------------------------------

interface Props {
  children: React.ReactNode;
  _disableAnimatedMobile?: boolean;
}

export default function MotionViewport({ children, _disableAnimatedMobile = true, ...other }: Props) {
  return (
    <m.div initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }} variants={varContainer()} {...other}>
      {children}
    </m.div>
  );
}
