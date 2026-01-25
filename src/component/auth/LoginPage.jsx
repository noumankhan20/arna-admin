'use client';

import { useState } from 'react';
import { Eye, EyeOff, User, Lock, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { useLoginAdminMutation } from '@/component/redux/slice/authApiSlice';

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/final.mp4" type="video/mp4" />
      </video>
      {/* Modern Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 pointer-events-none"></div>

          {/* Header Section */}
          <div className="relative px-8 pt-10 pb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500 to-black blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-slate-600 text-center text-sm mb-2">
              Sign in to access your dashboard
            </p>
            <p className="text-black text-center text-xs font-bold italic">
              "So surely with hardship comes ease."
            </p>
            <p className="text-slate-500 text-[10px] text-center mt-1">
              — Qur’an 94:5
            </p>
          </div>

          {/* Form Section */}
          <div className="px-8 pb-10">
            {/* Error Alert */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-900 mb-1">Authentication Error</p>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${focusedField === 'email' ? 'text-black' : 'text-slate-400'
                    }`}>
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    disabled={isLoading}
                    placeholder="admin@arnacare.com"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-black focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder-slate-400 text-sm disabled:bg-slate-50 disabled:cursor-not-allowed bg-white shadow-sm"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${focusedField === 'password' ? 'text-black' : 'text-slate-400'
                    }`}>
                    <Lock className="h-5 w-5" />
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
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-slate-200 rounded-xl focus:border-black focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder-slate-400 text-sm disabled:bg-slate-50 disabled:cursor-not-allowed bg-white shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-black transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-end">
                <a
                  href="#"
                  className="text-sm text-black hover:text-black font-semibold transition-colors group inline-flex items-center gap-1"
                >
                  Forgot password?
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-gray-600 to-black hover:from-gray-700 hover:to-black text-white font-semibold py-3.5 rounded-xl focus:ring-4 focus:ring-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg shadow-blue-500/25 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center space-y-1">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Arna Skin Care. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}