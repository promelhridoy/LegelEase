"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaUserTie, FaCalendarAlt, FaStar, FaEdit, FaTrashAlt, FaTimes, FaCheck } from 'react-icons/fa';

export default function MyCommentPage() {
  // 📝 Dummy Data Structure - Replace with your dynamic fetching API loop later
  const [comments, setComments] = useState([
    {
      id: "comment-01",
      lawyerName: "Adv. Promel Hossain",
      rating: 5,
      date: "2026-06-24",
      text: "Outstanding service! He explained the corporate compliance terms very clearly and helped us secure our license ahead of schedule. Highly recommended."
    },
    {
      id: "comment-02",
      lawyerName: "Barrister Sarah Karim",
      rating: 4,
      date: "2026-06-18",
      text: "Very professional and punctual during the IP consultation. The only reason for 4 stars is that the response time via email was slightly delayed, but the legal advice was perfect."
    },
    {
      id: "comment-03",
      lawyerName: "Adv. Tariqul Islam",
      rating: 5,
      date: "2026-05-12",
      text: "Excellent criminal defense consultation. He guided my family through a very critical situation with utmost patience and professionalism."
    }
  ]);

  // 💡 States for Handling Modals and Target Data
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);

  // 🔄 Trigger Edit Form Modal
  const openEditModal = (comment) => {
    setCurrentComment(comment);
    setEditText(comment.text);
    setEditRating(comment.rating);
    setIsEditModalOpen(true);
  };

  // 📡 Simulated API Update Operation Handler
  const handleUpdateComment = (e) => {
    e.preventDefault();
    
    // Optimistic State Update Block
    setComments(prev => prev.map(item => 
      item.id === currentComment.id 
        ? { ...item, text: editText, rating: editRating } 
        : item
    ));

    // TODO: Insert your axios.patch / fetch / mutate API async logic here
    console.log(`Updating comment ID: ${currentComment.id}`, { editText, editRating });
    
    setIsEditModalOpen(false);
    setCurrentComment(null);
  };

  // 📡 Simulated API Delete Operation Handler
  const handleDeleteComment = (id) => {
    const confirmDelete = window.confirm("Are you completely sure you want to permanently delete this comment review?");
    if (confirmDelete) {
      // Optimistic State Filter
      setComments(prev => prev.filter(item => item.id !== id));
      
      // TODO: Insert your axios.delete / fetch API execution logic here
      console.log(`Deleted comment with ID: ${id}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 w-full max-w-6xl mx-auto"
    >
      {/* HEADER SECTION */}
      <div className="space-y-1.5 px-1">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-3">
          <FaCommentDots className="text-emerald-400 text-xl md:text-2xl" /> My Comments
        </h1>
        <p className="text-xs md:text-sm text-white/40 font-medium">Manage, update, or remove reviews and feedback you have posted on lawyer profiles.</p>
      </div>

      {/* 📱💻 FULLY RESPONSIVE CARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="bg-[#090D16]/80 backdrop-blur-xl border border-white/[0.05] p-5 rounded-2xl flex flex-col justify-between space-y-4 relative overflow-hidden group shadow-lg"
            >
              {/* Background Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/[0.02] group-hover:bg-emerald-500/[0.04] rounded-full blur-2xl pointer-events-none transition-colors" />

              <div className="space-y-3">
                {/* Lawyer Identity & Metadata Row */}
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/60 shrink-0">
                      <FaUserTie className="text-sm" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white truncate">{comment.lawyerName}</h3>
                      <span className="text-[10px] text-white/40 flex items-center gap-1 mt-0.5">
                        <FaCalendarAlt /> {comment.date}
                      </span>
                    </div>
                  </div>

                  {/* Rating Stars Badge */}
                  <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/10 px-2 py-0.5 rounded-lg shrink-0">
                    <span className="text-[11px] font-mono font-black text-amber-400">{comment.rating}.0</span>
                    <FaStar className="text-[10px] text-amber-400" />
                  </div>
                </div>

                {/* Main Body Review Text */}
                <p className="text-xs md:text-sm text-white/70 leading-relaxed font-medium break-words">
                  {comment.text}
                </p>
              </div>

              {/* Functional Dynamic Control Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/[0.04]">
                <button
                  onClick={() => openEditModal(comment)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-white/60 hover:text-emerald-400 bg-white/[0.02] hover:bg-emerald-500/10 border border-white/[0.05] hover:border-emerald-500/20 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-white/60 hover:text-red-400 bg-white/[0.02] hover:bg-red-500/10 border border-white/[0.05] hover:border-red-500/20 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* EMPTY STATE COMPONENT BOUNDARY */}
      {comments.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-16 bg-[#090D16]/40 rounded-2xl border border-dashed border-white/10">
          <p className="text-sm font-bold text-white/30">You haven't posted any comments or lawyer reviews yet.</p>
        </motion.div>
      )}

      {/* 🖥️ POP-UP DIALOG MODAL FRAMEWORK */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Layer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0D121F] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden relative z-10 shadow-2xl"
            >
              <div className="flex justify-between items-center px-5 py-4 border-b border-white/5">
                <h2 className="text-sm font-black uppercase tracking-wider text-white">Edit Your Comment</h2>
                <button onClick={() => setIsEditModalOpen(false)} className="text-white/40 hover:text-white transition-colors cursor-pointer"><FaTimes /></button>
              </div>

              <form onSubmit={handleUpdateComment} className="p-5 space-y-4">
                {/* Interactive Rating Control Input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/40">Update Rating</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setEditRating(star)}
                        className="text-lg transition-transform hover:scale-110 cursor-pointer"
                      >
                        <FaStar className={star <= editRating ? "text-amber-400" : "text-white/10"} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea Comment Box */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/40">Review Content</label>
                  <textarea
                    rows={4}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-3 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500/50 resize-none transition-all"
                    placeholder="Modify your feedback summary safely..."
                  />
                </div>

                {/* Submission Action Grid Buttons */}
                <div className="flex gap-2.5 pt-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-white/60 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl shadow-lg shadow-emerald-500/10 flex items-center gap-1.5 cursor-pointer"
                  >
                    <FaCheck /> Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}