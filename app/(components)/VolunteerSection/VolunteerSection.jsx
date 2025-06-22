import React from 'react'
import Image from 'next/image'

export default function VolunteerSection() {
  return (
     <section className="relative w-full h-[500px]">
      {/* Background Image */}
      <Image
        src="/hands.jpg" // replace this with your actual image path
        alt="Hands with raspberries"
        fill
        className="object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 bg-black/20 text-white">
        {/* Left Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
            Let’s Join <br /> Volunteer <br /> With Us!
          </h2>
        </div>

        {/* Right Contact Info */}
        <div className="md:w-1/3 bg-white bg-opacity-70 text-gray-800 p-6 rounded-lg mt-8 md:mt-0">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="mb-2">+123-456-7890</p>
          <p className="mb-2">hello@reallygreatsite.com</p>
          <p>123 Anywhere St., Any City, ST 12345</p>
        </div>
      </div>
    </section>
  )
}
