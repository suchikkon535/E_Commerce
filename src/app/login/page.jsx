"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect to Django Google login
  const googleLogin = () => {
    window.location.href = "http://127.0.0.1:8000/accounts/google/login/";
  };

  // Optional: handle email/password login via API
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    // Example: send POST request to your dj-rest-auth login endpoint
    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        window.location.href = "/"; // Redirect after successful login
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white text-gray-700 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>

        {/* Google Login Button */}
        <button
          onClick={googleLogin}
          className="w-full py-3 mb-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
        >
          Sign in with Google
        </button>

        <p className="text-center text-gray-500 text-sm mb-4">or sign in with email</p>

        {/* Email/Password Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
