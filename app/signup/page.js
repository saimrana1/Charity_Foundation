"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "donor",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        formData
      );

      if (formData.role === "admin") {
        // For admin - store token and redirect to admin login
        const { token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        router.push("/admin/admin-login");
      } else {
        // For regular users - redirect to normal login
        Swal.fire({
          title: "Signup Successful!",
          text: "Please login to continue",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/login");
        });
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong.";
      setError(msg);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                required
                onChange={handleChange}
                value={formData.firstName}
                className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none px-4 py-2"
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
                className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none px-4 py-2"
              />
            </div>
          </div>

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

          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="text"
                name="phone"
                required
                onChange={handleChange}
                value={formData.phone}
                className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none px-4 py-2"
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                value={formData.address}
                className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              name="role"
              onChange={handleChange}
              value={formData.role}
              className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none px-4 py-2"
            >
              <option value="donor">Donor</option>
              <option value="needy">Needy</option>
              <option value="volunteer">Volunteer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
