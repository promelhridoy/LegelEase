"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function LawyerCard({ lawyer }) {
  const { _id, name, specialization, rate, status, image } = lawyer;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="group relative bg-[#090D16]/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-[1px] transition-all duration-300"
    >
      {/* ✨ ANIMATED BORDER ELEMENT: Syncs with LegalEase emerald-to-purple brand gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent group-hover:from-[#00F2FE] group-hover:to-[#4FACFE] opacity-0 group-hover:opacity-20 transition-all duration-500 rounded-3xl" style={{ backgroundImage: "linear-gradient(to right, #05E599, #9D4EDD)" }} />
      
      {/* Inner Content Card wrapper */}
      <div className="bg-[#0A0E1A] h-full w-full rounded-[23px] overflow-hidden flex flex-col justify-between relative z-10">
        
        {/* 📸 Visual Media Framework Area */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-950">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Linear subtle shadow blend to typography bounds */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-black/10" />
          
          {/* 🏷️ Glassmorphism Status Badge System */}
          <span
            className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border ${
              status === "Available"
                ? "bg-[#05E599]/10 text-[#05E599] border-[#05E599]/20"
                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
            }`}
          >
            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${status === "Available" ? "bg-[#05E599] shadow-[0_0_8px_#05E599]" : "bg-amber-400"} animate-pulse`} />
            {status}
          </span>
        </div>

        {/* 📊 Core Metadata Area Info Blocks */}
        <div className="p-6 pt-3 flex-grow flex flex-col justify-between">
          <div>
            {/* Category Badge matching the exact hero chip tone */}
            <span className="text-[10px] font-extrabold text-[#05E599] uppercase tracking-widest bg-[#05E599]/10 px-2.5 py-1 rounded-lg inline-block border border-[#05E599]/10">
              {specialization}
            </span>

            {/* Premium Lawyer Bold Heading */}
            <h3 className="text-xl font-bold text-white mt-3 tracking-tight group-hover:text-[#05E599] transition-colors duration-300 line-clamp-1">
              {name}
            </h3>
            
            <hr className="border-white/[0.04] my-4" />

            {/* Structural Price Matrix Section */}
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-medium text-white/50 tracking-wide">
                Consultation Fee
              </span>
              <div className="text-right">
                <span className="text-2xl font-black text-white tracking-tight">
                  ${rate}
                </span>
                <span className="text-xs font-semibold text-white/40 ml-1">/hr</span>
              </div>
            </div>
          </div>

          {/* 🔗 BRAND SYNCHRONIZED CTA BUTTON: Directly clones the beautiful UI Hero Action Style */}
          <div className="mt-6">
            <Link
              href={`/lawyers/${_id}`}
              className="relative flex items-center justify-center w-full text-center text-white text-sm font-bold py-3.5 px-4 rounded-xl transition-all duration-300 overflow-hidden shadow-lg group/btn bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 hover:border-transparent"
            >
              {/* Animated Background Layer on Hover matching the UI hero gradient exactly */}
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#05E599] to-[#9D4EDD]" />
              
              <span className="relative z-10 flex items-center gap-2 text-white font-semibold transition-transform duration-300 group-hover/btn:scale-[0.98]">
                View Expert Profile
                <svg 
                  className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
}