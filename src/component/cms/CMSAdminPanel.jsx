'use client';

import { useState, useEffect } from 'react';

import {
  Home, Info, Star, FileText, Package,
  Menu, X, CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'react-toastify';
import { initialCMSData } from './initialCMSData';
import { sidebarItems } from './CMSSidebar';
import ContentSection from './ContentSection';
import ProductsSection from './Products';
import PromoMain from "./Promos/PromoMain";
import OurStorySection from "./OurStory"
import ProductsHeroSection from './ProductHero';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGetAdminProfileQuery } from '../redux/slice/authApiSlice';

export default function CMSAdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('home-hero');
  const [cmsData, setCmsData] = useState(initialCMSData);
  const router = useRouter();
  const navItems = sidebarItems;

  const { data: adminData, isLoading, isError } = useGetAdminProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  useEffect(() => {
    if (!isLoading && isError) {
      router.replace('/login');
    }
  }, [isLoading, isError, router]);

  const showSuccessToast = (message) => {
    toast.success(message);
  };

  const handleSave = (section) => {
    toast.success('Changes saved successfully!');
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(prev => !prev);
  };

  const handleNavClick = (id) => {
    setActiveSection(id);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Loading CMS...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex overflow-hidden">
      {/* Fixed Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-all duration-500 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Logo header */}
          <div className="px-6 py-6 bg-white flex-shrink-0">
            <button
              onClick={() => router.push('/select-dashboard')}
              className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-400 hover:text-emerald-600 transition-colors uppercase tracking-widest group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Select Dashboard
            </button>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 relative flex-shrink-0">
                  <Image
                    src="/arna-logo.webp"
                    alt="Arna Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 italic tracking-wide">CMS Admin</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 rounded-tr-[3rem] flex flex-col overflow-hidden">
            <nav className="flex-1 px-4 pt-6 pb-4 space-y-1.5 flex flex-col justify-start overflow-hidden">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex-shrink-0 ${isActive
                      ? "bg-white text-emerald-700 shadow-xl scale-[1.02] translate-x-1"
                      : "text-emerald-50 hover:text-white hover:bg-white/15 hover:translate-x-1"
                      }`}
                  >
                    <item.icon
                      className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${isActive ? "text-emerald-600 scale-110" : "text-emerald-100 group-hover:text-white group-hover:scale-110"
                        }`}
                    />
                    <span className="text-left">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* User Info */}
            <div className="p-4 flex-shrink-0">
              <div className="flex items-center gap-3 px-4 py-3 bg-white/15 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 font-semibold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {adminData?.admin?.fullName ? adminData.admin.fullName.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{adminData?.admin?.fullName || 'Admin'}</p>
                  <p className="text-xs text-emerald-50 truncate">{adminData?.admin?.email || 'admin@arnacare.com'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 lg:ml-80 h-screen overflow-hidden">
        <header className="bg-white px-6 lg:px-8 py-5 z-40 border-b border-gray-100 shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {navItems.find(item => item.id === activeSection)?.label}
                </h2>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
          <div className="max-w-5xl mx-auto">
            {activeSection === 'home-hero' && (
              <ContentSection
                title="Home Hero Section"
                data={cmsData}
                section="home-hero"
                setCmsData={setCmsData}
                onSave={handleSave}
              />
            )}

            {activeSection === 'about-hero' && (
              <ContentSection
                title="About Hero Section"
                data={cmsData}
                section="about-hero"
                setCmsData={setCmsData}
                onSave={handleSave}
              />
            )}

            {activeSection === 'products' && (
              <ProductsSection
                products={cmsData.products}
                setCmsData={setCmsData}
                showSuccessToast={showSuccessToast}
              />
            )}

            {/* ✅ ADD PROMO SECTION HERE */}
            {activeSection === 'promos' && (
              <PromoMain />
            )}
            {activeSection === 'ourstory' && (
              <OurStorySection />
            )}
            {activeSection === 'productshero' && (
              <ProductsHeroSection />
            )}

          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}