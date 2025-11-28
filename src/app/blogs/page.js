"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar.jsx";
import BlogModal from "../../components/BlogModal.jsx";
import ProtectedRoute from "@/components/ProtectedRoutes.jsx";

const API_BASE = "https://backend-plum-rho-jbhmx6o6nc.vercel.app/api/upload";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  const addBlog = async (blog) => {
    try {
      let res, data;
      if (editingBlog) {
        res = await fetch(`${API_BASE}/${editingBlog._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blog),
        });
        if (!res.ok) throw new Error("Failed to update blog");
        data = await res.json();
        setBlogs(blogs.map((b) => (b._id === data._id ? data : b)));
        setEditingBlog(null);
      } else {
        res = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blog),
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to add blog");
        }
        data = await res.json();
        setBlogs([data, ...blogs]);
      }
      setError("");
    } catch (err) {
      console.error(err);
      setError("Operation failed: " + err.message);
    }
  };

  const deleteBlog = async (blog) => {
    try {
      const res = await fetch(`${API_BASE}/${blog._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");
      setBlogs(blogs.filter((b) => b._id !== blog._id));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to delete blog.");
    }
  };

  const editBlog = (blog) => {
    setEditingBlog(blog);
    setModalOpen(true);
  };

  return (
    <ProtectedRoute>
      <Navbar>
        <div className="flex flex-col gap-4">
          <div className="w-full py-5 flex items-center justify-between">
            <h1 className="text-2xl font-bold mb-4">Blogs</h1>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#c5003e] text-white font-bold px-10 py-2 rounded hover:bg-[#004b87] transition"
            >
              Add Blog
            </button>
          </div>

          {modalOpen && (
            <BlogModal
              onClose={() => {
                setModalOpen(false);
                setEditingBlog(null);
              }}
              addBlog={addBlog}
              blog={editingBlog}
            />
          )}

          {loading ? (
            <p className="text-gray-500 mt-4">Loading blogs...</p>
          ) : error ? (
            <p className="text-red-500 mt-4">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="border rounded shadow hover:shadow-lg transition cursor-pointer bg-white"
                >
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover rounded-t"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="font-bold text-lg">{blog.title}</h2>
                    <h3 className="text-gray-600">{blog.subtitle}</h3>
                    <p className="mt-2 text-gray-700">
                      {blog.content.split(" ").slice(0, 20).join(" ")}...
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => editBlog(blog)}
                        className="bg-[#004b87] px-4 py-1 rounded text-white hover:bg-[#c5003e]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBlog(blog)}
                        className="bg-[#c5003e] px-2 py-1 rounded hover:bg-[#004b87] text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Navbar>
    </ProtectedRoute>
  );
};

export default BlogsPage;
