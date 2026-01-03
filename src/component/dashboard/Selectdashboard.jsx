'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, FileEdit, ChevronRight, LogOut } from 'lucide-react';
import { useLogoutAdminMutation, useGetAdminQuery } from '../utils/redux/slice/autApiSlice';
import { toast } from 'react-toastify';
export default function SelectPortal() {
  const router = useRouter();
  const [logoutAdmin, { isLoading: isLoggingOut }] = useLogoutAdminMutation();
  const { isLoading, isError } = useGetAdminQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const handleLogout = async () => {
    try {
      await logoutAdmin().unwrap();
      toast.success("Logged out successfully");
      router.replace("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    if (!isLoading && isError) {
      router.replace("/login"); // replace is IMPORTANT
    }
  }, [isLoading, isError, router]);

  if (isLoading) {
    return null; // or a loader
  }
  const portals = [
    {
      id: 'main-admin',
      title: 'Main Admin Dashboard',
      description: 'Manage users, analytics, and system settings',
      icon: LayoutDashboard,
      route: '/admin/dashboard',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'cms-admin',
      title: 'CMS Admin Panel',
      description: 'Create and manage content, pages, and media',
      icon: FileEdit,
      route: '/cms',
      color: 'from-teal-500 to-emerald-500',
    },
  ];

  const handlePortalClick = (route) => {
    router.push(route);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gray-50">
      {/* Logout Button - Top Right */}
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="fixed cursor-pointer top-4 right-4 flex items-center gap-2 px-4 py-2
             bg-white text-gray-700 rounded-lg shadow-md
             hover:bg-red-50 hover:text-red-600
             disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">
          {isLoggingOut ? "Logging out..." : "Logout"}
        </span>
      </button>


      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Select Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Choose which admin panel you want to access
          </p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {portals.map((portal) => {
            const IconComponent = portal.icon;
            return (
              <button
                key={portal.id}
                onClick={() => handlePortalClick(portal.route)}
                className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 text-left border border-gray-200 hover:border-emerald-300 transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${portal.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br ${portal.color} mb-4 sm:mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                    {portal.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    {portal.description}
                  </p>

                  {/* Arrow Icon */}
                  <div className="flex items-center cursor-pointer text-emerald-600 font-medium text-sm">
                    <span>Access Dashboard</span>
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}