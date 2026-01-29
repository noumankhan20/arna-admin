// components/admin/promos/PromoFormModal.jsx
'use client';

import { useState, useEffect } from 'react';

export default function PromoFormModal({ isOpen, onClose, onSubmit, editPromo, isLoading }) {
    const [formData, setFormData] = useState({
        promoType: 'STANDARD',
        bannerImage: null,
        title: '',
        description: '',
        promoCode: '',
        discountType: 'percentage',
        discountValue: '',
        minOrderValue: '',
        maxDiscount: '',
        appliesTo: 'all',
        influencerName: '',
        influencerInstagram: '',
        influencerCodeOwner: '',
        startDate: '',
        endDate: '',
        showAsPopup: false,
    });

    useEffect(() => {
        if (editPromo) {
            setFormData({
                promoType: editPromo.promoType || 'STANDARD',
                bannerImage: null, // never preload file
                title: editPromo.title || '',
                description: editPromo.description || '',
                promoCode: editPromo.promoCode || '',
                discountType: editPromo.discountType || 'percentage',
                discountValue: editPromo.discountValue?.toString() || '',
                minOrderValue: editPromo.minOrderValue?.toString() || '',
                maxDiscount: editPromo.maxDiscount?.toString() || '',
                appliesTo: editPromo.appliesTo || 'all',
                influencerName: editPromo.influencer?.name || '',
                influencerInstagram: editPromo.influencer?.instagram || '',
                influencerCodeOwner: editPromo.influencer?.codeOwner || '',
                startDate: editPromo.startDate ? editPromo.startDate.split('T')[0] : '',
                endDate: editPromo.endDate ? editPromo.endDate.split('T')[0] : '',
                showAsPopup: editPromo.showAsPopup || false,
            });
        } else {
            resetForm();
        }
    }, [editPromo, isOpen]);

    const resetForm = () => {
        setFormData({
            promoType: 'STANDARD',
            bannerImage: null,
            title: '',
            description: '',
            promoCode: '',
            discountType: 'percentage',
            discountValue: '',
            minOrderValue: '',
            maxDiscount: '',
            appliesTo: 'all',
            influencerName: '',
            influencerInstagram: '',
            influencerCodeOwner: '',
            startDate: '',
            endDate: '',
            showAsPopup: false,
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name === 'promoType') {
            if (value === 'IMAGE') {
                // Clear fields that aren't needed for IMAGE type
                setFormData((prev) => ({
                    ...prev,
                    promoType: value,
                    title: '',
                    description: '',
                    discountType: 'percentage',
                    discountValue: '',
                    minOrderValue: '',
                    maxDiscount: '',
                    appliesTo: 'all',
                    influencerName: '',
                    influencerInstagram: '',
                    influencerCodeOwner: '',
                }));
            } else {
                // Keep all fields for STANDARD type
                setFormData((prev) => ({
                    ...prev,
                    promoType: value,
                }));
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData();

        fd.append('promoType', formData.promoType);
        fd.append('promoCode', formData.promoCode.toUpperCase());

        if (formData.startDate) fd.append('startDate', formData.startDate);
        if (formData.endDate) fd.append('endDate', formData.endDate);
        fd.append('showAsPopup', formData.showAsPopup);

        if (formData.promoType === 'IMAGE') {
            if (!formData.bannerImage) {
                alert('Banner image is required');
                return;
            }
            fd.append('bannerImage', formData.bannerImage);
        } else {
            fd.append('title', formData.title);
            fd.append('discountType', formData.discountType);
            fd.append('discountValue', Number(formData.discountValue));
            fd.append('appliesTo', formData.appliesTo);

            if (formData.description) fd.append('description', formData.description);
            if (formData.minOrderValue) fd.append('minOrderValue', Number(formData.minOrderValue));
            if (formData.maxDiscount && formData.discountType === 'percentage') {
                fd.append('maxDiscount', Number(formData.maxDiscount));
            }

            if (
                formData.influencerName ||
                formData.influencerInstagram ||
                formData.influencerCodeOwner
            ) {
                fd.append(
                    'influencer',
                    JSON.stringify({
                        name: formData.influencerName,
                        instagram: formData.influencerInstagram,
                        codeOwner: formData.influencerCodeOwner,
                    })
                );
            }
        }

        onSubmit(fd);
    };


    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={onClose}
        >
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full my-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {editPromo ? 'Edit Promo Code' : 'Create New Promo Code'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                    <div className="space-y-5">
                        {/* Promo Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Promo Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="promoType"
                                value={formData.promoType}
                                onChange={handleChange}
                                disabled={!!editPromo}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white"
                            >
                                <option value="STANDARD">Standard Promo</option>
                                <option value="IMAGE">Image / Banner Promo</option>
                            </select>
                        </div>

                        {/* Promo Code - Always visible */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Promo Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="promoCode"
                                value={formData.promoCode}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all uppercase"
                                placeholder="e.g., SUMMER2024"
                            />
                        </div>

                        {/* Banner Image - Only for IMAGE type */}
                        {formData.promoType === 'IMAGE' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Banner Image <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            bannerImage: e.target.files[0],
                                        }))
                                    }
                                    required={!editPromo}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                />
                            </div>
                        )}

                        {/* All other fields - Only for STANDARD type */}
                        {formData.promoType === 'STANDARD' && (
                            <>
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                        placeholder="e.g., Summer Sale 2024"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                                        placeholder="Optional description"
                                    />
                                </div>

                                {/* Discount Type & Value */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Discount Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="discountType"
                                            value={formData.discountType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                                        >
                                            <option value="percentage">Percentage (%)</option>
                                            <option value="flat">Flat (₹)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Discount Value <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="discountValue"
                                            value={formData.discountValue}
                                            onChange={handleChange}
                                            required
                                            min="0"
                                            step="0.01"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                            placeholder={formData.discountType === 'percentage' ? 'e.g., 20' : 'e.g., 500'}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Dates - Always visible */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Show as Popup - Always visible */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="showAsPopup"
                                name="showAsPopup"
                                checked={formData.showAsPopup}
                                onChange={handleChange}
                                className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
                            />
                            <label htmlFor="showAsPopup" className="ml-2 text-sm font-medium text-gray-700">
                                Show as popup to customers
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 font-medium"
                        >
                            {isLoading ? 'Saving...' : editPromo ? 'Update Promo' : 'Create Promo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}