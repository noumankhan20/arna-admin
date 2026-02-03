'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    LayoutDashboard,
    Search,
    BarChart3,
    LogOut,
    ArrowLeft,
    ChevronRight,
    Ticket,
    TicketCheck
} from 'lucide-react';
import { useLogoutAdminMutation } from '../redux/slice/authApiSlice';
import { toast } from 'react-toastify';

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [logoutAdmin, { isLoading: isLoggingOut }] = useLogoutAdminMutation();

    const handleLogout = async () => {
        try {
            await logoutAdmin().unwrap();
            toast.success("Logged out successfully");
            router.replace("/");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    const menuItems = [
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            path: '/admin/dashboard'
        },
        {
            name: 'Tracking',
            icon: Search,
            path: '/admin/tracking'
        },
        {
            name: 'Analysis',
            icon: BarChart3,
            path: '/admin/analysis'
        },
        {
            name: 'Tickets & Queries ',
            icon: TicketCheck,
            path: '/admin/tickets-queries'
        },
    ];

    return (
        <div className="w-80 min-h-screen bg-white border-r border-gray-100 flex flex-col shrink-0 shadow-sm relative">
            {/* Back Button */}
            <div className="px-6 py-4">
                <button
                    onClick={() => router.push('/select-dashboard')}
                    className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-emerald-600 transition-colors uppercase tracking-widest group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Select Dashboard
                </button>
            </div>

            {/* Logo Section */}
            <div className="px-6 py-6 border-b border-gray-50 flex-shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 relative flex-shrink-0">
                                   <Image
                                     src="/arna-logo.webp"
                                     alt="Arna Logo"
                                     fill
                                     className="object-contain"
                                   />
                                 </div>
                    <div>
                        <p className="text-xl font-bold text-gray-900 italic tracking-tight leading-tight">
                            Main <span className="text-emerald-600">Admin</span>
                        </p>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-[0.2em] mt-0.5">
                            Arna Operations
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 pt-8 space-y-1.5 flex flex-col overflow-hidden">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`group w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-500 shrink-0 ${isActive
                                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-200 scale-[1.02] translate-x-1"
                                : "text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 hover:translate-x-1"
                                }`}
                        >
                            <Icon
                                className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${isActive ? "text-white rotate-3" : "text-gray-400 group-hover:text-emerald-600 group-hover:rotate-3"
                                    }`}
                            />
                            <span className="flex-1">{item.name}</span>
                            {isActive && (
                                <ChevronRight className="w-4 h-4 text-white/70" />
                            )}
                        </Link>
                    );
                })}
            </nav>


        </div>
    );
};

export default Sidebar;
