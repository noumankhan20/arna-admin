'use client';

import { useState } from 'react';
import { Mail, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import Link from 'next/link';
import { useForgotPasswordMutation } from '@/component/redux/slice/authApiSlice';

export default function ForgotPasswordPage() {
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [focusedField, setFocusedField] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setError("Email address is required");
            return;
        }
        if (!emailRegex.test(email.trim())) {
            setError("Please enter a valid email address");
            return;
        }

        try {
            await forgotPassword({ email: email.trim().toLowerCase() }).unwrap();
            toast.success("OTP sent to your email successfully");
            // Redirect to reset password page with email in query params
            router.push(`/reset-password?email=${encodeURIComponent(email.trim().toLowerCase())}`);
        } catch (err) {
            const errorMessage = err?.data?.message || "Failed to send OTP. Please check your admin email.";
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 relative overflow-hidden">
            {/* Background Video (matching login) */}
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
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 pointer-events-none"></div>

                    <div className="relative px-8 pt-10 pb-8 text-center">
                        <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent">
                            Forgot Password?
                        </h1>
                        <p className="text-slate-600 text-sm">
                            Enter your email and we'll send you an OTP to reset your password.
                        </p>
                    </div>

                    <div className="px-8 pb-10">
                        {/* Error Alert */}
                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-red-900 mb-0.5">Authentication Error</p>
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${focusedField === 'email' ? 'text-black' : 'text-slate-400'}`}>
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField('')}
                                        disabled={isLoading}
                                        placeholder="admin@arnacare.com"
                                        className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-black focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder-slate-400 text-sm disabled:bg-slate-50 bg-white shadow-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-gray-600 to-black hover:from-gray-700 hover:to-black text-white font-semibold py-3.5 rounded-xl focus:ring-4 focus:ring-blue-500/30 transition-all disabled:opacity-50 text-sm shadow-lg shadow-blue-500/25 relative overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Sending OTP...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send OTP</span>
                                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>

                            <div className="text-center">
                                <Link
                                    href="/login"
                                    className="text-sm text-slate-600 hover:text-black transition-colors inline-flex items-center gap-2"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
