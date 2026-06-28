"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaCloudUploadAlt,
  FaUserTie,
  FaDollarSign,
  FaGavel,
} from "react-icons/fa";

export default function CreateLawyerModal({ user, onSuccess }) {
  const [loading, setLoading] =useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    image: user?.image || "",
    specialization: "",
    bio: "",
    fee: "",
  });

  const specializations = [
    "Corporate Law",
    "Criminal Law",
    "Family Law",
    "Property Law",
    "Immigration Law",
    "Tax Law",
    "Business Law",
    "Civil Law",
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">

        {/* Background */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal */}

        <motion.div
          initial={{ opacity: 0, y: 40, scale: .95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40 }}
          className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0B1220] shadow-2xl overflow-hidden"
        >

          {/* Header */}

          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <FaUserTie className="text-emerald-400" />
                Complete Lawyer Profile
              </h2>

              <p className="text-white/40 text-sm mt-1">
                Complete your lawyer profile before using the dashboard.
              </p>
            </div>

            <button
              disabled={loading}
              className="text-white/40 hover:text-white cursor-pointer"
            >
              <FaTimes />
            </button>

          </div>

          {/* Form */}

          <form className="p-6 space-y-5">

            {/* Name */}

            <div>
              <label className="text-sm text-white/60">
                Full Name
              </label>

              <input
                className="mt-2 w-full rounded-xl bg-[#111827] border border-white/10 px-4 py-3 outline-none text-white"
                value={formData.name}
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    name:e.target.value
                  })
                }
              />
            </div>

            {/* Specialization */}

            <div>

              <label className="text-sm text-white/60">
                Specialization
              </label>

              <select
                className="mt-2 w-full rounded-xl bg-[#111827] border border-white/10 px-4 py-3 text-white"
                value={formData.specialization}
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    specialization:e.target.value
                  })
                }
              >
                <option value="">
                  Select specialization
                </option>

                {specializations.map((item)=>(
                  <option key={item}>
                    {item}
                  </option>
                ))}

              </select>

            </div>

            {/* Fee */}

            <div>

              <label className="text-sm text-white/60 flex items-center gap-2">
                <FaDollarSign />
                Consultation Fee
              </label>

              <input
                type="number"
                className="mt-2 w-full rounded-xl bg-[#111827] border border-white/10 px-4 py-3 text-white"
                value={formData.fee}
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    fee:e.target.value
                  })
                }
              />

            </div>

            {/* Bio */}

            <div>

              <label className="text-sm text-white/60">
                Professional Bio
              </label>

              <textarea
                rows={5}
                className="mt-2 w-full rounded-xl bg-[#111827] border border-white/10 px-4 py-3 text-white resize-none"
                value={formData.bio}
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    bio:e.target.value
                  })
                }
              />

            </div>

            {/* Image Upload */}

            <div>

              <label className="text-sm text-white/60 flex items-center gap-2">

                <FaCloudUploadAlt />

                Profile Image

              </label>

              <div className="mt-3 border border-dashed border-white/10 rounded-xl p-5">

                <input
                  type="file"
                  accept="image/*"
                />

              </div>

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3 pt-3">

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 font-bold"
              >
                Create Lawyer Profile
              </button>

            </div>

          </form>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}