"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setBtnLoading(true);

    try {
      const res = await fetch(
        "https://backend-plum-rho-jbhmx6o6nc.vercel.app/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        setLoading(true);
        setTimeout(() => router.push("/dashboard"), 800);
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Server error");
    }

    setBtnLoading(false);
  };

  return (
    <>
      {/* FULLSCREEN LOADER */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50">
          <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
        <div className="w-full max-w-md bg-black/40 backdrop-blur-xl p-10 rounded-2xl shadow-xl border border-white/10 animate-fadeIn">
          <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow">
            Log in
          </h2>

          {/* Error Message */}
          {error && (
            <p className="text-center mb-4 px-3 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-400/40">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="text-white font-medium">Email</label>
              <input
                type="email"
                placeholder="admin@example.com"
                className="inputStyle"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-white font-medium">Password</label>
              <input
                type="password"
                placeholder="admin123"
                className="inputStyle"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btnMain flex items-center justify-center"
              disabled={btnLoading}
            >
              {btnLoading ? <div className="loader"></div> : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-400 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* GLOBAL STYLES */}
      <style>
        {`
          .inputStyle {
            width: 100%;
            padding: 12px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.15);
            color: white;
            border-radius: 10px;
            outline: none;
            transition: 0.3s;
          }
          .inputStyle:focus {
            border-color: #3b82f6;
            background: rgba(255,255,255,0.10);
          }

          .btnMain {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #2563eb, #3b82f6);
            border-radius: 12px;
            color: white;
            font-size: 17px;
            font-weight: 700;
            transition: 0.3s;
          }
          .btnMain:hover { opacity: 0.9; }

          .loader {
            width: 18px;
            height: 18px;
            border: 3px solid white;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
          }

          @keyframes spin { to { transform: rotate(360deg); } }

          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
};

export default LoginPage;
