import React from 'react';
import { MotionValue } from 'framer-motion';

export type TGenericObject = { [key: string]: unknown };

export type IGenericComponent = React.ReactNode | null;

export interface IGenericProps {
  className?: string;
  children?: React.ReactNode;

  style?: React.CSSProperties | { [key: string]: MotionValue<any> | null | undefined };
}
