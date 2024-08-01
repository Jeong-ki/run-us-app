import axios, {AxiosInstance} from 'axios';
import {Platform} from 'react-native';
import Config from 'react-native-config';
import {setInterceptors} from './axios.interceptors';

const {IOS_BASE_URL, ANDROID_BASE_URL} = Config;

const baseURL = Platform.select({
  ios: IOS_BASE_URL,
  android: ANDROID_BASE_URL,
});

export const api: AxiosInstance = axios.create({
  baseURL, // FIXME: 백엔드 배포 후 URL 변경
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export const tokenApi = setInterceptors(api);
