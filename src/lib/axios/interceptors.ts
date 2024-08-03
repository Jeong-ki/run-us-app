import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import {api} from './instance';
import {loadRefreshToken, removeRefreshToken, saveRefreshToken} from '@/utils';
import {useSelector} from 'react-redux';
import {logout, setUser} from '@/slices/user';
import type {RootState} from '@/store/reducer';
import store from '@/store';

const {dispatch} = store;

export const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const user = useSelector((state: RootState) => state.user.user);
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
      }
      return config;
    },
    (error: AxiosError | Error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => response,
    async error => {
      if (error.response && error.config) {
        const originalRequest = error.config as AxiosRequestConfig;
        if (
          error.response.status === 401 &&
          error.response.data?.code === 'expired' &&
          !originalRequest._retry
        ) {
          const refreshToken = await loadRefreshToken();
          if (refreshToken) {
            try {
              const response = await api.post('/auth/refresh-user', {
                refreshToken: refreshToken,
              });
              const {name, email, newAccessToken, newRefreshToken} =
                response.data;

              dispatch(
                setUser({
                  name,
                  email,
                  accessToken: newAccessToken,
                }),
              );
              await saveRefreshToken(newRefreshToken);
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              }
              return instance(originalRequest);
            } catch (refreshError) {
              console.error('refreshError: ', refreshError);
              await removeRefreshToken();
              dispatch(logout());
            }
          }
        } else {
          await removeRefreshToken();
          dispatch(logout());
        }
      }
      return Promise.reject(error);
    },
  );
  return instance;
};
