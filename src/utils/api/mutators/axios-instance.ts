// eslint-disable-next-line import/no-named-as-default
import Axios, { type AxiosRequestConfig } from 'axios';
// import auth from '@firebase/auth';
// import qs from 'qs';

export const AXIOS_INSTANCE = Axios.create({ baseURL: process.env.BASE_API_URL });

// Make sure this function receives 2 arguments.
// The first argument is set by orval and the second one allows custom configs to be passed when making the request.
export const customInstance = async <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  // const token = await auth.getAuth().currentUser?.getIdToken();

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    headers: {
      ...config.headers,
      ...options?.headers,
      // authorization: token ? `Bearer ${token}` : '',
    },
    withCredentials: true,
    paramsSerializer: (params) => {
      // return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        const { data, status } = err.response;
        let errorMessage = data?.message || data?.detail || err.response.statusText;
        if (status === 422) {
          errorMessage = data?.detail[0].msg;
        }

        // If backend error is detected, we extract the error message and throw a new error for react-query to handle
        throw new Error(errorMessage);
      }
      // Always throw the error so it can reach react query
      throw err;
    });

  return promise;
};
