// components/admin/promos/EmptyState.jsx
'use client';

export default function EmptyState({ onCreateClick }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-12 h-12 text-emerald-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No promo codes yet</h3>
      <p className="text-gray-500 text-center mb-6 max-w-sm">
        Get started by creating your first promotional code to offer discounts to your customers.
      </p>
      <button
        onClick={onCreateClick}
        className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium shadow-sm"
      >
        Create First Promo Code
      </button>
    </div>
  );
}