'use client';
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useGetAdminProfileQuery } from '../redux/slice/authApiSlice';
const DashboardHeader = () => {
    const { data: adminData } = useGetAdminProfileQuery();
    const adminName = adminData?.admin?.fullName || 'Arna Admin';

    return (
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-40 transition-all duration-300">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h2>
                <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest leading-none text-nowrap">Real-time shop performance</p>
                </div>
            </div>

            <div className="flex items-center gap-8">
                {/* Search Bar */}
                <div className="relative hidden xl:block group">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search operational data..."
                        className="pl-12 pr-6 py-3 bg-gray-50 border-none rounded-2xl text-xs font-medium focus:ring-2 focus:ring-emerald-500/10 focus:bg-white w-72 transition-all shadow-inner"
                    />
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-4">
                    <div className="h-10 w-[1px] bg-gray-100 mx-1" />

                    <button className="flex items-center gap-4 p-1.5 pr-4 rounded-2xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-200 group-hover:scale-105 transition-transform">
                            {adminName.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-left hidden lg:block">
                            <p className="text-[11px] font-bold text-gray-900 leading-tight group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{adminName}</p>
                            <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest mt-0.5">Primary Operator</p>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
