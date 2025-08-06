"use client"
import React, { useState } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Page() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simple form validation
        if (!formData.name || !formData.email || !formData.message) {
            setResponseMessage("All fields are required.");
            setMessageType("error");
            setIsSubmitting(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setResponseMessage("Please enter a valid email address.");
            setMessageType("error");
            setIsSubmitting(false);
            return;
        }

        // Placeholder for actual submission logic
        setTimeout(() => {
            setIsSubmitting(false);
            setResponseMessage("Thank you for reaching out! We'll get back to you soon.");
            setMessageType("success");
            setFormData({ name: "", email: "", message: "" });
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4">
                <div className="w-full max-w-2xl">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl mb-6 shadow-2xl">
                            <Mail className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent mb-4">
                            Get In Touch
                        </h1>
                        <p className="text-lg text-gray-300 max-w-md mx-auto">
                            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12">
                        {responseMessage && (
                            <div className={`mb-8 p-4 rounded-2xl border transition-all duration-300 ${
                                messageType === 'success' 
                                    ? 'bg-green-500/10 border-green-500/20 text-green-300' 
                                    : 'bg-red-500/10 border-red-500/20 text-red-300'
                            }`}>
                                <div className="flex items-center gap-3">
                                    {messageType === 'success' ? 
                                        <CheckCircle className="w-5 h-5" /> : 
                                        <AlertCircle className="w-5 h-5" />
                                    }
                                    <span className="font-medium">{responseMessage}</span>
                                </div>
                            </div>
                        )}

                        <div className="space-y-8">
                            {/* Name Field */}
                            <div className="group">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-3">
                                    <User className="w-4 h-4 text-purple-400" />
                                    Your Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="group">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-3">
                                    <Mail className="w-4 h-4 text-purple-400" />
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Message Field */}
                            <div className="group">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-3">
                                    <MessageSquare className="w-4 h-4 text-purple-400" />
                                    Your Message
                                </label>
                                <div className="relative">
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={5}
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm resize-none"
                                        placeholder="Tell us how we can help you..."
                                        required
                                    />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`group relative w-full py-4 px-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                                disabled={isSubmitting}
                            >
                                <div className="flex items-center justify-center gap-3">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Sending Message...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </div>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 pt-8 border-t border-white/10 text-center">
                            <p className="text-sm text-gray-400">
                                We typically respond within 24 hours
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}