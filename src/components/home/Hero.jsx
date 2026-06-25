"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { FaGavel, FaBalanceScale, FaShieldAlt, FaBriefcase } from "react-icons/fa";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function Hero() {
  const slides = [
    {
      icon: <FaGavel className="text-emerald-400 text-5xl md:text-6xl" />,
      title: "Expert Legal Representation",
      desc: "Connect with verified professionals specialized in criminal, corporate, and family law.",
    },
    {
      icon: <FaBalanceScale className="text-purple-400 text-5xl md:text-6xl" />,
      title: "Justice & Transparency",
      desc: "Get secure, token-verified contracts and seamless digital consultations at your fingertips.",
    },
    {
      icon: <FaShieldAlt className="text-blue-400 text-5xl md:text-6xl" />,
      title: "Protect Your Rights",
      desc: "We democratize access to elite legal aid for individual citizens and global businesses alike.",
    },
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-[85vh] sm:h-[90vh] w-full bg-[#0B0F1A] overflow-hidden mt-[-15] pt-24 pb-12 flex items-center">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* LEFT SIDE: Text & CTA Button */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="lg:col-span-6 space-y-6 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-medium tracking-wide">
            <FaBriefcase className="text-xs" /> Next-Gen Legal Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] tracking-tight">
            Find & Hire <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
              Expert Legal
            </span> Counsel
          </h1>

          <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Your premium digital marketplace connecting individuals and enterprises with top-tier, verified legal professionals. Seamless hiring, secure payments.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
            <Link 
              href="/lawyers"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-purple-500 text-black font-bold text-sm transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/10 w-full sm:w-auto text-center"
            >
              Browse Lawyers
            </Link>
            
            <Link 
              href="/how-it-works"
              className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 text-sm font-medium transition-all w-full sm:w-auto text-center"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Fixed Slider Container */}
        <div className="lg:col-span-6 w-full h-[380px] sm:h-[400px] relative">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect={"fade"}
            fadeEffect={{ crossFade: true }} // ক্রসব্লিডিং ফিক্স করার জন্য এটি অত্যন্ত জরুরি
            grabCursor={true}
            allowTouchMove={true}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="w-full h-full rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl"
          >
            {slides.map((slide, index) => (
              <SwiperSlide 
                key={index} 
                className="w-full h-full !flex flex-col items-center justify-center p-8 sm:p-12 select-none bg-[#0e1322]/40 rounded-2xl"
              >
                {/* Content wrapper with absolute alignment prevention */}
                <div className="w-full flex flex-col items-center text-center justify-center space-y-6 my-auto">
                  
                  {/* Icon Wrapper */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-inner relative group">
                    <div className="absolute inset-0 bg-emerald-400/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition" />
                    <div className="relative z-10 flex items-center justify-center">{slide.icon}</div>
                  </div>
                  
                  {/* Text */}
                  <div className="space-y-3 w-full">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide block">
                      {slide.title}
                    </h3>
                    <p className="text-white/50 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed block">
                      {slide.desc}
                    </p>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

      {/* Custom Overrides */}
      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #34d399 !important;
          width: 20px !important;
          border-radius: 4px !important;
        }
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3);
        }
        /* ফেইড ইফেক্টের সময় পেছনের স্লাইড লক করার জন্য */
        .swiper-slide:not(.swiper-slide-active) {
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}</style>
    </section>
  );
}