"use client"
// import React from 'react'
import React, { useState } from 'react';

export default function page() {
    const [customAmount, setCustomAmount] = useState('');
    const [amount, setAmount] = useState(10);

    const handleAmountChange = (val) => {
        setAmount(val);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e) => {
        setCustomAmount(e.target.value);
        setAmount('');
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">Donate to Us 💖</h1>
              

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Amount</label>
                        <div className="grid grid-cols-3 gap-2">
                            {[5, 10, 20, 50].map((amt) => (
                                <button
                                    key={amt}
                                    type="button"
                                    onClick={() => handleAmountChange(amt)}
                                    className={`py-2 rounded-md border text-sm font-medium ${amount === amt
                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-indigo-50'
                                        }`}
                                >
                                    ${amt}
                                </button>
                            ))}
                            <input
                                type="number"
                                placeholder="Custom"
                                value={customAmount}
                                onChange={handleCustomAmountChange}
                                className="col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                        <select className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            <option>Credit Card</option>
                            <option>PayPal</option>
                            <option>Bank Transfer</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-indigo-600 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-indigo-700 transition duration-300"
                    >
                        Donate {customAmount || amount ? `$${customAmount || amount}` : ''}
                    </button>
                </form>
            </div>
        </div>
    )
}
