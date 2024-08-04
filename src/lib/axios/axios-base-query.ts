import type {BaseQueryFn} from '@reduxjs/toolkit/query';
import type {AxiosRequestConfig, AxiosError} from 'axios';
import {instance, tokenInstance} from './instance';

export const axiosBaseQuery =
  (
    {isToken}: {isToken: boolean} = {isToken: false},
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({url, method, data, params, headers}) => {
    try {
      const axiosInstance = isToken ? tokenInstance : instance;
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      });
      return {data: result.data};
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
