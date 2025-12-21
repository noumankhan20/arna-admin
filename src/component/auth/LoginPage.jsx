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
  const [focusedField, setFocusedField] = useState('');
  const router = useRouter();

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-100 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Card - Compact */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          {/* Header Section - Compact */}
          <div className="relative bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-6 text-white">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <Image
                  src="/arna-logo.webp"
                  alt="TPFAid Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="text-xl font-bold text-center mb-1">
              Admin Dashboard
            </h1>
            <p className="text-emerald-50 text-center text-xs opacity-90 italic">
              "Indeed with hardship it comes ease"
            </p>
          </div>

          {/* Form Section - Compact */}
          <div className="px-6 py-6">
            {/* Error Alert */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-red-900">Authentication Error</p>
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${
                    focusedField === 'email' ? 'text-emerald-600' : 'text-gray-400'
                  }`}>
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    disabled={isLoading}
                    placeholder="admin@tpfaid.com"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none text-gray-900 placeholder-gray-400 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${
                    focusedField === 'password' ? 'text-emerald-600' : 'text-gray-400'
                  }`}>
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    disabled={isLoading}
                    placeholder="Enter your password"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSubmit(e);
                      }
                    }}
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none text-gray-900 placeholder-gray-400 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-emerald-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-end">
                <a
                  href="#"
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold transition-colors hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-emerald-600 text-white font-semibold py-2.5 rounded-lg hover:bg-emerald-700 focus:ring-3 focus:ring-emerald-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm shadow-sm"
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
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-4">
          © {new Date().getFullYear()} Arna Skin Care. All rights reserved.
        </p>
      </div>
    </div>
  );
}