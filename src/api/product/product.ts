import { ProductsResponse } from './types';
import { api } from '../api';

export const getProducts = (searchParams: URLSearchParams, token: string | null) => {
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return api.get(`/products?${searchParams.toString()}`, { headers })
    .then(res => res.data as ProductsResponse);
};

export const searchProducts = (query: string, searchParams: URLSearchParams, token: string | null) => {
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return api.get(`/products/search?q=${encodeURIComponent(query)}&${searchParams.toString()}`, { headers })
    .then(res => res.data as ProductsResponse);
};

export const getProductsByCategory = (category: string, token: string | null) => {
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return api.get(`/products/category/${category}`, { headers })
    .then(res => res.data as ProductsResponse);
};
