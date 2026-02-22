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
            limit: 100,
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
        <div className="bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search Bar */}
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by Order ID, Customer, or Courier..."
                        className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border-none rounded-2xl text-[13px] font-medium focus:ring-2 focus:ring-emerald-500/10 focus:bg-white transition-all shadow-inner"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-2 px-6 py-4 bg-rose-50 text-rose-600 rounded-2xl text-[13px] font-bold hover:bg-rose-100 transition-all active:scale-95 border border-rose-100 shadow-sm w-full lg:w-auto justify-center"
                    >
                        <X className="w-4 h-4" />
                        <span>Clear Filters</span>
                    </button>
                )}
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Shipment Status */}
                <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <Package className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200 pr-2">Shipment</span>
                    </div>
                    <select
                        className="w-full pl-28 pr-10 py-4 bg-gray-50/50 border-none rounded-2xl text-[13px] font-bold text-gray-600 appearance-none focus:ring-2 focus:ring-emerald-500/10 focus:bg-white transition-all cursor-pointer shadow-inner"
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
                <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <Filter className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200 pr-2">Order</span>
                    </div>
                    <select
                        className="w-full pl-24 pr-10 py-4 bg-gray-50/50 border-none rounded-2xl text-[13px] font-bold text-gray-600 appearance-none focus:ring-2 focus:ring-emerald-500/10 focus:bg-white transition-all cursor-pointer shadow-inner"
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
                <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <Filter className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200 pr-2">Payment</span>
                    </div>
                    <select
                        className="w-full pl-28 pr-10 py-4 bg-gray-50/50 border-none rounded-2xl text-[13px] font-bold text-gray-600 appearance-none focus:ring-2 focus:ring-emerald-500/10 focus:bg-white transition-all cursor-pointer shadow-inner"
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

