import {UseQueryOptions, useQuery} from '@tanstack/react-query';
import {api} from '../axios.instance';
import {Product} from './types';
import {AxiosError} from 'axios';
import {productKeyFactory} from './key-factory';

export const getProductById = async (productId: number) => {
  return (await api.get<Product>(`/products/${productId}`)).data;
};

export const useGetProductById = (
  productId: number,
  options?: UseQueryOptions<
    Product,
    AxiosError,
    Product,
    readonly (string | number)[]
  >,
) => {
  return useQuery({
    queryFn: () => getProductById(productId),
    queryKey: [...productKeyFactory.productById(productId)],
    ...options,
  });
};
