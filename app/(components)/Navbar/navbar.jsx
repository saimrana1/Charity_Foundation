"use client"; // Only needed in Next.js 13+ if used in app directory
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function navbar() {

  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // Get current path

  // Styling helper function
  const isActive = (path) =>
    pathname === path ? "text-blue-600 font-bold underline" : "text-gray-800";

  return (
    <header>
      <nav className="flex h-auto w-auto bg-white shadow-lg rounded-lg justify-between md:h-16">
        <div className="flex w-full justify-between">
          {/* Logo */}
          <div
            className={`px-6 w-1/2 items-center font-semibold md:w-1/5 md:px-1 md:flex md:items-center md:justify-center transition duration-300 ease-out ${open ? "hidden" : "flex"
              }`}
          >
            <Image
              src="/logo.webp"
              className="rounded-full"
              width={40}
              height={40}
              alt="Logo"
            />
            <Link href="/" className="ml-2 font-bold">
              HELP THE NATION
            </Link>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="flex flex-col w-full h-auto md:hidden transition duration-300 ease-in-out">
              <div className="flex flex-col items-center justify-center gap-2">
                <Link href="/" className={isActive("/")}>Home</Link>
                <Link href="/aboutus" className={isActive("/aboutus")}>About Us</Link>
                <Link href="/help" className={isActive("/help")}>Help</Link>
                <Link href="/donateus" className={isActive("/donateus")}>Donate Us</Link>
                <Link href="/contactus" className={isActive("/contactus")}>Contact Us</Link>
                <Link href="/gallery" className={isActive("/gallery")}>Our Gallery</Link>

                <Link href="/login" className={isActive("/login")}>Log in</Link>
                <Link href="/signup" className={isActive("/signup")}>Sign up</Link>
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden w-3/5 items-center justify-evenly font-semibold md:flex">
            <Link href="/" className={isActive("/")}>Home</Link>
            <Link href="/aboutus" className={isActive("/aboutus")}>About Us</Link>
            <Link href="/help" className={isActive("/help")}>Help</Link>
            <Link href="/donateus" className={isActive("/donateus")}>Donate Us</Link>
            <Link href="/contactus" className={isActive("/contactus")}>Contact Us</Link>
            <Link href="/gallery" className={isActive("/gallery")}>Our Gallery</Link>
            <Link href="/login" className={isActive("/login")}>Log in</Link>
            <Link href="/signup" className={isActive("/signup")}>Sign up</Link>
          </div>

          {/* Hamburger */}
          <button
            className="text-gray-500 w-10 h-10 relative focus:outline-none bg-white md:hidden"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${open ? "rotate-45" : "-translate-y-1.5"
                  }`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transition duration-500 ease-in-out ${open ? "opacity-0" : ""
                  }`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${open ? "-rotate-45" : "translate-y-1.5"
                  }`}
              ></span>
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
}
