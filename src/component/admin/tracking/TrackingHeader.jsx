'use client';

import React from 'react';
import { RefreshCw, Package, Sparkles } from 'lucide-react';
import { useGetAdminProfileQuery } from '../../redux/slice/authApiSlice';

const TrackingHeader = () => {
    const { data: adminData } = useGetAdminProfileQuery();
    const adminFirstName = adminData?.admin?.fullName?.split(' ')[0] || 'Admin';

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-[0.2em]">
                    <Sparkles className="w-3.5 h-3.5" />
                    Logistics Overview
                </div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                    Hey {adminFirstName}, <span className="text-emerald-600">Track Orders</span>
                </h1>
                <p className="text-gray-400 font-medium text-sm max-w-md">
                    Manage your store's global shipments and real-time logistics from one single pane.
                </p>
            </div>
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2.5 px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:bg-gray-50 hover:border-emerald-200 hover:text-emerald-600 transition-all shadow-sm active:scale-95 group">
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                    Sync Data
                </button>
                <button className="flex items-center gap-2.5 px-6 py-3 bg-emerald-600 text-white rounded-2xl text-[13px] font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 active:scale-95 group">
                    <Package className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
                    Ship New Order
                </button>
            </div>
        </div>
    );
};

export default TrackingHeader;

