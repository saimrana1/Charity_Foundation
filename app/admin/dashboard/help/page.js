"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  MessageSquare,
  Eye,
  Edit3,
  MoreHorizontal,
  Heart,
  AlertCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";

const HelpRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [helpRequests, setHelpRequests] = useState([]);
  const [totalHelpRequests, setTotalHelpRequests] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ title: "", description: "", message: "" });
  const router = useRouter();

  // API Configuration
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  // Fetch help requests from API
  const fetchHelpRequests = async (page = 0, filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        skip: page.toString(),
        limit: limit.toString(),
        ...filters,
      });

      const response = await axios.get(`${API_BASE_URL}/help/help-requests`, {
        params,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { data, totalHelpRequests } = response.data;

      if (page === 0) {
        setHelpRequests(data || []);
      } else {
        setHelpRequests((prev) => [...prev, ...(data || [])]);
      }

      setTotalHelpRequests(totalHelpRequests || 0);
      setHasMore((data || []).length === limit);
    } catch (err) {
      console.error("Error fetching help requests:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch help requests");
      if (page === 0) {
        setHelpRequests([]);
        setTotalHelpRequests(0);
      }
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Update help request status
  const updateHelpRequestStatus = async (requestId, newStatus) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/help/get/${requestId}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setHelpRequests((prev) =>
        prev.map((request) =>
          request._id === requestId
            ? {
                ...request,
                status: newStatus,
                updatedAt: new Date().toISOString(),
              }
            : request
        )
      );
      toast.success(`Help request ${newStatus} successfully`);
    } catch (err) {
      console.error("Error updating help request:", err);
      setError(err.response?.data?.message || `Failed to update help request: ${err.message}`);
      toast.error(err.response?.data?.message || "Failed to update help request");
    }
  };

  // Delete help request
  const deleteHelpRequest = async (requestId) => {
    try {
      await axios.delete(`${API_BASE_URL}/help/delete/${requestId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setHelpRequests((prev) => prev.filter((request) => request._id !== requestId));
      setTotalHelpRequests((prev) => prev - 1);
      toast.success("Help request deleted successfully");
    } catch (err) {
      console.error("Error deleting help request:", err);
      setError(err.response?.data?.message || `Failed to delete help request: ${err.message}`);
      toast.error(err.response?.data?.message || "Failed to delete help request");
    }
  };

  // View help request details
  const viewHelpRequest = (request) => {
    setSelectedRequest(request);
    setIsViewModalOpen(true);
  };

  // Edit help request
  const openEditModal = (request) => {
    setSelectedRequest(request);
    setEditForm({
      title: request.title,
      description: request.description,
      message: request.message,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/help/get/${selectedRequest._id}`,
        editForm,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setHelpRequests((prev) =>
        prev.map((request) =>
          request._id === selectedRequest._id
            ? { ...request, ...editForm, updatedAt: new Date().toISOString() }
            : request
        )
      );
      setIsEditModalOpen(false);
      toast.success("Help request updated successfully");
    } catch (err) {
      console.error("Error updating help request:", err);
      setError(err.response?.data?.message || `Failed to update help request: ${err.message}`);
      toast.error(err.response?.data?.message || "Failed to update help request");
    }
  };

  // Initial load
  useEffect(() => {
    const filters = buildFilters();
    fetchHelpRequests(0, filters);
    setCurrentPage(0);
  }, [statusFilter]);

  // Search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filters = buildFilters();
      fetchHelpRequests(0, filters);
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
    if (searchTerm.trim()) {
      filters.search = searchTerm.trim();
    }
    return filters;
  };

  // Load more help requests
  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      const filters = buildFilters();
      fetchHelpRequests(nextPage, filters);
      setCurrentPage(nextPage);
    }
  };

  // Refresh help requests
  const refreshHelpRequests = () => {
    const filters = buildFilters();
    fetchHelpRequests(0, filters);
    setCurrentPage(0);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        icon: Clock,
        class: "bg-amber-100 text-amber-800 border-amber-200",
        dotClass: "bg-amber-500",
      },
      approved: {
        icon: CheckCircle,
        class: "bg-emerald-100 text-emerald-800 border-emerald-200",
        dotClass: "bg-emerald-500",
      },
      rejected: {
        icon: XCircle,
        class: "bg-red-100 text-red-800 border-red-200",
        dotClass: "bg-red-500",
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
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Heart className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Help Requests</h1>
                <p className="text-gray-600">Manage and review community help requests</p>
              </div>
            </div>
            <button
              onClick={refreshHelpRequests}
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
                <p className="text-blue-100 text-sm font-medium">Total Requests</p>
                <p className="text-3xl font-bold">{totalHelpRequests}</p>
              </div>
              <AlertCircle size={32} className="text-blue-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-2xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold">
                  {helpRequests.filter((r) => r.status === "pending").length}
                </p>
              </div>
              <Clock size={32} className="text-amber-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Approved</p>
                <p className="text-3xl font-bold">
                  {helpRequests.filter((r) => r.status === "approved").length}
                </p>
              </div>
              <CheckCircle size={32} className="text-emerald-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-2xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Rejected</p>
                <p className="text-3xl font-bold">
                  {helpRequests.filter((r) => r.status === "rejected").length}
                </p>
              </div>
              <XCircle size={32} className="text-red-200" />
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
                placeholder="Search help requests..."
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
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-40"
              >
                <option value="All">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && helpRequests.length === 0 && (
          <div className="text-center py-12">
            <RefreshCw size={32} className="text-gray-400 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading help requests...</h3>
            <p className="text-gray-500">Please wait while we fetch the latest data.</p>
          </div>
        )}

        {/* Help Request Cards */}
        {helpRequests.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {helpRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                        {request.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <User size={14} />
                          <span>
                            {request.userId?.firstName || "Unknown"} {request.userId?.lastName || "User"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{formatDate(request.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 pb-4">
                  <p className="text-gray-700 mb-3 leading-relaxed">{request.description}</p>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-start space-x-2">
                      <MessageSquare size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">"{request.message}"</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-4">
                    Last updated: {formatDate(request.updatedAt)}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Request ID: #{request._id.slice(-8)}</div>
                    <div className="flex items-center space-x-1">
                      <ActionButton
                        icon={Eye}
                        onClick={() => viewHelpRequest(request)}
                        className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      />
                      {request.status === "pending" && (
                        <>
                          <ActionButton
                            icon={CheckCircle}
                            onClick={() => updateHelpRequestStatus(request._id, "approved")}
                            className="text-gray-600 hover:text-green-600 hover:bg-green-50"
                          />
                          <ActionButton
                            icon={XCircle}
                            onClick={() => updateHelpRequestStatus(request._id, "rejected")}
                            className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                          />
                        </>
                      )}
                      <ActionButton
                        icon={Edit3}
                        onClick={() => openEditModal(request)}
                        className="text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                      />
                      <Menu as="div" className="relative">
                        <Menu.Button as="div">
                          <ActionButton
                            icon={MoreHorizontal}
                            className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                          />
                        </Menu.Button>
                        <Transition
                          as={React.Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => deleteHelpRequest(request._id)}
                                  className={`${
                                    active ? "bg-red-50 text-red-700" : "text-gray-700"
                                  } group flex items-center w-full px-4 py-2 text-sm`}
                                >
                                  <Trash2 size={16} className="mr-2" />
                                  Delete Request
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && helpRequests.length > 0 && (
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
        {!loading && helpRequests.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No help requests found</h3>
            <p className="text-gray-500">No requests match your current search and filter criteria.</p>
          </div>
        )}

        {/* View Modal */}
        {isViewModalOpen && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">{selectedRequest.title}</h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">User</p>
                  <p className="text-gray-700">
                    {selectedRequest.userId?.firstName} {selectedRequest.userId?.lastName}
                  </p>
                  <a
                    href={`mailto:${selectedRequest.userId?.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedRequest.userId?.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-gray-700">{selectedRequest.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Message</p>
                  <p className="text-gray-700">"{selectedRequest.message}"</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  {getStatusBadge(selectedRequest.status)}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="text-gray-700">{formatDate(selectedRequest.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-gray-700">{formatDate(selectedRequest.updatedAt)}</p>
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
        {isEditModalOpen && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Edit Help Request</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Message</label>
                  <textarea
                    value={editForm.message}
                    onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
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

export default HelpRequests;