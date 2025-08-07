"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  DollarSign,
  CreditCard,
  Banknote,
  Clock,
  CheckCircle,
  User,
  Calendar,
  MessageSquare,
  Eye,
  Edit3,
  MoreHorizontal,
  TrendingUp,
  Wallet,
  Heart,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Donations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [donations, setDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ amount: "", method: "", message: "" });

  // API Configuration
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  // Fetch donations from API
  const fetchDonations = async (page = 0, filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        skip: page.toString(),
        limit: limit.toString(),
        ...filters,
      });

      const response = await axios.get(`${API_BASE_URL}/donation/donations`, {
        params,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { data, totalDonations } = response.data;

      if (page === 0) {
        setDonations(data || []);
      } else {
        setDonations((prev) => [...prev, ...(data || [])]);
      }

      setTotalDonations(totalDonations || 0);
      setHasMore((data || []).length === limit);
    } catch (err) {
      console.error("Error fetching donations:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch donations");
      if (page === 0) {
        setDonations([]);
        setTotalDonations(0);
      }
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Update donation status
  const updateDonationStatus = async (donationId, newStatus) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/donation/donations/${donationId}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedDonation = response.data.data || { _id: donationId, status: newStatus };

      setDonations((prev) =>
        prev.map((donation) =>
          donation._id === donationId
            ? {
                ...donation,
                status: updatedDonation.status || newStatus,
                updatedAt: updatedDonation.updatedAt || new Date().toISOString(),
              }
            : donation
        )
      );
      toast.success(`Donation ${newStatus} successfully`);
    } catch (err) {
      console.error("Error updating donation:", err);
      setError(err.response?.data?.message || `Failed to update donation: ${err.message}`);
      toast.error(err.response?.data?.message || "Failed to update donation");
    }
  };

  // View donation details
  const viewDonation = (donation) => {
    setSelectedDonation(donation);
    setIsViewModalOpen(true);
  };

  // Edit donation
  const openEditModal = (donation) => {
    setSelectedDonation(donation);
    setEditForm({
      amount: donation.amount.toString(),
      method: donation.method,
      message: donation.message || "",
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/donation/donations/${selectedDonation._id}`,
        {
          amount: Number(editForm.amount),
          method: editForm.method,
          message: editForm.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setDonations((prev) =>
        prev.map((donation) =>
          donation._id === selectedDonation._id
            ? {
                ...donation,
                amount: Number(editForm.amount),
                method: editForm.method,
                message: editForm.message,
                updatedAt: new Date().toISOString(),
              }
            : donation
        )
      );
      setIsEditModalOpen(false);
      toast.success("Donation updated successfully");
    } catch (err) {
      console.error("Error updating donation:", err);
      setError(err.response?.data?.message || `Failed to update donation: ${err.message}`);
      toast.error(err.response?.data?.message || "Failed to update donation");
    }
  };

  // Initial load
  useEffect(() => {
    const filters = buildFilters();
    fetchDonations(0, filters);
    setCurrentPage(0);
  }, [statusFilter, methodFilter]);

  // Search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filters = buildFilters();
      fetchDonations(0, filters);
      setCurrentPage(0);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Build filters object
  const buildFilters = () => {
    const filters = {};
    if (statusFilter !== "All") {
      filters.status = statusFilter.toLowerCase();
    }
    if (methodFilter !== "All") {
      filters.method = methodFilter.toLowerCase();
    }
    if (searchTerm.trim()) {
      filters.search = searchTerm.trim();
    }
    return filters;
  };

  // Load more donations
  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      const filters = buildFilters();
      fetchDonations(nextPage, filters);
      setCurrentPage(nextPage);
    }
  };

  // Refresh donations
  const refreshDonations = () => {
    const filters = buildFilters();
    fetchDonations(0, filters);
    setCurrentPage(0);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        icon: Clock,
        class: "bg-amber-100 text-amber-800 border-amber-200",
        dotClass: "bg-amber-500",
      },
      completed: {
        icon: CheckCircle,
        class: "bg-emerald-100 text-emerald-800 border-emerald-200",
        dotClass: "bg-emerald-500",
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.class}`}>
        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${config.dotClass}`}></div>
        <Icon size={12} className="mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getMethodBadge = (method) => {
    if (method === "card") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800">
          <CreditCard size={12} className="mr-1" />
          Card
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-800">
        <Banknote size={12} className="mr-1" />
        Cash
      </span>
    );
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("PKR", "Rs ");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateStats = () => {
    const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
    const completed = donations
      .filter((d) => d.status === "completed")
      .reduce((sum, donation) => sum + donation.amount, 0);
    const pending = donations
      .filter((d) => d.status === "pending")
      .reduce((sum, donation) => sum + donation.amount, 0);

    return { total, completed, pending };
  };

  const stats = calculateStats();

  const ActionButton = ({ icon: Icon, onClick, className = "", disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <DollarSign className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Donations</h1>
                <p className="text-gray-600">Track and manage donation transactions</p>
              </div>
            </div>
            <button
              onClick={refreshDonations}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <AlertCircle size={20} className="text-red-500" />
              <div>
                <p className="text-red-800 font-medium">Error</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Donations</p>
                <p className="text-2xl font-bold">{formatAmount(stats.total)}</p>
              </div>
              <TrendingUp size={32} className="text-blue-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold">{formatAmount(stats.completed)}</p>
              </div>
              <CheckCircle size={32} className="text-emerald-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-2xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold">{formatAmount(stats.pending)}</p>
              </div>
              <Clock size={32} className="text-amber-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-2xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Count</p>
                <p className="text-2xl font-bold">{totalDonations}</p>
              </div>
              <Wallet size={32} className="text-purple-200" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search donations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Filter size={20} className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-32"
              >
                <option value="All">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-32"
              >
                <option value="All">All Methods</option>
                <option value="card">Card</option>
                <option value="cash">Cash</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && donations.length === 0 && (
          <div className="text-center py-12">
            <RefreshCw size={32} className="text-gray-400 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading donations...</h3>
            <p className="text-gray-500">Please wait while we fetch the latest data.</p>
          </div>
        )}

        {/* Donation Cards */}
        {donations.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="text-3xl font-bold text-green-600">
                          {formatAmount(donation.amount)}
                        </div>
                        {getMethodBadge(donation.method)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                          <User size={14} />
                          <span>
                            {donation.userId?.firstName || "Unknown"} {donation.userId?.lastName || "User"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{formatDate(donation.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(donation.status)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 pb-4">
                  {donation.message && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <div className="flex items-start space-x-2">
                        <MessageSquare size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                        <p className="text-sm text-gray-700 leading-relaxed">"{donation.message}"</p>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Payment Method:</span>
                      <div className="mt-1">{getMethodBadge(donation.method)}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Contact:</span>
                      <div className="mt-1 text-blue-600 hover:text-blue-800">
                        {donation.userId?.email && (
                          <a href={`mailto:${donation.userId.email}`} className="text-xs">
                            {donation.userId.email}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-4">
                    Last updated: {formatDate(donation.updatedAt)}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Transaction ID: #{donation._id.slice(-8)}</div>
                    <div className="flex items-center space-x-1">
                      <ActionButton
                        icon={Eye}
                        onClick={() => viewDonation(donation)}
                        className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      />
                      {donation.status === "pending" && (
                        <ActionButton
                          icon={CheckCircle}
                          onClick={() => updateDonationStatus(donation._id, "completed")}
                          className="text-gray-600 hover:text-green-600 hover:bg-green-50"
                        />
                      )}
                      <ActionButton
                        icon={Edit3}
                        onClick={() => openEditModal(donation)}
                        className="text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                      />
                      <ActionButton
                        icon={MoreHorizontal}
                        onClick={() => console.log("More", donation._id)}
                        className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && donations.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && donations.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
            <p className="text-gray-500">No donations match your current search and filter criteria.</p>
          </div>
        )}

        {/* Summary Section */}
        {donations.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Heart size={20} className="text-red-500 mr-2" />
              Recent Activity Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {donations.filter((d) => d.method === "card").length}
                </div>
                <div className="text-sm text-gray-600">Card Payments</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {donations.filter((d) => d.method === "cash").length}
                </div>
                <div className="text-sm text-gray-600">Cash Donations</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {donations.length > 0 ? formatAmount(stats.total / donations.length) : "Rs 0"}
                </div>
                <div className="text-sm text-gray-600">Average Donation</div>
              </div>
            </div>
          </div>
        )}

        {/* View Modal */}
        {isViewModalOpen && selectedDonation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Donation Details</h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="text-gray-700">{formatAmount(selectedDonation.amount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">User</p>
                  <p className="text-gray-700">
                    {selectedDonation.userId?.firstName} {selectedDonation.userId?.lastName}
                  </p>
                  <a
                    href={`mailto:${selectedDonation.userId?.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedDonation.userId?.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  {getMethodBadge(selectedDonation.method)}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Message</p>
                  <p className="text-gray-700">"{selectedDonation.message || "No message"}"</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  {getStatusBadge(selectedDonation.status)}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="text-gray-700">{formatDate(selectedDonation.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-gray-700">{formatDate(selectedDonation.updatedAt)}</p>
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
        {isEditModalOpen && selectedDonation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Edit Donation</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Amount (PKR)</label>
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Payment Method</label>
                  <select
                    value={editForm.method}
                    onChange={(e) => setEditForm({ ...editForm, method: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="card">Card</option>
                    <option value="cash">Cash</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Message</label>
                  <textarea
                    value={editForm.message}
                    onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                  />
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
    </div>
  );
};

export default Donations;