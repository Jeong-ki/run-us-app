import {api} from '../axios.instance';
import {IRefreshUser} from './types';

/**
 * @title auth - 토큰 리프레시
 * @api POST /auth/refresh-user
 */
export const refreshUser = async (
  refreshToken: string,
): Promise<IRefreshUser> => {
  return (await api.post<IRefreshUser>('/auth/refresh-user', {refreshToken}))
    .data;
};
