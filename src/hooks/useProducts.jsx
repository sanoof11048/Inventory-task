import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduct, fetchProductById, fetchProducts, updateProduct } from '../services/ProductService';


export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct ,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']); // 🔁 refetch products
    },
  });
};

export const useProductById = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id, // fetch only if id is defined
  });
};


export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });
};