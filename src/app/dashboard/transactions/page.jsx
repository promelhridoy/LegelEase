"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReceipt, FaEnvelope, FaCalendarAlt, FaDollarSign, FaHashtag, FaInbox, FaSearch } from 'react-icons/fa';

export default function TransactionsPage() {
  // Mock Data Structure representing financial pipelines
  const [transactions] = useState([
    {
      id: "TXN-908234",
      email: "promel.12@gmail.com",
      amount: 250.00,
      date: "2026-06-26",
      status: "SUCCESS"
    },
    {
      id: "TXN-761249",
      email: "ahsan.habib@gmail.com",
      amount: 180.00,
      date: "2026-06-25",
      status: "SUCCESS"
    },
    {
      id: "TXN-459231",
      email: "sarah.karim@legal.com",
      amount: 450.00,
      date: "2026-06-23",
      status: "SUCCESS"
    },
    {
      id: "TXN-120984",
      email: "tariqul.islam@yahoo.com",
      amount: 120.00,
      date: "2026-06-20",
      status: "SUCCESS"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter transactions by Transaction ID or Email Address dynamically
  const filteredTransactions = transactions.filter(txn => 
    txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-6 w-full max-w-6xl mx-auto px-2 sm:px-0"
    >
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
        <div className="space-y-1.5">
          <h1 className="text-xl md:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <FaReceipt className="text-emerald-400" /> Transaction Ledger
          </h1>
          <p className="text-xs md:text-sm text-white/40 font-medium">
            Monitor incoming platform fees, verify systemic transfer parameters, and inspect processing logs.
          </p>
        </div>

        {/* SEARCH FILTER INTERFACE */}
        <div className="relative w-full sm:w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-white/30 text-xs">
            <FaSearch />
          </span>
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID or email..."
            className="w-full bg-[#090D16]/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
          />
        </div>
      </div>

      {/* 1. MOBILE VIEW CARD LAYOUT (Visible only on small mobile screens - md:hidden) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        <AnimatePresence mode="popLayout">
          {filteredTransactions.map((txn) => (
            <motion.div 
              key={txn.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#090D16]/90 border border-white/[0.05] rounded-xl p-4 space-y-3 shadow-lg group"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <FaHashtag className="text-[10px] text-white/30" /> {txn.id}
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {txn.status}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-white/70 flex items-center gap-2 truncate font-medium">
                  <FaEnvelope className="text-[10px] text-white/30 shrink-0" /> {txn.email}
                </p>
                <p className="text-[11px] text-white/40 flex items-center gap-2 font-mono">
                  <FaCalendarAlt className="text-[10px] text-white/30 shrink-0" /> {txn.date}
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.03] flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-white/30 tracking-wider">Amount Paid</span>
                <span className="text-sm font-mono font-black text-white flex items-center">
                  <FaDollarSign className="text-[11px] text-emerald-400" /> {txn.amount.toFixed(2)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 2. DESKTOP VIEW TABLE LAYOUT (Visible only on large screens - hidden md:block) */}
      <div className="hidden md:block w-full overflow-hidden rounded-2xl border border-white/[0.05] bg-[#090D16]/80 backdrop-blur-xl shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-white/40 uppercase text-[11px] font-bold tracking-wider bg-white/[0.01]">
              <th className="p-4 pl-6"><span className="flex items-center gap-1.5"><FaHashtag /> Transaction ID</span></th>
              <th className="p-4"><span className="flex items-center gap-1.5"><FaEnvelope /> User/Lawyer Email</span></th>
              <th className="p-4"><span className="flex items-center gap-1.5"><FaCalendarAlt /> Settlement Date</span></th>
              <th className="p-4 text-center">Execution Status</th>
              <th className="p-4 pr-6 text-right"><span className="flex items-center justify-end gap-1"><FaDollarSign /> Net Amount</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02] text-sm text-white/80">
            <AnimatePresence mode="popLayout">
              {filteredTransactions.map((txn) => (
                <motion.tr 
                  key={txn.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-white/[0.01] transition-colors duration-150 group"
                >
                  <td className="p-4 pl-6 font-mono text-xs font-bold text-emerald-400 tracking-wide">
                    {txn.id}
                  </td>
                  <td className="p-4 text-white/70 font-medium group-hover:text-white transition-colors">
                    {txn.email}
                  </td>
                  <td className="p-4 text-white/40 font-mono text-xs font-medium">
                    {txn.date}
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                      ✓ SUCCESS
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right font-mono font-black text-white text-base">
                    ${txn.amount.toFixed(2)}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* EMPTY MATRIX INDICATOR STATE */}
      {filteredTransactions.length === 0 && (
        <div className="text-center p-20 bg-[#090D16]/40 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-3">
          <FaInbox className="text-white/20 text-3xl" />
          <p className="text-sm font-bold text-white/30">No record coordinates matched the query criteria.</p>
        </div>
      )}
    </motion.div>
  );
}