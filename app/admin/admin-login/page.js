"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/login`, 
        formData
      );
      console.log("response", response);
      const { token, data } = response.data;

      // Store token & admin data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect to admin dashboard
      router.push("/admin/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid admin credentials.";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              value={formData.email}
              className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none px-4 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              value={formData.password}
              className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Admin Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Not an admin?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            User Login
          </Link>
        </p>
      </div>
    </div>
  );
}
