"use client";
import {
  Save, Image as ImageIcon, Eye, Upload, X, CheckCircle2,
  AlertCircle, Plus, Trash2, Layout, Layers
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  useGetAboutUsQuery,
  useSaveAboutUsMutation,
  useGetHomeHeroQuery,
  useSaveHomeHeroMutation,
  useDeleteHomeHeroMutation,
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
  const [pendingFile, setPendingFile] = useState(null);
  const [pendingMobileFile, setPendingMobileFile] = useState(null);
  const [selectedSlideId, setSelectedSlideId] = useState(null); // The 'section' identifier of the slide
  const [isAddingNew, setIsAddingNew] = useState(false);

  const isHomeHero = section === "home-hero";

  // Fetch all slides for the list
  const {
    data: apiData,
    isLoading,
    error,
    refetch,
  } = isHomeHero
      ? useGetHomeHeroQuery()
      : useGetAboutUsQuery();

  const [saveData] = isHomeHero
    ? useSaveHomeHeroMutation()
    : useSaveAboutUsMutation();

  const [deleteSlide] = useDeleteHomeHeroMutation();

  // Local state for the current editing slide
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    imagePreview: '',
    imageUrl: '',
    mobileImagePreview: '',
    mobileImageUrl: '',
    mediaType: 'image'
  });

  useEffect(() => {
    if (apiData?.success && apiData?.data) {
      if (isHomeHero) {
        // If it's a list of slides
        const slides = apiData.data;
        if (slides.length > 0 && !selectedSlideId && !isAddingNew) {
          setSelectedSlideId(slides[0].section);
        }
      } else {
        // Single section (About)
        const d = apiData.data;
        setEditForm({
          title: d.title || '',
          description: d.description || '',
          imageUrl: d.imageUrl || '',
          mobileImageUrl: d.mobileImageUrl || '',
          mediaType: d.mediaType || 'image',
          imagePreview: d.imageUrl
            ? (d.imageUrl.startsWith('http') ? d.imageUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}${d.imageUrl}`)
            : '',
          mobileImagePreview: d.mobileImageUrl
            ? (d.mobileImageUrl.startsWith('http') ? d.mobileImageUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}${d.mobileImageUrl}`)
            : ''
        });
      }
    }
  }, [apiData, isHomeHero, selectedSlideId, isAddingNew]);

  // Update editForm when selectedSlideId changes
  useEffect(() => {
    if (isHomeHero && apiData?.data && selectedSlideId) {
      const slide = apiData.data.find(s => s.section === selectedSlideId);
      if (slide) {
        setEditForm({
          title: slide.title || '',
          description: slide.description || '',
          imageUrl: slide.imageUrl || '',
          mobileImageUrl: slide.mobileImageUrl || '',
          mediaType: slide.mediaType || 'image',
          imagePreview: slide.imageUrl
            ? (slide.imageUrl.startsWith('http') ? slide.imageUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}${slide.imageUrl}`)
            : '',
          mobileImagePreview: slide.mobileImageUrl
            ? (slide.mobileImageUrl.startsWith('http') ? slide.mobileImageUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}${slide.mobileImageUrl}`)
            : ''
        });
        setIsAddingNew(false);
      }
    }
  }, [selectedSlideId, apiData, isHomeHero]);

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
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e, target = 'desktop') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (!isImage && !isVideo) {
      showErrorToast('Please select a valid image or video file');
      return;
    }

    if (file.size > (isVideo ? 50 : 5) * 1024 * 1024) {
      showErrorToast(`File size must be less than ${isVideo ? '50MB' : '5MB'}`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    if (target === 'mobile') {
      setPendingMobileFile(file);
      setEditForm(prev => ({
        ...prev,
        mobileImagePreview: previewUrl,
      }));
    } else {
      setPendingFile(file);
      setEditForm(prev => ({
        ...prev,
        imagePreview: previewUrl,
        mediaType: isVideo ? 'video' : 'image'
      }));
    }
  };

  const handleSave = async () => {

    if (isAddingNew && !pendingFile) {
      showErrorToast('Image is required for new slides');
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", editForm.title.trim());
      formData.append("description", editForm.description.trim());

      if (isHomeHero) {
        if (!isAddingNew && selectedSlideId) {
          formData.append("section", selectedSlideId);
        }
      } else {
        formData.append("section", section);
      }

      if (pendingFile) {
        formData.append("image", pendingFile);
        formData.append("mediaType", editForm.mediaType);
      }

      if (pendingMobileFile) {
        formData.append("mobileImage", pendingMobileFile);
      }

      const res = await saveData(formData).unwrap();
      showSuccessToast(isAddingNew ? 'Slide created!' : 'Saved successfully!');

      setPendingFile(null);
      setPendingMobileFile(null);
      if (isAddingNew) {
        setIsAddingNew(false);
        setSelectedSlideId(res.data.section);
      }
      refetch();

    } catch (error) {
      showErrorToast(error.data?.message || 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (slideId) => {
    if (!window.confirm('Are you sure you want to delete this slide?')) return;

    try {
      await deleteSlide(slideId).unwrap();
      showSuccessToast('Slide deleted');
      if (selectedSlideId === slideId) {
        setSelectedSlideId(null);
      }
      refetch();
    } catch (err) {
      showErrorToast('Failed to delete slide');
    }
  };

  const startAddingNew = () => {
    setIsAddingNew(true);
    setSelectedSlideId(null);
    setPendingFile(null);
    setPendingMobileFile(null);
    setEditForm({
      title: '',
      description: '',
      imagePreview: '',
      imageUrl: '',
      mobileImagePreview: '',
      mobileImageUrl: '',
      mediaType: 'image'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-20 text-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 font-medium tracking-tight">Accessing Cloud Assets...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* Dynamic Slide List for Home Hero */}
        {isHomeHero && (
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 mr-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Layers className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 leading-tight">Home Carousel</h4>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mt-0.5">Manage All Banners</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {apiData?.data?.map((slide, index) => (
                <div key={slide.section} className="relative group/item">
                  <button
                    onClick={() => setSelectedSlideId(slide.section)}
                    className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-3 ${selectedSlideId === slide.section
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100 scale-105"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100"
                      }`}
                  >
                    {slide.mediaType === 'video' ? (
                      <div className="w-5 h-5 rounded-md bg-gray-200 flex items-center justify-center">
                        <Upload className="w-3 h-3 text-gray-500" />
                      </div>
                    ) : (
                      <img
                        src={slide.imageUrl.startsWith('http') ? slide.imageUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}${slide.imageUrl}`}
                        alt=""
                        className="rounded-md object-cover w-5 h-5"
                      />
                    )}
                    Banner {index + 1}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(slide.section); }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity shadow-lg hover:scale-110 active:scale-95 z-10"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              <button
                onClick={startAddingNew}
                disabled={apiData?.data?.length >= 4}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isAddingNew
                  ? "bg-emerald-100 text-emerald-600 border-2 border-emerald-500"
                  : apiData?.data?.length >= 4
                    ? "bg-gray-50 text-gray-300 border-2 border-dashed border-gray-200 cursor-not-allowed"
                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-2 border-dashed border-emerald-200"
                  }`}
                title={apiData?.data?.length >= 4 ? "Maximum 4 slides allowed" : "Add New Slide"}
              >
                <Plus className={`w-6 h-6 ${apiData?.data?.length >= 4 ? 'opacity-50' : ''}`} />
              </button>
            </div>
          </div>
        )}

        {/* Editor Form */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white px-10 py-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {isAddingNew ? "New Slide Wizard" : (isHomeHero ? "Slide Master Editor" : title)}
                  </h3>
                  {isAddingNew && (
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Awaiting Content</span>
                  )}
                </div>
                <p className="text-sm text-gray-400 font-medium tracking-tight">
                  {isAddingNew
                    ? "Configure a new atmospheric banner for your homepage entrance."
                    : "Modify visual assets and messaging for this section."
                  }
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                  <ImageIcon className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 space-y-10">
            {/* Image Upload Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Desktop Upload Area */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    <Layout className="w-4 h-4 text-emerald-500" />
                    Desktop Visual (Landscape)
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*,video/*"
                    onChange={(e) => handleFileSelect(e, 'desktop')}
                    className="hidden"
                  />

                  {editForm.imagePreview ? (
                    <div className="group relative overflow-hidden rounded-[2rem] border-4 border-gray-50 shadow-inner h-64">
                      {editForm.mediaType === 'video' ? (
                        <video
                          src={editForm.imagePreview}
                          className="w-full h-full object-cover"
                          controls
                        />
                      ) : (
                        <img
                          src={editForm.imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-4">
                        <button
                          onClick={() => document.getElementById("image-upload").click()}
                          className="bg-white text-gray-900 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition-all"
                        >
                          Replace
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all border-emerald-100 bg-emerald-50/20 hover:bg-emerald-50 group"
                    >
                      <Upload className="w-8 h-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-bold text-emerald-700">Upload Desktop Banner</p>
                    </label>
                  )}
                </div>
              </div>

              {/* Mobile Upload Area */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    <Layout className="w-4 h-4 text-amber-500" />
                    Mobile Visual (Portrait)
                  </label>
                  {isHomeHero && <span className="text-[9px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Recommended</span>}
                </div>

                <div className="relative flex justify-center">
                  <input
                    type="file"
                    id="mobile-image-upload"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, 'mobile')}
                    className="hidden"
                  />

                  {editForm.mobileImagePreview ? (
                    <div className="group relative isolate overflow-hidden rounded-[2.5rem] border-8 border-gray-900 shadow-2xl w-full max-w-[280px] aspect-[9/16]">
                      <img
                        src={editForm.mobileImagePreview}
                        alt="Mobile Preview"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 rounded-[inherit]"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-4 rounded-[inherit]">
                        <button
                          onClick={() => document.getElementById("mobile-image-upload").click()}
                          className="bg-white text-gray-900 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition-all"
                        >
                          Replace
                        </button>
                        <button
                          onClick={() => {
                            setPendingMobileFile(null);
                            setEditForm(p => ({ ...p, mobileImagePreview: '', mobileImageUrl: '' }));
                          }}
                          className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="mobile-image-upload"
                      className="flex flex-col items-center justify-center w-full max-w-[280px] aspect-[9/16] border-2 border-dashed rounded-[2.5rem] cursor-pointer transition-all border-amber-100 bg-amber-50/20 hover:bg-amber-50 group mx-auto"
                    >
                      <Upload className="w-8 h-8 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-bold text-amber-700">Upload Mobile Banner</p>
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Title */}
              <div className="space-y-4">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Primary Heading</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g. Honest Skincare You Can Trust"
                  className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-50 rounded-[1.5rem] text-lg text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30 transition-all font-bold"
                />
              </div>

              {/* Subtext */}
              <div className="space-y-4">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Secondary Text</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Briefly describe the theme of this banner..."
                  rows={1}
                  className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-50 rounded-[1.5rem] text-base text-gray-600 placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30 transition-all resize-none font-medium h-[68px]"
                />
              </div>
            </div>
          </div>

          <div className="px-10 py-8 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${pendingFile || isAddingNew ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {pendingFile || pendingMobileFile ? 'Local Changes Staged' : (isAddingNew ? 'New Entry Pending' : 'Cloud Copy Synced')}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {isAddingNew && (
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="text-gray-400 font-semibold text-xs uppercase tracking-widest hover:text-gray-600 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4.5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-100 hover:shadow-emerald-200 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isAddingNew ? "Upload New Slide" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-12 right-12 z-[100] animate-in slide-in-from-right-10 duration-300">
          <div className={`${toastType === "success" ? "bg-emerald-600" : "bg-red-600"} text-white px-10 py-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 border border-white/10 backdrop-blur-md`}>
            {toastType === "success" ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
            <span className="font-bold text-xs uppercase tracking-widest">{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}
