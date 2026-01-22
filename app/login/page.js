"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

        <div
          className={`p-6 rounded-t-2xl ${styles.bgColor} ${styles.borderColor} border-b`}
        >
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

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (modal.type === "success") {
      window.location.href = "/admin/users"; // Redirect to dashboard/admin page
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin/users");
    }
  }, [router]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault(); // Prevent form submission if triggered by form
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://backend-peach-kappa-28.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        if (result.token) {
          localStorage.setItem("token", result.token);
          showModal(
            "success",
            "Login Successful",
            "Welcome back! Redirecting you to the dashboard...",
          );
        } else {
          showModal("error", "Login Failed", "No token received from server.");
        }
      } else {
        showModal(
          "error",
          "Login Failed",
          result.message || "Invalid username or password. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showModal(
        "error",
        "Connection Error",
        "Unable to connect to server. Please check your internet connection.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const inputClasses =
    "w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all";
  const labelClasses = "block text-sm font-semibold text-gray-300 mb-2";
  const errorClasses = "mt-1 text-xs text-red-400";

  return (
    <div className="min-h-screen bg-black pt-20 relative overflow-hidden">
      <Modal {...modal} onClose={closeModal} />

      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold tracking-widest text-indigo-300 uppercase mb-6">
            Welcome Back
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tighter">
            Login
          </h1>
          <p className="text-xl text-gray-400 font-light">
            Access your dashboard and manage your account.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className={labelClasses}>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className={inputClasses}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className={errorClasses}>{errors.username}</p>
              )}
            </div>

            <div>
              <label className={labelClasses}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className={inputClasses}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className={errorClasses}>{errors.password}</p>
              )}
            </div>

            <div className="text-right">
              <a
                href="#"
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>

            <div className="mt-6 text-center pt-6 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-indigo-400 hover:text-white font-medium transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
