"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

const EditBlog = ({ params }) => {
  const blogId = params.id;

  // For demo, blog details can be fetched from state or backend
  const [blog, setBlog] = useState({
    title: "Example Title",
    subtitle: "Example Subtitle",
    content: "Example Content",
    image: "",
  });

  const [preview, setPreview] = useState(blog.image);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Blog:", blog);
    // save changes to state or backend
  };

  return (
    <Navbar>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            className="border p-2 rounded"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />
          <input
            type="text"
            className="border p-2 rounded"
            value={blog.subtitle}
            onChange={(e) => setBlog({ ...blog, subtitle: e.target.value })}
          />
          <textarea
            className="border p-2 rounded h-32"
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          ></textarea>
          <div>
            <label className="block mb-1">Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                  setBlog({ ...blog, image: URL.createObjectURL(file) });
                }
              }}
            />
            {preview && <img src={preview} className="mt-2 w-full h-48 object-cover rounded" />}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>
    </Navbar>
  );
};

export default EditBlog;
