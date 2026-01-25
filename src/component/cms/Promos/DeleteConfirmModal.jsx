// components/admin/promos/DeleteConfirmModal.jsx
'use client';

export default function DeleteConfirmModal({
    isOpen,
    promoCode,
    onConfirm,
    onCancel,
    isDeleting,
}) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onCancel}
        >
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                    <svg
                        className="w-6 h-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Promo Code</h3>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete{' '}
                    <span className="font-semibold text-gray-900">{promoCode}</span>? This action cannot be
                    undone.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 font-medium"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}