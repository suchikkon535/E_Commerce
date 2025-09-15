"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    startPrice: "",
    endPrice: "",
    images: [],
    category: "", // new field
  });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch items
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/list/");
      setItems(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      alert("Failed to load items.");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title ?? "");
      formData.append("description", form.description ?? "");
      formData.append("startPrice", form.startPrice ?? "");
      formData.append("endPrice", form.endPrice ?? "");
      formData.append("category", form.category ?? ""); // append category

      if (form.images && form.images.length > 0) {
        for (let i = 0; i < form.images.length; i++) {
          formData.append("images", form.images[i]);
        }
      }

      if (editingId) {
        // Update existing item
        await axios.put(
          `http://127.0.0.1:8000/api/update/${editingId}/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("✅ Item updated!");
        setEditingId(null);
      } else {
        // Create new item
        await axios.post("http://127.0.0.1:8000/api/create/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Item saved!");
      }

      // Reset form
      setForm({
        id: "",
        title: "",
        description: "",
        startPrice: "",
        endPrice: "",
        images: [],
        category: "",
      });

      fetchItems();
    } catch (error) {
      console.error("❌ Save error:", error);
      alert("Error saving item.");
    } finally {
      setLoading(false);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete/${id}/`);
      alert("🗑️ Item deleted");
      fetchItems();
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("Error deleting item.");
    }
  };

  // Edit item
  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      id: item.id,
      title: item.title ?? "",
      description: item.description ?? "",
      startPrice: item.startPrice ?? "",
      endPrice: item.endPrice ?? "",
      images: [],
      category: item.category ?? "", // fill category
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Ecommerce Admin Dashboard
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg max-w-xl mx-auto mb-10 space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title ?? ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description ?? ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={3}
          required
        />
        <input
          type="number"
          placeholder="Start Price"
          value={form.startPrice ?? ""}
          onChange={(e) => setForm({ ...form, startPrice: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          placeholder="End Price"
          value={form.endPrice ?? ""}
          onChange={(e) => setForm({ ...form, endPrice: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Category select */}
        <select
          value={form.category ?? ""}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Category</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>

        <input
          type="file"
          multiple
          onChange={(e) => setForm({ ...form, images: e.target.files })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
        >
          {loading ? "Saving..." : editingId ? "Update Item" : "Save Item"}
        </button>
      </form>

      {/* Items List */}
      <h2 className="text-2xl font-bold mb-4">Saved Items</h2>
      <div className="grid gap-6 md:grid-cols-5 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="font-bold text-lg text-gray-800">{item.title}</h2>
            <p className="text-gray-600 mt-1">{item.description}</p>
            <p className="text-gray-700 mt-1">
              Price: {item.startPrice} - {item.endPrice}
            </p>
            <p className="text-gray-700 mt-1">
              Category: {item.category ?? "N/A"}
            </p>

            {/* Images */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {Array.isArray(item.images) && item.images.length > 0 ? (
                item.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={`http://127.0.0.1:8000${img.image}`}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                ))
              ) : (
                <span className="text-sm text-gray-400">No images uploaded</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
