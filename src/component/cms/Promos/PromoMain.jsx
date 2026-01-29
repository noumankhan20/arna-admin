// app/admin/promos/page.jsx
'use client';

import { useState, useMemo } from 'react';
import {
  useGetAllPromosQuery,
  useCreatePromoMutation,
  useUpdatePromoMutation,
  useDeletePromoMutation,
  useTogglePromoStatusMutation,
} from '@/component/redux/slice/promoApiSlice';
import PromoFilters from './PromoFilters';
import PromoTable from './PromoTable';
import PromoCard from './PromoCard';
import PromoFormModal from './PromoFormModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import EmptyState from './EmptyState';

export default function PromosPage() {
  // RTK Query hooks
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [appliesToFilter, setAppliesToFilter] = useState('');

  const queryParams = useMemo(() => {
    const params = { page, limit: 10 };
    if (statusFilter !== 'all') params.isActive = statusFilter;
    if (appliesToFilter) params.appliesTo = appliesToFilter;
    if (searchTerm) params.promoCode = searchTerm;
    return params;
  }, [page, statusFilter, appliesToFilter, searchTerm]);

  const { data, isLoading, isFetching } = useGetAllPromosQuery(queryParams);
  const [createPromo, { isLoading: isCreating }] = useCreatePromoMutation();
  const [updatePromo, { isLoading: isUpdating }] = useUpdatePromoMutation();
  const [deletePromo, { isLoading: isDeleting }] = useDeletePromoMutation();
  const [togglePromoStatus, { isLoading: isToggling }] = useTogglePromoStatusMutation();

  // Local state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editPromo, setEditPromo] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, code: '' });

  // Handlers
  const handleCreateClick = () => {
    setEditPromo(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (promo) => {
    setEditPromo(promo);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditPromo(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editPromo) {
        await updatePromo({
          id: editPromo._id,
          body: formData, // 👈 IMPORTANT
        }).unwrap();
      } else {
        await createPromo(formData).unwrap();
      }

      handleFormClose();
    } catch (error) {
      console.error('Failed to save promo:', error);
      alert(error?.data?.message || 'Failed to save promo code. Please try again.');
    }
  };


  const handleDeleteClick = (id, code) => {
    setDeleteModal({ isOpen: true, id, code });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deletePromo(deleteModal.id).unwrap();
      setDeleteModal({ isOpen: false, id: null, code: '' });
    } catch (error) {
      console.error('Failed to delete promo:', error);
      alert(error?.data?.message || 'Failed to delete promo code. Please try again.');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, id: null, code: '' });
  };

  const handleToggleStatus = async (id) => {
    try {
      await togglePromoStatus(id).unwrap();
    } catch (error) {
      console.error('Failed to toggle status:', error);
      alert(error?.data?.message || 'Failed to update status. Please try again.');
    }
  };

  const promos = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const hasPromos = promos.length > 0;
  const showEmptyState = !isLoading && !hasPromos && searchTerm === '' && statusFilter === 'all' && appliesToFilter === '';

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Promo Codes</h1>
            <p className="text-gray-600 mt-1">Manage promotional codes and discounts</p>
          </div>
          <button
            onClick={handleCreateClick}
            className="px-4 py-2.5 md:px-6 md:py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium shadow-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline cursor-pointer">Add Promo</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Filters */}
        {!showEmptyState && (
          <PromoFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            appliesToFilter={appliesToFilter}
            onAppliesToChange={setAppliesToFilter}
          />
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
          </div>
        )}

        {/* Empty State */}
        {showEmptyState && <EmptyState onCreateClick={handleCreateClick} />}

        {/* No Results */}
        {!isLoading && !hasPromos && !showEmptyState && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No promo codes found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search term</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setAppliesToFilter('');
              }}
              className="px-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Desktop Table View */}
        {!isLoading && hasPromos && (
          <>
            <div className="hidden md:block">
              <PromoTable
                promos={promos}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                onToggle={handleToggleStatus}
                isToggling={isToggling}
              />
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {promos.map((promo) => (
                <PromoCard
                  key={promo._id}
                  promo={promo}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  onToggle={handleToggleStatus}
                  isToggling={isToggling}
                />
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {!isLoading && hasPromos && totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3">
            <div className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || isFetching}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || isFetching}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Modals */}
        <PromoFormModal
          isOpen={isFormOpen}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          editPromo={editPromo}
          isLoading={isCreating || isUpdating}
        />

        <DeleteConfirmModal
          isOpen={deleteModal.isOpen}
          promoCode={deleteModal.code}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          isDeleting={isDeleting}
        />
      </div>

      {/* Mobile Sticky Add Button */}
      <button
        onClick={handleCreateClick}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 transition-all flex items-center justify-center z-40 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}