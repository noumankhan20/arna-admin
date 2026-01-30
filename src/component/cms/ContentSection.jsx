"use client";
import { Save, Image as ImageIcon, Eye, Upload, X, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import {
  useGetAboutUsQuery,
  useSaveAboutUsMutation,
  useGetHomeHeroQuery,
  useSaveHomeHeroMutation,
} from "@/component/redux/slice/cmsApiSlice";



export default function ContentSection({
  title,
  data,
  section,
  setCmsData,
  onSave,
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [pendingFile, setPendingFile] = useState(null); // ✅ Store file until save


  const isHomeHero = section === "home-hero";

  const {
    data: apiData,
    isLoading,
    error,
    refetch,
  } = isHomeHero ? useGetHomeHeroQuery() : useGetAboutUsQuery();

  const [saveData] = isHomeHero
    ? useSaveHomeHeroMutation()
    : useSaveAboutUsMutation();


useEffect(() => {
  if (apiData?.success && apiData?.data) {
    setCmsData((prev) => {
      const prevSection = prev[section] || {};
      const rawImageUrl = apiData.data.imageUrl;

      return {
        ...prev,
        [section]: {
          title: apiData.data.title ?? prevSection.title ?? '',
          description: apiData.data.description ?? prevSection.description ?? '',
          imageUrl: rawImageUrl ?? prevSection.imageUrl ?? '',
          imagePreview: rawImageUrl
            ? rawImageUrl.startsWith("http")
              ? rawImageUrl
              : `${process.env.NEXT_PUBLIC_BACKEND_URL}${rawImageUrl}`
            : prevSection.imagePreview ?? '',
        },
      };
    });
  }
}, [apiData, section, setCmsData]);






  const showSuccessToast = (message) => {
    setToastMessage(message);
    setToastType("success");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };


  const showErrorToast = (message) => {
    setToastMessage(message);
    setToastType("error");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };


  const handleInputChange = (field, value) => {
    setCmsData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };


  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;


    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      showErrorToast('Please select a valid image file (JPG, PNG, WEBP, or GIF)');
      return;
    }


    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showErrorToast('File size must be less than 5MB');
      return;
    }


    // ✅ Store file for later upload
    setPendingFile(file);


    // ✅ Create local preview URL (no backend upload yet)
    const previewUrl = URL.createObjectURL(file);
    handleInputChange("imagePreview", previewUrl);

    showSuccessToast('Image selected. Click "Save Changes" to upload.');
  };


  const handleRemoveImage = () => {
    // Clear pending file
    setPendingFile(null);

    // Revoke preview URL if it exists
    if (data.imagePreview && data.imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(data.imagePreview);
    }

    handleInputChange("imageUrl", "");
    handleInputChange("imagePreview", "");
    showSuccessToast('Image removed');
  };


  const handleChangeImage = () => {
    document.getElementById("image-upload").click();
  };


  const handleSave = async () => {
    if (!data.title?.trim() || !data.description?.trim()) {
      showErrorToast('Title and description are required');
      return;
    }

    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title.trim());
      formData.append("description", data.description.trim());
      
      if (pendingFile) {
        formData.append("image", pendingFile);
      }

      // ✅ Backend handles both CREATE & UPDATE automatically
      await saveData(formData).unwrap();
      
      showSuccessToast('Saved successfully!');
      
      // Cleanup
      if (pendingFile) setPendingFile(null);
      if (
  apiData?.data?.imageUrl &&
  data.imagePreview?.startsWith('blob:')
) {
  URL.revokeObjectURL(data.imagePreview);
}

      
      onSave(section);
      refetch();

    } catch (error) {
      // ✅ Backend auto-updates on 409 - just show friendly message
      showErrorToast(error.data?.message || 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };




  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (data.imagePreview && data.imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(data.imagePreview);
      }
    };
  }, [data.imagePreview]);


  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-20 text-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500">Loading data...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-20 text-center">
        <p className="text-red-500 mb-4">Failed to load data</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
        >
          Retry
        </button>
      </div>
    );
  }


  return (
    <>
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-500">
        <div className="bg-white px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                Main hero section for the About page
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>


        <div className="p-8 space-y-8">
          {/* Image Upload Section */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 uppercase tracking-wide">
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              Hero Image
              {pendingFile && (
                <span className="ml-auto text-xs font-normal text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                  Pending upload
                </span>
              )}
            </label>


            <div className="space-y-4">
              {/* Hidden File Input */}
              <input
                type="file"
                id="image-upload"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                onChange={handleFileSelect}
                className="hidden"
              />


              {/* Image Preview with Actions */}
              {data.imagePreview ? (
                <div className="space-y-3">
                  <div className="relative group">
                    <img
                      src={data.imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-2xl border-2 border-gray-200"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center gap-3">
                      <button
                        onClick={handleChangeImage}
                        className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Change Image
                      </button>
                      <button
                        onClick={handleRemoveImage}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-all flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Upload Area */
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all border-emerald-300 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-emerald-600" />
                    </div>
                    <p className="text-base font-semibold text-emerald-600">
                      Click to select image
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      JPG, PNG, WEBP or GIF
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Maximum file size: 5MB
                    </p>
                  </div>
                </label>
              )}
            </div>
          </div>


          {/* Title */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Hero Title
            </label>
            <input
              type="text"
              value={data.title || ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter hero title"
              className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 font-medium"
            />
          </div>


          {/* Description */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Hero Description
            </label>
            <div className="relative">
              <textarea
                value={data.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Write hero description"
                rows={5}
                className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 resize-none"
              />
              <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-medium">
                {data.description?.length || 0} characters
              </div>
            </div>
          </div>
        </div>


        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {pendingFile ? (
                <span className="text-amber-600 font-medium">
                  ⚠ Image will be uploaded when you save
                </span>
              ) : (
                "Changes will update the About page on your website"
              )}
            </p>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isSaving ? "scale-95" : "hover:scale-105 hover:-translate-y-0.5"
                }`}
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {pendingFile ? "Uploading & Saving..." : "Saving..."}
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>


      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div
            className={`${toastType === "success"
              ? "bg-gradient-to-r from-emerald-600 to-emerald-500"
              : "bg-gradient-to-r from-red-600 to-red-500"
              } text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${toastType === "success" ? "border-emerald-400/20" : "border-red-400/20"
              }`}
          >
            {toastType === "success" ? (
              <CheckCircle2 className="w-5 h-5 animate-in zoom-in duration-300" />
            ) : (
              <AlertCircle className="w-5 h-5 animate-in zoom-in duration-300" />
            )}
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}
