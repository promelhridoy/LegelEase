"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaGavel,
  FaUsers,
  FaBuilding,
  FaHeart,
} from "react-icons/fa";

const categories = [
  {
    name: "Criminal Law",
    icon: <FaGavel />,
    slug: "criminal",
    count: "45 Lawyers",
  },
  {
    name: "Corporate Law",
    icon: <FaBuilding />,
    slug: "corporate",
    count: "32 Lawyers",
  },
  {
    name: "Family Law",
    icon: <FaHeart />,
    slug: "family",
    count: "28 Lawyers",
  },
  {
    name: "Civil Litigation",
    icon: <FaUsers />,
    slug: "civil",
    count: "50 Lawyers",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function LegalCategories() {
  const router = useRouter();

  const handleCategoryClick = (slug) => {
    router.push(`/lawyers?category=${slug}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#0B0F1A]/70 backdrop-blur-md text-white py-24 px-6">

      {/* Animated Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden">
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-full h-full bg-gradient-to-r from-transparent via-fuchsia-600 to-transparent"
        />
      </div>

      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden">
        <motion.div
          animate={{
            x: ["100%", "-100%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-full h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
        />
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px]"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
        }}
        className="relative text-center max-w-2xl mx-auto mb-16"
      >
        <span
          className="
            inline-flex
            items-center
            px-4
            py-2
            rounded-full
            bg-purple-500/10
            border
            border-purple-500/20
            text-purple-400
            text-xs
            font-semibold
            tracking-widest
            uppercase
          "
        >
          Find By Specialization
        </span>

        <h2 className="mt-6 text-4xl md:text-5xl font-black text-white">
          Legal Categories
        </h2>

        <p className="mt-4 text-white/50 max-w-xl mx-auto">
          Browse lawyers by their area of expertise and connect with
          the right legal professional for your needs.
        </p>
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
        }}
        className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            onClick={() => handleCategoryClick(cat.slug)}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              p-8
              text-center
              cursor-pointer
              group
            "
          >
            {/* Hover Gradient */}
            <div
              className="
                absolute
                inset-0
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-500
                bg-gradient-to-br
                from-purple-500/10
                via-transparent
                to-emerald-500/10
              "
            />

            {/* Icon */}
            <motion.div
              whileHover={{
                rotate: 5,
                scale: 1.08,
              }}
              className="
                relative
                w-16
                h-16
                mx-auto
                rounded-2xl
                bg-white/5
                border
                border-white/10
                text-purple-400
                text-2xl
                flex
                items-center
                justify-center
                mb-5
                group-hover:bg-gradient-to-r
                group-hover:from-purple-500
                group-hover:to-emerald-400
                group-hover:text-black
                transition-all
                duration-300
              "
            >
              {cat.icon}
            </motion.div>

            {/* Content */}
            <h3
              className="
                relative
                z-10
                text-lg
                font-bold
                text-white
                group-hover:text-purple-300
                transition
              "
            >
              {cat.name}
            </h3>

            <p
              className="
                mt-3
                inline-flex
                px-3
                py-1
                rounded-full
                bg-white/5
                border
                border-white/10
                text-xs
                text-white/60
                group-hover:border-purple-500/30
                group-hover:text-purple-300
                transition
              "
            >
              {cat.count}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}