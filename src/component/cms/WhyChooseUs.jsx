"use client";
import { Save, Plus, Trash2, Edit, Image as ImageIcon, Upload } from "lucide-react";
import { Leaf, Shield, Heart, Recycle, FlaskConical, Users } from "lucide-react";
import { useState } from "react";

const iconMap = {
  leaf: Leaf,
  shield: Shield,
  heart: Heart,
  recycle: Recycle,
  flask: FlaskConical,
  users: Users,
};

export default function WhyChooseSection({ data, setCmsData, onSave }) {
  const [editingId, setEditingId] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCmsData((prev) => ({
          ...prev,
          homeWhyChoose: {
            ...prev.homeWhyChoose,
            image: file,
            imagePreview: reader.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setCmsData((prev) => ({
      ...prev,
      homeWhyChoose: {
        ...prev.homeWhyChoose,
        [field]: value,
      },
    }));
  };

  const handleTitleChange = (value) => {
    setCmsData((prev) => ({
      ...prev,
      homeWhyChoose: {
        ...prev.homeWhyChoose,
        title: value,
      },
    }));
  };

  const handleItemChange = (id, field, value) => {
    setCmsData((prev) => ({
      ...prev,
      homeWhyChoose: {
        ...prev.homeWhyChoose,
        cards: prev.homeWhyChoose.cards.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const handleAddItem = () => {
    const newId = Math.max(...data.cards.map((i) => i.id), 0) + 1;
    setCmsData((prev) => ({
      ...prev,
      homeWhyChoose: {
        ...prev.homeWhyChoose,
        cards: [
          ...prev.homeWhyChoose.cards,
          {
            id: newId,
            icon: "leaf",
            title: "New Feature",
            description: "Description here",
          },
        ],
      },
    }));
    setEditingId(newId);
  };

  const handleDeleteItem = (id) => {
    setCmsData((prev) => ({
      ...prev,
      homeWhyChoose: {
        ...prev.homeWhyChoose,
        cards: prev.homeWhyChoose.cards.filter((item) => item.id !== id),
      },
    }));
  };

  const getIconForCard = (item) => {
    return iconMap[item.icon || "leaf"] || Leaf;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-transparent px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Why Choose Us Section</h3>
          <p className="text-sm text-gray-500 mt-1">Manage your unique selling points</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">Section Image</label>
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
                      <p className="text-sm text-gray-500">No image selected</p>
                    </div>
                  )}
                </div>
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
                {data.imagePreview && (
                  <button
                    onClick={() => handleInputChange("imagePreview", null)}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Section Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">Section Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Items Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-900">Features</label>
              <button
                onClick={handleAddItem}
                className="inline-flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Feature
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {data.cards.map((item) => {
                const IconComponent = getIconForCard(item);
                const isEditing = editingId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`relative p-5 rounded-xl border transition-all ${
                      isEditing
                        ? "border-emerald-500 bg-emerald-50 shadow-lg"
                        : "border-gray-200 bg-gray-50 hover:border-emerald-500/30"
                    }`}
                  >
                    {isEditing ? (
                      <div className="space-y-3">
                        {/* Icon Select */}
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Icon
                          </label>
                          <select
                            value={item.icon || "leaf"}
                            onChange={(e) =>
                              handleItemChange(item.id, "icon", e.target.value)
                            }
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          >
                            <option value="leaf">Leaf</option>
                            <option value="shield">Shield</option>
                            <option value="heart">Heart</option>
                            <option value="recycle">Recycle</option>
                            <option value="flask">Flask</option>
                            <option value="users">Users</option>
                          </select>
                        </div>

                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            handleItemChange(item.id, "title", e.target.value)
                          }
                          placeholder="Title"
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(item.id, "description", e.target.value)
                          }
                          placeholder="Description"
                          rows={3}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                        <button
                          onClick={() => setEditingId(null)}
                          className="w-full py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-all"
                        >
                          Done
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 flex gap-1">
                          <button
                            onClick={() => setEditingId(item.id)}
                            className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => onSave("homeWhyChoose")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-emerald-500/25"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
