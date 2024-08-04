import type {AxiosInstance} from 'axios';

// import {Platform} from 'react-native';
// import Config from 'react-native-config';
import {setInterceptors} from './interceptors';
import axios from 'axios';

// const {IOS_BASE_URL, ANDROID_BASE_URL} = Config;

// const baseURL = Platform.select({
//   ios: IOS_BASE_URL,
//   android: ANDROID_BASE_URL,
// });

export const instance: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tokenInstance = setInterceptors(instance);
