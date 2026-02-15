'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGetOurStoryQuery, useUpdateOurStoryMutation } from '../redux/slice/cmsApiSlice';
export default function OurStorySection() {
    const { data, isLoading, isError } = useGetOurStoryQuery();
    const [updateOurStory, { isLoading: isUpdating }] =
        useUpdateOurStoryMutation();

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop');
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

            await updateOurStory(formData).unwrap();

            alert("Image updated successfully");
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
                    Our Story Section
                </h1>
                <p className="text-sm text-gray-500 mb-6">
                    Update the image displayed on the homepage Our Story section
                </p>

                {/* Image Preview */}
                <div className="relative aspect-[4/3] border-2 border-emerald-200 rounded-lg overflow-hidden mb-4">
                    <img
                        src={previewUrl}
                        alt="Our Story Preview"
                        className="w-full h-full object-cover"
                        loading='lazy'
                    />
                </div>

                {/* File Upload Button */}
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

                {/* Error Message */}
                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                {/* Update Button */}
                <button
                    onClick={handleUpdate}
                    disabled={!selectedImage}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${selectedImage
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                        : 'bg-emerald-500 text-white opacity-50 cursor-not-allowed'
                        }`}
                >
                    Update Image
                </button>
            </div>
        </div>
    );
}