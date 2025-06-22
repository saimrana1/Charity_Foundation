import React from 'react'
import Image from 'next/image'

export default function GlobalCommunity() {
    return (
        <section className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 py-12 bg-white">
            {/* Left content */}
            <div className="lg:w-1/2 mb-10 lg:mb-0">
                <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 leading-tight mb-6">
                    Find Our Global <br /> Community
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                </p>
                <button className="flex items-center gap-2 bg-lime-300 text-black font-medium px-6 py-3 rounded-full hover:bg-lime-400 transition">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                    GINYARD COMMUNITY
                </button>
            </div>

            {/* Right image */}
            <div className="lg:w-1/2 flex justify-center">
                <Image
                    src="/map.png" // replace with your actual image path
                    alt="World Map"
                    width={500}
                    height={300}
                    className="w-full max-w-xl h-auto"
                />
            </div>
        </section>
    )
}
