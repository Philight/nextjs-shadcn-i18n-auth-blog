// import create from 'zustand';
import { createStore } from 'zustand/vanilla';
import {
  persist, createJSONStorage 
} from 'zustand/middleware';

// import { UserType } from '@/store';
import { Tokens } from '@/utils/server/functions/auth';
import { STORAGE_NAME } from '@/utils/constants';

// ================================================================

export type UserType = {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: string;
} | null;

interface IStoreState {
  init: boolean;
  user: UserType | null;
  tokens: Tokens | null;
  filters?: any;
}

export type StoreActions = {
  setUser: (user: UserType | null) => void;
  setTokens: (tokens: Tokens | null) => void;
  setFilters: (filters: any) => void;
};

export type GlobalStore = IStoreState & StoreActions;

// ================================================================

const initialState: IStoreState = {
  init: false,
  user: null,
  tokens: null,
  filters: null,
};

const setters = (set): StoreActions => {
  return {
    setUser: (user: UserType | null) => set({ user }),
    setTokens: (tokens: Tokens | null) => set({ tokens }),
    setFilters: (filters: any) => set({ filters }),
  };
};

export const createGlobalStore = (initState: IStoreState = initialState) => {
  return createStore<GlobalStore>()(
    // (set) => ({
    //   ...initState,
    //   ...setters(set),
    // })
    persist(
      (set, get) => ({
        ...initState,
        ...setters(set),
      }),
      {
        name: STORAGE_NAME, // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      },
    ),
  );
};
