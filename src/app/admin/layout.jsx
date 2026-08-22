'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/component/admin/Sidebar';
import DashboardHeader from '@/component/admin/DashboardHeader';
import { useGetAdminProfileQuery } from '@/component/redux/slice/authApiSlice';

/**
 * Shared layout for all /admin/* routes.
 * Persistent Sidebar and Header with authentication validation.
 */
const AdminLayout = ({ children }) => {
    const router = useRouter();
    const { isLoading, isError } = useGetAdminProfileQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });

    useEffect(() => {
        if (!isLoading && isError) {
            router.replace("/login");
        }
    }, [isLoading, isError, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Validating session...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Persistent Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Persistent Header */}
                <DashboardHeader />

                {/* Dynamic Page Content */}
                <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

