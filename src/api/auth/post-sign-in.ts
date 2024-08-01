import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {api} from '../axios.instance';
import {ISignInReq, ISignInRes} from './types';
import {AxiosError} from 'axios';

const signInUser = async (signInData: ISignInReq): Promise<ISignInRes> => {
  return (await api.post<ISignInRes>('/auth/signin', signInData)).data;
};

/**
 * @title auth - 로그인
 * @api POST /auth/signin
 */
export const useSignInUser = (
  options?: UseMutationOptions<ISignInRes, AxiosError, ISignInReq>,
) => {
  return useMutation({
    mutationFn: signInUser,
    ...options,
  });
};
