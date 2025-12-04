// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FaBars, FaHome, FaUser, FaCog, FaChartLine } from "react-icons/fa";

// const Navbar = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const handleOutsideClick = (e) => {
//       if (
//         sidebarOpen &&
//         !e.target.closest("#sidebar") &&
//         !e.target.closest("#hamburger")
//       ) {
//         setSidebarOpen(false);
//       }
//     };
//     document.addEventListener("click", handleOutsideClick);
//     return () => document.removeEventListener("click", handleOutsideClick);
//   }, [sidebarOpen]);

//   const handleLinkClick = () => setSidebarOpen(false);

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     router.push("/login");
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div
//         id="sidebar"
//         className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//         }`}
//       >
//         <div className="flex justify-between items-center p-5 font-bold text-xl border-b border-gray-700">
//           <button
//             className="md:hidden text-white text-xl"
//             onClick={() => setSidebarOpen(false)}
//           >
//             ✕
//           </button>
//           <span className="text-white font-semibold text-2xl"> Admin panel</span>
//         </div>
//         <nav className="mt-5 flex flex-col gap-2">
//           <Link
//             href="/dashboard"
//             onClick={handleLinkClick}
//             className="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 rounded"
//           >
//             <FaHome /> Dashboard
//           </Link>
//           <Link
//             href="/users"
//             onClick={handleLinkClick}
//             className="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 rounded"
//           >
//             <FaUser /> Users
//           </Link>
//           <Link
//             href="/blogs"
//             onClick={handleLinkClick}
//             className="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 rounded"
//           >
//             <FaChartLine /> Blogs
//           </Link>
//           <Link
//             href="/settings"
//             onClick={handleLinkClick}
//             className="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 rounded"
//           >
//             <FaCog /> Settings
//           </Link>
//         </nav>
//       </div>

//       {/* Content */}
//       <div className="flex-1 flex flex-col ml-0 md:ml-64">
//         {/* Navbar */}
//         <div className="flex items-center justify-between bg-gray-800 text-white px-5 py-3 shadow-md">
//           <button
//             id="hamburger"
//             className="md:hidden text-xl"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             <FaBars />
//           </button>
//           <div className="font-bold text-lg">Admin Panel</div>
//           <div>
//             <button
//               onClick={handleLogout}
//               className="bg-[#c5003e] px-3 py-1 rounded hover:bg-[#9d0233] text-white"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//         <main className="flex-1 p-5 bg-gray-100 overflow-auto">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaBars,
  FaHome,
  FaUser,
  FaCog,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close sidebar when clicking outside (mobile only)
  useEffect(() => {
    const handleOutside = (e) => {
      if (
        sidebarOpen &&
        !e.target.closest("#sidebar") &&
        !e.target.closest("#hamburger")
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, [sidebarOpen]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Users", icon: <FaUser />, path: "/users" },
    { name: "Blogs", icon: <FaChartLine />, path: "/blogs" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside
        id="sidebar"
        className={`
          fixed inset-y-0 left-0 z-40 bg-gray-900 text-white shadow-xl
          transition-all duration-300 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${collapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-gray-700 p-4">
          <span className={`font-bold text-xl transition-all ${collapsed ? "hidden" : "block"}`}>
            Admin Panel
          </span>

          <button
            className="md:hidden text-white text-xl"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Collapse/Expand Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full py-2 bg-gray-800 hover:bg-gray-700 transition mb-3 text-sm"
        >
          {collapsed ? "➤" : "⟨⟨ Collapse"}
        </button>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1 px-2">
          {menuItems.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${active ? "bg-blue-600 shadow-lg" : "hover:bg-gray-700"}
                `}
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300
          ${collapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >
        {/* TOP NAVBAR */}
        <header className="flex items-center justify-between bg-gray-800 text-white px-5 py-3 shadow-lg backdrop-blur-lg">
          <button
            id="hamburger"
            className="md:hidden text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>

          <h1 className="text-xl font-semibold tracking-wide">Admin Panel</h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            <FaSignOutAlt />
            <span className="hidden sm:block">Logout</span>
          </button>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Navbar;
