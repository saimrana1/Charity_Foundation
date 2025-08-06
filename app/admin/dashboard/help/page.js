"use client"
import React, { useState, useEffect } from 'react';
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
  AlertCircle
} from 'lucide-react';

const HelpRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  // Mock data based on your schema
  const [helpRequests, setHelpRequests] = useState([
    {
      _id: '1',
      userId: { firstName: 'Ahmad', lastName: 'Khan', email: 'ahmad.khan@email.com' },
      title: 'Medical Emergency - Surgery Required',
      description: 'My father needs urgent heart surgery but we cannot afford the medical expenses. Any help would be greatly appreciated.',
      message: 'Please help us in this difficult time. The surgery costs $15,000 and we have already spent our savings on previous treatments.',
      status: 'pending',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    },
    {
      _id: '2',
      userId: { firstName: 'Fatima', lastName: 'Ali', email: 'fatima.ali@email.com' },
      title: 'Education Fund for Orphaned Children',
      description: 'Supporting education for 25 orphaned children in our local community center.',
      message: 'These children have lost their parents and need educational support to build a better future. We need funds for books, uniforms, and school fees.',
      status: 'approved',
      createdAt: '2024-01-14T08:45:00Z',
      updatedAt: '2024-01-16T14:20:00Z'
    },
    {
      _id: '3',
      userId: { firstName: 'Hassan', lastName: 'Ahmed', email: 'hassan.ahmed@email.com' },
      title: 'Flood Relief for Affected Families',
      description: 'Recent floods have destroyed homes and belongings of 50+ families in our village.',
      message: 'We urgently need food, clean water, medicines, and temporary shelter materials for the affected families.',
      status: 'rejected',
      createdAt: '2024-01-13T16:15:00Z',
      updatedAt: '2024-01-17T09:30:00Z'
    },
    {
      _id: '4',
      userId: { firstName: 'Zainab', lastName: 'Shah', email: 'zainab.shah@email.com' },
      title: 'Clean Water Project for Rural Area',
      description: 'Building a water well to provide clean drinking water for 200+ families in remote village.',
      message: 'The nearest water source is 5km away and families, especially women and children, have to walk daily to fetch water.',
      status: 'pending',
      createdAt: '2024-01-12T11:20:00Z',
      updatedAt: '2024-01-12T11:20:00Z'
    },
    {
      _id: '5',
      userId: { firstName: 'Omar', lastName: 'Sheikh', email: 'omar.sheikh@email.com' },
      title: 'Wheelchairs for Disabled Community',
      description: 'Providing wheelchairs and mobility aids for disabled individuals in our community.',
      message: 'Many disabled people in our community cannot afford wheelchairs and mobility aids, limiting their independence and opportunities.',
      status: 'approved',
      createdAt: '2024-01-11T14:35:00Z',
      updatedAt: '2024-01-15T16:45:00Z'
    },
    {
      _id: '6',
      userId: { firstName: 'Aisha', lastName: 'Malik', email: 'aisha.malik@email.com' },
      title: 'Winter Clothing for Homeless',
      description: 'Distributing warm clothing and blankets to homeless people during harsh winter.',
      message: 'With temperatures dropping below freezing, homeless individuals desperately need warm clothing, blankets, and winter essentials.',
      status: 'pending',
      createdAt: '2024-01-10T09:10:00Z',
      updatedAt: '2024-01-10T09:10:00Z'
    }
  ]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        icon: Clock,
        class: 'bg-amber-100 text-amber-800 border-amber-200',
        dotClass: 'bg-amber-500'
      },
      approved: {
        icon: CheckCircle,
        class: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        dotClass: 'bg-emerald-500'
      },
      rejected: {
        icon: XCircle,
        class: 'bg-red-100 text-red-800 border-red-200',
        dotClass: 'bg-red-500'
      }
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
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredRequests = helpRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userId.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userId.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Heart className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Help Requests</h1>
          </div>
          <p className="text-gray-600">Manage and review community help requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Requests</p>
                <p className="text-3xl font-bold">{helpRequests.length}</p>
              </div>
              <AlertCircle size={32} className="text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-2xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold">{helpRequests.filter(r => r.status === 'pending').length}</p>
              </div>
              <Clock size={32} className="text-amber-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Approved</p>
                <p className="text-3xl font-bold">{helpRequests.filter(r => r.status === 'approved').length}</p>
              </div>
              <CheckCircle size={32} className="text-emerald-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-2xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Rejected</p>
                <p className="text-3xl font-bold">{helpRequests.filter(r => r.status === 'rejected').length}</p>
              </div>
              <XCircle size={32} className="text-red-200" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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

        {/* Help Request Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRequests.map((request) => (
            <div key={request._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
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
                        <span>{request.userId.firstName} {request.userId.lastName}</span>
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
                <p className="text-gray-700 mb-3 leading-relaxed">
                  {request.description}
                </p>
                
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex items-start space-x-2">
                    <MessageSquare size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      "{request.message}"
                    </p>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  Last updated: {formatDate(request.updatedAt)}
                </div>
              </div>

              {/* Card Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Request ID: #{request._id.slice(-8)}
                  </div>
                  <div className="flex items-center space-x-1">
                    <ActionButton
                      icon={Eye}
                      onClick={() => console.log('View', request._id)}
                      className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    />
                    {request.status === 'pending' && (
                      <ActionButton
                        icon={CheckCircle}
                        onClick={() => console.log('Approve', request._id)}
                        className="text-gray-600 hover:text-green-600 hover:bg-green-50"
                      />
                    )}
                    <ActionButton
                      icon={Edit3}
                      onClick={() => console.log('Edit', request._id)}
                      className="text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                    />
                    <ActionButton
                      icon={MoreHorizontal}
                      onClick={() => console.log('More', request._id)}
                      className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No help requests found</h3>
            <p className="text-gray-500">No requests match your current search and filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpRequests;