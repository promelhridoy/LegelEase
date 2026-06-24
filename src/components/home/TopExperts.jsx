"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const topExperts = [
  { name: "Adv. Nusrat Jahan", hires: "140 Hires", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956" },
  { name: "Adv. Alamin Rahman", hires: "120 Hires", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a" },
  { name: "Raisa Islam", hires: "110 Hires", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb" },
];

export default function TopExperts() {
  return (
    <section className="bg-[#0B0F1A] text-white py-24 px-6 relative z-10 w-full overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-4">
          ✨ Elite Legal Professionals
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Meet Our Top Experts
        </h2>
        <p className="text-sm text-white/50 mt-3 leading-relaxed">
          Trusted legal professionals with outstanding client reviews, verified credentials, and proven success records.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {topExperts.map((expert, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            whileHover={{ y: -6, borderColor: "rgba(52, 211, 153, 0.2)" }}
            className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 group cursor-pointer"
          >
            <div className="relative w-24 h-24 mb-5">
              <Image 
                src={expert.img} 
                alt={expert.name} 
                width={96} // w-24
                height={96} // h-24
                unoptimized
                className="w-full h-full rounded-full object-cover border-2 border-emerald-400/30 p-1 shadow-md shadow-emerald-500/5 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-emerald-400/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>

            <h3 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors duration-300">
              {expert.name}
            </h3>
            
            <span className="text-xs bg-white/5 border border-white/10 text-white/40 px-3 py-1 rounded-full mt-3 font-medium group-hover:bg-emerald-500/10 group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-all duration-300">
              {expert.hires}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}