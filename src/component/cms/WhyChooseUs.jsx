"use client";
import { Save, Trash2, Plus, Image as ImageIcon } from "lucide-react";

export default function WhyChooseSection({ data, setCmsData, onSave }) {
     const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCmsData(prev => ({
          ...prev,
          homeWhyChoose: {
            ...prev.homeWhyChoose,
            image: file,
            imagePreview: reader.result
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setCmsData(prev => ({
      ...prev,
      homeWhyChoose: {
        ...prev.homeWhyChoose,
        [field]: value
      }
    }));
  };

  const addCard = () => {
    setCmsData(prev => ({
      ...prev,
      homeWhyChoose: {
        ...prev.homeWhyChoose,
        cards: [
          ...prev.homeWhyChoose.cards,
          { id: Date.now(), title: '', description: '' }
        ]
      }
    }));
  };

  const updateCard = (id, field, value) => {
    setCmsData(prev => ({
      ...prev,
      homeWhyChoose: {
        ...prev.homeWhyChoose,
        cards: prev.homeWhyChoose.cards.map(card =>
          card.id === id ? { ...card, [field]: value } : card
        )
      }
    }));
  };

  const deleteCard = (id) => {
    setCmsData(prev => ({
      ...prev,
      homeWhyChoose: {
        ...prev.homeWhyChoose,
        cards: prev.homeWhyChoose.cards.filter(card => card.id !== id)
      }
    }));
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Main Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Why Choose Us Section</h3>
          <p className="text-sm text-gray-500 mt-1">Main content and Image</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Section Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-500 transition-colors">
              {data.imagePreview ? (
                <div className="relative">
                  <img
                    src={data.imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleInputChange('imagePreview', null)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
                  <span className="text-sm font-medium text-gray-700 mb-1">
                    Click to upload image
                  </span>
                  <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={() => onSave('homeWhyChoose')}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm"
        >
          <Save className="w-4 h-4" />
          Save All Changes
        </button>
      </div>
    </div>
  );
}
