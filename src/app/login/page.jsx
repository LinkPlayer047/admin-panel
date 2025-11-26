"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        router.push("/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="shadow-white shadow bg-gradient-to-br from-gray-600 to-black rounded-2xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-white font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full border text-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="admin123"
              className="w-full border text-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
