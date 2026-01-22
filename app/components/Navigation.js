"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    
    checkAuthStatus();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    closeMobileMenu();
    router.push("/");
  };

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" }, // เปลี่ยนชื่อเมนูให้ดูเข้ากับชื่อแบรนด์
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo: ADICHARD (Gradient Text) */}
          <div className="flex-shrink-0 group cursor-pointer">
            <Link href="/" className="flex items-center gap-2">
                {/* Logo Icon (Abstract) */}
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 group-hover:from-indigo-400 group-hover:to-pink-400 transition-all duration-500">
                ADICHARD
                </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 group overflow-hidden"
              >
                <span className="relative z-10">{item.name}</span>
                {/* Hover Background Effect */}
                <span className="absolute inset-0 bg-white/10 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center"></span>
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="text-gray-400 hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>

            {/* Shopping Bag (Modern Style) */}
            <button className="relative text-gray-400 hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10H6L5 9z" /></svg>
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-[10px] text-white flex items-center justify-center rounded-full font-bold shadow-lg shadow-indigo-500/50">
                2
              </span>
            </button>

            <div className="h-6 w-[1px] bg-white/20 hidden md:block"></div>

            {/* Login / Register Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-sm font-bold text-white bg-white/10 hover:bg-red-500/80 border border-white/10 hover:border-red-500 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-bold text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Join Us
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            >
              <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                <span className={`block h-0.5 w-full bg-current transform transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
                <span className={`block h-0.5 w-full bg-current transform transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay (Glassmorphism) */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-xl transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ top: "0", paddingTop: "80px" }}
      >
        <div className="flex flex-col items-center justify-center space-y-6 h-full pb-20">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMobileMenu}
              className="text-2xl font-bold text-gray-300 hover:text-white hover:tracking-widest transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
          
          <div className="w-12 h-[1px] bg-white/20 my-4"></div>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-xl font-bold text-red-500 hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col items-center gap-4 w-full px-10">
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="w-full py-3 text-center text-lg font-bold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all"
              >
                Log In
              </Link>
              <Link
                href="/register"
                onClick={closeMobileMenu}
                className="w-full py-3 text-center text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg"
              >
                Join Adichard
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}