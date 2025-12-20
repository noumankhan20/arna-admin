"use client";

import { useState } from "react";
import { useRequireAdmin } from "@/component/auth/useRequireAdmin";

export default function CmsHeroImagesPage() {
  useRequireAdmin();

  const [heroTitle, setHeroTitle] = useState("Glow with ARNA");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Natural skincare crafted for Indian skin."
  );
  const [heroImageUrl, setHeroImageUrl] = useState("/images/hero-default.jpg");
  const [heroImageFile, setHeroImageFile] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState(null);

  const [ctaText, setCtaText] = useState("Shop now");
  const [ctaLink, setCtaLink] = useState("/shop");
  const [overlayOpacity, setOverlayOpacity] = useState(40); // 0–100
  const [layoutVariant, setLayoutVariant] = useState("center"); // 'center' | 'left'
  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  const handleFileChange = (e) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation: type + size (~2MB)
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Image too large. Max size 2MB.");
      return;
    }

    setHeroImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setHeroImagePreview(previewUrl);
    setHeroImageUrl(previewUrl);
  };

  const handleSave = () => {
    setSavedMessage("");
    setError("");

    if (!heroTitle.trim()) {
      setError("Hero title is required.");
      return;
    }
    if (!ctaText.trim() || !ctaLink.trim()) {
      setError("CTA text and link are required.");
      return;
    }

    // Later: send to API / DB
    console.log("Saving CMS data:", {
      heroTitle,
      heroSubtitle,
      heroImageUrl,
      ctaText,
      ctaLink,
      overlayOpacity,
      layoutVariant,
      heroImageFile,
    });

    setSavedMessage("Changes saved (not yet connected to backend).");
  };

  const overlayStyle = `rgba(0,0,0,${overlayOpacity / 100})`;
  const alignmentClasses =
    layoutVariant === "left"
      ? "items-start text-left"
      : "items-center text-center";

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr,3fr]">
      {/* Form side */}
      <section className="rounded-xl bg-white p-4 md:p-6 shadow-sm border border-zinc-100">
        <h2 className="text-sm font-semibold text-zinc-900 mb-4">
          Homepage Hero Content
        </h2>

        <div className="space-y-4 text-sm">
          {/* Hero title */}
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">
              Hero title
            </label>
            <input
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
            />
          </div>

          {/* Hero subtitle */}
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">
              Hero subtitle
            </label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
            />
          </div>

          {/* CTA controls */}
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">
                CTA button text
              </label>
              <input
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                placeholder="Shop now"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">
                CTA link
              </label>
              <input
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                value={ctaLink}
                onChange={(e) => setCtaLink(e.target.value)}
                placeholder="/shop"
              />
            </div>
          </div>

          {/* Layout & overlay */}
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">
                Layout
              </label>
              <select
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                value={layoutVariant}
                onChange={(e) => setLayoutVariant(e.target.value)}
              >
                <option value="center">Center aligned</option>
                <option value="left">Left aligned</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">
                Overlay opacity ({overlayOpacity}%)
              </label>
              <input
                type="range"
                min="0"
                max="80"
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Manual URL */}
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">
              Hero image URL (optional)
            </label>
            <input
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
              value={heroImageUrl}
              onChange={(e) => setHeroImageUrl(e.target.value)}
              placeholder="/images/home-hero.jpg"
            />
            <p className="mt-1 text-[11px] text-zinc-500">
              Paste a URL or upload an image below.
            </p>
          </div>

          {/* Upload */}
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">
              Upload hero image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-xs text-zinc-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-zinc-900 file:text-white hover:file:bg-zinc-800"
            />
            <p className="mt-1 text-[11px] text-zinc-500">
              JPG/PNG, max 2MB. This is only a local preview until backend is ready.
            </p>

            {heroImagePreview && (
              <div className="mt-3">
                <p className="text-[11px] text-zinc-500 mb-1">
                  Thumbnail preview:
                </p>
                <img
                  src={heroImagePreview}
                  alt="Hero preview"
                  className="h-24 w-full max-w-xs rounded-lg object-cover border border-zinc-200"
                />
              </div>
            )}
          </div>

          {/* Messages */}
          {error && (
            <p className="text-[11px] text-red-500">
              {error}
            </p>
          )}
          {savedMessage && (
            <p className="text-[11px] text-emerald-600">
              {savedMessage}
            </p>
          )}

          <button
            onClick={handleSave}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-white hover:bg-zinc-800"
          >
            Save changes
          </button>
        </div>
      </section>

      {/* Preview side */}
      <section className="rounded-xl bg-white p-0 shadow-sm border border-zinc-100 overflow-hidden">
        <div
          className="relative h-64 md:h-80 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImageUrl})` }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: overlayStyle }}
          />
          <div
            className={`relative z-10 h-full flex flex-col justify-center px-6 md:px-10 ${alignmentClasses} gap-2`}
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              {heroTitle}
            </h3>
            <p className="text-sm md:text-base text-zinc-100 max-w-md">
              {heroSubtitle}
            </p>
            <button className="mt-2 inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-zinc-900">
              {ctaText} <span className="ml-1 text-[10px] text-zinc-500">{ctaLink}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
