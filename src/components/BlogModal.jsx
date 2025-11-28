"use client";
import React, { useState, useEffect } from "react";

const BlogModal = ({ onClose, addBlog, blog }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setSubtitle(blog.subtitle || "");
      setContent(blog.content || "");
      setImage(blog.image || "");
      setAuthor(blog.author || "");
      setCategory(blog.category || "");
      setTags(blog.tags ? blog.tags.join(", ") : "");
      setFeatured(blog.featured || false);
    }
  }, [blog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      title,
      subtitle,
      content,
      image,
      author,
      category,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
      featured,
    };
    addBlog(blogData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {blog ? "Edit Blog" : "Add New Blog"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title & Subtitle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Subtitle"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          {/* Author & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Author"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* Tags & Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-5 h-5 accent-blue-500"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              <span className="text-gray-700">Featured</span>
            </label>
          </div>

          {/* Content */}
          <textarea
            placeholder="Content"
            className="border p-3 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <input
              type="file"
              accept="image/*"
              className="border p-2 rounded-lg"
              onChange={async (e) => {
                if (!e.target.files || !e.target.files[0]) return;

                const file = e.target.files[0];
                const formData = new FormData();
                formData.append("image", file); // FIXED HERE 🔥

                try {
                  setUploading(true);

                  const res = await fetch(
                    "https://backend-plum-rho-jbhmx6o6nc.vercel.app/api/upload",
                    {
                      method: "POST",
                      body: formData,
                    }
                  );

                  const data = await res.json();

                  if (data.url) {
                    setImage(data.url);
                  } else {
                    alert("Upload failed");
                  }
                } catch (err) {
                  console.error("Err:", err);
                  alert("Upload error");
                } finally {
                  setUploading(false);
                }
              }}
            />

            {uploading && <p className="text-gray-500">Uploading image...</p>}
            {image && (
              <img
                src={image}
                alt="Preview"
                className="w-full h-56 object-cover rounded-lg mt-2"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              {blog ? "Update Blog" : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;
