// components/admin/promos/PromoFilters.jsx
'use client';

export default function PromoFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  appliesToFilter,
  onAppliesToChange,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Promo Code
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Enter promo code..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
            <svg
              className="absolute left-3 top-3 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
          >
            <option value="all">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Applies To Filter */}
        <div>
          <label htmlFor="appliesTo" className="block text-sm font-medium text-gray-700 mb-2">
            Applies To
          </label>
          <select
            id="appliesTo"
            value={appliesToFilter}
            onChange={(e) => onAppliesToChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
          >
            <option value="">All Types</option>
            <option value="all">All Products</option>
            <option value="product">Product</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>
    </div>
  );
}