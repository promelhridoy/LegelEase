"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import HireModal from "./HireModal";
import LawyerSkeleton from "./LawyerSkeleton";

const LawyerDetails = ({ id }) => {
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/lawyers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLawyer(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching lawyer:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LawyerSkeleton />;

  if (!lawyer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#090b0e] text-red-400 font-medium">
        <span className="text-4xl mb-2">⚠️</span>
        <div>Lawyer profile not found or server unreachable</div>
      </div>
    );
  }

  // Dynamic conditional check for status indicator colors
  const isAvailable = lawyer.status?.toLowerCase() === "available";

  return (
    <section className="min-h-screen bg-[#090b0e] text-white py-16 px-6 sm:px-12 font-sans selection:bg-sky-500/30">
      
      {/* GLOW DECORATION BACKGROUND BLUR EFFECTS */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* BACK ACTION TRIGGER */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.history.back()}
          className="text-gray-400 hover:text-sky-400 text-sm font-semibold mb-8 flex items-center gap-2 group transition duration-300"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span> 
          Back to Browse Page
        </motion.button>

        {/* MAIN DISPLAY FLEX LAYOUT GRID CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#11141c]/90 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
          
          {/* LEFT SIDE: HIGH RES AVATAR COMPONENT IMAGE */}
          <motion.div 
            className="lg:col-span-5 relative w-full aspect-square sm:max-w-md lg:max-w-none mx-auto rounded-2xl overflow-hidden group border border-slate-700/40 shadow-inner"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 90, damping: 15 }}
          >
            <Image
              src={lawyer.image}
              alt={lawyer.name}
              fill
              sizes="(max-w-7xl) 100vw"
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* AMBIENT SHADOW OVERLAY LAYER */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* RIGHT SIDE: METADATA DETAILS & DYNAMIC CONTENT BLOCK */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-between h-full space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
          >
            <div>
              {/* SPECIALIZATION BADGES & STATUS INDICATORS ROW */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold px-3.5 py-1.5 rounded-lg tracking-wide uppercase">
                  {lawyer.specialization} {/* FIXED: Changed from category to specialization */}
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

              {/* LAWYER NAME PROFILE HEADER TITLE */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-100 mb-4 drop-shadow-sm">
                {lawyer.name}
              </h1>

              {/* BIO STATEMENT DESCRIPTION WRAPPER */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {lawyer.bio}
              </p>

              {/* STRUCTURED SPECIFICATION METADATA ROWS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-slate-800/60 py-5 text-sm">
                <div className="flex items-center gap-3 bg-[#090b0e]/50 px-4 py-3 rounded-xl border border-slate-800/40">
                  <span className="text-xl">💰</span>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Consultation Rate</p>
                    <p className="text-gray-100 font-bold text-base">
                      ${lawyer.rate} <span className="text-xs text-gray-400 font-normal">/ hr</span> {/* FIXED: Changed from consultationFee to rate */}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#090b0e]/50 px-4 py-3 rounded-xl border border-slate-800/40">
                  <span className="text-xl">🤝</span>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Hires</p>
                    <p className="text-gray-100 font-bold text-base">{lawyer.hires || 0} Cases Served</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#090b0e]/50 px-4 py-3 rounded-xl border border-slate-800/40 sm:col-span-2">
                  <span className="text-xl">📅</span>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Member of LegalEase Since</p>
                    <p className="text-gray-200 font-semibold">{lawyer.joinedDate}</p> {/* FIXED: Synced variable */}
                  </div>
                </div>
              </div>
            </div>

            {/* INTERACTIVE COMPONENT HIRE ACTION BUTTON */}
            <motion.button
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setOpenModal(true)}
              className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white text-base font-bold px-10 py-4 rounded-xl shadow-[0_4px_20px_rgba(14,165,233,0.25)] hover:shadow-[0_4px_25px_rgba(14,165,233,0.45)] transition-all duration-300 tracking-wide text-center"
            >
              Hire Expert Profile →
            </motion.button>
          </motion.div>
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