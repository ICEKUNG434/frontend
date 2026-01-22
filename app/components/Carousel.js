"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "Visionary Innovation",
      subtitle: "The Future is Now",
      description:
        "Step into a world where technology meets art. Discover the ADICHARD collection designed for the modern visionary.",
      image: "/carousel/1.jpg",
      buttonText: "Discover More",
      link: "/collection",
    },
    {
      id: 2,
      title: "Timeless Aesthetics",
      subtitle: "Crafted for Elegance",
      description:
        "Every curve, every line, meticulous engineering combined with breathtaking design to elevate your lifestyle.",
      image: "/carousel/2.jpg",
      buttonText: "View Gallery",
      link: "/gallery",
    },
    {
      id: 3,
      title: "Beyond Boundaries",
      subtitle: "Unlimit Your Potential",
      description:
        "Break free from the ordinary. Experience performance and style that refuses to compromise.",
      image: "/carousel/3.jpg",
      buttonText: "Join the Movement",
      link: "/register",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 4000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 4000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 4000);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative flex-shrink-0 w-full h-full">
            {/* Background Image with Gradient Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Modern Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30"></div>
              {/* Accent Gradient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-purple-900/20 mix-blend-overlay"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 sm:px-8 text-center pt-20">
              <div className="max-w-5xl mx-auto">
                {/* Subtitle with Pill Shape */}
                <div
                  className={`inline-block mb-6 transition-all duration-1000 delay-300 ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-semibold tracking-widest uppercase text-indigo-300">
                    {slide.subtitle}
                  </span>
                </div>

                {/* Title with Gradient Text */}
                <h1
                  className={`text-5xl sm:text-7xl lg:text-8xl font-black mb-6 tracking-tighter transition-all duration-1000 delay-500 ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-12 scale-95"
                  }`}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                    {slide.title}
                  </span>
                </h1>

                {/* Description */}
                <p
                  className={`text-gray-300 text-lg sm:text-xl lg:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-700 ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {slide.description}
                </p>

                {/* CTA Button */}
                <div
                  className={`transition-all duration-1000 delay-1000 ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <Link href={slide.link || "#"}>
                    <button className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-bold text-lg text-white shadow-lg shadow-indigo-500/30 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50">
                      <span className="relative z-10 flex items-center gap-2">
                        {slide.buttonText}
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      </span>
                      {/* Button Hover Shine */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows (Glassmorphism) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-md group"
      >
        <svg
          className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-md group"
      >
        <svg
          className="w-6 h-6 group-hover:translate-x-0.5 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? "w-8 bg-gradient-to-r from-indigo-500 to-purple-500"
                : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Bottom Progress Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-linear shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Status Indicator */}
      <div className="absolute top-24 right-8 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/5">
        <div
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            isAutoPlay ? "bg-green-400 shadow-[0_0_5px_rgba(74,222,128,0.8)]" : "bg-red-400"
          }`}
        />
        <span className="text-white/60 text-[10px] font-medium tracking-wider uppercase">
          {isAutoPlay ? "Live" : "Paused"}
        </span>
      </div>
    </div>
  );
}