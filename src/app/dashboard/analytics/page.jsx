"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaUserTie, FaBriefcase, FaDollarSign, FaChartLine } from 'react-icons/fa';

export default function AnalyticsPage() {
  // 📝 Dummy Data Structure for Analytics Metrics
  const stats = [
    {
      id: 1,
      title: "Total Users",
      value: "1,248",
      change: "+12% this month",
      isPositive: true,
      icon: <FaUsers className="text-blue-400 text-xl" />,
      glowColor: "group-hover:shadow-blue-500/10",
      borderColor: "hover:border-blue-500/30"
    },
    {
      id: 2,
      title: "Total Lawyers",
      value: "184",
      change: "+4% this month",
      isPositive: true,
      icon: <FaUserTie className="text-purple-400 text-xl" />,
      glowColor: "group-hover:shadow-purple-500/10",
      borderColor: "hover:border-purple-500/30"
    },
    {
      id: 3,
      title: "Total Hires",
      value: "562",
      change: "+28% this month",
      isPositive: true,
      icon: <FaBriefcase className="text-emerald-400 text-xl" />,
      glowColor: "group-hover:shadow-emerald-500/10",
      borderColor: "hover:border-emerald-500/30"
    },
    {
      id: 4,
      title: "Total Revenue",
      value: "$14,250",
      change: "+18% this month",
      isPositive: true,
      icon: <FaDollarSign className="text-amber-400 text-xl" />,
      glowColor: "group-hover:shadow-amber-500/10",
      borderColor: "hover:border-amber-500/30"
    }
  ];

  // Animation Container Configs
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 w-full max-w-6xl mx-auto px-2 sm:px-0"
    >
      {/* PAGE HEADER */}
      <div className="space-y-1.5 border-b border-white/5 pb-5">
        <h1 className="text-xl md:text-3xl font-black tracking-tight text-white flex items-center gap-3">
          <FaChartLine className="text-emerald-400" /> Analytics Overview
        </h1>
        <p className="text-xs md:text-sm text-white/40 font-medium">
          Real-time platform metrics, user distributions, hiring volumes, and financial intelligence pipelines.
        </p>
      </div>

      {/* 📱💻 ANALYTICS METRICS GRID (100% Responsive) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            variants={cardVariants}
            className={`group bg-[#090D16]/80 backdrop-blur-xl border border-white/[0.05] rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all duration-300 ${stat.borderColor} ${stat.glowColor} hover:shadow-2xl`}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs md:text-sm font-bold text-white/40 tracking-wide uppercase">
                {stat.title}
              </span>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] group-hover:bg-white/[0.05] transition-colors">
                {stat.icon}
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight font-mono">
                {stat.value}
              </h2>
              <p className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                {stat.change}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* FUTURE EXPANSION INDICATOR */}
      <div className="text-center p-12 bg-[#090D16]/30 rounded-2xl border border-dashed border-white/5 mt-4">
        <p className="text-xs md:text-sm font-bold text-white/20">
          Advanced graphical charts and tabular conversion pipelines will compile natively below this matrix.
        </p>
      </div>
    </motion.div>
  );
}