"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHistory, FaUser, FaCalendarAlt, FaCheck, FaTimes, FaInbox, FaEnvelope, FaGavel } from 'react-icons/fa';
import { useSession, authClient } from "@/lib/auth-client"; // 🔑 authClient imported for token generation

export default function HiringRequestsPage() {
  // 💡 Initialized as an empty array to prevent rendering crashes
  const [requests, setRequests] = useState([]);

  const { data: session } = useSession();
  const user = session?.user;
  const lawyerId = user?.id;

  // 🔄 Fetch hiring requests on mount or when lawyerId changes
  useEffect(() => {
    if (!lawyerId) return;

    const fetchRequests = async () => {
      try {
        // 🔑 Retrieve auth token dynamically
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token || tokenData;

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/hiring/${lawyerId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
          },
        });
        
        if (!res.ok) throw new Error("Failed to fetch requests");
        const data = await res.json();

        // 🛡️ API Response Check: Handle direct array or nested objects safely
        if (Array.isArray(data)) {
          setRequests(data);
        } else if (data && Array.isArray(data.requests)) {
          setRequests(data.requests);
        } else if (data && Array.isArray(data.data)) {
          setRequests(data.data);
        } else {
          setRequests([]); // Fallback to empty array if no array pattern matches
        }

      } catch (err) {
        console.error("Error fetching hiring requests:", err);
        setRequests([]); // Secure the state on error
      }
    };

    fetchRequests();
  }, [lawyerId]);

  // 🟢 Handle Request Acceptance
  const handleAccept = async (id) => {
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token || tokenData;

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/hiring/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
        body: JSON.stringify({ status: "accepted" }),
      });

      const data = await res.json();

      if (data.modifiedCount || res.ok) {
        setRequests((prev) =>
          // 🛡️ Defensive mapping: ensure previous state is an array
          Array.isArray(prev) ? prev.map((item) => item._id === id ? { ...item, status: "accepted" } : item) : []
        );
      }
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };

  // 🔴 Handle Request Rejection
  const handleReject = async (id) => {
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token || tokenData;

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/hiring/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
        body: JSON.stringify({ status: "rejected" }),
      });

      const data = await res.json();

      if (data.modifiedCount || res.ok) {
        setRequests((prev) =>
          Array.isArray(prev) ? prev.map((item) => item._id === id ? { ...item, status: "rejected" } : item) : []
        );
      }
    } catch (err) {
      console.error("Error rejecting request:", err);
    }
  };

  // 🛡️ Final guardrail to guarantee .map() never breaks on render
  const safeRequests = Array.isArray(requests) ? requests : [];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-6 w-full max-w-6xl mx-auto px-2 sm:px-0"
    >
      {/* PAGE HEADER */}
      <div className="space-y-1.5 border-b border-white/5 pb-5">
        <h1 className="text-xl md:text-3xl font-black tracking-tight text-white flex items-center gap-3">
          <FaHistory className="text-emerald-400" /> Hiring Requests
        </h1>
        <p className="text-xs md:text-sm text-white/40 font-medium">
          Monitor incoming legal counsel requests from clients and manage workflow status.
        </p>
      </div>

      {/* 📱 1. MOBILE VIEW CARD LAYOUT (Visible only on smaller devices - md:hidden) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {safeRequests.map((request) => (
          <div 
            key={request._id} 
            className="bg-[#090D16]/90 border border-white/[0.05] rounded-xl p-4 space-y-3 shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">{request.lawyerName || "Client Name"}</h3>
                <p className="text-[11px] text-white/30 flex items-center gap-1 mt-0.5"><FaEnvelope className="text-[10px]" /> {request.email}</p>
              </div>
              
              {/* Status Badges */}
              <div>
                {request.status === "pending" && <span className="px-2 py-0.5 rounded text-[9px] font-black bg-amber-500/10 text-amber-400 border border-amber-500/10">PENDING</span>}
                {request.status === "accepted" && <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">ACCEPTED</span>}
                {request.status === "rejected" && <span className="px-2 py-0.5 rounded text-[9px] font-black bg-red-500/10 text-red-400 border border-red-500/10">REJECTED</span>}
              </div>
            </div>

            <div className="bg-white/[0.01] p-2.5 rounded-lg border border-white/[0.02] text-xs space-y-1">
              <p className="text-white/60 font-medium flex items-center gap-1.5"><FaGavel className="text-[10px] text-emerald-400" /> {request.specialization}</p>
              <p className="text-white/30 font-mono text-[10px] flex items-center gap-1.5"><FaCalendarAlt className="text-[10px]" />{request.hiringDate}</p>
            </div>

            {/* Action Buttons Interface */}
            <div className="flex justify-end gap-2 pt-1">
              {request.status === "pending" ? (
                <>
                  <button onClick={() => handleReject(request._id)} className="w-1/2 py-2 rounded-lg text-xs font-bold bg-white/5 text-white/60 hover:bg-red-500/10 hover:text-red-400 border border-white/5 transition-all cursor-pointer">Reject</button>
                  <button onClick={() => handleAccept(request._id)} className="w-1/2 py-2 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-all cursor-pointer">Accept</button>
                </>
              ) : (
                <span className="text-xs text-white/20 italic pr-1 py-1">Action Processed</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 💻 2. DESKTOP VIEW TABLE LAYOUT (Visible only on larger screens - hidden md:block) */}
      <div className="hidden md:block w-full overflow-hidden rounded-2xl border border-white/[0.05] bg-[#090D16]/80 backdrop-blur-xl shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-white/40 uppercase text-[11px] font-bold tracking-wider bg-white/[0.01]">
              <th className="p-4 pl-6"><span className="flex items-center gap-1.5"><FaUser /> Client Name</span></th>
              <th className="p-4">Service Requested</th>
              <th className="p-4"><span className="flex items-center gap-1.5"><FaCalendarAlt /> Request Date</span></th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 pr-6 text-right">Action Interface</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02] text-sm text-white/80">
            {safeRequests.map((request) => (
              <tr key={request._id} className="hover:bg-white/[0.01] transition-colors duration-150 group">
                <td className="p-4 pl-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">{request.lawyerName || "Client Name"}</span>
                    <span className="text-[11px] text-white/30 font-medium mt-0.5">{request.email}</span>
                  </div>
                </td>
                <td className="p-4 text-white/70 font-medium">{request.specialization}</td>
                <td className="p-4 text-white/40 font-mono font-medium">{request.hiringDate}</td>
                <td className="p-4 text-center">
                  {request.status === "pending" && <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-black bg-amber-500/10 text-amber-400 border border-amber-500/10">⏳ PENDING</span>}
                  {request.status === "accepted" && <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">✓ ACCEPTED</span>}
                  {request.status === "rejected" && <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-black bg-red-500/10 text-red-400 border border-red-500/10">✕ REJECTED</span>}
                </td>
                <td className="p-4 pr-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {request.status === "pending" ? (
                      <>
                        <button onClick={() => handleAccept(request._id)} className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all cursor-pointer flex items-center gap-1"><FaCheck className="text-[10px]" /> Accept</button>
                        <button onClick={() => handleReject(request._id)} className="px-3 py-1.5 rounded-xl text-xs font-bold text-white/60 bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/5 transition-all cursor-pointer flex items-center gap-1"><FaTimes className="text-[10px]" /> Reject</button>
                      </>
                    ) : (
                      <span className="text-xs text-white/20 font-medium italic pr-2">Action Processed</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY STATE */}
      {safeRequests.length === 0 && (
        <div className="text-center p-20 bg-[#090D16]/40 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-3">
          <FaInbox className="text-white/20 text-3xl" />
          <p className="text-sm font-bold text-white/30">No hiring requests discovered.</p>
        </div>
      )}
    </motion.div>
  );
}