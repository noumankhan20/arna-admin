'use client';
import React from 'react';
import Sidebar from '@/component/admin/Sidebar';
import DashboardHeader from '@/component/admin/DashboardHeader';

/**
 * Shared layout for all /admin/* routes.
 * This keeps the Sidebar and Header persistent across navigation
 * ensuring they don't re-render and state (like scroll position) is preserved.
 */
const AdminLayout = ({ children }) => {
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
