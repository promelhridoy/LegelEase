"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { toast } from "sonner";

const HireModal = ({ open, setOpen, lawyer }) => {

  console.log(lawyer.userId);
  
  const { data: session } = useSession();

  const user = session?.user;

  const handleHire = async () => {
  try {
    const hiringData = {
      lawyerId: lawyer.userId,
      lawyerName: lawyer.name,
      specialization: lawyer.specialization,
      rate: lawyer.rate,

      userId: user.id,
      clientName: user.name,
      clientEmail: user.email,
    };

    const {data:tokenData} = await authClient.token()
            console.log(tokenData, "token");

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/hiring`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData?.token}`
      },
      body: JSON.stringify(hiringData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Hiring Request Submitted Successfully");
      setOpen(false);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};

  // Model state jodi false hoy, tobe framer-motion er AnimatePresence safely handle korbe
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
      {/* BACKDROP BLUR WITH ANIMATION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setOpen(false)} // Background e click korle modal close hobe
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
      />

      {/* MODAL BODY CONTROLLER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-[#11141c] border border-slate-800 rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] text-white z-10"
      >
        {/* ICON OVERLAY GRAPHIC */}
        <div className="w-12 h-12 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-full flex justify-center items-center text-xl mb-5">
          💼
        </div>

        {/* HEADER STATEMENT */}
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-100">
          Hire {lawyer?.name}?
        </h2>

        {/* DESCRIPTION CONTENT */}
        <p className="text-gray-400 mt-3 text-sm sm:text-base leading-relaxed">
          Are you sure you want to send a hiring request to this professional?
          You will receive updates once they review your case criteria.
        </p>

        {/* ACTION HANDLERS ROW */}
        <div className="flex justify-end items-center gap-3 mt-8">
          {/* CANCEL BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02, bg: "#1e293b" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-gray-300 font-semibold text-sm transition-colors duration-200 border border-slate-700/50"
          >
            Cancel
          </motion.button>

          {/* CONFIRM BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleHire}
            className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm"
          >
            Confirm Hiring
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default HireModal;
