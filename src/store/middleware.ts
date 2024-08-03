import {authApi} from '@/slices/api/auth';
import {productApi} from '@/slices/api/product';

export const apiMiddleware = [productApi.middleware, authApi.middleware];
