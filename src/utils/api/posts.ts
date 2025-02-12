// Fetching data on the server with the fetch API: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#fetching-data-on-the-server-with-the-fetch-api
// import { headers } from 'next/headers';
import {
  handleServerError, fetchApi, axiosApi 
} from '../functions';
import {
  PostType, CreatePostParams 
} from './types';

// ================================================

export async function getPosts(): Promise<PostType[] | any[]> {
  try {
    const method = 'GET';
    // const data = await fetchApi(`/posts/list`, { method });
    const data = await axiosApi(`/posts/list`, { method });

    return data.applications;
  } catch (e) {
    handleServerError(e);
    return [];
  }
}

export async function getPost(id: number | string): Promise<PostType> {
  try {
    const method = 'GET';
    const data = await axiosApi(`/posts/view/${id}`, { method });

    return data.post;
  } catch (e) {
    handleServerError(e);
    return {} as PostType;
  }
}

export async function createPost(params: CreatePostParams) {
  try {
    const method = 'POST';
    const body = params;

    // const data = await axiosApi(`/posts/create`, {
    //   method,
    //   headers: {
    //    'Content-Type': 'multipart/form-data'
    //   },
    //   data: serializeJsonToFormData(params),
    // });
    // console.log('createPost', data);
    // return data;

    const res = await fetchApi(`/q2/posts/create`, {
      // mode: 'no-cors',
      method,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'multipart/form-data',
      },
      body,
    });

    if (res.status === 'Error') {
      return res;
    }

    return await res;
    //
  } catch (e) {
    handleServerError(e);
  }
}
