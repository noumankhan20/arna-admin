"use client";
import { useState } from 'react';
import {
  Home, Info, Star, FileText, Package,
  Menu, X, Upload, Save, Trash2, Plus, Edit, Eye, ChevronDown, Image as ImageIcon
} from 'lucide-react';
import { initialCMSData } from './initialCMSData';
import { sidebarItems } from './CMSSidebar';
import ContentSection from './ContentSection';
import WhyChooseSection from './WhyChooseUs';
import ProductsSection from './Products';
// ============================================================================
// MAIN CMS ADMIN COMPONENT
// ============================================================================

export default function CMSAdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('home-hero');
  const [cmsData, setCmsData] = useState(initialCMSData);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Navigation items
  const navItems = sidebarItems;

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSave = (section) => {
    // API call would go here
    console.log('Saving:', section, cmsData[section]);
    showSuccessToast('Changes saved successfully!');
  };
  const handleSidebarToggle = () => {
    setSidebarOpen(prev => !prev);
  };

  const handleNavClick = (id) => {
    setActiveSection(id);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
        <div className="h-full flex flex-col">
          {/* Logo/Brand */}
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">CMS Admin</h1>
              <p className="text-xs text-gray-500 mt-0.5">Arna Skin Care</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                 onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeSection === item.id
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@arna.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {navItems.find(item => item.id === activeSection)?.label}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Manage your website content
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {activeSection === 'home-hero' && (
            <ContentSection
              title="Home Hero Section"
              data={cmsData.homeHero}
              section="homeHero"
              cmsData={cmsData}
              setCmsData={setCmsData}
              onSave={handleSave}
            />
          )}

          {activeSection === 'home-about' && (
            <ContentSection
              title="Home About Section"
              data={cmsData.homeAbout}
              section="homeAbout"
              setCmsData={setCmsData}
              onSave={handleSave}
            />
          )}

          {activeSection === 'home-why' && (
            <WhyChooseSection
              data={cmsData.homeWhyChoose}
              setCmsData={setCmsData}
              onSave={handleSave}
            />
          )}

          {activeSection === 'about-hero' && (
            <ContentSection
              title="About Hero Section"
              data={cmsData.aboutHero}
              section="aboutHero"
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
        </main>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-in slide-in-from-bottom">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
