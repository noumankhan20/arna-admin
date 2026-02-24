'use client';

import React from 'react';
import { Search, Filter, X, Package } from 'lucide-react';

const TrackingFilters = ({ search, setSearch, filters, setFilters }) => {
    const hasActiveFilters =
        search !== '' ||
        filters.shipmentStatus !== '' ||
        filters.status !== '' ||
        filters.paymentStatus !== '';

    const clearFilters = () => {
        setSearch('');
        setFilters({
            page: 1,
            limit: 10,
            shipmentStatus: '',
            status: '',
            paymentStatus: ''
        });
    };

    const updateFilter = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: 1
        }));
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search Bar */}
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by Order ID, Customer, or Courier..."
                        className="w-full pl-12 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500 transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-2 px-6 py-3 bg-rose-50 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-100 transition-all active:scale-95 border border-rose-100 shadow-sm w-full lg:w-auto justify-center"
                    >
                        <X className="w-4 h-4" />
                        <span>Clear Filters</span>
                    </button>
                )}
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Shipment Status */}
                <div className="relative group/select">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <Package className="w-4 h-4 text-slate-400 group-focus-within/select:text-emerald-600 transition-colors" />
                    </div>
                    <select
                        className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 appearance-none focus:ring-2 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500 transition-all cursor-pointer"
                        value={filters.shipmentStatus}
                        onChange={(e) => updateFilter('shipmentStatus', e.target.value)}
                    >
                        <option value="">All Shipment Status</option>
                        <option value="created">Created</option>
                        <option value="booked">Booked</option>
                        <option value="in_transit">In Transit</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>

                {/* Order Status */}
                <div className="relative group/select">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <Filter className="w-4 h-4 text-slate-400" />
                    </div>
                    <select
                        className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 appearance-none focus:ring-2 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500 transition-all cursor-pointer"
                        value={filters.status}
                        onChange={(e) => updateFilter('status', e.target.value)}
                    >
                        <option value="">All Order Status</option>
                        <option value="processing">Processing</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Payment Status */}
                <div className="relative group/select">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <Filter className="w-4 h-4 text-slate-400" />
                    </div>
                    <select
                        className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 appearance-none focus:ring-2 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500 transition-all cursor-pointer"
                        value={filters.paymentStatus}
                        onChange={(e) => updateFilter('paymentStatus', e.target.value)}
                    >
                        <option value="">All Payment Status</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                        <option value="refund_initiated">Refund Initiated</option>
                        <option value="refunded">Refunded</option>
                        <option value="refund_failed">Refund Failed</option>
                    </select>
                </div>
            </div>
        </div>
    );
};



export default TrackingFilters;

