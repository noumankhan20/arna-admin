// components/admin/promos/PromoCard.jsx
'use client';

export default function PromoCard({ promo, onEdit, onDelete, onToggle, isToggling }) {
  const formatDiscount = () => {
    if (promo.discountType === 'percentage') {
      return `${promo.discountValue}%`;
    }
    return `₹${promo.discountValue}`;
  };

  const formatAppliesTo = (type) => {
    if (!type) return '—'; // IMAGE / Banner promos
    if (type === 'all') return 'All Products';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };


  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
              {promo.promoCode}
            </span>
            <button
              onClick={() => onToggle(promo._id)}
              disabled={isToggling}
              className={`text-xs font-medium px-2 py-1 rounded transition-colors ${promo.isActive
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
                }`}
            >
              {promo.isActive ? 'Active' : 'Inactive'}
            </button>
          </div>
          <h3 className="font-semibold text-gray-900 text-base">{promo.title}</h3>
          {promo.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{promo.description}</p>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div>
          <span className="text-gray-500">Discount:</span>
          <p className="font-semibold text-gray-900">{formatDiscount()}</p>
        </div>
        <div>
          <span className="text-gray-500">Applies To:</span>
          <p className="font-semibold text-gray-900">{formatAppliesTo(promo.appliesTo)}</p>
        </div>
        {promo.minOrderValue && (
          <div>
            <span className="text-gray-500">Min Order:</span>
            <p className="font-semibold text-gray-900">₹{promo.minOrderValue}</p>
          </div>
        )}
        {promo.maxDiscount && (
          <div>
            <span className="text-gray-500">Max Discount:</span>
            <p className="font-semibold text-gray-900">₹{promo.maxDiscount}</p>
          </div>
        )}
      </div>

      {/* Influencer Info */}
      {promo.influencer?.name && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Influencer</p>
          <p className="text-sm font-medium text-gray-900">{promo.influencer.name}</p>
          {promo.influencer.instagram && (
            <p className="text-xs text-gray-500">@{promo.influencer.instagram}</p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(promo)}
          className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(promo._id, promo.promoCode)}
          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}