"use client";

import React, { useState, useEffect, useRef } from "react";

// Modal Component (Dark Theme)
const Modal = ({ isOpen, onClose, type, title, message }) => {
  if (!isOpen) return null;

  const getModalStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: "✅",
          bgColor: "bg-green-900/30",
          borderColor: "border-green-500/30",
          iconColor: "text-green-400",
          titleColor: "text-green-300",
        };
      case "error":
        return {
          icon: "❌",
          bgColor: "bg-red-900/30",
          borderColor: "border-red-500/30",
          iconColor: "text-red-400",
          titleColor: "text-red-300",
        };
      default:
        return {
          icon: "ℹ️",
          bgColor: "bg-indigo-900/30",
          borderColor: "border-indigo-500/30",
          iconColor: "text-indigo-400",
          titleColor: "text-indigo-300",
        };
    }
  };

  const styles = getModalStyles();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        
        <div className={`p-6 rounded-t-2xl ${styles.bgColor} ${styles.borderColor} border-b`}>
          <div className="flex items-center space-x-3">
            <div className={`text-2xl ${styles.iconColor}`}>{styles.icon}</div>
            <h3 className={`text-lg font-bold ${styles.titleColor}`}>
              {title}
            </h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            {message}
          </p>

          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:scale-[1.02]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Contact() {
  const [visibleSections, setVisibleSections] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRefs = useRef([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const [modal, setModal] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  const showModal = (type, title, message) => {
    setModal({ isOpen: true, type, title, message });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const contactMethods = [
    {
      id: 1,
      title: "Email Us",
      description: "Send us an email anytime",
      value: "adichardjaisuan@gmail.com",
      icon: "✉️",
      link: "mailto:adichardjaisuan@gmail.com",
    },
    {
      id: 2,
      title: "Call Us",
      description: "Mon-Fri 9AM-6PM (GMT+7)",
      value: "+66 65 001 3977",
      icon: "📞",
      link: "tel:+66650013977",
    },
    {
      id: 3,
      title: "Visit Us",
      description: "Come say hello",
      value: "Chiang Mai, Thailand",
      icon: "📍",
      link: "#",
    },
    {
      id: 4,
      title: "Live Chat",
      description: "Chat with our team",
      value: "Available 24/7",
      icon: "💬",
      link: "#",
    },
  ];

  const serviceOptions = [
    "UI/UX Design",
    "Web Development",
    "App Development",
    "Digital Consulting",
    "Support & Maintenance",
    "Data Analytics",
    "Other",
  ];

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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showModal("success", "Message Sent!", "Thank you for reaching out. We will get back to you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" });
    } catch (error) {
      showModal("error", "Error", "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20 relative overflow-hidden">
      <Modal {...modal} onClose={closeModal} />

      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Hero Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold tracking-widest text-indigo-300 uppercase mb-6">
            Get In Touch
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-8 tracking-tighter">
            Let's Talk <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              About Your Project
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
            Ready to bring your ideas to life? We're here to help you create something amazing.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={method.id}
                href={method.link}
                ref={(el) => (sectionRefs.current[index] = el)}
                data-section-id={method.id}
                className={`block bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-700 transform group ${
                  visibleSections.includes(method.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{method.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{method.description}</p>
                <p className="text-indigo-300 font-semibold group-hover:text-indigo-200 transition-colors">{method.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10">
            <div className="p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Send Us a Message</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all ${errors.name ? "border-red-500/50" : "border-white/10 focus:border-indigo-500"}`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all ${errors.email ? "border-red-500/50" : "border-white/10 focus:border-indigo-500"}`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="08X-XXX-XXXX"
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company Name"
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-300 mb-2">Service</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-all"
                >
                  <option value="" className="bg-black text-gray-500">Select a service</option>
                  {serviceOptions.map((service, index) => (
                    <option key={index} value={service} className="bg-black text-white">{service}</option>
                  ))}
                </select>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-300 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project..."
                  rows="5"
                  className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none resize-none transition-all ${errors.message ? "border-red-500/50" : "border-white/10 focus:border-indigo-500"}`}
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Sending...
                  </span>
                ) : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative z-10 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">FAQ</h2>
            <p className="text-xl text-gray-400">Common questions answered.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "How long does a project take?", a: "Timelines vary by scope. Simple sites take 2-4 weeks, complex apps 3-6 months." },
              { q: "Do you provide support?", a: "Yes, we offer ongoing maintenance packages including updates and security fixes." },
              { q: "Can you work with existing teams?", a: "Absolutely. We seamlessly integrate with in-house teams and workflows." },
            ].map((faq, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}