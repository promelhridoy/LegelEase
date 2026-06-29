"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaUserTie, FaBriefcase, FaDollarSign, FaChartLine } from 'react-icons/fa';
import PlatformChart from '@/components/shared/PlatformChart';

export default function AnalyticsPage() {
  const [stats, setStats] = useState([]);
  // 📝 Dummy Data Structure for Analytics Metrics
  useEffect(() => {
  Promise.all([
    fetch("http://localhost:5000/analytics/users").then((res) => res.json()),
    fetch("http://localhost:5000/analytics/lawyers").then((res) => res.json()),
    fetch("http://localhost:5000/analytics/hires").then((res) => res.json()),
    fetch("http://localhost:5000/analytics/revenue").then((res) => res.json()),
  ]).then(([users, lawyers, hires, revenue]) => {
    setStats([
      {
        id: 1,
        title: "Total Users",
        value: users.totalUsers,
        change: "",
        icon: <FaUsers className="text-blue-400 text-xl" />,
        glowColor: "group-hover:shadow-blue-500/10",
        borderColor: "hover:border-blue-500/30",
      },
      {
        id: 2,
        title: "Total Lawyers",
        value: lawyers.totalLawyers,
        change: "",
        icon: <FaUserTie className="text-purple-400 text-xl" />,
        glowColor: "group-hover:shadow-purple-500/10",
        borderColor: "hover:border-purple-500/30",
      },
      {
        id: 3,
        title: "Total Hires",
        value: hires.totalHires,
        change: "",
        icon: <FaBriefcase className="text-emerald-400 text-xl" />,
        glowColor: "group-hover:shadow-emerald-500/10",
        borderColor: "hover:border-emerald-500/30",
      },
      {
        id: 4,
        title: "Total Revenue",
        value: `$${revenue.totalRevenue}`,
        change: "",
        icon: <FaDollarSign className="text-amber-400 text-xl" />,
        glowColor: "group-hover:shadow-amber-500/10",
        borderColor: "hover:border-amber-500/30",
      },
    ]);
  });
}, []);

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
      <div className="mt-8 bg-[#090D16]/80 border border-white/5 rounded-2xl p-6">
  <h2 className="text-lg font-bold text-white mb-2">
    Platform Statistics
  </h2>

  <p className="text-sm text-white/40 mb-5">
    Visual representation of users, lawyers, hires and revenue.
  </p>

  {/* Bar Chart */}
  <div className="h-[300px]">
    <div className="h-full w-full">
      <PlatformChart />
    </div>
  </div>
</div>
    </motion.div>
  );
}