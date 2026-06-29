"use client";

import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="w-full bg-[#090D16]/80 border border-white/[0.05] rounded-2xl p-5 space-y-4 animate-pulse">
      {/* Top Header Row Line */}
      <div className="flex justify-between items-start">
        <div className="h-4 bg-white/10 rounded-md w-24" />
        <div className="h-10 w-10 bg-white/5 rounded-xl border border-white/5" />
      </div>

      {/* Big Value Number Line */}
      <div className="space-y-2 pt-2">
        <div className="h-8 bg-white/20 rounded-lg w-32" />
        <div className="h-3 bg-emerald-400/20 rounded-md w-16" />
      </div>
    </div>
  );
}