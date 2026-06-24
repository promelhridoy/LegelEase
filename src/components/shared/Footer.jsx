"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import Logo from "./Logo";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing to LegalEase Newsletter!");
    e.target.reset();
  };

  const socialLinks = [
    { icon: <FaFacebookF size={14} />, href: "#" },
    { icon: <FaTwitter size={14} />, href: "#" },
    { icon: <FaLinkedinIn size={14} />, href: "#" },
    { icon: <FaGithub size={14} />, href: "#" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden bg-[#0B0F1A] border-t border-white/10 pt-24 pb-8 text-white/70"
    >
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      {/* Animated Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-white/55">
              Connecting legal seekers, clients, and businesses with trusted
              lawyers through a modern, secure and transparent platform.
            </p>

            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    isIconOnly
                    as="a"
                    href={social.href}
                    variant="flat"
                    className="bg-white/5 backdrop-blur-md border border-white/10 text-white/60 hover:text-white hover:border-emerald-400/40 hover:bg-emerald-500/10 transition-all"
                  >
                    {social.icon}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold uppercase tracking-[0.2em] text-xs mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
                { name: "Browse Lawyers", path: "/lawyers" },
                { name: "How It Works", path: "#" },
              ].map((item) => (
                <motion.li key={item.name} whileHover={{ x: 6 }}>
                  <Link
                    href={item.path}
                    className="flex items-center gap-2 hover:text-emerald-300 transition text-sm"
                  >
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold uppercase tracking-[0.2em] text-xs mb-6">
              Legal
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms of Service", path: "#" },
                { name: "Disclaimer", path: "#" },
                { name: "Support", path: "#" },
              ].map((item) => (
                <motion.li key={item.name} whileHover={{ x: 6 }}>
                  <Link
                    href={item.path}
                    className="flex items-center gap-2 hover:text-emerald-300 transition text-sm"
                  >
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold uppercase tracking-[0.2em] text-xs mb-6">
              Newsletter
            </h3>
            <p className="text-sm text-white/55 leading-relaxed mb-5">
              Get legal insights, lawyer updates and platform news delivered
              directly to your inbox.
            </p>

            <motion.form
              onSubmit={handleNewsletterSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full flex items-center">
                {/* HTML Input with Tailwind CSS */}
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full h-12 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 pl-4 pr-14 text-sm text-white placeholder:text-white/30 outline-none hover:border-emerald-500/30 focus:border-emerald-400 transition-all"
                />
                
                {/* Submit Button placed inside the input field */}
                <Button
                  isIconOnly
                  type="submit"
                  radius="lg"
                  size="sm"
                  className="absolute right-2 bg-gradient-to-r from-emerald-400 to-purple-500 text-black font-bold min-w-8 w-8 h-8"
                >
                  <FiSend size={14} />
                </Button>
              </div>
            </motion.form>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="pt-8 mt-14 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40"
        >
          <p>© {new Date().getFullYear()} LegalEase. All rights reserved.</p>
          <p>Crafted with precision for modern legal professionals.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}