"use client";
import { Save, Upload, Image as ImageIcon, Trash2 } from "lucide-react";

export default function ContentSection({
  title,
  data,
  section,
  setCmsData,
  onSave,
}) {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCmsData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          image: file,
          imagePreview: reader.result,
        },
      }));
    };
    reader.readAsDataURL(file);
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

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header - Fixed gradient */}
        <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-transparent px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Edit the content for this section
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Image block */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Section Image
            </label>
            <div className="space-y-3">
              <div className="relative group">
                <div className="w-full h-48 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-emerald-500/50">
                  {data.imagePreview ? (
                    <img
                      src={data.imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        No image selected
                      </p>
                    </div>
                  )}
                </div>

                {/* Overlay upload button */}
                <label className="absolute inset-0 flex items-center justify-center bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl cursor-pointer">
                  <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium text-sm">
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {/* Remove image button */}
                {data.imagePreview && (
                  <button
                    type="button"
                    onClick={() => handleInputChange("imagePreview", null)}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* URL input */}
              <input
                type="text"
                value={data.imageUrl || ""}
                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                placeholder="Or enter image URL"
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Title
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter section title"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              value={data.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter section description"
              rows={4}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
            />
          </div>
        </div>

        {/* Footer / Save */}
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => onSave(section)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-emerald-500/25"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
