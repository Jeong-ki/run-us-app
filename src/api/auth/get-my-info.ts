import {UseQueryOptions, useQuery} from '@tanstack/react-query';
import {tokenApi} from '../axios.instance';
import {IMyInfo} from './types';
import {AxiosError} from 'axios';
import {authKeyFactory} from './key-factory';

type UseGetMyInfoOptions = Omit<
  UseQueryOptions<IMyInfo, AxiosError, IMyInfo, readonly [string]>,
  'queryKey'
>;

const getMyInfo = async () => {
  return (await tokenApi.get<IMyInfo>('/auth/my')).data;
};

/**
 * @title auth - 내 정보 가져오기
 * @api GET /auth/my
 */
export const useGetMyInfo = (options?: UseGetMyInfoOptions) => {
  return useQuery({
    queryKey: [...authKeyFactory.myInfo],
    queryFn: getMyInfo,
    ...options,
  });
};
