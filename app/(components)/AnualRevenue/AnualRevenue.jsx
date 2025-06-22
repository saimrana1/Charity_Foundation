import React from 'react'
import Image from 'next/image'

export default function AnualRevenue() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row items-center gap-10">
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                    <Image
                        src="/revenue.png"
                        width={600}
                        height={400}
                        alt="Annual Revenue Chart"
                        className="w-full h-auto object-contain"
                    />
                </div>

                {/* Text Section */}
                <div className="w-full md:w-1/2">
                    {/* Heading with decorative line */}
                    <div className="flex items-center mb-4">

                        <h1 className="text-3xl font-bold text-gray-800">Annual Revenue</h1>
                        <br /><br /><br />
                    </div>

                    {/* Content paragraph */}
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
            </div>
        </div>
    )
}
