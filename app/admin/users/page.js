"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// --- Components (Dark Theme) ---

const Modal = ({ isOpen, onClose, type, title, message }) => {
  if (!isOpen) return null;

  const getModalStyles = () => {
    switch (type) {
      case "success":
        return { icon: "✅", color: "text-green-400", titleColor: "text-green-300" };
      case "error":
        return { icon: "❌", color: "text-red-400", titleColor: "text-red-300" };
      default:
        return { icon: "ℹ️", color: "text-indigo-400", titleColor: "text-indigo-300" };
    }
  };

  const styles = getModalStyles();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className={`text-2xl ${styles.color}`}>{styles.icon}</div>
            <h3 className={`text-lg font-bold ${styles.titleColor}`}>{title}</h3>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-300 text-sm leading-relaxed mb-6">{message}</p>
          <button onClick={onClose} className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">⚠️</div>
            <h3 className="text-lg font-bold text-red-400">{title}</h3>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-300 text-sm leading-relaxed mb-6">{message}</p>
          <div className="flex space-x-3">
            <button onClick={onClose} className="flex-1 px-4 py-3 bg-transparent border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all">Cancel</button>
            <button onClick={onConfirm} className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-900/20">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditModal = ({ isOpen, onClose, onSave, user }) => {
  const [formData, setFormData] = useState({
    id: "", firstname: "", fullname: "", lastname: "", username: "",
    password: "", address: "", sex: "", birthday: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      let formattedBirthday = "";
      if (user.birthday) {
        try { formattedBirthday = new Date(user.birthday).toISOString().split("T")[0]; } 
        catch (e) { formattedBirthday = ""; }
      }
      setFormData({
        id: user.id, firstname: user.firstname, fullname: user.fullname, lastname: user.lastname,
        username: user.username, password: "", address: user.address, sex: user.sex, birthday: formattedBirthday,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
  };

  if (!isOpen) return null;

  const inputClass = "w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all";
  const labelClass = "block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider";

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">✏️ Edit User</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">✕</button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className={labelClass}>Title</label>
              <select name="firstname" value={formData.firstname} onChange={handleInputChange} className={inputClass}>
                <option value="" className="bg-black">Select</option>
                <option value="นาย" className="bg-black">นาย</option>
                <option value="นาง" className="bg-black">นาง</option>
                <option value="นางสาว" className="bg-black">นางสาว</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>First Name</label>
              <input type="text" name="fullname" value={formData.fullname} onChange={handleInputChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
             <div>
                <label className={labelClass}>Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleInputChange} className={inputClass} />
             </div>
             <div>
                <label className={labelClass}>New Password (Optional)</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} className={inputClass} placeholder="Change password..." />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Gender</label>
              <select name="sex" value={formData.sex} onChange={handleInputChange} className={inputClass}>
                <option value="" className="bg-black">Select</option>
                <option value="ชาย" className="bg-black">ชาย</option>
                <option value="หญิง" className="bg-black">หญิง</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Birthday</label>
              <input type="date" name="birthday" value={formData.birthday} onChange={handleInputChange} className={`${inputClass} [color-scheme:dark]`} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Address</label>
            <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3" className={`${inputClass} resize-none`} />
          </div>

          <div className="flex space-x-3 pt-4 border-t border-white/10">
            <button onClick={onClose} className="flex-1 px-4 py-3 bg-transparent border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all font-semibold">Cancel</button>
            <button onClick={handleSave} disabled={isSaving} className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/20 transition-all disabled:opacity-50">
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

export default function Users() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ isOpen: false, type: "info", title: "", message: "" });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, userId: null, username: "" });
  const [editModal, setEditModal] = useState({ isOpen: false, user: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else fetchUsers();
  }, []);

  const showModal = (type, title, message) => setModal({ isOpen: true, type, title, message });
  const closeModal = () => setModal({ ...modal, isOpen: false });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      // ✅ ใช้ API เดียวกับ Login/Register
      const response = await fetch("https://backend024-seven.vercel.app/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        showModal("error", "Error", "Failed to fetch users.");
      }
    } catch (error) {
      showModal("error", "Connection Error", "Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://backend024-seven.vercel.app/api/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        showModal("success", "Deleted", "User deleted successfully.");
        fetchUsers();
      } else {
        showModal("error", "Error", "Failed to delete user.");
      }
    } catch (error) {
      showModal("error", "Error", "Connection error.");
    }
  };

  const handleEdit = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://backend024-seven.vercel.app/api/users/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        showModal("success", "Updated", "User updated successfully.");
        setEditModal({ isOpen: false, user: null });
        fetchUsers();
      } else {
        showModal("error", "Error", "Failed to update user.");
      }
    } catch (error) {
      showModal("error", "Error", "Connection error.");
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20 pb-10 relative overflow-hidden text-gray-200">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[100px]"></div>
      </div>

      <Modal {...modal} onClose={closeModal} />
      <ConfirmModal isOpen={confirmModal.isOpen} onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })} onConfirm={() => { handleDelete(confirmModal.userId); setConfirmModal({ ...confirmModal, isOpen: false }); }} title="Confirm Delete" message={`Are you sure you want to delete "${confirmModal.username}"?`} />
      <EditModal isOpen={editModal.isOpen} onClose={() => setEditModal({ ...editModal, isOpen: false })} onSave={handleEdit} user={editModal.user} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-2">
              Admin Panel
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">User Management</h1>
          </div>
          <button onClick={fetchUsers} disabled={loading} className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-semibold transition-all flex items-center gap-2">
            {loading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div> : "🔄 Refresh Data"}
          </button>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-8 flex items-center gap-6 shadow-lg shadow-indigo-500/10">
          <div className="p-4 bg-white/10 rounded-xl text-3xl">👥</div>
          <div>
            <p className="text-sm font-medium text-indigo-200">Total Registered Users</p>
            <p className="text-3xl font-black text-white mt-1">{users.length} <span className="text-lg font-normal text-gray-400">Users</span></p>
          </div>
        </div>

        {/* Users Grid */}
        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div></div>
        ) : users.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
            <div className="text-5xl mb-4">📂</div>
            <p className="text-gray-400">No users found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="group bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center border border-white/10 shadow-inner">
                      <span className="text-lg font-bold text-white">{user.username?.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{user.firstname} {user.lastname}</h3>
                      <p className="text-xs text-indigo-300 font-mono">@{user.username}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-500 border border-white/5">ID: {user.id}</span>
                </div>

                <div className="space-y-3 mb-6 bg-black/20 p-4 rounded-xl border border-white/5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Gender</span>
                    <span className="text-gray-300">{user.sex || "-"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Birthday</span>
                    <span className="text-gray-300">{user.birthday ? new Date(user.birthday).toLocaleDateString("th-TH") : "-"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Address</span>
                    <span className="text-gray-300 truncate max-w-[150px] text-right">{user.address || "-"}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setEditModal({ isOpen: true, user })} className="flex-1 py-2 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-lg hover:bg-indigo-600 hover:text-white transition-all text-sm font-semibold">
                    Edit
                  </button>
                  <button onClick={() => setConfirmModal({ isOpen: true, userId: user.id, username: user.username })} className="flex-1 py-2 bg-red-600/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-600 hover:text-white transition-all text-sm font-semibold">
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}