"use client";
import React, { useState, useEffect } from "react";
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
} from "lucide-react";

const Donations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  // Mock data based on your schema
  const [donations, setDonations] = useState([
    {
      _id: "1",
      userId: {
        firstName: "Ahmad",
        lastName: "Khan",
        email: "ahmad.khan@email.com",
      },
      amount: 5000,
      method: "card",
      message:
        "May Allah bless this cause. Happy to help for medical emergency.",
      status: "completed",
      createdAt: "2024-01-16T14:30:00Z",
      updatedAt: "2024-01-16T14:35:00Z",
    },
    {
      _id: "2",
      userId: {
        firstName: "Fatima",
        lastName: "Ali",
        email: "fatima.ali@email.com",
      },
      amount: 2500,
      method: "cash",
      message:
        "For the education of orphaned children. Every child deserves education.",
      status: "pending",
      createdAt: "2024-01-16T10:15:00Z",
      updatedAt: "2024-01-16T10:15:00Z",
    },
    {
      _id: "3",
      userId: {
        firstName: "Hassan",
        lastName: "Ahmed",
        email: "hassan.ahmed@email.com",
      },
      amount: 10000,
      method: "card",
      message:
        "Donation for flood relief. Hope this helps the affected families.",
      status: "completed",
      createdAt: "2024-01-15T16:45:00Z",
      updatedAt: "2024-01-15T16:50:00Z",
    },
    {
      _id: "4",
      userId: {
        firstName: "Zainab",
        lastName: "Shah",
        email: "zainab.shah@email.com",
      },
      amount: 7500,
      method: "card",
      message:
        "Contributing to the water well project. Clean water is a basic right.",
      status: "completed",
      createdAt: "2024-01-15T11:20:00Z",
      updatedAt: "2024-01-15T11:25:00Z",
    },
    {
      _id: "5",
      userId: {
        firstName: "Omar",
        lastName: "Sheikh",
        email: "omar.sheikh@email.com",
      },
      amount: 3000,
      method: "cash",
      message:
        "For wheelchairs and mobility aids. Supporting our disabled community.",
      status: "pending",
      createdAt: "2024-01-14T14:35:00Z",
      updatedAt: "2024-01-14T14:35:00Z",
    },
    {
      _id: "6",
      userId: {
        firstName: "Aisha",
        lastName: "Malik",
        email: "aisha.malik@email.com",
      },
      amount: 1500,
      method: "card",
      message:
        "Winter clothing for homeless. Small contribution with big heart.",
      status: "completed",
      createdAt: "2024-01-14T09:10:00Z",
      updatedAt: "2024-01-14T09:15:00Z",
    },
    {
      _id: "7",
      userId: {
        firstName: "Ali",
        lastName: "Raza",
        email: "ali.raza@email.com",
      },
      amount: 12000,
      method: "card",
      message:
        "Anonymous donation for general charity work. Keep up the good work!",
      status: "completed",
      createdAt: "2024-01-13T18:20:00Z",
      updatedAt: "2024-01-13T18:25:00Z",
    },
    {
      _id: "8",
      userId: {
        firstName: "Sara",
        lastName: "Qureshi",
        email: "sara.qureshi@email.com",
      },
      amount: 4500,
      method: "cash",
      message:
        "Donation in memory of my late grandmother. May her soul rest in peace.",
      status: "pending",
      createdAt: "2024-01-13T12:40:00Z",
      updatedAt: "2024-01-13T12:40:00Z",
    },
  ]);

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
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.class}`}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${config.dotClass}`}
        ></div>
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

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.userId.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      donation.userId.lastName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      donation.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || donation.status === statusFilter;
    const matchesMethod =
      methodFilter === "All" || donation.method === methodFilter;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalDonations = donations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );
  const completedDonations = donations
    .filter((d) => d.status === "completed")
    .reduce((sum, donation) => sum + donation.amount, 0);
  const pendingDonations = donations
    .filter((d) => d.status === "pending")
    .reduce((sum, donation) => sum + donation.amount, 0);

  const ActionButton = ({ icon: Icon, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${className}`}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <DollarSign className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Donations</h1>
          </div>
          <p className="text-gray-600">
            Track and manage donation transactions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Total Donations
                </p>
                <p className="text-2xl font-bold">
                  {formatAmount(totalDonations)}
                </p>
              </div>
              <TrendingUp size={32} className="text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">
                  Completed
                </p>
                <p className="text-2xl font-bold">
                  {formatAmount(completedDonations)}
                </p>
              </div>
              <CheckCircle size={32} className="text-emerald-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-2xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold">
                  {formatAmount(pendingDonations)}
                </p>
              </div>
              <Clock size={32} className="text-amber-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-2xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">
                  Total Count
                </p>
                <p className="text-2xl font-bold">{donations.length}</p>
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

        {/* Donation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDonations.map((donation) => (
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
                          {donation.userId.firstName} {donation.userId.lastName}
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
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex items-start space-x-2">
                    <MessageSquare
                      size={16}
                      className="text-gray-400 mt-1 flex-shrink-0"
                    />
                    <p className="text-sm text-gray-700 leading-relaxed">
                      "{donation.message}"
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Payment Method:</span>
                    <div className="mt-1">
                      {getMethodBadge(donation.method)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Contact:</span>
                    <div className="mt-1 text-blue-600 hover:text-blue-800">
                      <a
                        href={`mailto:${donation.userId.email}`}
                        className="text-xs"
                      >
                        {donation.userId.email}
                      </a>
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
                  <div className="text-sm text-gray-500">
                    Transaction ID: #{donation._id.slice(-8)}
                  </div>
                  <div className="flex items-center space-x-1">
                    <ActionButton
                      icon={Eye}
                      onClick={() => console.log("View", donation._id)}
                      className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    />
                    {donation.status === "pending" && (
                      <ActionButton
                        icon={CheckCircle}
                        onClick={() => console.log("Complete", donation._id)}
                        className="text-gray-600 hover:text-green-600 hover:bg-green-50"
                      />
                    )}
                    <ActionButton
                      icon={Edit3}
                      onClick={() => console.log("Edit", donation._id)}
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

        {/* Empty State */}
        {filteredDonations.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No donations found
            </h3>
            <p className="text-gray-500">
              No donations match your current search and filter criteria.
            </p>
          </div>
        )}

        {/* Summary Section */}
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
                {formatAmount(totalDonations / donations.length)}
              </div>
              <div className="text-sm text-gray-600">Average Donation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;
