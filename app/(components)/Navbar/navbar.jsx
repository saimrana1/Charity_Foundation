"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!token);
    setUserData(user);
  }, [pathname]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setShowDropdown(false);
        router.push("/login");
      }
    });
  };

  const protectedRoute = (e, path) => {
    e.preventDefault();
    if (!isLoggedIn) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to access this feature.",
        icon: "info",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      // } else if (!userData?.isVerified && userData?.role !== "admin") {
      //   Swal.fire({
      //     title: "Account Not Verified",
      //     text: "Your account needs to be verified before you can access this feature.",
      //     icon: "warning",
      //     confirmButtonText: "OK",
      //     confirmButtonColor: "#3085d6",
      //   });
    } else {
      router.push(path);
    }
  };
  const isActive = (path) =>
    pathname === path ? "text-blue-600 font-bold underline" : "text-gray-800";

  const getUserInitial = () => {
    if (!userData?.name) return "U";
    const names = userData.name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(
      0
    )}`.toUpperCase();
  };

  return (
    <header>
      <nav className="flex h-auto w-auto bg-white shadow-lg rounded-lg justify-between md:h-16">
        <div className="flex w-full justify-between">
          {/* Logo */}
          <div
            className={`px-6 w-1/2 items-center font-semibold md:w-1/5 md:px-1 md:flex md:items-center md:justify-center transition duration-300 ease-out ${
              open ? "hidden" : "flex"
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
              <div className="flex flex-col items-center justify-center gap-2 py-4">
                <Link
                  href="/"
                  className={isActive("/")}
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/aboutus"
                  className={isActive("/aboutus")}
                  onClick={() => setOpen(false)}
                >
                  About Us
                </Link>
                <a
                  onClick={(e) => {
                    protectedRoute(e, "/help");
                    setOpen(false);
                  }}
                  className={isActive("/help") + " cursor-pointer"}
                >
                  Help
                </a>
                <a
                  onClick={(e) => {
                    protectedRoute(e, "/donateus");
                    setOpen(false);
                  }}
                  className={isActive("/donateus") + " cursor-pointer"}
                >
                  Donate Us
                </a>
                <Link
                  href="/contactus"
                  className={isActive("/contactus")}
                  onClick={() => setOpen(false)}
                >
                  Contact Us
                </Link>
                <Link
                  href="/gallery"
                  className={isActive("/gallery")}
                  onClick={() => setOpen(false)}
                >
                  Our Gallery
                </Link>

                {!isLoggedIn || userData?.role !== "admin" ? (
                  <Link
                    href="/admin/admin-login"
                    className={
                      isActive("/admin/admin-login") +
                      " text-red-600 font-semibold"
                    }
                  >
                    Admin Login
                  </Link>
                ) : null}

                {!isLoggedIn ? (
                  <>
                    <Link
                      href="/login"
                      className={isActive("/login")}
                      onClick={() => setOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className={isActive("/signup")}
                      onClick={() => setOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/profile"
                      className={isActive("/profile")}
                      onClick={() => setOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-red-600 font-semibold"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden w-4/5 items-center justify-evenly font-semibold md:flex">
            <Link href="/" className={isActive("/")}>
              Home
            </Link>
            <Link href="/aboutus" className={isActive("/aboutus")}>
              About Us
            </Link>
            <a
              onClick={(e) => protectedRoute(e, "/help")}
              className={isActive("/help") + " cursor-pointer"}
            >
              Help
            </a>
            <a
              onClick={(e) => protectedRoute(e, "/donateus")}
              className={isActive("/donateus") + " cursor-pointer"}
            >
              Donate Us
            </a>
            <Link href="/contactus" className={isActive("/contactus")}>
              Contact Us
            </Link>
            <Link href="/gallery" className={isActive("/gallery")}>
              Our Gallery
            </Link>

            {/* Admin Login (only show if not already logged in as admin) */}
            {!isLoggedIn || userData?.role !== "admin" ? (
              <Link
                href="/admin/admin-login"
                className={
                  isActive("/admin/admin-login") + " text-red-600 font-semibold"
                }
              >
                Admin Login
              </Link>
            ) : null}

            {!isLoggedIn ? (
              <>
                <Link href="/login" className={isActive("/login")}>
                  Log in
                </Link>
                <Link href="/signup" className={isActive("/signup")}>
                  Sign up
                </Link>
              </>
            ) : (
              <div className="relative ml-4">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  {userData?.profilePicture ? (
                    <Image
                      src={userData.profilePicture}
                      width={40}
                      height={40}
                      alt="User"
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <span className="font-medium text-lg">
                      {getUserInitial()}
                    </span>
                  )}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                    <div className="px-4 py-3 text-sm text-gray-700 border-b">
                      <p className="font-medium truncate">
                        {userData?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {userData?.email || ""}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transition duration-500 ease-in-out ${
                  open ? "opacity-0" : ""
                }`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </header>
  );
}
