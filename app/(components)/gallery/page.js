"use client";
import Image from "next/image";

const images = [
  "/gallery1.jpg",
  "/gallery2.webp",
  "/gallery3.webp",
  "/gallery4.webp",
  "/gallery5.webp",
  "/gallery6.webp",
];

export default function GalleryPage() {
  return (
    <section className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Our Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-full h-64 overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
