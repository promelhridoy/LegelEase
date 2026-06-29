"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserTie, FaCalendarAlt, FaPaperPlane, FaLock, FaComments } from "react-icons/fa";
import HireModal from "./HireModal";
import LawyerSkeleton from "./LawyerSkeleton";
import { useSession } from "@/lib/auth-client";

const LawyerDetails = ({ id }) => {
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [services, setServices] = useState([]);
  
  // Local state arrays holding user submitted reviews
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // 📡 REAL-TIME AUTHENTICATION SESSION VIA AUTH-CLIENT
  const { data: session, status } = useSession();
  const user = session?.user;
  console.log(user);

  // ⚡ Directly check core states cleanly inside helper constants
  const isLoggedIn = !!user;
  console.log(isLoggedIn, "isLoggedIn");
  
  const userId = user?.id;
  const userName = user?.name || "Anonymous Client";
  
  const currentRole = user?.role?.toLowerCase() || "";
  const isClientUser = isLoggedIn && currentRole === "user";

  useEffect(() => {
    // Primary API query targeting centralized database
    fetch(`http://localhost:5000/lawyers/${id}`)
  .then((res) => res.json())
  .then(async (data) => {
    setLawyer(data);

    const serviceRes = await fetch(
      `http://localhost:5000/services/${data.userId}`
    );

    const serviceData = await serviceRes.json();

    setServices(serviceData);

    setLoading(false);
  })
  .catch((err) => {
    console.error("Error fetching lawyer:", err);
    setLoading(false);
  });

    // 📡 FETCH COMMENTS FOR THIS SPECIFIC LAWYER
    fetch(`http://localhost:5000/comments/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setComments(data);
        } else {
          setComments([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching comments safely:", err);
        setComments([]); 
      });
  }, [id]);

  // 📡 HANDLER PROCESSING LIVE SUBMISSIONS TO BACKEND
  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isLoggedIn) return;

    // Constructing dataset to sync flawlessly with MongoDB using active session records
    const freshCommentObj = {
      lawyerId: id, 
      userId: userId,           // ✅ database explicit matching schema 
      author: userName,         // ✅ Dynamic author payload
      date: new Date().toISOString().split('T')[0],
      text: newComment,
      rating: 5 
    };

    try {
      const response = await fetch(`http://localhost:5000/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(freshCommentObj)
      });

      const data = await response.json();

      if (response.ok) {
        // Optimistic UI state synchronization
        setComments(prev => [data.insertedId ? { ...freshCommentObj, _id: data.insertedId } : freshCommentObj, ...prev]);
        setNewComment("");
      } else {
        alert("Failed to securely broadcast your client assessment.");
      }
    } catch (error) {
      console.error("Transmission exception dropping comment data:", error);
    }
  };

  if (loading || status === "loading") return <LawyerSkeleton />;

  if (!lawyer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#090b0e] text-red-400 font-medium">
        <span className="text-4xl mb-2">⚠️</span>
        <div>Lawyer profile not found or server unreachable</div>
      </div>
    );
  }

  const isAvailable = lawyer.status?.toLowerCase() === "available";

  return (
    <section className="min-h-screen bg-[#090b0e] text-white py-16 px-4 sm:px-12 font-sans selection:bg-sky-500/30 relative overflow-hidden">
      
      {/* GLOW DECORATION BACKGROUND BLUR EFFECTS */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        
        {/* BACK ACTION TRIGGER */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.history.back()}
          className="text-gray-400 hover:text-sky-400 text-sm font-semibold mb-2 flex items-center gap-2 group transition duration-300 cursor-pointer"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span> 
          Back to Browse Page
        </motion.button>

        {/* MAIN DISPLAY DETAIL CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#11141c]/90 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
          
          {/* LEFT COLUMN: PROFESSIONAL PHOTO AVATAR */}
          <motion.div 
            className="lg:col-span-5 relative w-full aspect-square sm:max-w-xs lg:max-w-none mx-auto rounded-2xl overflow-hidden group border border-slate-700/40 shadow-inner"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 90, damping: 15 }}
          >
           <div className="relative w-full h-full">
  {lawyer.image ? (
    <Image
      src={lawyer.image}
      alt={lawyer.name}
      fill
      className="object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-5xl">
      👨‍⚖️
    </div>
  )}
</div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* RIGHT COLUMN: RELEVANT FIELD METADATA MATRIX */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-between space-y-6 w-full"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold px-3.5 py-1.5 rounded-lg tracking-wide uppercase">
                  {lawyer.specialization}
                </span>
                
                <span className={`text-xs font-bold px-3.5 py-1.5 rounded-lg border flex items-center gap-1.5 tracking-wide ${
                  isAvailable 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                }`}>
                  <span className={`w-2 h-2 rounded-full animate-pulse ${isAvailable ? "bg-emerald-400" : "bg-amber-400"}`} />
                  {lawyer.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-gray-100 drop-shadow-sm">
                {lawyer.name}
              </h1>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-normal">
                {lawyer.bio}
              </p>

              {/* DATA ROWS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-b border-slate-800/60 py-4 text-xs">
                <div className="flex items-center gap-3 bg-[#090b0e]/50 px-4 py-2.5 rounded-xl border border-slate-800/40">
                  <span className="text-lg">💰</span>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Consultation Rate</p>
                    <p className="text-gray-100 font-bold text-sm">
                      ${lawyer.rate} <span className="text-[11px] text-gray-400 font-normal">/ hr</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#090b0e]/50 px-4 py-2.5 rounded-xl border border-slate-800/40">
                  <span className="text-lg">🤝</span>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Total Hires</p>
                    <p className="text-gray-100 font-bold text-sm">{lawyer.hires || 0} Cases Served</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#090b0e]/50 px-4 py-2.5 rounded-xl border border-slate-800/40 sm:col-span-2">
                  <span className="text-lg">📅</span>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Platform Member Since</p>
                    <p className="text-gray-200 font-semibold text-xs">{lawyer.joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION TRIGGERS AREA */}
            <div>
              {isClientUser ? (
                <motion.button
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setOpenModal(true)}
                  className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-8 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(14,165,233,0.25)] transition-all duration-300 tracking-wide text-center cursor-pointer"
                >
                  Hire Expert Profile →
                </motion.button>
              ) : (
                <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/10 text-amber-400 text-xs flex items-center gap-2">
                  <FaLock className="text-[10px]" /> Authenticate client account permissions to book standard appointments.
                </div>
              )}
            </div>
          </motion.div>
        </div>


        <div className="bg-[#11141c]/90 border border-slate-800/80 rounded-3xl p-6 sm:p-8">
  <h2 className="text-2xl font-bold mb-6">
    Services Offered
  </h2>

  {services.length === 0 ? (
    <p className="text-gray-500">
      No services available.
    </p>
  ) : (
    <div className="grid md:grid-cols-2 gap-6">
      {services.map((service) => (
        <div
          key={service._id}
          className="bg-[#090b0e] border border-slate-800 rounded-2xl overflow-hidden"
        >
          {service.image && (
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-48 object-cover"
            />
          )}

          <div className="p-5">
            <span className="text-xs bg-sky-500/10 text-sky-400 px-2 py-1 rounded">
              {service.specialization}
            </span>

            <h3 className="text-xl font-bold mt-3">
              {service.name}
            </h3>

            <p className="text-gray-400 mt-2">
              {service.bio}
            </p>

            <div className="flex justify-between items-center mt-5">
              <span className="text-green-400 font-bold">
                ${service.fee}
              </span>

              <button
                onClick={() => setOpenModal(true)}
                className="bg-sky-500 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-600"
              >
                Hire Service
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

        {/* FEEDBACK ENGINE & REVIEWS TIMELINE BLOCK */}
        <div className="bg-[#11141c]/90 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-6">
          <h2 className="text-base sm:text-lg font-black text-gray-100 flex items-center gap-2.5 tracking-tight">
            <FaComments className="text-sky-400 text-sm sm:text-base" /> Client Feedback Loops ({comments.length})
          </h2>

          {/* Comment Form Gate */}
          {isLoggedIn ? (
            <form onSubmit={handlePostComment} className="space-y-3">
              <div className="relative">
                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Draft continuous technical recommendations or consult feedback statements here..."
                  className="w-full bg-[#090b0e]/60 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-white placeholder-gray-600 focus:outline-none focus:border-sky-500/50 resize-none transition-all leading-relaxed"
                />
                <button 
                  type="submit" 
                  className="absolute bottom-4 right-4 p-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs transition-all shadow-md cursor-pointer flex items-center justify-center"
                  title="Broadcast Review"
                >
                  <FaPaperPlane className="text-[11px]" />
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 bg-white/[0.01] border border-dashed border-slate-800 rounded-xl text-center text-gray-500 text-xs py-6 flex items-center justify-center gap-2">
              <FaLock className="text-[10px]" /> Please sign in to submit professional assessments.
            </div>
          )}

          {/* Dynamic Feed Presentation Grid */}
          <div className="space-y-4 divide-y divide-slate-800/50">
            <AnimatePresence mode="popLayout">
              {comments.map((comment) => (
                <motion.div 
                  key={comment._id || comment.id} 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="pt-4 first:pt-0 group"
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-xs sm:text-sm text-gray-200 group-hover:text-sky-400 transition-colors flex items-center gap-2">
                      <FaUserTie className="text-[10px] text-gray-600" /> {comment.author}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1">
                      <FaCalendarAlt className="text-[9px]" /> {comment.date}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed pl-4 border-l border-slate-800 group-hover:border-sky-500/40 transition-all font-medium">
                    {comment.text}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>

            {comments.length === 0 && (
              <p className="text-center text-xs font-bold text-gray-600 py-6">No localized logs registered yet. Initiate discussion.</p>
            )}
          </div>
        </div>

      </div>

      {/* RENDER MODAL CONDITIONAL LAYER */}
      <AnimatePresence>
        {openModal && (
          <HireModal
            lawyer={lawyer}
            open={openModal}
            setOpen={setOpenModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default LawyerDetails;