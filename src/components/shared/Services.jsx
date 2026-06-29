"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGavel,
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaTimes,
  FaCloudUploadAlt,
  FaDollarSign,
  FaRegFileAlt,
} from "react-icons/fa";
import { useSession, authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Swal from "sweetalert2";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentServiceId, setCurrentServiceId] = useState(null);
  
  const { data: session, status } = useSession();
  const user = session?.user;
  const lawyerId = user?.id;

  const [formData, setFormData] = useState({
    name: "",
    specialization: "Corporate Law",
    fee: "",
    bio: "",
    image: "",
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  // 🔄 GET: Fetch services with security token authorization
  useEffect(() => {
    if (!lawyerId) return;

    const getServices = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services/${lawyerId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to load services");
        const data = await res.json();
        
        // 🛡️ Fallback data structuring validation checks
        if (Array.isArray(data)) {
          setServices(data);
        } else if (data && Array.isArray(data.services)) {
          setServices(data.services);
        } else {
          setServices([]);
        }
      } catch (err) {
        console.error("Error reading services data:", err);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, [lawyerId]);

  // ☁️ POST: Upload image assets directly to ImgBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: imageFormData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          image: data.data.url,
        }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      console.error("Image upload pipeline crash:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      name: "",
      specialization: "Corporate Law",
      fee: "",
      bio: "",
      image: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setModalMode("edit");
    setCurrentServiceId(service._id);
    setFormData({
      name: service.name,
      specialization: service.specialization,
      fee: service.fee,
      bio: service.bio,
      image: service.image,
    });
    setIsModalOpen(true);
  };

  // 📝 POST & PATCH: Create or update legal configurations securely
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token || tokenData;

      if (modalMode === "add") {
        const service = {
          lawyerId: user.id,
          lawyerName: user.name,
          lawyerImage: user.image,
          ...formData,
          fee: Number(formData.fee),
          createdAt: new Date(),
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
          },
          body: JSON.stringify(service),
        });

        const result = await res.json();

        if (result.insertedId) {
          setServices((prev) => [...(Array.isArray(prev) ? prev : []), { ...service, _id: result.insertedId }]);
          toast.success("Service created successfully!");
          setIsModalOpen(false);
        } else {
          toast.error("Failed to create service!");
        }
      } else {
        // Handle PATCH update operations
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services/${currentServiceId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
          },
          body: JSON.stringify({
            ...formData,
            fee: Number(formData.fee),
          }),
        });

        const result = await res.json();

        if (result.modifiedCount > 0 || res.ok) {
          setServices((prev) =>
            Array.isArray(prev)
              ? prev.map((item) =>
                  item._id === currentServiceId
                    ? { ...item, ...formData, fee: Number(formData.fee) }
                    : item
                )
              : []
          );
          toast.success("Service updated successfully!");
          setIsModalOpen(false);
        } else {
          toast.error("Failed to update service!");
        }
      }
    } catch (err) {
      console.error("Mutation submission error:", err);
      toast.error("Something went wrong");
    }
  };

  // 🗑️ DELETE: Secure data lifecycle removal requests
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this service!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token || tokenData;

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/services/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
      });

      const data = await res.json();

      if (data.deletedCount > 0 || res.ok) {
        setServices((prev) => (Array.isArray(prev) ? prev.filter((item) => item._id !== id) : []));
        Swal.fire({
          title: "Deleted!",
          text: "Service has been deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Deletion rejected on backend application context");
      }
    } catch (err) {
      console.error("Error running deletion payload:", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete service.",
        icon: "error",
      });
    }
  };

  // 🛡️ Rendering protection guardrail against mapping exceptions
  const safeServices = Array.isArray(services) ? services : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 w-full"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <FaGavel className="text-emerald-400" /> Manage Legal Services
          </h1>
          <p className="text-xs md:text-sm text-white/40 font-medium mt-1">
            Configure and manage the legal service catalog that clients see on your profile details page.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-white rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10 transition-all justify-center"
        >
          <FaPlus /> Add New Service
        </button>
      </div>

      {loading ? (
        <div className="text-center p-16 text-white/40 text-xs font-bold tracking-widest uppercase">
          Loading configurations...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {safeServices.map((service) => (
              <motion.div
                key={service._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#090D16]/80 backdrop-blur-xl border border-white/[0.05] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group"
              >
                <div className="p-5 flex gap-4 items-start">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-white/30 shrink-0 border border-dashed border-white/10 text-xs">
                      No Img
                    </div>
                  )}
                  <div className="space-y-1 min-w-0">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-wider">
                      {service.specialization}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-wide truncate">
                      {service.name}
                    </h3>
                    <p className="text-sm font-mono font-bold text-white/80">
                      ${service.fee}{" "}
                      <span className="text-[10px] text-white/30 font-sans font-normal">
                        / Retainer Basis
                      </span>
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 flex-1">
                  <p className="text-xs md:text-sm text-white/60 leading-relaxed font-medium line-clamp-3">
                    {service.bio}
                  </p>
                </div>
                <div className="px-5 py-3.5 bg-white/[0.01] border-t border-white/[0.04] flex justify-end gap-2.5">
                  <button
                    onClick={() => openEditModal(service)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white/60 hover:text-emerald-400 bg-white/[0.02] hover:bg-emerald-500/10 border border-white/[0.05] hover:border-emerald-500/20 transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white/60 hover:text-red-400 bg-white/[0.02] hover:bg-red-500/10 border border-white/[0.05] hover:border-red-500/20 transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && safeServices.length === 0 && (
        <div className="text-center p-16 bg-[#090D16]/40 rounded-3xl border border-dashed border-white/10">
          <p className="text-sm font-bold text-white/30">
            You have not registered any legal services yet. Click Add New Service to begin.
          </p>
        </div>
      )}

      {/* MODAL WORKFLOW CONFIGURATION */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0D121F] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden relative z-10 shadow-2xl my-auto"
            >
              <div className="flex justify-between items-center px-5 py-4 border-b border-white/5">
                <h2 className="text-sm font-black uppercase tracking-wider text-white">
                  {modalMode === "add" ? "Create Legal Service" : "Modify Service Parameter"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>
              <form
                onSubmit={handleSubmit}
                className="p-5 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar"
              >
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5">
                    <FaRegFileAlt /> Service Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-3 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                    placeholder="e.g., Corporate Contract Review & Auditing"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/40">
                      Specialization Category
                    </label>
                    <select
                      value={formData.specialization}
                      onChange={(e) => setFormData((prev) => ({ ...prev, specialization: e.target.value }))}
                      className="w-full bg-[#0D121F] border border-white/10 rounded-xl p-3 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all cursor-pointer"
                    >
                      <option value="Corporate Law">Corporate Law</option>
                      <option value="Criminal Defense">Criminal Defense</option>
                      <option value="Intellectual Property">Intellectual Property</option>
                      <option value="Family Law">Family Law</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5">
                      <FaDollarSign /> Retainer Fee ($)
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formData.fee}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fee: e.target.value }))}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-3 text-xs md:text-sm text-white font-mono focus:outline-none focus:border-emerald-500/50 transition-all"
                      placeholder="e.g., 250"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5">
                    <FaCloudUploadAlt /> Service Cover Image
                  </label>
                  <div className="flex items-center gap-4 p-4 bg-white/[0.01] border border-dashed border-white/10 rounded-xl">
                    <label className="px-4 py-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors rounded-lg text-xs font-bold cursor-pointer shrink-0">
                      {uploadingImage ? "Uploading..." : "Choose File"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                    <div className="min-w-0 flex-1">
                      {formData.image ? (
                        <p className="text-[11px] text-emerald-400 font-medium truncate">
                          {formData.image}
                        </p>
                      ) : (
                        <p className="text-[11px] text-white/30 font-medium">
                          No image mounted yet.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/40">
                    Service Description / Bio
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.bio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-3 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500/50 resize-none transition-all leading-relaxed"
                    placeholder="Describe the service execution..."
                  />
                </div>
                <div className="flex gap-2.5 pt-2 justify-end border-t border-white/5 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-white/60 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploadingImage}
                    className="px-4 py-2 text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl shadow-lg disabled:opacity-50 cursor-pointer"
                  >
                    {modalMode === "add" ? "Save Service" : "Apply Updates"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}