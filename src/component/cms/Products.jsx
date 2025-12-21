"use client";
import { useState } from "react";
import { Save, Trash2, Plus, Edit, X, Image as ImageIcon } from "lucide-react";

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
      <div className="max-w-4xl">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingProduct.name ? 'Edit Product' : 'Add New Product'}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-500 transition-colors">
                {editingProduct.imagePreview ? (
                  <div className="relative">
                    <img
                      src={editingProduct.imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setEditingProduct(prev => ({ ...prev, imagePreview: null }))}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
                    <span className="text-sm font-medium text-gray-700 mb-1">
                      Click to upload image
                    </span>
                    <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter product name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={editingProduct.description}
                onChange={(e) => setEditingProduct(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter product description"
                rows={5}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock Status
                </label>
                <select
                  value={editingProduct.inStock}
                  onChange={(e) => setEditingProduct(prev => ({ ...prev, inStock: e.target.value === 'true' }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                }}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProduct}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm"
              >
                <Save className="w-4 h-4" />
                Save Product
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Products Management</h3>
            <p className="text-sm text-gray-500 mt-1">Manage your product catalog</p>
          </div>
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  {product.imagePreview ? (
                    <img src={product.imagePreview} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-emerald-600">${product.price}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${product.inStock
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                      }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
