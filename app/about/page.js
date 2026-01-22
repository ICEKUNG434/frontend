"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

  // Personal Info
  const personalInfo = {
    name: "Adichard Jaisuan",
    nickname: "Adichard",
    role: "Web Developer & UI/UX Enthusiast",
    studentId: "683190100029",
    email: "adichardjaisuan@gmail.com",
    phone: "065-001-3977",
    image: "/adicard.jpg", // ตรวจสอบว่ามีไฟล์รูปนี้ใน public folder หรือเปลี่ยนเป็น path ที่ถูกต้อง
  };

  // Education data
  const education = [
    {
      id: 1,
      degree: "Information Technology",
      institution: "Chiang Mai Technical College",
      year: "Present",
      description: "Focusing on Full-stack Web Development, Network Systems, and Modern UI/UX Design.",
      icon: "🎓",
    },
  ];

  // Skills data
  const skills = [
    { name: "React & Next.js", level: 95, color: "from-blue-400 to-blue-600" },
    { name: "Node.js", level: 90, color: "from-green-400 to-green-600" },
    { name: "UI/UX Design", level: 85, color: "from-purple-400 to-purple-600" },
    { name: "TypeScript", level: 88, color: "from-indigo-400 to-indigo-600" },
    { name: "Database Design", level: 82, color: "from-orange-400 to-orange-600" },
    { name: "Mobile Development", level: 75, color: "from-pink-400 to-pink-600" },
  ];

  // Stats data
  const stats = [
    { number: "2+", label: "Projects Completed", icon: "🚀" },
    { number: "3+", label: "Years Experience", icon: "⚡" },
    { number: "20+", label: "Happy Clients", icon: "😊" },
    { number: "5", label: "Tech Mastered", icon: "💻" },
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
        rootMargin: "0px 0px -50px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black pt-20 relative overflow-hidden text-white">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Hero Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left side - Text */}
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-6">
                About Me
              </div>
              <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tight">
                Hello, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                  I'm {personalInfo.nickname}
                </span>
              </h1>
              <h2 className="text-2xl text-indigo-300 font-medium mb-6">
                {personalInfo.role}
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed mb-8 font-light">
                Passionate about creating digital experiences that are both beautiful and functional. 
                Based in Chiang Mai, specialized in building modern web applications with a focus on design and performance.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8 font-mono">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Student ID: {personalInfo.studentId}
                </div>
                <span className="hidden sm:inline">|</span>
                <div>{personalInfo.email}</div>
                <span className="hidden sm:inline">|</span>
                <div>{personalInfo.phone}</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300 transform hover:scale-[1.02] text-center"
                >
                  Get In Touch
                </Link>
                <Link
                  href="#education"
                  className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-center"
                >
                  My Journey
                </Link>
              </div>
            </div>

            {/* Right side - Photo */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                {/* Glow Ring */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] rotate-6 opacity-50 blur-lg"></div>
                
                {/* Image Container */}
                <div className="relative w-full h-full bg-[#111] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
                  <Image
                    src={personalInfo.image}
                    alt="Profile"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center shadow-lg animate-bounce delay-1000">
                    <span className="text-3xl">💻</span>
                </div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg animate-bounce delay-700">
                    <span className="text-2xl">🎨</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
                data-section-id={index + 1}
                className={`text-center transform transition-all duration-1000 ${
                  visibleSections.includes(index + 1)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4 filter drop-shadow-lg">{stat.icon}</div>
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-2">
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

      {/* Education Section */}
      <section id="education" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight">
              Education
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              My academic journey and technical foundation.
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                ref={(el) => (sectionRefs.current[index + 10] = el)}
                data-section-id={edu.id + 10}
                className={`bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-indigo-500/50 transition-all duration-700 transform ${
                  visibleSections.includes(edu.id + 10)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="p-4 bg-white/5 rounded-2xl text-4xl border border-white/5">
                    {edu.icon}
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-2xl font-bold text-white mb-2 md:mb-0">
                        {edu.degree}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                        {edu.year}
                      </span>
                    </div>

                    <h4 className="text-lg text-gray-300 mb-4 font-medium">
                      {edu.institution}
                    </h4>

                    <p className="text-gray-400 leading-relaxed font-light">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-gradient-to-b from-black to-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight">
              Skills & Expertise
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Technologies and tools I use to bring ideas to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto">
            {skills.map((skill, index) => (
              <div
                key={index}
                ref={(el) => (sectionRefs.current[index + 20] = el)}
                data-section-id={index + 20}
                className={`bg-white/5 rounded-2xl p-6 border border-white/5 transform transition-all duration-700 hover:bg-white/10 ${
                  visibleSections.includes(index + 20)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    {skill.name}
                  </h3>
                  <span className="text-sm font-mono text-gray-400">
                    {skill.level}%
                  </span>
                </div>

                <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden border border-white/5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-1000 ease-out`}
                    style={{
                      width: visibleSections.includes(index + 20)
                        ? `${skill.level}%`
                        : "0%",
                      transitionDelay: `${index * 200 + 500}ms`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 sm:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
            
            {/* Quote Icon Background */}
            <div className="absolute top-4 left-8 text-8xl text-white/5 font-serif">"</div>

            <blockquote className="text-2xl sm:text-3xl font-light text-white italic mb-8 relative z-10">
              "Good design is not just about making things look good. It's about solving problems and creating meaningful experiences."
            </blockquote>

            <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full mb-8"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { title: "User-Centered", icon: "👥", desc: "Focus on the user first." },
                { title: "Clean Code", icon: "💻", desc: "Maintainable & efficient." },
                { title: "Innovation", icon: "💡", desc: "Always learning & evolving." },
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-8 tracking-tight">
          Let's Build Something Amazing
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href={`mailto:${personalInfo.email}`} className="text-gray-400 hover:text-white transition-colors border-b border-gray-600 hover:border-white pb-1">
                {personalInfo.email}
            </a>
            <span className="hidden sm:inline text-gray-600">•</span>
            <a href={`tel:${personalInfo.phone}`} className="text-gray-400 hover:text-white transition-colors border-b border-gray-600 hover:border-white pb-1">
                {personalInfo.phone}
            </a>
        </div>
      </section>

    </div>
  );
}