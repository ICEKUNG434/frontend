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

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: "",
    fullname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    sex: "",
    birthday: "",
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
      router.push("/login");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "กรุณาเลือกคำนำหน้า";
    if (!formData.fullname.trim()) newErrors.fullname = "กรุณากรอกชื่อ";
    if (!formData.lastname.trim()) newErrors.lastname = "กรุณากรอกนามสกุล";
    if (!formData.username.trim()) newErrors.username = "กรุณากรอกชื่อผู้ใช้";
    if (!formData.password) newErrors.password = "กรุณากรอกรหัสผ่าน";
    if (formData.password.length < 6) newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
    if (!formData.address.trim()) newErrors.address = "กรุณากรอกที่อยู่";
    if (!formData.sex) newErrors.sex = "กรุณาเลือกเพศ";
    if (!formData.birthday) newErrors.birthday = "กรุณาเลือกวันเกิด";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      // รวมชื่อนามสกุลส่งไปเป็น fullname (ถ้า API ต้องการ format นี้)
      const full_name_combined = `${formData.fullname} ${formData.lastname}`;

      const response = await fetch(
        "https://backend-peach-kappa-28.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: formData.firstname, // คำนำหน้า
            fullname: full_name_combined,  // ชื่อจริง + นามสกุล
            lastname: formData.lastname,
            username: formData.username,
            password: formData.password,
            address: formData.address,
            sex: formData.sex,
            birthday: formData.birthday,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        showModal(
          "success",
          "Registration Successful",
          "Welcome to ADICHARD. Your account has been created successfully."
        );
        // Reset form
        setFormData({
          firstname: "", fullname: "", lastname: "", username: "",
          password: "", confirmPassword: "", address: "", sex: "", birthday: "",
        });
      } else {
        showModal(
          "error",
          "Registration Failed",
          result.message || "Unable to create account. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showModal(
        "error",
        "Connection Error",
        "Unable to connect to server. Please check your internet connection."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all";
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold tracking-widest text-indigo-300 uppercase mb-6">
            Join Our Community
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tighter">
            Create Account
          </h1>
          <p className="text-xl text-gray-400 font-light">
            Start your journey with ADICHARD today.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className={labelClasses}>คำนำหน้า</label>
              <select
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                className={inputClasses}
              >
                <option value="" className="bg-black text-gray-500">เลือก</option>
                <option value="นาย" className="bg-black">นาย</option>
                <option value="นาง" className="bg-black">นาง</option>
                <option value="นางสาว" className="bg-black">นางสาว</option>
              </select>
              {errors.firstname && <p className={errorClasses}>{errors.firstname}</p>}
            </div>

            <div>
              <label className={labelClasses}>ชื่อจริง</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="ชื่อจริง"
              />
              {errors.fullname && <p className={errorClasses}>{errors.fullname}</p>}
            </div>

            <div>
              <label className={labelClasses}>นามสกุล</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="นามสกุล"
              />
              {errors.lastname && <p className={errorClasses}>{errors.lastname}</p>}
            </div>
          </div>

          <div className="mb-6">
            <label className={labelClasses}>ชื่อผู้ใช้ (Username)</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={inputClasses}
              placeholder="Username สำหรับเข้าสู่ระบบ"
            />
            {errors.username && <p className={errorClasses}>{errors.username}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={labelClasses}>รหัสผ่าน</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="••••••••"
              />
              {errors.password && <p className={errorClasses}>{errors.password}</p>}
            </div>
            <div>
              <label className={labelClasses}>ยืนยันรหัสผ่าน</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className={errorClasses}>{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={labelClasses}>เพศ</label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                className={inputClasses}
              >
                <option value="" className="bg-black text-gray-500">เลือกเพศ</option>
                <option value="ชาย" className="bg-black">ชาย</option>
                <option value="หญิง" className="bg-black">หญิง</option>
              </select>
              {errors.sex && <p className={errorClasses}>{errors.sex}</p>}
            </div>
            <div>
              <label className={labelClasses}>วันเกิด</label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                className={`${inputClasses} [color-scheme:dark]`} // Force dark calendar icon
              />
              {errors.birthday && <p className={errorClasses}>{errors.birthday}</p>}
            </div>
          </div>

          <div className="mb-8">
            <label className={labelClasses}>ที่อยู่</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              className={`${inputClasses} resize-none`}
              placeholder="บ้านเลขที่, ถนน, แขวง/ตำบล..."
            ></textarea>
            {errors.address && <p className={errorClasses}>{errors.address}</p>}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Creating Account...
              </span>
            ) : "Create Account"}
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-400 hover:text-white font-medium transition-colors">
                Log In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}