"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaBalanceScale, FaGavel, FaUsers, FaSearch, FaCheck } from 'react-icons/fa';

const AboutPage = () => {
  
  // Animation Variants for Staggering Children
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 16 } },
  };

  return (
    <div className="min-h-screen mt-[-20] bg-[#090b0e] text-white font-sans overflow-hidden relative selection:bg-emerald-500/30">
      
      {/* BACKGROUND AMBIENT GLOWS (Matched with image_d8bf18.png Teal & Purple highlights) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* SECTION 1: HERO HEADER */}
      <div className="text-center py-20 px-6 max-w-4xl mx-auto space-y-4 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-black tracking-tight"
        >
          About <span className="bg-gradient-to-r from-[#00e5a3] to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,229,163,0.15)]">LegalEase</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
        >
          Discover, consult, and hire elite legal experts from around the country. LegalEase is a professional-driven platform where citizens connect seamlessly with certified advocates.
        </motion.p>
      </div>

      {/* SECTION 2: 4-COLUMNS FEATURES GRID */}
      <div className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, borderColor: "rgba(168,85,247,0.4)", shadow: "0 20px 40px rgba(0,0,0,0.6)" }}
            className="bg-[#0b0d13] border border-slate-900 p-6 rounded-2xl space-y-4 shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center text-xl shadow-[0_0_15px_rgba(168,85,247,0.1)]">
              <FaBalanceScale />
            </div>
            <h3 className="text-lg font-bold text-gray-200">Verified Advocates</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Browse through a highly scrutinized panel of legal practitioners from multiple fields.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, borderColor: "rgba(0,229,163,0.4)" }}
            className="bg-[#0b0d13] border border-slate-900 p-6 rounded-2xl space-y-4 shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-[#00e5a3] rounded-xl flex items-center justify-center text-xl shadow-[0_0_15px_rgba(0,229,163,0.1)]">
              <FaGavel />
            </div>
            <h3 className="text-lg font-bold text-gray-200">Expert Legal Tips</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Learn corporate, family, and criminal law guidelines directly from senior advocates.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, borderColor: "rgba(168,85,247,0.4)" }}
            className="bg-[#0b0d13] border border-slate-900 p-6 rounded-2xl space-y-4 shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center text-xl shadow-[0_0_15px_rgba(168,85,247,0.1)]">
              <FaUsers />
            </div>
            <h3 className="text-lg font-bold text-gray-200">Client Centric</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Connect with lawyers based on ratings, case response rates, and client reviews.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, borderColor: "rgba(0,229,163,0.4)" }}
            className="bg-[#0b0d13] border border-slate-900 p-6 rounded-2xl space-y-4 shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-[#00e5a3] rounded-xl flex items-center justify-center text-xl shadow-[0_0_15px_rgba(0,229,163,0.1)]">
              <FaSearch />
            </div>
            <h3 className="text-lg font-bold text-gray-200">Smart Discovery</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Advanced sorting filters to search and pick professional services matching your budget.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* SECTION 3: MISSION & WHY CHOOSE US ROW */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-28 items-center relative z-10">
        
        {/* Left Side: Mission Statement */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 space-y-4"
        >
          <span className="text-xs text-[#00e5a3] font-bold tracking-widest uppercase block">Our Mission</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-100">
            Making Premium Legal Consultation Accessible for Everyone
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed pt-2">
            LegalEase was built with a clear purpose: to bridge the accessibility gap between clients and elite legal counsel from across regions. Whether you are a business exploring intellectual property parameters or an individual seeking family dispute guidance, LegalEase ensures transparency and secure hires.
          </p>
        </motion.div>

        {/* Right Side: Why Choose Us Box */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 bg-[#0b0d13] border border-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl space-y-4"
        >
          <h3 className="text-xl font-bold text-gray-100">Why Choose LegalEase?</h3>
          <ul className="space-y-3.5 text-xs sm:text-sm text-gray-300">
            {[
              "Smooth contract and hire submission flow",
              "Smart specialization and practice sorting filtering",
              "Transparent hourly legal consult pricing models",
              "Highly reactive responsive client dashboard views",
              "Authentic communication with validated lawyers"
            ].map((text, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="text-[#00e5a3] bg-emerald-500/10 p-1 rounded border border-emerald-500/20 text-xs">
                  <FaCheck />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>

      {/* SECTION 4: DATA STATS COUNTER GRID */}
      <div className="border-t border-b border-slate-900/60 bg-[#0b0d13]/40 py-16 mb-24 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "200+", label: "Verified Advocates" },
            { value: "15+", label: "Practice Categories" },
            { value: "5K+ ", label: "Satisfied Clients" },
            { value: "100%", label: "Secure Legal Service" }
          ].map((stat, index) => (
            <motion.div key={index} variants={itemVariants} className="space-y-1">
              <h2 className="text-3xl sm:text-4xl font-black text-[#00e5a3] drop-shadow-[0_0_15px_rgba(0,229,163,0.15)]">{stat.value}</h2>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* SECTION 5: CALL TO ACTION FOOTER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center py-16 px-6 max-w-3xl mx-auto space-y-6 relative z-10"
      >
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          Ready to Consult with Professional Advisors?
        </h2>
        <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
          Join our platform today, secure a legal date slot, and find answers to your critical case questions.
        </p>
        <div className="pt-2">
          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-[#00e5a3] to-purple-500 hover:from-[#00cc91] hover:to-purple-600 text-black font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-[0_4px_25px_rgba(0,229,163,0.2)] transition-all duration-300"
          >
            Find Legal Experts Today
          </motion.button>
        </div>
      </motion.div>

    </div>
  );
};

export default AboutPage;