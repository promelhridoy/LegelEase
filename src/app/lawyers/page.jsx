"use client";

import LawyerCard from "@/components/shared/LawyerCard";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LawyersPage = () => {
  const [lawyers, setLawyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState("all");

  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLawyers, setTotalLawyers] = useState(0);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("limit", limit);

        if (searchTerm) {
          params.append("search", searchTerm);
        }

        if (selectedCategories !== "all") {
          params.append("specialization", selectedCategories);
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyers?${params.toString()}`,
        );

        const data = await res.json();

        setLawyers(data.lawyers);
        setTotalPages(data.totalPages);
        setTotalLawyers(data.total);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLawyer();
  }, [searchTerm, selectedCategories, page, limit]);

  return (
    // Screenshot matching deep slate-black background layout
    <section className="min-h-screen m-[-20] bg-[#090b0e] text-white px-6 py-12 sm:px-12 font-sans transition-colors duration-500">
      {/* HEADER SECTION */}
      <div className="mb-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-indigo-700 bg-clip-text text-transparent">
  Find Your Lawyer
</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Find and consult with top rated legal experts.
        </p>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 mb-8 items-center bg-[#11141c]/80 backdrop-blur-md p-4 rounded-xl border border-slate-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
        {/* INPUT CONTAINER */}
        <div className="relative w-full md:flex-1 flex items-center group">
          <input
            type="text"
            placeholder="Search lawyers..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full bg-[#090b0e] border border-slate-700/70 rounded-l-xl px-4 py-3.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition-all duration-300"
          />
          <button className="bg-green-600 hover:bg-green-700 active:scale-95 text-white font-semibold px-7 py-3.5 rounded-r-xl text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search
          </button>
        </div>

        {/* DROPDOWN SELECT */}
        <select
          value={selectedCategories}
          onChange={(e) => {
            setSelectedCategories(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-64 bg-[#090b0e] border border-slate-700/70 text-gray-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition-all duration-300 cursor-pointer"
        >
          <option value="all">All Categories</option>
          <option value="Corporate Law">Corporate Law</option>
          <option value="Family Law">Family Law</option>
          <option value="Criminal Defense">Criminal Defense</option>
          <option value="Intellectual Property">Intellectual Property</option>
          <option value="Real Estate Law">Real Estate Law</option>
          <option value="Labor & Employment">Labor & Employment</option>
        </select>
      </div>

      {/* DYNAMIC RESULT COUNT WITH AMBIENT TEXT GLOW */}
      <div className="max-w-7xl mx-auto mb-6">
        <p className="text-gray-400 font-medium text-sm">
          Found{" "}
          <span className="text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)] font-bold">
            {totalLawyers}
          </span>{" "}
          professional(s)
        </p>
      </div>

      {/* LAWYER GRID LAYOUT WITH ANIMATION */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          <AnimatePresence mode="popLayout">
            {lawyers.map((lawyer) => (
              <motion.div
                key={lawyer._id}
                layout
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1 },
                  exit: {
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  },
                }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className="relative rounded-2xl overflow-hidden bg-[#11141c] border border-slate-800/80 hover:border-sky-500/50 shadow-xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all duration-300"
              >
                {/* LawyerCard call: Ekhane responsive wrapper dynamic hover shadow build active kora holo, 
                  jodi dark tone card customization default property thake, tobe flawless blend hobe.
                */}
                <LawyerCard lawyer={lawyer} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 disabled:opacity-40"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`w-10 h-10 rounded-lg transition ${
                page === index + 1
                  ? "bg-sky-500 text-white"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default LawyersPage;
