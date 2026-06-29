"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen mt-[-20] bg-[#040810] flex items-center justify-center px-4 relative overflow-hidden select-none">
      
      {/* BACKGROUND GLOW SHAPES (Theme Consistent) */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* MAIN CARD CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, delay: 0.1 }}
        className="max-w-md w-full bg-[#090D16]/60 backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-8 md:p-10 text-center shadow-2xl relative z-10"
      >
        {/* WARNING ICON */}
        <motion.div 
          initial={{ scale: 0.5, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          className="inline-flex p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400 text-3xl mb-6 shadow-[0_0_30px_rgba(245,158,11,0.05)]"
        >
          <FaExclamationTriangle />
        </motion.div>

        {/* ERROR CODE */}
        <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 tracking-tighter font-mono leading-none">
          404
        </h1>

        {/* ERROR MESSAGE */}
        <h2 className="text-xl font-bold text-white mt-4 tracking-tight">
          Page Coordinates Not Found
        </h2>
        
        <p className="text-xs md:text-sm text-white/40 mt-2 font-medium leading-relaxed">
          The legal node or operational pipeline you are trying to access does not exist or has been permanently decommissioned.
        </p>

        {/* SEPARATOR */}
        <div className="w-full h-[1px] bg-white/[0.05] my-6" />

        {/* ACTION BUTTON */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all shadow-[0_4px_20px_rgba(16,185,129,0.15)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.25)] tracking-wide"
          >
            <FaHome className="text-base" /> Return to Command Dashboard
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}