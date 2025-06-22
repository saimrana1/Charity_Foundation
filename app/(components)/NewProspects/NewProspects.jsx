import React from 'react'
import Image from 'next/image'

export default function NewProspects() {
    return (
        <section className="px-8 py-12 bg-white">
            <section className="flex flex-col lg:flex-row items-start px-6 py-10 max-w-7xl mx-auto gap-10">
                {/* Left Title */}
                <div className="text-5xl font-light text-[#1C2A4E] leading-tight">
                    <div>New</div>
                    <div className="font-medium">Prospects</div>
                </div>

                {/* Right Image + Text Section */}
                <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto p-4 gap-0">
                    <div className="w-full md:w-1/2">
                        <Image
                            src="/teamImage.png"
                            alt="Team"
                            width={800}
                            height={500}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    <div className="w-full md:w-1/2 bg-lime-200 p-6 md:p-10  flex items-center">
                        <p className="text-gray-800 text-lg leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam.
                        </p>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {Array(3).fill(0).map((_, index) => (
                    <div key={index} className="text-center">
                        <div className="mx-auto mb-4 w-8 h-8 border-2 border-lime-400 rounded-full" />
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">Prospects 01</h3>
                        <p className="text-sm text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam.
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
