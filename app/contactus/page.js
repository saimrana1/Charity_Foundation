"use client"
import React, { useState } from 'react';

export default function Page() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

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
            setIsSubmitting(false);
            return;
        }

        // Placeholder for actual submission logic
        // E.g., send a request to an API or service
        setTimeout(() => {
            setIsSubmitting(false);
            setResponseMessage("Thank you for contacting us!");
            setFormData({ name: "", email: "", message: "" });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center py-12">
            <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                    Contact Us
                </h2>

                {responseMessage && (
                    <div className={`mb-4 text-center p-3 rounded-md ${responseMessage.includes('Thank') ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                        {responseMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-800">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out hover:shadow-lg"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-800">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out hover:shadow-lg"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-800">Your Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out hover:shadow-lg"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:bg-indigo-700 hover:scale-105 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
}
