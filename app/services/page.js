"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Services() {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

  const servicesData = [
    {
      id: 1,
      category: "Design",
      title: "UI/UX Design",
      description:
        "Creating beautiful, intuitive interfaces that users love. From wireframes to final designs.",
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Visual Design",
      ],
      icon: "🎨",
      price: "Starting at ฿25,000",
      duration: "2-4 weeks",
    },
    {
      id: 2,
      category: "Development",
      title: "Web Development",
      description:
        "Full-stack web applications built with modern technologies and best practices.",
      features: [
        "React/Next.js",
        "Backend APIs",
        "Database Design",
        "Deployment",
      ],
      icon: "💻",
      price: "Starting at ฿50,000",
      duration: "4-8 weeks",
    },
    {
      id: 3,
      category: "Mobile",
      title: "App Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android.",
      features: [
        "iOS Development",
        "Android Development",
        "React Native",
        "App Store Launch",
      ],
      icon: "📱",
      price: "Starting at ฿80,000",
      duration: "6-12 weeks",
    },
    {
      id: 4,
      category: "Strategy",
      title: "Digital Consulting",
      description:
        "Strategic guidance to help your business thrive in the digital landscape.",
      features: [
        "Digital Strategy",
        "Technology Audit",
        "Growth Planning",
        "Team Training",
      ],
      icon: "📊",
      price: "Starting at ฿15,000",
      duration: "1-2 weeks",
    },
    {
      id: 5,
      category: "Maintenance",
      title: "Support & Maintenance",
      description:
        "Ongoing support to keep your digital products running smoothly and securely.",
      features: [
        "Bug Fixes",
        "Security Updates",
        "Performance Optimization",
        "24/7 Support",
      ],
      icon: "🛠️",
      price: "Starting at ฿8,000/month",
      duration: "Ongoing",
    },
    {
      id: 6,
      category: "Analytics",
      title: "Data Analytics",
      description:
        "Transform your data into actionable insights for better business decisions.",
      features: [
        "Data Visualization",
        "Custom Dashboards",
        "Reporting Systems",
        "AI Integration",
      ],
      icon: "📈",
      price: "Starting at ฿35,000",
      duration: "3-6 weeks",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      description:
        "We begin by understanding your goals, challenges, and requirements.",
    },
    {
      step: "02",
      title: "Strategy",
      description:
        "Develop a comprehensive plan tailored to your specific needs.",
    },
    {
      step: "03",
      title: "Design & Build",
      description:
        "Create and develop your solution with attention to every detail.",
    },
    {
      step: "04",
      title: "Launch & Support",
      description:
        "Deploy your project and provide ongoing support for success.",
    },
  ];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = parseInt(entry.target.dataset.sectionId);
            setVisibleSections((prev) => [...new Set([...prev, sectionId])]);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black pt-20 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Hero Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold tracking-widest text-indigo-300 uppercase mb-6">
            Our Services
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-8 tracking-tighter">
            Crafted with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Precision
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
            We deliver exceptional digital experiences through thoughtful
            design, cutting-edge technology, and meticulous attention to detail.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300 hover:scale-105">
              Start Your Project
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight">
              What We Do
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Comprehensive digital solutions tailored to your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => (sectionRefs.current[index] = el)}
                data-section-id={service.id}
                className={`group bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-indigo-500/50 transition-all duration-700 transform ${
                  visibleSections.includes(service.id)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  {service.icon}
                </div>

                <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-4 border border-white/5">
                  {service.category}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-6 font-light text-sm">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3 shadow-[0_0_5px_rgba(168,85,247,0.5)]"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-6 mt-auto">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-semibold text-white">
                      {service.price}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      {service.duration}
                    </span>
                  </div>

                  <button className="w-full px-6 py-3 bg-white/5 hover:bg-indigo-600 border border-white/10 hover:border-transparent text-white rounded-xl font-semibold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-500/20">
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-b from-black to-[#050505] relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold tracking-widest text-pink-300 uppercase mb-6">
              Our Process
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight">
              How We Work
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              A proven methodology that ensures every project delivers
              exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="text-center group relative"
                ref={(el) =>
                  (sectionRefs.current[servicesData.length + index] = el)
                }
                data-section-id={100 + index}
              >
                <div
                  className={`relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 transform transition-all duration-700 bg-gradient-to-br from-gray-800 to-black border border-white/10 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] ${
                    visibleSections.includes(100 + index)
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 group-hover:from-indigo-400 group-hover:to-pink-400">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                  {step.title}
                </h3>

                <p className="text-gray-400 leading-relaxed font-light text-sm">
                  {step.description}
                </p>

                {/* Connecting Line (Desktop) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-white/10 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { number: "200+", label: "Projects Completed" },
              { number: "50+", label: "Happy Clients" },
              { number: "5+", label: "Years Experience" },
              { number: "99%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-3 group-hover:to-indigo-400 transition-all duration-500">
                  {stat.number}
                </div>
                <div className="text-gray-500 font-medium uppercase tracking-wider text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight">
            Ready to Start?
          </h2>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed font-light">
            Let's discuss your project and bring your vision to life. We're here
            to help you succeed.
          </p>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden max-w-2xl mx-auto">
            <div className="p-8 sm:p-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300"
                />
              </div>

              <textarea
                placeholder="Tell us about your project..."
                rows="4"
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 mb-8 resize-none"
              ></textarea>

              <button className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300 transform hover:scale-[1.02]">
                Send Message
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Or reach us directly at{" "}
              <a
                href="mailto:adichardjaisuan@gmail.com"
                className="text-white hover:text-indigo-400 font-medium transition-colors"
              >
                adichardjaisuan@gmail.com
              </a>{" "}
              or{" "}
              <a
                href="tel:0650013977"
                className="text-white hover:text-indigo-400 font-medium transition-colors"
              >
                065-001-3977
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}