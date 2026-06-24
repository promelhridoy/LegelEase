"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaBalanceScale } from "react-icons/fa";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 w-fit group"
    >
      <motion.div
        whileHover={{
          rotate: -5,
          scale: 1.08,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
        }}
        className="
          p-3
          rounded-2xl
          bg-gradient-to-br
          from-emerald-400
          via-emerald-500
          to-purple-500
          shadow-lg
          shadow-emerald-500/20
        "
      >
        <FaBalanceScale className="text-white text-xl" />
      </motion.div>

      <span
        className="
          text-2xl
          font-black
          tracking-tight
          bg-gradient-to-r
          from-white
          via-emerald-200
          to-purple-300
          bg-clip-text
          text-transparent
        "
      >
        LegalEase
      </span>
    </Link>
  );
};

export default Logo;