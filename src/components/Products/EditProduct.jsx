import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useProductById, useUpdateProduct } from '../../hooks/useProducts';
import { ArrowLeft, Heart, Plus, Save, Trash2 } from 'lucide-react';

 function EditProductPage() {
const { id } = useParams();
  const navigate = useNavigate()
  const { data: product, isLoading } = useProductById(id);
  const updateMutation = useUpdateProduct();

  const [productForm, setProductForm] = useState({
    id: '',
    productCode: '',
    productName: '',
    hsnCode: '',
    isFavourite: false,
    active: true,
    variants: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setProductForm({
        id: product.id,
        productCode: product.productCode,
        productName: product.productName,
        hsnCode: product.hsnCode,
        isFavourite: product.isFavourite,
        active: product.active,
        variants: product.variants || [],
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleVariantChange = (i, field, value) => {
    const updated = [...productForm.variants];
    updated[i][field] = value;
    setProductForm((prev) => ({ ...prev, variants: updated }));
  };

  const handleOptionChange = (variantIdx, optionIdx, field, value) => {
    const updated = [...productForm.variants];
    updated[variantIdx].options[optionIdx][field] = field === 'stock' ? parseInt(value) || 0 : value;
    setProductForm((prev) => ({ ...prev, variants: updated }));
  };

  const addVariant = () => {
    setProductForm((prev) => ({
      ...prev,
      variants: [...prev.variants, { variantName: '', options: [{ value: '', stock: 0 }] }],
    }));
  };

  const removeVariant = (index) => {
    setProductForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const addOption = (variantIdx) => {
    const updated = [...productForm.variants];
    updated[variantIdx].options.push({ value: '', stock: 0 });
    setProductForm((prev) => ({ ...prev, variants: updated }));
  };

  const removeOption = (variantIdx, optionIdx) => {
    const updated = [...productForm.variants];
    updated[variantIdx].options = updated[variantIdx].options.filter((_, i) => i !== optionIdx);
    setProductForm((prev) => ({ ...prev, variants: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!productForm.productCode.trim() || !productForm.productName.trim()) {
      toast.error('Product code and name are required');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('Id', productForm.id);
    formData.append('ProductCode', productForm.productCode);
    formData.append('ProductName', productForm.productName);
    formData.append('HSNCode', productForm.hsnCode);
    formData.append('IsFavourite', productForm.isFavourite);
    formData.append('Active', productForm.active);
    formData.append('Variants', JSON.stringify(productForm.variants));
    if (imageFile) {
      formData.append('ImageFile', imageFile);
    }

    try {
      await updateMutation.mutateAsync(formData);
      toast.success('Product updated successfully!');
    } catch (err) {
      toast.error('Failed to update product');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Code *
              </label>
              <input
                type="text"
                name="productCode"
                placeholder="Enter product code"
                value={productForm.productCode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="productName"
                placeholder="Enter product name"
                value={productForm.productName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HSN Code
              </label>
              <input
                type="text"
                name="hsnCode"
                placeholder="Enter HSN code"
                value={productForm.hsnCode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-20 h-20 object-cover rounded-md border"
                />
              )}
            </div>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFavourite"
                checked={productForm.isFavourite}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Heart size={16} className={productForm.isFavourite ? 'text-red-500' : 'text-gray-400'} />
              <span className="text-sm text-gray-700">Mark as favourite</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="active"
                checked={productForm.active}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Product Variants</h2>
            <button
              type="button"
              onClick={addVariant}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              Add Variant
            </button>
          </div>

          {productForm.variants.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No variants added yet. Click "Add Variant" to create your first variant.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {productForm.variants.map((variant, vi) => (
                <div key={vi} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <input
                      type="text"
                      value={variant.variantName}
                      onChange={(e) => handleVariantChange(vi, 'variantName', e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Variant name (e.g., Size, Color)"
                    />
                    <button
                      type="button"
                      onClick={() => removeVariant(vi)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Options</span>
                      <button
                        type="button"
                        onClick={() => addOption(vi)}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Plus size={14} />
                        Add Option
                      </button>
                    </div>

                    {variant.options.map((option, oi) => (
                      <div key={oi} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={option.value}
                          onChange={(e) =>
                            handleOptionChange(vi, oi, 'value', e.target.value)
                          }
                          className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Option value"
                        />
                        <input
                          type="number"
                          value={option.stock}
                          onChange={(e) =>
                            handleOptionChange(vi, oi, 'stock', e.target.value)
                          }
                          className="w-24 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Stock"
                          min="0"
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(vi, oi)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          disabled={variant.options.length === 1}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Updating...
              </>
            ) : (
              <>
                <Save size={16} />
                Update Product
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
        </form>
      </div>
  );
}

export default EditProductPage;
