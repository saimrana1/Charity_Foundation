"use client";
import React, { useState } from "react";
import axios from "axios";

import {
  Heart,
  MessageCircle,
  User,
  FileText,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Loader2,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function HelpPage() {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    {
      value: "Medical Emergency",
      icon: "🏥",
      description: "Urgent medical assistance needed",
    },
    {
      value: "Education Support",
      icon: "📚",
      description: "Educational funding and resources",
    },
    {
      value: "Food & Shelter",
      icon: "🏠",
      description: "Basic necessities and housing",
    },
    {
      value: "Disaster Relief",
      icon: "🌊",
      description: "Natural disaster assistance",
    },
    {
      value: "Community Development",
      icon: "🤝",
      description: "Infrastructure and community projects",
    },
    { value: "Other", icon: "💭", description: "Other assistance needs" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmitHelp = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/help/create`,
        {
          title: formData.category,
          description: formData.description,
          message: formData.message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Simulate API call for demo
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setFormSubmitted(true);
      setFormData({
        category: "",
        description: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setErrors({
        submit: "Failed to submit help request. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setFormData({
      category: "",
      description: "",
      message: "",
    });
    setErrors({});
  };

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500"></div>

          {/* Success Animation */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="text-white" size={40} />
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mx-auto opacity-20"></div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Request Submitted Successfully! 🎉
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Thank you for reaching out to us. Your help request has been
            received and is now being reviewed by our team.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center justify-center">
              <Clock className="mr-2 text-blue-500" size={20} />
              What happens next?
            </h3>
            <div className="space-y-3 text-sm text-gray-600 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Our team will review your request within 24-48 hours</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>You'll receive an email confirmation with your request ID</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  We'll contact you with updates or if we need more information
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Need urgent assistance?</strong>
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center text-blue-600">
                <Phone size={16} className="mr-1" />
                <span>+92-300-1234567</span>
              </div>
              <div className="flex items-center text-blue-600">
                <Mail size={16} className="mr-1" />
                <span>help@charity.org</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={resetForm}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-2xl">
                <Heart className="text-white" size={32} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">
              How Can We Help You?
            </h1>
            <p className="text-center text-blue-100">
              We're here to support our community. Share your needs with us.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
              <AlertCircle
                className="text-red-500 flex-shrink-0 mt-0.5"
                size={18}
              />
              <p className="text-red-700 text-sm">{errors.submit}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <FileText className="mr-2 text-blue-500" size={18} />
                Select Category *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleInputChange("category", cat.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md ${
                      formData.category === cat.value
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <div className="font-medium text-gray-800">
                          {cat.value}
                        </div>
                        <div className="text-xs text-gray-500">
                          {cat.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {errors.category && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.category}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <User className="mr-2 text-blue-500" size={18} />
                Brief Description *
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                  errors.description ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="e.g., Need financial assistance for medical treatment"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <MessageCircle className="mr-2 text-blue-500" size={18} />
                Detailed Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                rows={5}
                className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 resize-none ${
                  errors.message ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Please provide detailed information about your situation, how we can help, and any specific requirements..."
              />
              <div className="flex justify-between items-center mt-2">
                {errors.message ? (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.message}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Minimum 20 characters required
                  </p>
                )}
                <span className="text-sm text-gray-400">
                  {formData.message.length}/500
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitHelp}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-100 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Submitting Request...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Send className="mr-2" size={20} />
                  Submit Help Request
                  <ArrowRight className="ml-2" size={20} />
                </span>
              )}
            </button>
          </div>

          {/* Footer Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 text-center">
              🔒 Your information is secure and will only be used to process
              your help request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
