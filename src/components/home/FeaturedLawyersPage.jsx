"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LawyerCard from "../shared/LawyerCard";

const FeaturedLawyersPage = () => {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await fetch("http://localhost:5000/lawyers");
        const data = await res.json();
        setLawyers(data.lawyers);
        console.log(data)
      } catch (error) {
        console.error("Failed to fetch lawyers:", error);
      }
    };

    fetchLawyers();
  }, []);

  return (
    <section className="relative py-20 bg-[#0B0F1A] overflow-hidden">
      {/* Animated Top Border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5">
        <motion.div
          className="h-full w-40 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 blur-[1px]"
          animate={{
            x: ["-200px", "100vw"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-emerald-400 uppercase tracking-[4px] text-sm font-semibold">
            Featured Lawyers
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            Top Rated Legal Experts
          </h2>

          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            Connect with experienced and trusted lawyers for your legal needs.
            Browse top-rated professionals and hire with confidence.
          </p>
        </motion.div>

        {/* Lawyer Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {lawyers.slice(0, 6).map((lawyer) => (
            <motion.div
              key={lawyer._id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 40,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{ duration: 0.5 }}
            >
              <LawyerCard lawyer={lawyer} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedLawyersPage;