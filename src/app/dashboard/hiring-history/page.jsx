"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserTie, FaGavel, FaDollarSign, FaCalendarAlt, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaCreditCard } from 'react-icons/fa';
import { authClient, useSession } from "@/lib/auth-client";
import PaymentModal from '@/components/shared/PaymentModal';

export default function HiringHistoryPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?.id;

  const [hiringRecords, setHiringRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null); 

  const fetchHiringHistory = async () => {

    const {data:tokenData} = await authClient.token()
            console.log(tokenData, "token");

    if (!userId) return;
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/hiring/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokenData?.token}`
    }
  })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load hiring history");
        return res.json();
      })
      .then((data) => {
        setHiringRecords(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        setHiringRecords([]);
      });
  };

  useEffect(() => {
    fetchHiringHistory();
  }, [userId]);

  const handlePaymentSuccess = () => {
    setSelectedRecord(null);
    fetchHiringHistory(); 
  };

  const renderStatusBadge = (record) => {
    if (record.paymentStatus === 'Paid') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-wider">
          <FaCheckCircle className="text-[10px]" /> Paid
        </span>
      );
    }

    switch (record.status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#05E599]/10 border border-[#05E599]/20 text-[#05E599] uppercase tracking-wider">
            <FaCheckCircle className="text-[10px]" /> Accepted
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-red-500/10 border border-red-500/20 text-red-400 uppercase tracking-wider">
            <FaTimesCircle className="text-[10px]" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400 uppercase tracking-wider">
            <FaHourglassHalf className="text-[10px]" /> Pending
          </span>
        );
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 w-full overflow-hidden">
      
      {/* HEADER */}
      <div className="space-y-1.5 px-1">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">Hiring History</h1>
        <p className="text-xs md:text-sm text-white/40 font-medium">Monitor your active legal counsel requests and secure settlements.</p>
      </div>

      {/* 📱 MOBILE VIEW */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {hiringRecords?.map((record) => (
          <div key={record._id} className="bg-[#090D16]/80 backdrop-blur-xl border border-white/[0.05] p-5 rounded-2xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#05E599]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="text-sm font-black text-white tracking-wide">{record.lawyerName}</h3>
                <p className="text-xs text-white/50 mt-0.5">{record.specialization}</p>
              </div>
              {renderStatusBadge(record)}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.04] text-xs">
              <div>
                <span className="text-white/30 block text-[10px] uppercase tracking-wider font-bold">Retainer Fee</span>
                <span className="text-white/80 font-mono font-bold text-sm">${record.rate}</span>
              </div>
              <div>
                <span className="text-white/30 block text-[10px] uppercase tracking-wider font-bold">Hiring Date</span>
                <span className="text-white/70 font-medium">{record.hiringDate}</span>
              </div>
            </div>

            <div className="pt-2">
              {record.paymentStatus === 'Paid' ? (
                <button disabled className="w-full py-2.5 text-xs font-bold bg-white/5 text-white/40 border border-white/5 rounded-xl cursor-not-allowed">
                  Paid
                </button>
              ) : record.status === 'accepted' ? (
                <button
                  onClick={() => setSelectedRecord(record)}
                  className="w-full py-2.5 text-xs font-extrabold bg-gradient-to-r from-[#05E599] to-[#9D4EDD] text-white rounded-xl shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <FaCreditCard /> Pay Retainer
                </button>
              ) : (
                <button disabled className="w-full py-2.5 text-xs font-bold bg-white/5 text-white/20 border border-white/5 rounded-xl cursor-not-allowed">
                  {record.status === 'rejected' ? 'Terminated' : 'Awaiting Action'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🖥️ DESKTOP VIEW */}
      <div className="hidden lg:block bg-[#090D16]/80 backdrop-blur-xl border border-white/[0.05] rounded-3xl overflow-hidden shadow-2xl relative w-full">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#05E599]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                <th className="p-5 text-xs font-black uppercase tracking-widest text-white/50"><span className="flex items-center gap-2"><FaUserTie /> Lawyer Name</span></th>
                <th className="p-5 text-xs font-black uppercase tracking-widest text-white/50"><span className="flex items-center gap-2"><FaGavel /> Specialization</span></th>
                <th className="p-5 text-xs font-black uppercase tracking-widest text-white/50"><span className="flex items-center gap-2"><FaDollarSign /> Retainer Fee</span></th>
                <th className="p-5 text-xs font-black uppercase tracking-widest text-white/50"><span className="flex items-center gap-2"><FaCalendarAlt /> Hiring Date</span></th>
                <th className="p-5 text-xs font-black uppercase tracking-widest text-white/50">Status</th>
                <th className="p-5 text-xs font-black uppercase tracking-widest text-white/50 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {hiringRecords.map((record) => (
                <tr key={record._id} className="hover:bg-white/[0.02] transition-colors group duration-150">
                  <td className="p-5 text-sm font-bold text-white tracking-wide whitespace-nowrap">{record.lawyerName}</td>
                  <td className="p-5 text-sm font-semibold text-white/70 whitespace-nowrap">{record.specialization}</td>
                  <td className="p-5 text-sm font-mono font-bold text-white/90 whitespace-nowrap">${record.rate}</td>
                  <td className="p-5 text-sm font-medium text-white/50 whitespace-nowrap">{record.hiringDate}</td>
                  <td className="p-5 whitespace-nowrap">{renderStatusBadge(record)}</td>
                  <td className="p-5 text-right whitespace-nowrap">
                    {record.paymentStatus === 'Paid' ? (
                      <button disabled className="px-4 py-2 text-xs font-bold bg-white/5 text-white/40 border border-white/5 rounded-xl cursor-not-allowed">
                        Paid
                      </button>
                    ) : record.status === 'accepted' ? (
                      <button
                        onClick={() => setSelectedRecord(record)}
                        className="px-4 py-2 text-xs font-extrabold bg-gradient-to-r from-[#05E599] to-[#9D4EDD] text-white rounded-xl shadow-lg cursor-pointer hover:brightness-110 transition-all inline-flex items-center gap-1.5"
                      >
                        <FaCreditCard /> Pay Retainer
                      </button>
                    ) : (
                      <button disabled className="px-4 py-2 text-xs font-bold bg-white/5 text-white/20 border border-white/5 rounded-xl cursor-not-allowed">
                        {record.status === 'rejected' ? 'Terminated' : 'Awaiting Action'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedRecord && (
          <PaymentModal
            hiringData={selectedRecord} 
            userEmail={user?.email} 
            closeModal={handlePaymentSuccess} 
          />
        )}
      </AnimatePresence>

    </motion.div>
  );
}