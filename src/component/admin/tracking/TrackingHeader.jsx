'use client';

import React from 'react';
import { Package } from 'lucide-react';
import { useGetAdminProfileQuery } from '../../redux/slice/authApiSlice';

const TrackingHeader = () => {
    const { data: adminData } = useGetAdminProfileQuery();
    const adminFirstName = adminData?.admin?.fullName?.split(' ')[0] || 'Admin';

    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-600 rounded-lg">
                    <Package className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-slate-800">Logistics Overview</h1>
            </div>
            <p className="text-slate-600 ml-14">
                Manage your store's global shipments and real-time logistics from one single pane.
            </p>
        </div>
    );
};

export default TrackingHeader;

