'use client';

import React from 'react';
import { Package, Truck, CheckCircle2, AlertCircle } from 'lucide-react';

const TrackingStats = ({ shipments = [] }) => {
    const stats = [
        {
            label: 'Total Shipments',
            icon: Package,
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600',
            value: shipments.length
        },
        {
            label: 'In Transit',
            icon: Truck,
            bgColor: 'bg-amber-50',
            iconColor: 'text-amber-600',
            value: shipments.filter(s => ['in_transit', 'out_for_delivery', 'booked', 'shipped'].includes(s.status)).length
        },
        {
            label: 'Delivered',
            icon: CheckCircle2,
            bgColor: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            value: shipments.filter(s => s.status === 'delivered').length
        },
        {
            label: 'Exceptions',
            icon: AlertCircle,
            bgColor: 'bg-rose-50',
            iconColor: 'text-rose-600',
            value: shipments.filter(s => ['failed', 'cancelled'].includes(s.status)).length
        },
    ];


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl p-5 shadow-sm border border-slate-200"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                        </div>
                        <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                            <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default TrackingStats;


