import React from 'react'
import Image from 'next/image'

export default function Volunteer() {
    return (
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
    )
}
