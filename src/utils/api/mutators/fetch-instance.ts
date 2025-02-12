import { fetchApi } from '@/utils/functions';

type BodyType = any;
type Options = {
  url?: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: any;
  body?: BodyType;
  responseType?: string;
  headers?: any;
};

export const customInstance = async <T>(url, { ...options }: Options): Promise<T> => {
  return (await fetchApi(url, { ...options })) as T;
};
