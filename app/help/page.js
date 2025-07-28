"use client"
// import React from 'react'
import Image from 'next/image'
import { useState } from 'react';


export default function page() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !category || !message) {
            alert('Please fill out all fields.');
            return;
        }


        setFormSubmitted(true);
        setName('');
        setEmail('');
        setCategory('');
        setMessage('');
    };
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                    <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">How Can We Help You?</h1>
                    <p className="text-center text-gray-600 mb-6">
                        Please fill out the form below and we'll get back to you as soon as possible!
                    </p>

                    {formSubmitted ? (
                        <div className="text-center text-green-600 font-medium">Your message has been submitted successfully. We'll get back to you soon!</div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Your Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Your Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Select Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">-- Select --</option>
                                    <option value="account">Account Issues</option>
                                    <option value="payment">Payment Issues</option>
                                    <option value="technical">Technical Support</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Your Message</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows="4"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="How can we assist you?"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
                            >
                                Submit Request
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <div id='helpUs'>
                <section className="py-16 px-4 bg-white text-center text-[#1a2b49]">
                    <h2 className="text-4xl font-semibold mb-12">Meet Our Volunteer</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        {/* Volunteer 1 */}
                        <div>
                            <div className="relative w-40 h-40 mx-auto mb-4 rounded-full border-[12px] border-[#d9e260] overflow-hidden">
                                <Image
                                    src="/volunteer1.jfif"
                                    alt="Jonathan Patterson"
                                    fill
                                    className="object-cover rounded-full"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Jonathan Patterson</h3>
                            <p className="text-sm px-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam.
                            </p>
                        </div>

                        {/* Volunteer 2 */}
                        <div>
                            <div className="relative w-40 h-40 mx-auto mb-4 rounded-full border-[12px] border-[#8dbbd5] overflow-hidden">
                                <Image
                                    src="/volunteer2.png"
                                    alt="Juliana Silva"
                                    fill
                                    className="object-cover rounded-full"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Juliana Silva</h3>
                            <p className="text-sm px-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam.
                            </p>
                        </div>

                        {/* Volunteer 3 */}
                        <div>
                            <div className="relative w-40 h-40 mx-auto mb-4 rounded-full border-[12px] border-[#d9e260] overflow-hidden">
                                <Image
                                    src="/volunteer3.jfif"
                                    alt="Sebastian Bennett"
                                    fill
                                    className="object-cover rounded-full"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Sebastian Bennett</h3>
                            <p className="text-sm px-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    )
}
