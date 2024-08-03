import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {Product} from './types';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://runusapi.co/api/v1'}),
  endpoints: builder => ({
    getAllProducts: builder.query<Array<Product>, void>({
      query: () => '/product',
    }),
    getProductById: builder.query<Product, number>({
      query: id => `/product/${id}`,
    }),
  }),
});

export const {useGetAllProductsQuery, useGetProductByIdQuery} = productApi;
