'use client';

import {
  type ReactNode, createContext, useRef, useContext 
} from 'react';
import { useStore } from 'zustand';

import {
  type GlobalStore, createGlobalStore 
} from './global-store';

export type GlobalStoreApi = ReturnType<typeof createGlobalStore>;

export const GlobalStoreContext = createContext<GlobalStoreApi | undefined>(undefined);

export interface GlobalStoreProviderProps {
  children: ReactNode;
}

export function GlobalStoreProvider({ children }: GlobalStoreProviderProps) {
  const storeRef = useRef<GlobalStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createGlobalStore();
  }

  return <GlobalStoreContext.Provider value={storeRef.current}>{children}</GlobalStoreContext.Provider>;
}

const defaultSelector = (state) => state;

export const useGlobalStore = <T,>(selector: (store: GlobalStore) => T = defaultSelector): T => {
  const context = useContext(GlobalStoreContext);

  if (!context) {
    throw new Error(`useGlobalStore must be used within Provider`);
  }

  return useStore(context, selector);
};
