// import { QueryClient } from 'react-query';

declare module '*.svg' {
  const content: any;

  export default content;
}

declare global {
  interface Window {
    // queryClient: QueryClient;
  }
}

interface ResponseMeta {
  next: null | number;
  prev: null | number;
  count: number;
}

interface PaginatedResponse {
  data: any;
  meta: ResponseMeta;
}

type GenericObject = { [key: string]: any } | Record<string, any>;

type ImageType = {
  id: string;
  original?: string;
  conversions?: {
    svg: string | null;
    urls: {
      width: number;
      url: string;
    }[];
  }[];
};

type IndexParamsType = {
  sort?: ('-id' | 'id' | '-created_at' | 'created_at' | '-updated_at' | 'updated_at')[];
  'filter[id]'?: number[];
  'filter[not_id]'?: number[];
  'filter[slug]'?: string[];
  'filter[not_slug]'?: string[];
  'filter[search]'?: string;
  take?: number;
  page?: number;
  mode?: 0 | 1 | 2;
};
