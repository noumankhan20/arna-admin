// components/admin/promos/PromoTable.jsx
'use client';

export default function PromoTable({ promos, onEdit, onDelete, onToggle, isToggling }) {
  const formatDiscount = (promo) => {
    if (promo.discountType === 'percentage') {
      return `${promo.discountValue}%`;
    }
    return `₹${promo.discountValue}`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Promo Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {promos.map((promo) => (
              <tr key={promo._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    {promo.promoCode}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {promo.promoType === 'IMAGE' ? 'Banner Promo' : promo.title}
                  </div>
                  {promo.description && (
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {promo.description}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {promo.promoType === 'IMAGE' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      🖼 Image Promo
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-gray-900">
                      {formatDiscount(promo)}
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={promo.isActive}
                      disabled={isToggling}
                      onChange={() => onToggle(promo._id)}
                      className="sr-only peer"
                    />
                    <div
                      className="
        relative w-11 h-6 bg-gray-200 rounded-full
        peer peer-checked:bg-emerald-500
        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
        after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
        peer-checked:after:translate-x-full
      "
                    />
                  </label>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(promo)}
                      className="text-emerald-600 cursor-pointer hover:text-emerald-700 font-medium"
                      title="Edit"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(promo._id, promo.promoCode)}
                      className="text-red-600 hover:text-red-700 font-medium"
                      title="Delete"
                    >
                      <svg className="w-5 h-5 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}