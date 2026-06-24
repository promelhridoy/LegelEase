"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaSignOutAlt, FaThLarge, FaChevronDown, FaSearch } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";

export default function NavbarComponent() {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const

  const mockUser = {
    name: "Jane Doe",
    email: "jane@lawyer.com",
    role: "lawyer",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

 
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/lawyers?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Lawyers", path: "/lawyers" },
  ];

 
  const getDashboardPath = () => {
    if (mockUser.role === "admin") return "/dashboard/admin/analytics";
    if (mockUser.role === "lawyer") return "/dashboard/lawyer/hiring-history";
    return "/dashboard/user/hiring-history"; 
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0B0F1A]/70 backdrop-blur-2xl"
    >
      {/* soft ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-emerald-400/5 to-pink-500/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Mobile Menu Button & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white text-xl focus:outline-none"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
          <Logo />
        </div>

        {/* Global Search Bar (Requirement 1) */}
        <form onSubmit={handleSearch} className="hidden sm:flex items-center relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Search lawyers or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white placeholder-white/40 text-xs rounded-xl pl-4 pr-9 py-2 focus:outline-none focus:border-emerald-400/50 transition-all"
          />
          <button type="submit" className="absolute right-3 text-white/40 hover:text-emerald-400 text-xs">
            <FaSearch />
          </button>
        </form>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.path;
            return (
              <motion.div key={link.path} whileHover={{ y: -2 }} className="relative">
                <Link
                  href={link.path}
                  className={`text-sm font-medium transition ${
                    active ? "text-emerald-300" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
                {active && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 rounded-full"
                  />
                )}
              </motion.div>
            );
          })}
          
          {isLoggedIn && (
            <Link
              href={getDashboardPath()}
              className={`text-sm font-medium transition ${
                pathname.startsWith("/dashboard") ? "text-emerald-300" : "text-white/60 hover:text-white"
              }`}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
        

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  className="w-9 h-9 rounded-full border border-white/20 shadow-md object-cover"
                  src={mockUser.image}
                  alt={mockUser.name}
                />
                <FaChevronDown className="text-white/60 text-xs hidden sm:block" />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-60 bg-[#111827]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-white/10">
                        <p className="text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                          {mockUser.role} Account
                        </p>
                        <p className="text-white font-semibold text-sm truncate">{mockUser.name}</p>
                        <p className="text-white/40 text-xs truncate">{mockUser.email}</p>
                      </div>

                      <Link
                        href={getDashboardPath()}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 transition"
                      >
                        <FaThLarge className="text-xs" /> Role Dashboard
                      </Link>

                      <Link
                        href="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 transition"
                      >
                        <FaUser className="text-xs" /> Main Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition text-left"
                      >
                        <FaSignOutAlt className="text-xs" /> Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/signin" className="text-white/60 hover:text-white text-sm transition">
                Login
              </Link>
              <Link href="/auth/signup" className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-emerald-400 to-purple-500 text-black font-semibold hover:scale-105 transition shadow-lg shadow-emerald-500/10">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Responsive Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#0B0F1A]/95 border-b border-white/10"
          >
            <div className="px-6 py-4 space-y-3">
              {/* Mobile Search input */}
              <form onSubmit={handleSearch} className="flex items-center relative w-full mb-4">
                <input
                  type="text"
                  placeholder="Search lawyers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/40 text-xs rounded-xl pl-4 pr-9 py-2"
                />
                <button type="submit" className="absolute right-3 text-white/40">
                  <FaSearch />
                </button>
              </form>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-sm ${pathname === link.path ? "text-emerald-300" : "text-white/70"}`}
                >
                  {link.name}
                </Link>
              ))}

              {isLoggedIn && (
                <Link
                  href={getDashboardPath()}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-sm text-white/70 hover:text-white"
                >
                  Dashboard ({mockUser.role})
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}