'use client';
import React from 'react';
import StatCards from '@/component/admin/StatCards';
import RevenueChart from '@/component/admin/RevenueChart';
import RecentOrders from '@/component/admin/RecentOrders';

const AdminDashboardPage = () => {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Real-time stats</h1>
                <p className="text-gray-400 font-medium text-sm">Welcome back to your store's monitoring suite.</p>
            </div>

            <StatCards />
            <RevenueChart />
            <RecentOrders />
        </>
    );
};

export default AdminDashboardPage;
