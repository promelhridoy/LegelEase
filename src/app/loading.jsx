"use client";

import React from 'react';
import { Spinner } from "@heroui/react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] min-h-screen bg-[#040810] flex flex-col items-center justify-center select-none">
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Spinner and Brand Container */}
      <div className="relative z-10 flex flex-col items-center gap-4 p-8 bg-[#090D16]/40 backdrop-blur-xl border border-white/[0.05] rounded-2xl shadow-2xl">
        
       
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute w-full h-full rounded-full border-2 border-white/5" />
          <div className="absolute w-full h-full rounded-full border-2 border-t-emerald-400 border-b-purple-500 animate-spin" />
        </div>
        
        <div className="space-y-1 text-center mt-2">
          <p className="text-sm font-bold tracking-wider text-white uppercase font-mono animate-pulse">
            LegalEase Pipeline
          </p>
          <p className="text-[10px] text-white/30 font-medium">
            Securing node connections...
          </p>
        </div>
      </div>
    </div>
  );
}