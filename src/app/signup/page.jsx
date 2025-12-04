"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage = () => {
  const router = useRouter();

  // Inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // OTP
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(false);

  // UI Messages
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Page loader
  const [btnLoading, setBtnLoading] = useState(false); // Button loader

  const backendURL = "https://backend-plum-rho-jbhmx6o6nc.vercel.app";

  // Send OTP
  const handleSendOtp = async () => {
    if (!email) return setMessage("Please enter email first");

    setBtnLoading(true);
    try {
      const res = await fetch(`${backendURL}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setMessage("OTP sent to your email");
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Server error");
    }
    setBtnLoading(false);
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    if (otp.length !== 6) return setMessage("Enter valid 6-digit OTP");
    setVerifiedOtp(true);
    setMessage("OTP verified — Continue signup");
  };

  // Signup Submit
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return setMessage("Passwords do not match");
    if (!verifiedOtp) return setMessage("Please verify OTP first");

    setLoading(true);

    try {
      const res = await fetch(`${backendURL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Signup successful! Redirecting...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Server error");
    }

    setLoading(false);
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
        {/* Signup Card */}
        <div className="w-full max-w-md bg-black/40 backdrop-blur-xl p-10 rounded-2xl shadow-xl border border-white/10 animate-fadeIn">
          <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow">
            Create Account
          </h2>

          {/* Message */}
          {message && (
            <p className="text-center mb-4 px-3 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-400/40">
              {message}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            {/* Username */}
            <div>
              <label className="text-white font-medium">Username</label>
              <input
                type="text"
                placeholder="Your username"
                className="inputStyle"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Email + OTP button */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-white font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="inputStyle"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={verifiedOtp}
                />
              </div>

              {!verifiedOtp && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="btnBlue mt-7 flex items-center justify-center"
                >
                  {btnLoading ? (
                    <div className="loader"></div>
                  ) : (
                    "Send"
                  )}
                </button>
              )}
            </div>

            {/* OTP input */}
            {otpSent && !verifiedOtp && (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="inputStyle"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="6"
                />

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="btnGreen"
                >
                  Verify
                </button>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="text-white font-medium">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="inputStyle"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-white font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="inputStyle"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={!verifiedOtp}
              className={`btnMain ${
                verifiedOtp ? "opacity-100" : "opacity-40 cursor-not-allowed"
              }`}
            >
              Signup
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:underline">
              Log in
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

          .btnBlue {
            background: linear-gradient(to right, #2563eb, #1d4ed8);
            color: white;
            padding: 10px 18px;
            border-radius: 10px;
            transition: 0.3s;
            font-weight: 600;
          }
          .btnBlue:hover { opacity: 0.8; }

          .btnGreen {
            background: linear-gradient(to right, #059669, #047857);
            color: white;
            padding: 10px 20px;
            border-radius: 10px;
            font-weight: 600;
            transition: 0.3s;
          }
          .btnGreen:hover { opacity: 0.85; }

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

export default SignupPage;
