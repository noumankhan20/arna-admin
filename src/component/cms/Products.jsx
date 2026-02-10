"use client";
import { useState, useEffect } from "react";
import { Save, Trash2, Plus, Edit, X, Image as ImageIcon, Upload } from "lucide-react";
import {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation
} from "../redux/slice/productApiSlice";
import { PRODUCT_CATEGORIES } from "../constants/product.constants";

export default function ProductsSection({ showSuccessToast }) {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // RTK Query hooks
  const { data: productsData, isLoading, error } = useGetAllProductsQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const products = productsData?.data || [];

  const handleAddProduct = () => {
    setEditingProduct({
      _id: null,
      image: null,
      imagePreview: null,
      imageFile: null,
      name: '',
      slug: '',
      description: '',
      category: '',
      quantity: '',
      unit: 'g',
      price: '',
      salePrice: '',
      link: '',
      isBestSeller: false,
      isNewArrival: false,
    });
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct({
      ...product,
      quantity: product.quantity || '',
      unit: product.unit || 'g',
      link: product.link || '',
      category: product.category || '',
      imagePreview: product.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image}` : null,
      imageFile: null,
      salePrice: product.salePrice || '',
      isBestSeller: product.isBestSeller || false,
      isNewArrival: product.isNewArrival || false,
    });
    setShowForm(true);
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (name) => {
    setEditingProduct(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleSaveProduct = async () => {
    if (!editingProduct.name || !editingProduct.description || !editingProduct.price || !editingProduct.category
      || !editingProduct.quantity || !editingProduct.unit
    ) {
      showSuccessToast('Please fill in all required fields!', 'error');
      return;
    }

    // For create, ensure we have an image
    if (!editingProduct._id && !editingProduct.imageFile && !editingProduct.image) {
      showSuccessToast('Please upload a product image!', 'error');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', editingProduct.name);
      formData.append('slug', editingProduct.slug);
      formData.append('description', editingProduct.description);
      formData.append('price', editingProduct.price);
      formData.append('category', editingProduct.category);
      formData.append('quantity', Number(editingProduct.quantity));
      formData.append('unit', editingProduct.unit);

      if (editingProduct.salePrice) {
        formData.append('salePrice', editingProduct.salePrice);
      }

      formData.append('isBestSeller', editingProduct.isBestSeller ? 'true' : 'false');
      formData.append('isNewArrival', editingProduct.isNewArrival ? 'true' : 'false');


      // Only append image if a new file was selected
      if (editingProduct.imageFile) {
        formData.append('image', editingProduct.imageFile);
      }

      if (editingProduct.link) {
        formData.append('link', editingProduct.link);
      }


      let result;
      if (editingProduct._id) {
        // Update existing product
        result = await updateProduct({
          id: editingProduct._id,
          data: formData
        }).unwrap();
      } else {
        // Create new product
        result = await createProduct(formData).unwrap();
      }

      setShowForm(false);
      setEditingProduct(null);
      showSuccessToast(result.message || 'Product saved successfully!');
    } catch (err) {
      console.error('Save product error:', err);
      showSuccessToast(err?.data?.message || 'Failed to save product', 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const result = await deleteProduct(id).unwrap();
      showSuccessToast(result.message || 'Product deleted successfully!');
    } catch (err) {
      console.error('Delete product error:', err);
      showSuccessToast(err?.data?.message || 'Failed to delete product', 'error');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showSuccessToast('Please select a valid image file', 'error');
        return;
      }

      // Validate file size (e.g., 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showSuccessToast('Image size should be less than 5MB', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProduct(prev => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading products: {error?.data?.message || 'Something went wrong'}</p>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-transparent px-6 py-4 border-b border-gray-200 flex items-center justify-between cursor-pointer">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {editingProduct._id ? 'Edit Product' : 'Add New Product'}
              </h3>
              <p className="text-sm text-gray-500 mt-1">Fill in product details</p>
            </div>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-5">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Product Image <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <div className="w-full h-48 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-emerald-500/50">
                  {editingProduct.imagePreview ? (
                    <img src={editingProduct.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No image selected</p>
                    </div>
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl cursor-pointer">
                  <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium text-sm">
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {editingProduct.imagePreview && (
                  <button
                    type="button"
                    onClick={() => setEditingProduct(prev => ({
                      ...prev,
                      imagePreview: null,
                      imageFile: null
                    }))}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Enter product name"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Slug (auto-generated, read-only) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Slug</label>
              <input
                type="text"
                value={editingProduct.slug}
                readOnly
                placeholder="Auto-generated from name"
                className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-xl text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct(prev => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="">Select category</option>
                {PRODUCT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.replace(/-/g, " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity & Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={editingProduct.quantity}
                  onChange={(e) =>
                    setEditingProduct(prev => ({
                      ...prev,
                      quantity: e.target.value
                    }))
                  }
                  placeholder="e.g. 100"
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Unit <span className="text-red-500">*</span>
                </label>
                <select
                  value={editingProduct.unit}
                  onChange={(e) =>
                    setEditingProduct(prev => ({
                      ...prev,
                      unit: e.target.value
                    }))
                  }
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="g">Grams (g)</option>
                  <option value="ml">Milliliters (ml)</option>
                  <option value="pcs">Pieces (pcs)</option>
                </select>
              </div>
            </div>


            {/* Price & Sale Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">Sale Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.salePrice}
                  onChange={(e) => setEditingProduct(prev => ({ ...prev, salePrice: e.target.value }))}
                  placeholder="Optional"
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={editingProduct.description}
                onChange={(e) => setEditingProduct(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter product description"
                rows={4}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
              />
            </div>


            {/* Product Usage link */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Youtube Tutorial Video Link
              </label>
              <input
                type="text"
                value={editingProduct.link}
                onChange={(e) =>
                  setEditingProduct(prev => ({
                    ...prev,
                    link: e.target.value
                  }))
                }
                placeholder="Enter youtube video link"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Badges */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-900">Product Badges</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isBestSeller}
                    onChange={(e) => setEditingProduct(prev => ({
                      ...prev,
                      isBestSeller: e.target.checked
                    }))}
                    className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">Best Seller</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isNewArrival}
                    onChange={(e) => setEditingProduct(prev => ({
                      ...prev,
                      isNewArrival: e.target.checked
                    }))}
                    className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">New Arrival</span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
              disabled={isCreating || isUpdating}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProduct}
              disabled={isCreating || isUpdating}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isCreating || isUpdating ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Products Management</h3>
          <p className="text-sm text-gray-500 mt-1">Manage your product catalog</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="inline-flex items-center cursor-pointer gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-emerald-500/25"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
          <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No products yet. Add your first product!</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <div
              key={product._id}
              className="group bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative aspect-square bg-gray-100 overflow-hidden flex-shrink-0">
                {product.image ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.isBestSeller && (
                    <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Best Seller
                    </span>
                  )}
                  {product.isNewArrival && (
                    <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="flex-1 flex items-center cursor-pointer justify-center gap-2 bg-emerald-500 text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate mb-2">{product.name}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">{product.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    disabled={isDeleting}
                    className="p-2 text-gray-500 hover:text-red-500 cursor-pointer hover:bg-red-100 rounded-lg transition-colors flex-shrink-0 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  {product.quantity} {product.unit}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-200 flex items-center gap-2">
                  {product.salePrice ? (
                    <>
                      <span className="text-xl font-bold text-emerald-600">₹{product.salePrice}</span>
                      <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}