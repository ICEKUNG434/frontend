"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Cards() {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  const cardsData = [
    {
      id: 1,
      category: "Innovation",
      title: "Quantum Processing",
      description: "Revolutionary performance meets incredible efficiency in our latest chip architecture.",
      image: "/cards/1.jpg", // ตรวจสอบ path รูปภาพให้ถูกต้อง
      badge: "New",
      link: "#"
    },
    {
      id: 2,
      category: "Aesthetics",
      title: "Dark Matter Design",
      description: "Every element carefully crafted to deliver beauty through simplicity and precision.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      badge: "Featured",
      link: "#"
    },
    {
      id: 3,
      category: "Sustainability",
      title: "Eco-Future Materials",
      description: "Pioneering eco-friendly materials that don't compromise on quality or durability.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      badge: "Eco",
      link: "#"
    },
    {
      id: 4,
      category: "Ecosystem",
      title: "Neural Integration",
      description: "Effortlessly connect and sync across all your devices for a unified experience.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      badge: "Popular",
      link: "#"
    },
    {
      id: 5,
      category: "Speed",
      title: "Velocity Max",
      description: "Experience unprecedented speed and responsiveness in everything you do.",
      image: "/cards/2.jpg",
      badge: "Pro",
      link: "#"
    },
    {
      id: 6,
      category: "Privacy",
      title: "Void Security",
      description: "Industry-leading security features to keep your data safe and private.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      badge: "Secure",
      link: "#"
    }
  ];

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case "New": return "from-green-400 to-emerald-600 shadow-[0_0_10px_rgba(52,211,153,0.5)]";
      case "Featured": return "from-indigo-400 to-blue-600 shadow-[0_0_10px_rgba(99,102,241,0.5)]";
      case "Eco": return "from-teal-400 to-cyan-600 shadow-[0_0_10px_rgba(45,212,191,0.5)]";
      case "Popular": return "from-orange-400 to-red-600 shadow-[0_0_10px_rgba(251,146,60,0.5)]";
      case "Pro": return "from-purple-400 to-fuchsia-600 shadow-[0_0_10px_rgba(192,132,252,0.5)]";
      case "Secure": return "from-red-400 to-rose-600 shadow-[0_0_10px_rgba(244,63,94,0.5)]";
      default: return "from-gray-400 to-gray-600";
    }
  };

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.dataset.cardId);
            setVisibleCards(prev => [...new Set([...prev, cardId])]);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold tracking-widest text-indigo-300 uppercase mb-6">
            Explore Collection
          </div>
          <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
              Future of Design
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Discover the innovative features and cutting-edge technology that define the <span className="text-white font-medium">ADICHARD</span> experience.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              ref={el => cardRefs.current[index] = el}
              data-card-id={card.id}
              className={`group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-700 transform ${
                visibleCards.includes(card.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Card Image Area */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  style={{ backgroundImage: `url(${card.image})` }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                </div>
                
                {/* Badge (Neon Style) */}
                <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${getBadgeStyle(card.badge)} text-white text-[10px] font-bold uppercase tracking-wider rounded-full`}>
                  {card.badge}
                </div>

                {/* Category Pill */}
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-gray-300 text-xs font-medium rounded-full">
                  {card.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                  {card.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6 font-light">
                  {card.description}
                </p>

                {/* CTA Link */}
                <a 
                  href={card.link}
                  className="inline-flex items-center text-indigo-400 font-semibold text-sm tracking-wide uppercase group/link"
                >
                  Learn More
                  <svg 
                    className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col sm:flex-row gap-6">
            <button className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300 hover:scale-105">
              View All Products
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>

        {/* Stats Section (Dark Mode) */}
        <div className="mt-24 pt-16 border-t border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10M+", label: "Users Worldwide" },
              { number: "99.9%", label: "Uptime Guarantee" },
              { number: "150+", label: "Countries Served" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center group"
              >
                <div className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2 group-hover:to-indigo-400 transition-all duration-500">
                  {stat.number}
                </div>
                <div className="text-gray-500 font-medium tracking-wide uppercase text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}