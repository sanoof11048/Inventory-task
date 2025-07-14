import { useState } from 'react';
import { Package, Image, Plus, Trash2, Save, Star, Eye, EyeOff } from 'lucide-react';

function CreateProductPage() {
  const [form, setForm] = useState({
    productCode: '',
    productName: '',
    hsnCode: '',
    isFavourite: false,
    active: true,
    variants: [
      {
        variantName: '',
        options: [{ value: '', stock: 0 }],
      },
    ],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleVariantChange = (i, field, value) => {
    const updated = [...form.variants];
    updated[i][field] = value;
    setForm((prev) => ({ ...prev, variants: updated }));
  };

  const handleOptionChange = (variantIdx, optionIdx, field, value) => {
    const updated = [...form.variants];
    updated[variantIdx].options[optionIdx][field] = field === 'stock' ? parseInt(value) || 0 : value;
    setForm((prev) => ({ ...prev, variants: updated }));
  };

  const addVariant = () => {
    setForm((prev) => ({
      ...prev,
      variants: [...prev.variants, { variantName: '', options: [{ value: '', stock: 0 }] }],
    }));
  };

  const removeVariant = (index) => {
    if (form.variants.length > 1) {
      setForm((prev) => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== index),
      }));
    }
  };

  const addOption = (variantIdx) => {
    const updated = [...form.variants];
    updated[variantIdx].options.push({ value: '', stock: 0 });
    setForm((prev) => ({ ...prev, variants: updated }));
  };

  const removeOption = (variantIdx, optionIdx) => {
    const updated = [...form.variants];
    if (updated[variantIdx].options.length > 1) {
      updated[variantIdx].options.splice(optionIdx, 1);
      setForm((prev) => ({ ...prev, variants: updated }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', form);
      setIsSubmitting(false);
      alert('Product created successfully!');
    }, 1500);
  };

  const getTotalStock = () => {
    return form.variants.reduce((total, variant) => {
      return total + variant.options.reduce((variantTotal, option) => {
        return variantTotal + (option.stock || 0);
      }, 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Product</h1>
              <p className="text-gray-600 mt-1">Add a new product to your inventory</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Code *
                </label>
                <input
                  type="text"
                  name="productCode"
                  placeholder="Enter product code"
                  value={form.productCode}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HSN Code
                </label>
                <input
                  type="text"
                  name="hsnCode"
                  placeholder="Enter HSN code"
                  value={form.hsnCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                name="productName"
                placeholder="Enter product name"
                value={form.productName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-6 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFavourite"
                  checked={form.isFavourite}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <Star className={`w-4 h-4 ${form.isFavourite ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                <span className="text-sm font-medium text-gray-700">Mark as Favourite</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                {form.active ? (
                  <Eye className="w-4 h-4 text-green-500" />
                ) : (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                )}
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
            </div>
          </div>

          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Image</h2>
            
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {imagePreview && (
                <div className="w-24 h-24 border-2 border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {!imagePreview && (
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Image className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Product Variants</h2>
              <div className="text-sm text-gray-600">
                Total Stock: <span className="font-medium text-blue-600">{getTotalStock()}</span>
              </div>
            </div>

            <div className="space-y-4">
              {form.variants.map((variant, vi) => (
                <div key={vi} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">
                      Variant {vi + 1}
                    </label>
                    {form.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(vi)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <input
                    type="text"
                    placeholder="Variant name (e.g., Size, Color)"
                    value={variant.variantName}
                    onChange={(e) => handleVariantChange(vi, 'variantName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-600 px-1">
                      <div className="col-span-8">Option Value</div>
                      <div className="col-span-3">Stock</div>
                      <div className="col-span-1"></div>
                    </div>
                    
                    {variant.options.map((option, oi) => (
                      <div key={oi} className="grid grid-cols-12 gap-2">
                        <input
                          type="text"
                          placeholder="Option value (e.g., Small, Red)"
                          value={option.value}
                          onChange={(e) =>
                            handleOptionChange(vi, oi, 'value', e.target.value)
                          }
                          className="col-span-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="number"
                          placeholder="0"
                          value={option.stock}
                          onChange={(e) =>
                            handleOptionChange(vi, oi, 'stock', e.target.value)
                          }
                          className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {variant.options.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeOption(vi, oi)}
                            className="col-span-1 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={() => addOption(vi)}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mt-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Option
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addVariant}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mt-4"
            >
              <Plus className="w-4 h-4" />
              Add Variant
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Product
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProductPage;