"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBars, FaHome, FaUser, FaCog, FaChartLine } from "react-icons/fa";

const Navbar = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        sidebarOpen &&
        !e.target.closest("#sidebar") &&
        !e.target.closest("#hamburger")
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [sidebarOpen]);

  const handleLinkClick = () => setSidebarOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center p-5 font-bold text-xl border-b border-gray-700">
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
          <span className="text-white font-semibold text-2xl"> Admin panel</span>
        </div>
        <nav className="mt-5 flex flex-col gap-2">
          <Link
            href="/dashboard"
            onClick={handleLinkClick}
            className="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 rounded"
          >
            <FaHome /> Dashboard
          </Link>
          <Link
            href="/users"
            onClick={handleLinkClick}
            className="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 rounded"
          >
            <FaUser /> Users
          </Link>
          <Link
            href="/blogs"
            onClick={handleLinkClick}
            className="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 rounded"
          >
            <FaChartLine /> Blogs
          </Link>
          <Link
            href="/settings"
            onClick={handleLinkClick}
            className="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 rounded"
          >
            <FaCog /> Settings
          </Link>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        {/* Navbar */}
        <div className="flex items-center justify-between bg-gray-800 text-white px-5 py-3 shadow-md">
          <button
            id="hamburger"
            className="md:hidden text-xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
          <div className="font-bold text-lg">Admin Panel</div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-[#c5003e] px-3 py-1 rounded hover:bg-[#9d0233] text-white"
            >
              Logout
            </button>
          </div>
        </div>
        <main className="flex-1 p-5 bg-gray-100 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Navbar;
