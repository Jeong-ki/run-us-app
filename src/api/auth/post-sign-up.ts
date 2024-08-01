import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {api} from '../axios.instance';
import {ISignUpReq, ISignUpRes} from './types';
import {AxiosError} from 'axios';

const signUpUser = async (signUpData: ISignUpReq): Promise<ISignUpRes> => {
  return (await api.post<ISignUpRes>('/auth/signup', signUpData)).data;
};

/**
 * @title auth - 회원가입
 * @api POST /auth/signup
 */
export const useSignUpUser = (
  options?: UseMutationOptions<ISignUpRes, AxiosError, ISignUpReq>,
) => {
  return useMutation({
    mutationFn: signUpUser,
    ...options,
  });
};
