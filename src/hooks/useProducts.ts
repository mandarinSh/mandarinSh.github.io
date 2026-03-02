import { getProducts, searchProducts } from '@/api/product';
import { useAuthStore } from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';

interface ProductsParams {
  limit?: number;
  skip?: number;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export const useProductsQuery = (params: ProductsParams = {}) => {
  const token = useAuthStore((state) => state.token);

  const searchParams = new URLSearchParams();
  if (params.limit !== undefined) searchParams.append('limit', params.limit.toString());
  if (params.skip !== undefined) searchParams.append('skip', params.skip.toString());
  if (params.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params.order) searchParams.append('order', params.order);

  const hasSearch = !!params.search?.trim();

  return useQuery({
    queryKey: ['products', params],
    queryFn: () =>
      hasSearch
        ? searchProducts(params.search!.trim(), searchParams, token)
        : getProducts(searchParams, token),
    staleTime: 5 * 60_000,
  });
};
