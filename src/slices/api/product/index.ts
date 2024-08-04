import {createApi} from '@reduxjs/toolkit/query/react';
import type {Product} from './types';
import {axiosBaseQuery} from '@/lib/axios/axios-base-query';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: axiosBaseQuery({isToken: true}),
  endpoints: builder => ({
    getAllProducts: builder.query<Array<Product>, void>({
      query: () => ({url: '/product'}),
    }),
    getProductById: builder.query<Product, number>({
      query: id => ({url: `/product/${id}`}),
    }),
  }),
});

export const {useGetAllProductsQuery, useGetProductByIdQuery} = productApi;
