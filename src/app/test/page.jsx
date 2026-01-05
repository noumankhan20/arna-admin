"use client";

import { useState } from "react";
import axios from "axios";

export default function CreateProductPage() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    salePrice: "",
    image: null,
    isBestSeller: false,
    isNewArrival: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setForm((prev) => ({ ...prev, image: files[0] }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();

      data.append("name", form.name);
      data.append("slug", form.slug);
      data.append("description", form.description);
      data.append("price", form.price);
      if (form.salePrice) data.append("salePrice", form.salePrice);
      data.append("isBestSeller", form.isBestSeller);
      data.append("isNewArrival", form.isNewArrival);
      data.append("image", form.image); // 👈 MUST MATCH upload.single("image")

      const res = await axios.post(
        "http://localhost:5000/api/products/create",
        data
      );

      setMessage("✅ Product created successfully");
      console.log(res.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "❌ Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Create Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          required
        />

        <input
          name="slug"
          placeholder="Slug"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="salePrice"
          placeholder="Sale Price (optional)"
          onChange={handleChange}
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />

        <label>
          <input
            type="checkbox"
            name="isBestSeller"
            onChange={handleChange}
          />
          Best Seller
        </label>

        <label>
          <input
            type="checkbox"
            name="isNewArrival"
            onChange={handleChange}
          />
          New Arrival
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
