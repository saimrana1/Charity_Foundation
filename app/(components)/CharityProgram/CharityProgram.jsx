import React from 'react'
import Image from 'next/image'

export default function CharityProgram() {
    return (
        <section className="py-16 px-4 bg-white text-[#1a2b49]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                {/* Left Column */}
                <div>
                    <h2 className="text-5xl font-medium leading-tight mb-4">
                        Chaity <br /> Programs
                    </h2>
                    <p className="text-base leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam
                    </p>
                </div>

                {/* Middle Card */}
                <div className="rounded-t-[2rem] overflow-hidden shadow-md">
                    <div className="bg-[#d9e260] p-6">
                        <h3 className="text-lg font-bold mb-2">Programs</h3> <br />
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam
                        </p>
                    </div>
                    <div className="w-full h-60 relative">
                        <Image
                            src="/program1.png"
                            alt="Program 1"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Right Card */}
                <div className="rounded-b-[2rem] overflow-hidden shadow-md">
                    <div className="w-full h-60 relative">
                        <Image
                            src="/program2.png"
                            alt="Program 2"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="bg-[#8dbbd5] p-6">
                        <h3 className="text-lg font-bold mb-2">Programs</h3>
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
