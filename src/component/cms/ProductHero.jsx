'use client';

import { useState, useEffect } from 'react';
import { useGetProductsHeroQuery, useUpdateProductsHeroMutation } from '../redux/slice/cmsApiSlice';

export default function ProductsHeroSection() {
    const { data, isLoading, isError } = useGetProductsHeroQuery();
    const [updateProductsHero, { isLoading: isUpdating }] =
        useUpdateProductsHeroMutation();

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(
        'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200&h=600&fit=crop'
    );
    const [error, setError] = useState('');

    useEffect(() => {
        if (data?.image) {
            setPreviewUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL}${data.image}`);
        }
    }, [data]);

    const handleImageSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError('');

        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setError('Please select a valid image file (JPG, PNG, or WEBP)');
            setSelectedImage(null);
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setError('File size must be less than 5MB');
            setSelectedImage(null);
            return;
        }

        setSelectedImage(file);
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
    };

    const handleUpdate = async () => {
        if (!selectedImage) return;

        try {
            const formData = new FormData();
            formData.append("image", selectedImage);

            await updateProductsHero(formData).unwrap();

            alert("Products hero image updated successfully");
            setSelectedImage(null);
        } catch (err) {
            console.error(err);
            alert("Update failed");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Failed to load image</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8">
                <h1 className="text-xl font-semibold text-gray-800 mb-2">
                    Products Page Hero Banner
                </h1>
                <p className="text-sm text-gray-500 mb-6">
                    Update the hero banner displayed on the Products page
                </p>

                {/* Image Preview */}
                <div className="relative aspect-[16/9] border-2 border-emerald-200 rounded-lg overflow-hidden mb-4">
                    <img
                        src={previewUrl}
                        alt="Products Hero Preview"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>

                {/* Upload Button */}
                <div className="mb-4">
                    <label
                        htmlFor="image-upload"
                        className="inline-block bg-emerald-500 text-white px-6 py-2.5 rounded-lg cursor-pointer hover:bg-emerald-600 transition-colors duration-200"
                    >
                        Choose Image
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageSelect}
                        className="hidden"
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                <button
                    onClick={handleUpdate}
                    disabled={!selectedImage || isUpdating}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                        selectedImage
                            ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                            : 'bg-emerald-500 text-white opacity-50 cursor-not-allowed'
                    }`}
                >
                    {isUpdating ? "Updating..." : "Update Hero Image"}
                </button>
            </div>
        </div>
    );
}