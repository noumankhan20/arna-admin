'use client';
import React from 'react';
import {
    BarChart,
    Package,
    Users,
    Clock,
    TrendingUp,
    ArrowUpRight
} from 'lucide-react';
import { useGetDashboardStatsQuery } from '../redux/slice/dashboardApiSlice';

const StatCard = ({ title, value, icon: Icon, trend, subtitle, loading }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 group relative overflow-hidden">
        {/* Decorative Gradient Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-100/50 transition-colors duration-500" />

        <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-inner">
                    <Icon className="w-5 h-5" />
                </div>
                {!loading && trend && (
                    <div className="flex flex-col items-end">
                        <span className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-lg ${trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'
                            }`}>
                            {trend}
                        </span>
                    </div>
                )}
            </div>

            <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">{title}</p>
                <div className="flex items-baseline gap-2">
                    {loading ? (
                        <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-lg" />
                    ) : (
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">{value}</h3>
                    )}
                </div>
                <p className="text-xs text-gray-400 mt-2 font-medium">{subtitle}</p>
            </div>
        </div>
    </div>
);

const StatCards = () => {
    const { data, isLoading } = useGetDashboardStatsQuery();
    const statsData = data?.stats;

    const stats = [
        {
            title: "Gross Volume",
            value: `₹${statsData?.totalRevenue || 0}`,
            icon: BarChart,
            trend: "+0%",
            subtitle: "Lifetime revenue",
            loading: isLoading
        },
        {
            title: "Inventory",
            value: statsData?.totalProducts || 0,
            icon: Package,
            trend: "+0%",
            subtitle: "Total products listed",
            loading: isLoading
        },
        {
            title: "Admins",
            value: statsData?.totalAdmins || 0,
            icon: Users,
            trend: "+0%",
            subtitle: "System operators",
            loading: isLoading
        },
        {
            title: "Recent Pulse",
            value: statsData?.totalOrders || 0,
            icon: Clock,
            trend: "+0%",
            subtitle: "Orders today",
            loading: isLoading
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-4">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

export default StatCards;
