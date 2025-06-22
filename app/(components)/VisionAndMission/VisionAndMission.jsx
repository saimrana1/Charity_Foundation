import React from "react"
import Image from "next/image";

export default function VisionAndMission() {
  return (
    <div>
      <section className="px-4 py-12 bg-white text-[#1a2b49]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Vision */}
          <div className="text-center md:text-left">
            <div className="bg-[#d9e260] text-4xl font-medium inline-block px-10 py-4 rounded-full mb-6">
              Vision
            </div>
            <p className="text-lg leading-relaxed tracking-wide">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* Mission */}
          <div className="text-center md:text-left">
            <div className="bg-[#8dbbd5] text-4xl font-medium inline-block px-10 py-4 rounded-full mb-6">
              Mission
            </div>
            <p className="text-lg leading-relaxed tracking-wide">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </div>

        </div>
      </section>

      <div className="w-full">
        <Image
          className="w-full object-cover object-center border-8"
          alt="hero"
          src="/visionAndMission.png"
          width={1920}
          height={500}
        />
      </div>
    </div>
  );
}
