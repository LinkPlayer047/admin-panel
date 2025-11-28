"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [message, setMessage] = useState("");

  const backendURL = "https://backend-plum-rho-jbhmx6o6nc.vercel.app";

  const handleSendOtp = async () => {
    setMessage("");
    if (!email) {
      setMessage("Please enter email first");
      return;
    }

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
        console.log("OTP (for testing):", data.code);
      } else {
        setMessage(data.message || "Error sending OTP");
      }
    } catch (err) {
      setMessage("Server error");
      console.error(err);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setMessage("Enter valid 6-digit OTP");
      return;
    }
    setVerifiedOtp(true);
    setMessage("OTP verified! You can now signup");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (!verifiedOtp) {
      setMessage("Please verify your OTP first");
      return;
    }

    try {
      const res = await fetch(`${backendURL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (err) {
      setMessage("Server error");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="shadow-white shadow bg-gradient-to-br from-gray-600 to-black rounded-2xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create an Account
        </h2>

        {message && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {message}
          </p>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div>
            <label className="block text-white font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Your username"
              className="w-full border text-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <label className="block text-white font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full border text-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 mt-6"
              >
                Send OTP
              </button>
            )}
          </div>

          {otpSent && !verifiedOtp && (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full border text-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
              >
                Verify
              </button>
            </div>
          )}

          <div>
            <label className="block text-white font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full border text-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border text-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`${
              verifiedOtp
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-500 cursor-not-allowed"
            } text-white py-3 rounded-lg font-semibold transition duration-300`}
            disabled={!verifiedOtp}
          >
            Signup
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
