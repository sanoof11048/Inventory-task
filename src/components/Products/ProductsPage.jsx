import { useProducts } from '../../hooks/useProducts';

function ProductPage() {
  const { data, isLoading, isError, error } = useProducts();

  if (isLoading) return <div className="p-4">Loading products...</div>;
  if (isError) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  const products = data?.data || [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📦 Product List</h1>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{product.productName}</h2>
              <p className="text-gray-700 font-mono">Code: {product.productCode}</p>
              <p className="text-gray-600 text-sm">HSN: {product.hsnCode}</p>
              <p className="text-gray-600 text-sm">Favourite: {product.isFavourite ? 'Yes' : 'No'}</p>
              <p className="text-gray-600 text-sm">Stock: {product.totalStock}</p>
              <p className="text-gray-600 text-sm">Status: {product.active ? 'Active' : 'Inactive'}</p>

              {product.productImage && (
                <img
                  src={new TextDecoder().decode(product.productImage)}
                  alt={product.productName}
                  className="w-full mt-2 rounded"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductPage;
