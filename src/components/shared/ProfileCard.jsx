"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";

export default function ProfileCard() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  console.log(user?.id);
  const userId = user?.id;
  

  // 📝 Persistent Form States
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [specialization, setSpecialization] = useState("");
  const [bio, setBio] = useState("");
  const [rate, setRate] = useState("");
  const [status, setStatus] = useState("");

  const [lawyerExists, setLawyerExists] = useState(false);



  // Sync state values automatically as soon as user records resolve
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");

      if (user.role === "lawyer") {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers/user/${userId}`)
          .then((res) => {
            if (res.status === 404) {
              setLawyerExists(false);
              return null;
            }
            return res.json();
            console.log(res.data);
            
          })
          .then((data) => {
            if (!data) return;

            setLawyerExists(true);
            setSpecialization(data.specialization || "Corporate Law");
            setBio(data.bio || "");
            setRate(data.rate || "");
            setStatus(data.status || "Available");
          })
          .catch((err) => {
            console.error("Error fetching lawyer profile:", err);
            toast.error("Failed to load lawyer profile parameters.");
          });
      }
    }
  }, [user]);

  // 📡 Update Handler to permanently commit changes via API
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setSaving(true);

     const {data:tokenData} = await authClient.token()
        console.log(tokenData, "token");

    const lawyerData = {
      userId: user.id,
      name,
      email: user.email,
      image,
      specialization,
      bio,
      rate: rate ? Number(rate) : 0,
      status,
      joinedDate: new Date().toISOString().split("T")[0],
      hires: 0,
    };



    try {
      if (!lawyerExists) {
        // First Time Profile Creation
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`
          },
          body: JSON.stringify(lawyerData),
        });

        if (!res.ok) throw new Error("Failed to create profile");

        setLawyerExists(true);
        toast.success("Lawyer profile registered successfully!");
      } else {
        // Dynamic Profile Update (Changed method to PATCH to align with updated REST guidelines)
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`
          },
          body: JSON.stringify(lawyerData),
          
        });

        if (!res.ok) throw new Error("Failed to update profile");

        toast.success("Profile sync changes saved locally!");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      toast.error("Network runtime cluster synchronizing fault.");
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="bg-[#090D16]/90 backdrop-blur-md border border-white/[0.05] p-8 rounded-3xl max-w-xl w-full mx-auto animate-pulse space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white/5 rounded-2xl" />
          <div className="space-y-3 flex-1">
            <div className="h-5 bg-white/5 rounded w-1/3" />
            <div className="h-3 bg-white/5 rounded w-1/2" />
          </div>
        </div>
        <div className="h-px bg-white/5" />
        <div className="space-y-4">
          <div className="h-10 bg-white/5 rounded-xl w-full" />
          <div className="h-10 bg-white/5 rounded-xl w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-[#090D16]/40 backdrop-blur-md border border-red-500/10 p-8 rounded-3xl max-w-xl w-full mx-auto text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400 text-xl">⚠️</div>
        <h3 className="text-base font-bold text-white">Authentication State Missing</h3>
        <p className="text-xs text-white/40 max-w-xs mx-auto">Please establish a secure gateway login configuration session to modify account dashboards.</p>
      </div>
    );
  }

  const fallbackInitial = name ? name.charAt(0).toUpperCase() : "U";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[#090D16]/80 backdrop-blur-xl border border-white/[0.06] p-8 md:p-10 rounded-[32px] max-w-xl w-full mx-auto relative overflow-hidden shadow-2xl group transition-all duration-300 hover:border-white/[0.1]"
    >
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#05E599]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#05E599]/8 transition-all duration-500" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#9D4EDD]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#9D4EDD]/8 transition-all duration-500" />

      <form onSubmit={handleSaveChanges} className="space-y-8 relative z-10">
        
        {/* UPPER PANEL: DISPLAY BLOCK & META DATA TRAITS */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          
          {/* Enhanced Avatar Viewport */}
          <div className="relative group/avatar">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#05E599] to-[#9D4EDD] rounded-3xl opacity-20 blur-sm group-hover/avatar:opacity-40 transition-opacity duration-300" />
            {image ? (
              <div className="w-24 h-24 rounded-3xl overflow-hidden relative border border-white/10 p-0.5 bg-gradient-to-tr from-[#05E599]/40 to-[#9D4EDD]/40">
                <Image
                  src={image}
                  alt={name}
                  width={96}
                  height={96}
                  priority
                  className="w-full h-full rounded-[22px] object-cover transition-transform duration-500 group-hover/avatar:scale-105"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#05E599]/10 to-[#9D4EDD]/10 border border-white/10 flex items-center justify-center text-3xl font-black text-[#05E599] shadow-inner">
                {fallbackInitial}
              </div>
            )}
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-[#05E599] border-4 border-[#090D16] rounded-full shadow-xl animate-pulse" />
          </div>

          {/* Core Descriptive Text Nodes */}
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
              <h2 className="text-2xl font-black text-white tracking-tight truncate max-w-[240px]">
                {name || "User Identity"}
              </h2>
              <span className="text-[9px] font-extrabold px-2.5 py-1 rounded-lg bg-[#05E599]/10 border border-[#05E599]/20 text-[#05E599] tracking-widest uppercase shadow-sm">
                Verified
              </span>
            </div>
            <p className="text-sm text-white/40 truncate font-semibold">{user.email}</p>
          </div>
        </div>

        <hr className="border-white/[0.05]" />

        {/* 🛠️ EDITABLE INPUT NODE CORE MATRIX */}
        <div className="space-y-5">
          <h3 className="text-xs font-black text-[#05E599] uppercase tracking-widest bg-[#05E599]/5 border border-[#05E599]/10 px-3 py-1.5 rounded-xl inline-block">
            Modify Profile Parameters
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {/* Input Name field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 tracking-wide block pl-1">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full identity token name"
                required
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#05E599]/40 focus:bg-white/[0.04] transition-all duration-300 shadow-inner"
              />
            </div>

            {user.role === "lawyer" && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 tracking-wide block pl-1">Specialization</label>
                  <select
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="w-full bg-[#090D16]/60 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#05E599]/40 focus:bg-[#090D16] transition-all duration-300"
                  >
                    <option value="Corporate Law" className="bg-[#090D16] text-white">Corporate Law</option>
                    <option value="Family Law" className="bg-[#090D16] text-white">Family Law</option>
                    <option value="Criminal Law" className="bg-[#090D16] text-white">Criminal Law</option>
                    <option value="Property Law" className="bg-[#090D16] text-white">Property Law</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 tracking-wide block pl-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[#090D16]/60 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#05E599]/40 focus:bg-[#090D16] transition-all duration-300"
                  >
                    <option value="Available" className="bg-[#090D16] text-white">Available</option>
                    <option value="Busy" className="bg-[#090D16] text-white">Busy</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 tracking-wide block pl-1">Consultation Fee ($)</label>
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="Hourly consultation price payload"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#05E599]/40 focus:bg-white/[0.04] transition-all duration-300 shadow-inner"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 tracking-wide block pl-1">Bio Description Summary</label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Describe your legal runtime expert fields..."
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#05E599]/40 focus:bg-white/[0.04] transition-all duration-300 shadow-inner resize-none"
                  />
                </div>
              </>
            )}

            {/* Input Image picture url field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 tracking-wide block pl-1">Avatar Vector Endpoint URL</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Paste remote server image link path (https://...)"
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#9D4EDD]/40 focus:bg-white/[0.04] transition-all duration-300 shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* ACCOUNT METRICS STRUCTURAL MATRIX ROWS */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl space-y-1.5">
            <span className="text-white/30 font-bold block text-[10px] uppercase tracking-widest">System Classification</span>
            <span className="text-white/80 font-black text-sm block tracking-wide">{user.role || "Standard Consumer"}</span>
          </div>
          <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl space-y-1.5">
            <span className="text-white/30 font-bold block text-[10px] uppercase tracking-widest">Internal Anchor ID</span>
            <span className="text-white/70 font-mono font-bold text-sm block truncate">
              #{user.id ? user.id.substring(0, 12) : "UNRESOLVED"}
            </span>
          </div>
        </div>

        {/* SUBMISSION SUBMIT PANEL AND FEEDBACK ANCHORS */}
        <div className="pt-2 space-y-3">
          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 rounded-2xl text-sm font-bold bg-gradient-to-r from-[#05E599] to-[#9D4EDD] text-white transition-all duration-300 disabled:opacity-40 shadow-xl shadow-[#05E599]/10 cursor-pointer active:scale-[0.99] hover:brightness-105 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Synchronizing Database Record...
              </>
            ) : "Save Permanent Updates"}
          </button>

          {/* Dynamic feedback notice indicator on form submission match success */}
          {success && (
            <motion.p 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-xs font-bold text-[#05E599] tracking-wide bg-[#05E599]/10 py-2 rounded-xl border border-[#05E599]/20"
            >
              ✓ Profile matrix updated successfully in remote runtime cluster.
            </motion.p>
          )}
        </div>

      </form>
    </motion.div>
  );
}