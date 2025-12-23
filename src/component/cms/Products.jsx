"use client";
import { useState } from "react";
import { Save, Trash2, Plus, Edit, X, Image as ImageIcon, Upload } from "lucide-react";

export default function ProductsSection({
  products,
  setCmsData,
  showSuccessToast
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = () => {
    setEditingProduct({
      id: Date.now(),
      image: null,
      imagePreview: null,
      name: '',
      description: '',
      price: '',
      inStock: true
    });
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSaveProduct = () => {
    if (editingProduct.name && editingProduct.description) {
      setCmsData(prev => {
        const existingIndex = prev.products.findIndex(p => p.id === editingProduct.id);
        if (existingIndex >= 0) {
          const updated = [...prev.products];
          updated[existingIndex] = editingProduct;
          return { ...prev, products: updated };
        } else {
          return { ...prev, products: [...prev.products, editingProduct] };
        }
      });
      setShowForm(false);
      setEditingProduct(null);
      showSuccessToast('Product saved successfully!');
    }
  };

  const handleDeleteProduct = (id) => {
    setCmsData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
    showSuccessToast('Product deleted successfully!');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProduct(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-transparent px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {editingProduct.name ? 'Edit Product' : 'Add New Product'}
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
              <label className="block text-sm font-medium text-gray-900">Product Image</label>
              <div className="space-y-3">
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
                      onClick={() => setEditingProduct(prev => ({ ...prev, imagePreview: null }))}
                      className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={editingProduct.image || ""}
                  onChange={(e) => setEditingProduct(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="Or enter image URL"
                  className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Product Name</label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter product name"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">Price ($)</label>
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
                <label className="block text-sm font-medium text-gray-900">Stock Status</label>
                <select
                  value={editingProduct.inStock}
                  onChange={(e) => setEditingProduct(prev => ({ ...prev, inStock: e.target.value === 'true' }))}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Description</label>
              <textarea
                value={editingProduct.description}
                onChange={(e) => setEditingProduct(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter product description"
                rows={4}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProduct}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-emerald-500/25"
            >
              <Save className="w-4 h-4" />
              Save Product
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
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-emerald-500/25"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <div
            key={product.id}
            className="group bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300"
          >
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
              {product.imagePreview ? (
                <img src={product.imagePreview} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <ImageIcon className="w-16 h-16 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="p-2.5 bg-white/90 text-gray-700 rounded-lg hover:bg-white transition-colors">
                  <ImageIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full mb-2 ${
                    product.inStock
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xl font-bold text-gray-900">${product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
