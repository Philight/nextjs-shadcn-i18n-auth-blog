// import { headers } from 'next/headers';
import { twMerge } from 'tailwind-merge';

import {
  type ClassValue, clsx 
} from 'clsx';

export { cva } from 'class-variance-authority';
import axios from 'axios';
import {
  Options, serialize 
} from 'object-to-formdata';

import { IS_DEVELOPMENT } from './constants';

// ================================================

const token = process.env.NEXT_PUBLIC_API_TOKEN;

const DEFAULT_HEADERS = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  'Accept-Language':
    typeof navigator !== 'undefined' ? ((navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language) ?? 'cs') : 'cs',
};

// ================================================

export function getBaseUrlBasedOnServer() {
  // need to include process.env.NEXT_PUBLIC_API_URL if using this function inside a server side component, no need to include it if using the function inside client side component
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  return baseUrl;
}

export const handleServerError = (error: Error | any) => {
  if (IS_DEVELOPMENT) {
    console.error(error);
  }
  throw error;
};

// ================================================

export async function fetchApi(urlOrPath: URL | string, options?: any) {
  const { method = 'GET', body, headers, ...fetchOptions } = options;
  const { 'Content-Type': contentType } = headers;

  const baseUrl = getBaseUrlBasedOnServer();

  // External URLs are rewritten in 'next.config' / 'middleware'
  const url = urlOrPath instanceof URL ? urlOrPath.toString() : isValidUrl(urlOrPath) ? new URL(urlOrPath) : `${urlOrPath}`;

  const transformedBody = await (contentType === 'multipart/form-data' ? serializeJsonToFormData({ token, ...body }) : JSON.stringify({ token, ...body }));

  const includeBody = method !== 'GET' ? { body: transformedBody } : {};

  const res = await fetch(url, {
    method,
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
      // ...(await headers()),
    },
    ...includeBody,
    credentials: 'include',
    // next: { tags: ['getPost'] },
    // cache: 'no-store',
    ...fetchOptions,
  });

  return await res.json();
}

// ================================================

export const api = axios.create({
  // adapter: 'fetch',
  // fetchOptions: { cache: "force-cache" },
  baseURL: getBaseUrlBasedOnServer(),
  headers: DEFAULT_HEADERS,
  // withCredentials: true,
});

export async function axiosApi(urlOrPath: any, options?: any) {
  const { method = 'GET', data, ...axiosOptions } = options;

  const baseUrl = getBaseUrlBasedOnServer();
  const url = urlOrPath instanceof URL ? urlOrPath.toString() : isValidUrl(urlOrPath) ? urlOrPath : `${baseUrl}${urlOrPath}`;

  const res = await api(url, {
    method,
    data: JSON.stringify({
      token,
      ...data,
    }),
    ...axiosOptions,
    // headers: await headers(),
    // next: { tags: ['getPost'] },
    // cache: 'no-store',
  });

  return res.data;
}

// ================================================

export const encodeId = (id: string): string => Buffer.from(id).toString('base64');
export const decodeId = (encodedId: string): string => Buffer.from(encodedId, 'base64').toString('utf8');

const VALID_URL = /^((https?:\/\/)|(www\.{1}\w)).*/i; // http | https | www

export const isValidUrl = (url: string) => url.match(VALID_URL);

export const serializeJsonToFormData = (data: any, options?: Options) =>
  serialize(data, {
    booleansAsIntegers: true,
    indices: true,
    nullsAsUndefineds: true,
    ...options,
  });

// ================================================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type DebouncedFunction<Args extends unknown[]> = (...args: Args) => void;

export const debounce = <Args extends unknown[]>(mainFunction: (...args: Args) => void, delay: number): DebouncedFunction<Args> => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
};
