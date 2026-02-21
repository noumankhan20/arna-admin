'use client';

import React from 'react';
import { Package, Truck, CheckCircle2, AlertCircle } from 'lucide-react';

const TrackingStats = ({ shipments = [] }) => {
    const stats = [
        {
            label: 'Total Shipments',
            icon: Package,
            color: 'bg-emerald-50 text-emerald-600',
            trend: '+12%',
            value: shipments.length
        },
        {
            label: 'In Transit',
            icon: Truck,
            color: 'bg-blue-50 text-blue-600',
            trend: '+5%',
            value: shipments.filter(s => s.status === 'In Transit').length
        },
        {
            label: 'Delivered',
            icon: CheckCircle2,
            color: 'bg-teal-50 text-teal-600',
            trend: '+18%',
            value: shipments.filter(s => s.status === 'Delivered').length
        },
        {
            label: 'Exceptions',
            icon: AlertCircle,
            color: 'bg-rose-50 text-rose-600',
            trend: '-2%',
            value: shipments.filter(s => s.status === 'Exception').length
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 group relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-100/50 transition-colors duration-500" />

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-inner`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col items-end">
                                <span className={`flex items-center gap-0.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                                    {stat.trend}
                                </span>
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-gray-900 tracking-tight group-hover:text-emerald-600 transition-colors duration-300">
                                {stat.value}
                            </h3>
                            <p className="text-xs text-gray-400 mt-2 font-medium">Updated live</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TrackingStats;


