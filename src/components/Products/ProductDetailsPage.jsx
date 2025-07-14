import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Star, 
  Package, 
  Barcode,
  Hash,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Image,
  Loader2,
  Eye,
  EyeOff,
  TrendingUp,
  Archive
} from 'lucide-react';
import { useProductById } from '../../hooks/useProducts';


function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError, error } = useProductById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading product details...</span>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md mx-auto text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">{error?.message || 'The requested product could not be found.'}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const getStockStatus = (stock) => {
    if (stock === 0) return { 
      color: 'text-red-600 bg-red-50 border-red-200', 
      label: 'Out of Stock',
      icon: XCircle
    };
    if (stock < 10) return { 
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200', 
      label: 'Low Stock',
      icon: AlertTriangle
    };
    return { 
      color: 'text-green-600 bg-green-50 border-green-200', 
      label: 'In Stock',
      icon: CheckCircle
    };
  };

  const stockStatus = getStockStatus(product.totalStock);
  const StockIcon = stockStatus.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Product Details</h1>
                  <p className="text-sm text-gray-600">View product information and variants</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/products/edit/${id}`)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Image */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Image</h2>
              {product.productImage ? (
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={new TextDecoder().decode(product.productImage)}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No image available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                <div className="flex items-center gap-3">
                  {product.isFavourite && (
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">Favourite</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    {product.active ? (
                      <Eye className="w-4 h-4 text-green-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                    <span className={`text-sm font-medium ${product.active ? 'text-green-600' : 'text-gray-400'}`}>
                      {product.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.productName}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Barcode className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Product Code</p>
                      <p className="font-medium text-gray-900">{product.productCode}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Hash className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">HSN Code</p>
                      <p className="font-medium text-gray-900">{product.hsnCode}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Archive className="w-6 h-6 text-gray-600" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Stock</p>
                        <p className="text-2xl font-bold text-gray-900">{product.totalStock}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${stockStatus.color}`}>
                        <StockIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{stockStatus.label}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Variants */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Product Variants</h2>
                <div className="text-sm text-gray-600">
                  {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''} available
                </div>
              </div>

              {product.variants.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No variants configured for this product.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {product.variants.map((variant, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">{variant.variantName}</h3>
                        <div className="text-sm text-gray-600">
                          {variant.options.length} option{variant.options.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {variant.options.map((option, j) => {
                          const optionStockStatus = getStockStatus(option.stock);
                          const OptionStockIcon = optionStockStatus.icon;
                          
                          return (
                            <div key={j} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900">{option.value}</span>
                                <OptionStockIcon className={`w-4 h-4 ${optionStockStatus.color.split(' ')[0]}`} />
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Stock:</span>
                                <span className={`font-medium ${optionStockStatus.color.split(' ')[0]}`}>
                                  {option.stock}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
