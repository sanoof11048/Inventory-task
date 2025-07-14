import authApi from '../Api/authApi';

export const fetchProducts = async () => {
  const response = await authApi.get('Product/all');
  console.log(response.data.data)
  return response.data;
};

export const createProduct = async (formData) => {
  const response = await authApi.post('Product/create', formData);
  console.log(response)
  return response.data;
};


export const fetchProductById = async (id) => {
  const res = await authApi.get(`Product/${id}`);
  return res.data.data;
};

export const updateProduct = async (formData) => {
  const res = await authApi.put('Product/update', formData);
  console.log(res)
  return res.data;
};