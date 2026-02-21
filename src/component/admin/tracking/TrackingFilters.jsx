'use client';

import React from 'react';
import { Search, Filter, X } from 'lucide-react';

const TrackingFilters = ({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }) => {
    const hasActiveFilters = searchQuery !== '' || statusFilter !== 'All Status';

    const clearFilters = () => {
        setSearchQuery('');
        setStatusFilter('All Status');
    };

    return (
        <div className="bg-white p-2 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-emerald-500 transition-colors" />
                <input
                    type="text"
                    placeholder="Search by Order ID, Customer, or Courier..."
                    className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border-none rounded-2xl text-[13px] font-medium focus:ring-2 focus:ring-emerald-500/10 focus:bg-white transition-all shadow-inner"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto px-2 lg:px-0">
                <div className="relative flex-1 lg:w-48 group">
                    <Filter className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors pointer-events-none" />
                    <select
                        className="w-full pl-12 pr-10 py-4 bg-gray-50/50 border-none rounded-2xl text-[13px] font-bold text-gray-600 appearance-none focus:ring-2 focus:ring-emerald-500/10 focus:bg-white transition-all cursor-pointer shadow-inner"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>All Status</option>
                        <option>In Transit</option>
                        <option>Delivered</option>
                        <option>Pending</option>
                        <option>Exception</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="w-1.5 h-1.5 border-b-2 border-r-2 border-gray-300 rotate-45 transform -translate-y-0.5" />
                    </div>
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-2 px-5 py-4 bg-rose-50 text-rose-600 rounded-2xl text-[13px] font-bold hover:bg-rose-100 transition-all active:scale-95 border border-rose-100 shadow-sm"
                    >
                        <X className="w-4 h-4" />
                        <span className="hidden sm:inline">Clear</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default TrackingFilters;

