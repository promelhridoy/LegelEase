"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsersCog, FaUser, FaEnvelope, FaShieldAlt, FaTrashAlt, FaExchangeAlt, FaInbox } from 'react-icons/fa';

export default function ManageUserPage() {
  // Mock Data Structure for Platform Users
  const [users, setUsers] = useState([]);
  // 1. Functional Change Role Handler (Toggle between User & Lawyer)

  useEffect(() => {
  fetch("http://localhost:5000/user")
    .then((res) => res.json())
    .then((data) =>
      setUsers(
        data.filter(
          (user) => user.role === "user" || user.role === "lawyer"
        )
      )
    );
}, []);

 const handleChangeRole = async (id, currentRole) => {
  const nextRole = currentRole === "user" ? "lawyer" : "user";

  const res = await fetch(
    `http://localhost:5000/user/role/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: nextRole,
      }),
    }
  );

  const result = await res.json();

  if (result.modifiedCount > 0) {
    setUsers(prev =>
      prev.map(user =>
        user._id === id
          ? { ...user, role: nextRole }
          : user
      )
    );
  }
};

  // 2. Functional Delete User Handler
  const handleDeleteUser = async (id) => {
  const res = await fetch(
    `http://localhost:5000/user/${id}`,
    {
      method: "DELETE",
    }
  );

  const result = await res.json();

  if (result.deletedCount > 0) {
    setUsers(prev =>
      prev.filter(user => user._id !== id)
    );
  }
};

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-6 w-full max-w-6xl mx-auto px-2 sm:px-0"
    >
      {/* PAGE HEADER */}
      <div className="space-y-1.5 border-b border-white/5 pb-5">
        <h1 className="text-xl md:text-3xl font-black tracking-tight text-white flex items-center gap-3">
          <FaUsersCog className="text-emerald-400" /> Manage Users
        </h1>
        <p className="text-xs md:text-sm text-white/40 font-medium">
          Control platform identity structures, toggle security access clearance roles, and moderate registered member profiles.
        </p>
      </div>

      {/* 1. MOBILE VIEW CARD LAYOUT (Visible only on small screens - md:hidden) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        <AnimatePresence mode="popLayout">
          {users.map((user) => (
            <motion.div 
              key={user._id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#090D16]/90 border border-white/[0.05] rounded-xl p-4 space-y-3 shadow-lg group"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">{user.name}</h3>
                  <p className="text-[11px] text-white/40 flex items-center gap-1.5 font-mono"><FaEnvelope className="text-[10px]" /> {user.email}</p>
                </div>
                
                {/* Role Badges */}
                <div>
                  <span className={`px-2.5 py-0.5 rounded text-[9px] font-black tracking-wider uppercase border ${
                    user.role === 'lawyer'
  ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    {user.role === "lawyer" ? "💼 LAWYER" : "👤 USER"}
                  </span>
                </div>
              </div>

              {/* Mobile Action Interface */}
              <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.03]">
                <button 
                  onClick={() => handleChangeRole(user._id, user.role)}
                  className="w-1/2 py-2 rounded-lg text-xs font-bold bg-white/5 text-white/70 hover:bg-emerald-500/10 hover:text-emerald-400 border border-white/5 transition-all flex items-center justify-center gap-1.5"
                >
                  <FaExchangeAlt className="text-[10px]" /> Change Role
                </button>
                <button 
                  onClick={() => handleDeleteUser(user._id)}
                  className="w-1/2 py-2 rounded-lg text-xs font-bold bg-white/5 text-white/60 hover:bg-red-500/10 hover:text-red-400 border border-white/5 transition-all flex items-center justify-center gap-1.5"
                >
                  <FaTrashAlt className="text-[10px]" /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 2. DESKTOP VIEW TABLE LAYOUT (Visible only on large screens - hidden md:block) */}
      <div className="hidden md:block w-full overflow-hidden rounded-2xl border border-white/[0.05] bg-[#090D16]/80 backdrop-blur-xl shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-white/40 uppercase text-[11px] font-bold tracking-wider bg-white/[0.01]">
              <th className="p-4 pl-6"><span className="flex items-center gap-1.5"><FaUser /> Name</span></th>
              <th className="p-4"><span className="flex items-center gap-1.5"><FaEnvelope /> Email Address</span></th>
              <th className="p-4 text-center"><span className="flex items-center justify-center gap-1.5"><FaShieldAlt /> System Role</span></th>
              <th className="p-4 pr-6 text-right">Administrative Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02] text-sm text-white/80">
            <AnimatePresence mode="popLayout">
              {users.map((user) => (
                <motion.tr 
                  key={user._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-white/[0.01] transition-colors duration-150 group"
                >
                  <td className="p-4 pl-6 font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                    {user.name}
                  </td>
                  <td className="p-4 text-white/60 font-mono text-xs">{user.email}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wide border ${
                      user.role === 'lawyer'
  ? 'bg-purple-500/10 text-purple-400 border-purple-500/10'
  : 'bg-blue-500/10 text-blue-400 border-blue-500/10'
                    }`}>
                      {user.role === 'lawyer' ? '💼 LAWYER' : '👤 USER'}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <button 
                        onClick={() =>handleChangeRole(user._id, user.role)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-white/70 bg-white/[0.02] hover:bg-emerald-500/10 hover:text-emerald-400 border border-white/[0.05] hover:border-emerald-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                        title="Toggle User/Lawyer Role"
                      >
                        <FaExchangeAlt className="text-[10px]" /> Change Role
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user._id)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-white/60 bg-white/[0.02] hover:bg-red-500/10 hover:text-red-400 border border-white/[0.05] hover:border-red-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                        title="Permanently Delete User"
                      >
                        <FaTrashAlt className="text-[10px]" /> Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* EMPTY STATE */}
      {users.length === 0 && (
        <div className="text-center p-20 bg-[#090D16]/40 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-3">
          <FaInbox className="text-white/20 text-3xl" />
          <p className="text-sm font-bold text-white/30">All clear! No users found in database matrix.</p>
        </div>
      )}
    </motion.div>
  );
}