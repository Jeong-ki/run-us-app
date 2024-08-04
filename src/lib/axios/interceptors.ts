import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import {instance} from './instance';
import {loadRefreshToken, removeRefreshToken, saveRefreshToken} from '@/utils';
import {logout, setUser} from '@/slices/user';

const getStore = () => require('@/store').default;

export const setInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const store = getStore();
      const user = store.getState().user.user;
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
      }
      return config;
    },
    (error: AxiosError | Error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const store = getStore();
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
              const response = await instance.post('/auth/refresh-user', {
                refreshToken: refreshToken,
              });
              const {name, email, newAccessToken, newRefreshToken} =
                response.data;

              store.dispatch(
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
              store.dispatch(logout());
            }
          }
        } else {
          await removeRefreshToken();
          store.dispatch(logout());
        }
      }
      return Promise.reject(error);
    },
  );
  return axiosInstance;
};
