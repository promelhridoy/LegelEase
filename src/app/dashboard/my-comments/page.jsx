"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCommentDots,
  FaUserTie,
  FaCalendarAlt,
  FaStar,
  FaEdit,
  FaTrashAlt,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useSession } from "@/lib/auth-client";
import LawyerSkeleton from "@/components/shared/LawyerSkeleton";
import Image from "next/image";
import { toast } from "sonner";

export default function MyCommentPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();
  const user = session?.user;
  const userId = user?.id;

  // 💡 States for Handling Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);

  // 🗑️ States for Handling Custom Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/comments/user/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load user comments");
        return res.json();
      })
      .then((data) => {
        setComments(Array.isArray(data) ? data : []);
        loading && setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
        toast.error("Failed to load your comments. Please refresh!");
        setComments([]);
        setLoading(false);
      });
  }, [userId]);

  // 🔄 Trigger Edit Form Modal
  const openEditModal = (comment) => {
    setCurrentComment(comment);
    setEditText(comment.text);
    setEditRating(comment.rating || 5);
    setIsEditModalOpen(true);
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    if (!currentComment) return;

    const updatedData = {
      text: editText,
      rating: editRating,
    };

    const toastId = toast.loading("Updating your secure review...");

    try {
      const response = await fetch(
        `http://localhost:5000/comments/${currentComment._id || currentComment.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (response.ok) {
        setComments((prev) =>
          prev.map((item) =>
            item._id === currentComment._id || item.id === currentComment.id
              ? { ...item, text: editText, rating: editRating }
              : item,
          ),
        );
        setIsEditModalOpen(false);
        setCurrentComment(null);
        toast.success("Review updated successfully!", { id: toastId });
      } else {
        toast.error("Failed to update comment securely on server.", { id: toastId });
      }
    } catch (error) {
      console.error("Error patching comment:", error);
      toast.error("An unexpected error occurred. Try again!", { id: toastId });
    }
  };

  // 🗑️ Trigger Custom Delete Modal Instead of window.confirm
  const openDeleteModal = (id) => {
    setCommentToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!commentToDelete) return;

    const toastId = toast.loading("Permanently deleting review...");
    setIsDeleteModalOpen(false); // মোডালটি সাথে সাথে বন্ধ করার জন্য

    try {
      const response = await fetch(`http://localhost:5000/comments/${commentToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setComments((prev) =>
          prev.filter((item) => item._id !== commentToDelete && item.id !== commentToDelete),
        );
        toast.success("Comment deleted successfully.", { id: toastId });
      } else {
        toast.error("Failed to delete comment from server.", { id: toastId });
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Could not reach server to delete review.", { id: toastId });
    } finally {
      setCommentToDelete(null);
    }
  };

  if (status === "loading" || (loading && userId)) {
    return <LawyerSkeleton />;
  }

  if (!user) {
    return (
      <div className="text-center p-16 bg-[#090D16]/40 rounded-2xl border border-dashed border-white/10 max-w-xl mx-auto my-12">
        <p className="text-sm font-bold text-white/50">
          Please sign in to access your customized comments console.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 w-full max-w-6xl mx-auto"
    >
      {/* HEADER SECTION */}
      <div className="space-y-1.5 px-1">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-3">
          <FaCommentDots className="text-emerald-400 text-xl md:text-2xl" /> My
          Comments
        </h1>
        <p className="text-xs md:text-sm text-white/40 font-medium">
          Manage, update, or remove reviews and feedback you have posted on
          lawyer profiles.
        </p>
      </div>

      {/* RESPONSIVE CARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {comments.map((comment) => (
            <motion.div
              key={comment._id || comment.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="bg-[#090D16]/80 backdrop-blur-xl border border-white/[0.05] p-5 rounded-2xl flex flex-col justify-between space-y-4 relative overflow-hidden group shadow-lg"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/[0.02] group-hover:bg-emerald-500/[0.04] rounded-full blur-2xl pointer-events-none transition-colors" />

              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {comment.lawyerImage ? (
                      <Image
                        src={comment?.lawyerImage || "/default-avatar.png"}
                        alt={comment?.lawyerName || "Lawyer Profile"}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-lg object-cover border border-white/5 shrink-0 transition-transform duration-300 hover:scale-110"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/60 shrink-0">
                        <FaUserTie className="text-sm" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white truncate">
                        {comment.lawyerName || "Expert Professional"}
                      </h3>
                      <span className="text-[10px] text-white/40 flex items-center gap-1 mt-0.5">
                        <FaCalendarAlt /> {comment.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/10 px-2 py-0.5 rounded-lg shrink-0">
                    <span className="text-[11px] font-mono font-black text-amber-400">
                      {comment.rating || 5}.0
                    </span>
                    <FaStar className="text-[10px] text-amber-400" />
                  </div>
                </div>

                <p className="text-xs md:text-sm text-white/70 leading-relaxed font-medium break-words">
                  {comment.text}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/[0.04]">
                <button
                  onClick={() => openEditModal(comment)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-white/60 hover:text-emerald-400 bg-white/[0.02] hover:bg-emerald-500/10 border border-white/[0.05] hover:border-emerald-500/20 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => openDeleteModal(comment._id || comment.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-white/60 hover:text-red-400 bg-white/[0.02] hover:bg-red-500/10 border border-white/[0.05] hover:border-red-500/20 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {comments.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-16 bg-[#090D16]/40 rounded-2xl border border-dashed border-white/10"
        >
          <p className="text-sm font-bold text-white/30">
            You haven't posted any comments or lawyer reviews yet.
          </p>
        </motion.div>
      )}

      {/* POP-UP EDIT DIALOG MODAL */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0D121F] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden relative z-10 shadow-2xl"
            >
              <div className="flex justify-between items-center px-5 py-4 border-b border-white/5">
                <h2 className="text-sm font-black uppercase tracking-wider text-white">
                  Edit Your Comment
                </h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleUpdateComment} className="p-5 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/40">
                    Update Rating
                  </label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setEditRating(star)}
                        className="text-lg transition-transform hover:scale-110 cursor-pointer"
                      >
                        <FaStar
                          className={star <= editRating ? "text-amber-400" : "text-white/10"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/40">
                    Review Content
                  </label>
                  <textarea
                    rows={4}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-3 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500/50 resize-none transition-all"
                    placeholder="Modify your feedback summary safely..."
                  />
                </div>

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

      {/* 🗑️ NEW POP-UP CUSTOM DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0D121F] border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden relative z-10 shadow-2xl"
            >
              <div className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400 text-xl">
                  <FaExclamationTriangle />
                </div>
                
                <div className="space-y-1.5">
                  <h2 className="text-base font-bold text-white">
                    Are you completely sure?
                  </h2>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Do you want to permanently delete this comment review? This action cannot be undone.
                  </p>
                </div>

                <div className="flex gap-3 pt-2 justify-center">
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-white/60 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer w-full"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDelete}
                    className="px-4 py-2 text-xs font-black bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all shadow-lg shadow-red-500/10 cursor-pointer w-full"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}