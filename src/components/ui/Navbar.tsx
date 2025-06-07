"use client";

import { Button } from "~/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glassmorphism backdrop-blur-xl border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Creative Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 rotate-12 hover:rotate-0">
                <div className="relative">
                  <span className="text-white font-bold text-2xl">🧠</span>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gradient-text leading-none">EmotionAI</span>
              <span className="text-xs text-gray-400 font-medium">Video Intelligence</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
              ✨ Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#use-cases" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
              💼 Use Cases
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
              💰 Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login" passHref>
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                🔑 Login
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg neon-glow transition-all duration-300 transform hover:scale-105">
                ⭐ Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <span className="sr-only">Menu</span>
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-white rounded"></div>
                <div className="w-full h-0.5 bg-white rounded"></div>
                <div className="w-full h-0.5 bg-white rounded"></div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
