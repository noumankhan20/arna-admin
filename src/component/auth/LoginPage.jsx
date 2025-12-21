'use client';

import { useState } from 'react';
import { Eye, EyeOff, User, Lock, AlertCircle, Shield } from 'lucide-react';
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { useLoginAdminMutation } from '../utils/redux/slice/autApiSlice';
export default function AdminLogin() {
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router=useRouter();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await loginAdmin(formData).unwrap();
    router.push("/select-dashboard");
  } catch (err) {
    toast.error(err?.data?.message || "Login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Main Card - Minimal Design */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header Section - Simplified */}
          <div className="bg-gradient-to-r from-emerald-400 to-green-700 px-6 py-8 text-white">
            <div className="flex justify-center mb-4">
                <Image
                  src="/arna-logo.webp"
                  alt="TPFAid Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                  priority
                />
            </div>
            <h1 className="text-xl font-semibold text-center">
              Admin Dashboard
            </h1>
            <p className="text-emerald-50 text-center text-sm opacity-90 italic font-serif">
              "Indeed with hardship it comes ease"
            </p>
            <p className="text-emerald-50 text-center text-sm opacity-90">
              Please sign in to continue
            </p>
          </div>

          {/* Form Section - Clean and Minimal */}
          <div className="p-6">
            {/* Error Alert - Simplified */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Email Input - Minimal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="admin@tpfaid.com"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none text-gray-900 placeholder-gray-400 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Password Input - Minimal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="Enter your password"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSubmit(e);
                      }
                    }}
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none text-gray-900 placeholder-gray-400 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <a
                  href="#"
                  className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button - Minimal */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-emerald-600 text-white font-medium py-2.5 rounded-md hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm mt-2"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Demo Credentials - Minimal */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center mb-2">
                  Demo Credentials
                </p>
                <div className="bg-gray-50 rounded-md p-3 space-y-1">
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">Email:</span> admin@tpfaid.com
                  </p>
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">Password:</span> admin123
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Minimal */}
        <p className="text-center text-xs text-gray-500 mt-4">
          © {new Date().getFullYear()} Arna Skin Care. All rights reserved.
        </p>
      </div>
    </div>
  );
}