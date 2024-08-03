import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {
  ISignInRes,
  ISignInReq,
  IMyInfo,
  IRefreshUser,
  ISignUpRes,
  ISignUpReq,
} from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://runusapi.co/api/v1'}),
  endpoints: builder => ({
    getMyInfo: builder.query<IMyInfo, void>({
      query: () => '/my',
    }),
    refreshUser: builder.mutation<IRefreshUser, string>({
      query: refreshToken => ({
        url: '/auth/refresh-user',
        method: 'POST',
        body: {refreshToken},
      }),
    }),
    signIn: builder.mutation<ISignInRes, ISignInReq>({
      query: signInData => ({
        url: '/auth/signin',
        method: 'POST',
        body: signInData,
      }),
    }),
    signUp: builder.mutation<ISignUpRes, ISignUpReq>({
      query: signUpData => ({
        url: '/auth/signup',
        method: 'POST',
        body: signUpData,
      }),
    }),
  }),
});

export const {
  useGetMyInfoQuery,
  useRefreshUserMutation,
  useSignInMutation,
  useSignUpMutation,
} = authApi;
