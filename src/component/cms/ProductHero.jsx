'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Monitor, Smartphone, Upload, Trash2, CheckCircle2, Image as ImageIcon } from 'lucide-react';

import { useGetProductsHeroQuery, useUpdateProductsHeroMutation } from '../redux/slice/cmsApiSlice';

export default function ProductsHeroSection() {
    const { data, isLoading, isError, refetch } = useGetProductsHeroQuery();
    const [updateProductsHero, { isLoading: isUpdating }] = useUpdateProductsHeroMutation();

    const [selectedDesktopFile, setSelectedDesktopFile] = useState(null);
    const [desktopPreviewUrl, setDesktopPreviewUrl] = useState('');
    
    const [selectedMobileFile, setSelectedMobileFile] = useState(null);
    const [mobilePreviewUrl, setMobilePreviewUrl] = useState('');
    const [isMobileCleared, setIsMobileCleared] = useState(false);

    const [desktopError, setDesktopError] = useState('');
    const [mobileError, setMobileError] = useState('');

    useEffect(() => {
        if (data?.image) {
            setDesktopPreviewUrl(
                data.image.startsWith('http')
                    ? data.image
                    : `${process.env.NEXT_PUBLIC_BACKEND_URL}${data.image}`
            );
        } else {
            setDesktopPreviewUrl('https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200&h=600&fit=crop');
        }

        if (data?.mobileImage) {
            setMobilePreviewUrl(
                data.mobileImage.startsWith('http')
                    ? data.mobileImage
                    : `${process.env.NEXT_PUBLIC_BACKEND_URL}${data.mobileImage}`
            );
            setIsMobileCleared(false);
        } else {
            setMobilePreviewUrl('');
        }
    }, [data]);

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            return 'Please select a valid image file (JPG, PNG, or WEBP)';
        }
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            return 'File size must be less than 5MB';
        }
        return null;
    };

    const handleDesktopSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setDesktopError('');
        const errorMsg = validateFile(file);
        if (errorMsg) {
            setDesktopError(errorMsg);
            toast.error(errorMsg);
            return;
        }

        setSelectedDesktopFile(file);
        setDesktopPreviewUrl(URL.createObjectURL(file));
    };

    const handleMobileSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setMobileError('');
        const errorMsg = validateFile(file);
        if (errorMsg) {
            setMobileError(errorMsg);
            toast.error(errorMsg);
            return;
        }

        setSelectedMobileFile(file);
        setMobilePreviewUrl(URL.createObjectURL(file));
        setIsMobileCleared(false);
    };

    const handleClearMobile = () => {
        setSelectedMobileFile(null);
        setMobilePreviewUrl('');
        setIsMobileCleared(true);
        toast.info("Mobile banner cleared (click Save Changes to apply)");
    };

    const hasChanges = Boolean(selectedDesktopFile || selectedMobileFile || (isMobileCleared && data?.mobileImage));

    const handleUpdate = async () => {
        if (!hasChanges) return;

        try {
            const formData = new FormData();

            if (selectedDesktopFile) {
                formData.append("image", selectedDesktopFile);
            }

            if (selectedMobileFile) {
                formData.append("mobileImage", selectedMobileFile);
            } else if (isMobileCleared) {
                formData.append("clearMobile", "true");
            }

            await updateProductsHero(formData).unwrap();

            toast.success("Products hero banners updated successfully!");
            setSelectedDesktopFile(null);
            setSelectedMobileFile(null);
            setIsMobileCleared(false);
            refetch();
        } catch (err) {
            console.error("Update hero banner failed:", err);
            toast.error(err?.data?.message || "Failed to update hero banners");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-500 font-medium">Loading Products Hero settings...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-center p-6 bg-red-50 rounded-2xl border border-red-100 max-w-md">
                    <p className="text-red-600 font-semibold mb-2">Failed to load hero banner data</p>
                    <button 
                        onClick={() => refetch()} 
                        className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-red-700 transition-all"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="border-b border-gray-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        Products Hero Banner
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Customize the visual header shown at the top of the Products page for desktop and mobile visitors.
                    </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={handleUpdate}
                        disabled={!hasChanges || isUpdating}
                        className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-lg shadow-emerald-600/10 ${
                            hasChanges && !isUpdating
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-[1.02] cursor-pointer'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        {isUpdating ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Saving Changes...</span>
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Save Changes</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Responsive Dual Banner Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* 1. Desktop Banner Section (16:5 Landscape) */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm space-y-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                                <Monitor className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">Desktop Banner</h3>
                                <p className="text-xs text-gray-400">Landscape (16:5 or wide ratio)</p>
                            </div>
                        </div>

                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                            Required
                        </span>
                    </div>

                    {/* Image Preview / Upload Box */}
                    <div className="relative group rounded-2xl overflow-hidden border-2 border-dashed border-emerald-200 bg-emerald-50/20 aspect-[16/9] flex items-center justify-center">
                        {desktopPreviewUrl ? (
                            <>
                                <img
                                    src={desktopPreviewUrl}
                                    alt="Desktop Hero Preview"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                                    <label
                                        htmlFor="desktop-image-upload"
                                        className="bg-white text-gray-900 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-emerald-50 transition-all cursor-pointer shadow-lg"
                                    >
                                        Replace Desktop Banner
                                    </label>
                                </div>
                            </>
                        ) : (
                            <label
                                htmlFor="desktop-image-upload"
                                className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-6 text-center hover:bg-emerald-50/50 transition-colors"
                            >
                                <Upload className="w-8 h-8 text-emerald-600 mb-2" />
                                <span className="text-sm font-bold text-gray-700">Upload Desktop Banner</span>
                                <span className="text-xs text-gray-400 mt-1">Recommended: 1920×800px (JPG, PNG, WEBP max 5MB)</span>
                            </label>
                        )}
                        <input
                            id="desktop-image-upload"
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handleDesktopSelect}
                            className="hidden"
                        />
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Formats: JPG, PNG, WEBP (Max 5MB)</span>
                        {selectedDesktopFile && (
                            <span className="text-emerald-600 font-medium">New image selected: {selectedDesktopFile.name}</span>
                        )}
                    </div>

                    {desktopError && (
                        <p className="text-red-500 text-xs mt-1">{desktopError}</p>
                    )}
                </div>

                {/* 2. Mobile Banner Section (4:3 Header Banner) */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm space-y-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                                <Smartphone className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">Mobile Banner</h3>
                                <p className="text-xs text-gray-400">Mobile Header (4:3 ratio)</p>
                            </div>
                        </div>

                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            Recommended
                        </span>
                    </div>

                    {/* Mobile Banner Preview Box (4:3 ratio) */}
                    <div className="relative group rounded-2xl overflow-hidden border-2 border-dashed border-amber-200 bg-amber-50/20 aspect-[4/3] flex items-center justify-center">
                        <input
                            id="mobile-image-upload"
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handleMobileSelect}
                            className="hidden"
                        />

                        {mobilePreviewUrl ? (
                            <>
                                <img
                                    src={mobilePreviewUrl}
                                    alt="Mobile Banner Preview"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Overlay Buttons on Hover */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 p-4 backdrop-blur-xs">
                                    <label
                                        htmlFor="mobile-image-upload"
                                        className="bg-white text-gray-900 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-emerald-50 transition-all cursor-pointer shadow-lg"
                                    >
                                        Replace Mobile Banner
                                    </label>
                                    <button
                                        onClick={handleClearMobile}
                                        type="button"
                                        className="bg-red-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-red-600 transition-all cursor-pointer shadow-lg flex items-center justify-center gap-1.5"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Clear</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <label
                                htmlFor="mobile-image-upload"
                                className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-6 text-center hover:bg-amber-50/50 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Upload className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-bold text-gray-700">Upload Mobile Banner</span>
                                <span className="text-xs text-gray-400 mt-1">
                                    Recommended: 800×600px (4:3 ratio, Max 5MB)
                                </span>
                            </label>
                        )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Formats: JPG, PNG, WEBP (Max 5MB)</span>
                        {selectedMobileFile && (
                            <span className="text-amber-600 font-medium">New image selected: {selectedMobileFile.name}</span>
                        )}
                    </div>

                    <div className="bg-amber-50/60 rounded-2xl p-3.5 border border-amber-100/80 text-[11px] text-amber-800 leading-relaxed">
                        <strong>Dimension Guide:</strong> The products page mobile hero header renders at ~4:3 ratio (approx 310px height on mobile screens). Uploading an <strong>800×600px</strong> (or 4:3) image prevents subjects or text from being cropped.
                    </div>

                    {mobileError && (
                        <p className="text-red-500 text-xs mt-1">{mobileError}</p>
                    )}
                </div>

            </div>
        </div>
    );
}
