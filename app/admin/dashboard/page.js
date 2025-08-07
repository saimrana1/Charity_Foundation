"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { usePathname, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {
  Search,
  Settings,
  Bell,
  Eye,
  Check,
  Edit3,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Users,
  MapPin,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    status: "",
  });
  const [currentUser, setCurrentUser] = useState(null); // Added for logged-in user
  const pathname = usePathname();
  const router = useRouter();

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  // Fetch logged-in user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCurrentUser(res.data.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      fetchCurrentUser();
    } else {
      setIsLoggedIn(false);
      router.push("/login");
    }
  }, [pathname, router]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user/get`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(res.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error(error.response?.data?.message || "Failed to fetch users");
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setCurrentUser(null);
        router.push("/login");
        toast.success("Logged out successfully");
      }
    });
  };

  const viewUser = async (userId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/user/get/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSelectedUser(res.data.data);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch user details"
      );
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status || "Pending",
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/user/update/${selectedUser._id}`,
        {
          firstName: editForm.firstName,
          lastName: editForm.lastName,
          email: editForm.email,
          role: editForm.role,
          status: editForm.status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUsers((prev) =>
        prev.map((user) =>
          user._id === selectedUser._id ? { ...user, ...res.data.data } : user
        )
      );
      setIsEditModalOpen(false);
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Approved: {
        class: "bg-emerald-100 text-emerald-800 border-emerald-200",
        dotClass: "bg-emerald-500",
      },
      Pending: {
        class: "bg-amber-100 text-amber-800 border-amber-200",
        dotClass: "bg-amber-500",
      },
    };

    const config = statusConfig[status] || statusConfig.Pending;

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.class}`}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${config.dotClass}`}
        ></div>
        {status}
      </span>
    );
  };

  const ActionButton = ({ icon: Icon, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${className}`}
    >
      <Icon size={16} />
    </button>
  );

  const Sidebar = () => (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-16 px-6 bg-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="text-white font-semibold text-lg">
            Charity_Foundation
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="mt-8 px-4 space-y-2">
        <a
          href="/admin/dashboard"
          className="flex items-center px-4 py-3 bg-slate-800 text-white rounded-xl shadow-lg"
        >
          <Users size={20} className="mr-3" />
          User
        </a>
        <a
          href="/admin/dashboard/help"
          className="flex items-center px-4 py-3 text-gray-300 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200"
        >
          <LayoutDashboard size={20} className="mr-3" />
          Help Request
        </a>
        <a
          href="/admin/dashboard/donation"
          className="flex items-center px-4 py-3 text-gray-300 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200"
        >
          <MapPin size={20} className="mr-3" />
          Donations
        </a>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          className="flex items-center w-full px-4 py-3 text-gray-300 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200"
          onClick={handleLogout}
        >
          <LogOut size={20} className="mr-3" />
          Log Out
        </button>
      </div>
    </div>
  );

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster position="top-right" />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                Welcome back, {currentUser ? currentUser.firstName : "User"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* <button className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors duration-200">
                <Settings size={20} />
              </button>
              <button className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors duration-200 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button> */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {currentUser ? currentUser.firstName[0] : "U"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                User List
              </h2>
              <p className="text-gray-600">Manage and monitor user accounts</p>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-32"
                >
                  <option value="All">Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {loading ? (
                <div className="p-6 text-center text-gray-500">
                  Loading users...
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                            First Name
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                            Last Name
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                            Email
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                            Role
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredUsers
                          .slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                          )
                          .map((user) => (
                            <tr
                              key={user._id}
                              className="hover:bg-gray-50 transition-colors duration-150"
                            >
                              <td className="px-6 py-4 text-sm text-gray-900">
                                {user.firstName}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900">
                                {user.lastName}
                              </td>
                              <td className="px-6 py-4 text-sm text-blue-600 hover:text-blue-800">
                                <a href={`mailto:${user.email}`}>
                                  {user.email}
                                </a>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">
                                {user.role}
                              </td>
                              <td className="px-6 py-4">
                                {getStatusBadge(user.status || "Pending")}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-1">
                                  <ActionButton
                                    icon={Eye}
                                    onClick={() => viewUser(user._id)}
                                    className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                                  />
                                  {/* <ActionButton
                                    icon={Check}
                                    onClick={() =>
                                      console.log("Approve", user._id)
                                    }
                                    className="text-gray-600 hover:text-green-600 hover:bg-green-50"
                                  /> */}
                                  <ActionButton
                                    icon={Edit3}
                                    onClick={() => openEditModal(user)}
                                    className="text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                                  />
                                  {/* <ActionButton
                                    icon={MoreHorizontal}
                                    onClick={() =>
                                      console.log("More", user._id)
                                    }
                                    className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                                  /> */}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* Pagination */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      Items per page:
                    </span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                      className="ml-2 border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      Items {(currentPage - 1) * itemsPerPage + 1} to{" "}
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredUsers.length
                      )}{" "}
                      of {filteredUsers.length}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      {[1, 2, 3, 4, 5].map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors duration-200 ${
                            currentPage === page
                              ? "bg-blue-600 text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                          disabled={
                            page >
                            Math.ceil(filteredUsers.length / itemsPerPage)
                          }
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() =>
                          setCurrentPage(
                            Math.min(
                              Math.ceil(filteredUsers.length / itemsPerPage),
                              currentPage + 1
                            )
                          )
                        }
                        disabled={
                          currentPage >=
                          Math.ceil(filteredUsers.length / itemsPerPage)
                        }
                        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* View Modal */}
            {isViewModalOpen && selectedUser && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      User Details
                    </h2>
                    <button
                      onClick={() => setIsViewModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">First Name</p>
                      <p className="text-gray-700">{selectedUser.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Name</p>
                      <p className="text-gray-700">{selectedUser.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-blue-600 hover:underline">
                        <a href={`mailto:${selectedUser.email}`}>
                          {selectedUser.email}
                        </a>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="text-gray-700">{selectedUser.role}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      {getStatusBadge(selectedUser.status || "Pending")}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created At</p>
                      <p className="text-gray-700">
                        {new Date(selectedUser.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="text-gray-700">
                        {new Date(selectedUser.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setIsViewModalOpen(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && selectedUser && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      Edit User
                    </h2>
                    <button
                      onClick={() => setIsEditModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={editForm.firstName}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            firstName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Last Name</label>
                      <input
                        type="text"
                        value={editForm.lastName}
                        onChange={(e) =>
                          setEditForm({ ...editForm, lastName: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Role</label>
                      <select
                        value={editForm.role}
                        onChange={(e) =>
                          setEditForm({ ...editForm, role: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="needy">Needy</option>
                        <option value="donor">Donor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Status</label>
                      <select
                        value={editForm.status}
                        onChange={(e) =>
                          setEditForm({ ...editForm, status: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                      </select>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsEditModalOpen(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
