"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaHistory,
  FaBriefcase,
  FaUsers,
  FaThLarge,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";
import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";

export default function NavbarComponent() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;
  const isLoggedIn = !!session;

  // Dynamic state to check if the current active route is a dashboard route
  const isDashboardRoute = pathname.startsWith("/");

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsDropdownOpen(false);
          setIsMenuOpen(false);
          router.push("/");
        },
      },
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/lawyers?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Lawyers", path: "/lawyers" },
    { name: "About", path: "/about" },
  ];

  // Skeleton structure for global loading state
  if (isPending) {
    return (
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#0B0F1A]/80 border-b border-white/10 z-50 flex items-center justify-between px-6 backdrop-blur-md">
        <Logo />
        <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
      </div>
    );
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0B0F1A]/85 backdrop-blur-2xl"
    >
      {/* Background ambient gradient glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-emerald-400/5 to-pink-500/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo and Mobile Menu Toggle Button Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden text-xl focus:outline-none transition-all duration-300 ${
              isMenuOpen
                ? "text-white hover:text-red-400"
                : isDashboardRoute
                  ? "text-emerald-400 bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                  : "text-white hover:text-emerald-400"
            }`}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
          <Logo />
        </div>

        {/* Desktop Navigation Link Container */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.path;
            return (
              <motion.div
                key={link.path}
                whileHover={{ y: -1 }}
                className="relative py-1"
              >
                <Link
                  href={link.path}
                  className={`text-sm font-medium transition-colors ${
                    active
                      ? "text-emerald-400"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
                {active && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-purple-500 rounded-full"
                  />
                )}
              </motion.div>
            );
          })}

          {/* Desktop Only Dashboard Main Anchor Link */}
          {isLoggedIn && (
            <motion.div whileHover={{ y: -1 }} className="relative py-1">
              <Link
                href="/dashboard/profile"
                className={`text-sm font-medium transition-colors ${
                  isDashboardRoute
                    ? "text-emerald-400"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
              {isDashboardRoute && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-purple-500 rounded-full"
                />
              )}
            </motion.div>
          )}
        </div>

        {/* User Right Profile Actions Dropdown Context */}
        <div className="flex items-center gap-4">
          {isLoggedIn && user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none group"
              >
                <Image
                  className="w-9 h-9 rounded-full border border-white/20 object-cover group-hover:border-emerald-400/50 transition-colors"
                  src={
                    user?.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.name || "User",
                    )}`
                  }
                  alt={user?.name || "User"}
                  width={36}
                  height={36}
                />
                <FaChevronDown
                  className={`text-white/40 text-[10px] hidden sm:block transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsDropdownOpen(false)}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-72 rounded-2xl border border-white/10 bg-[#111827]/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,.45)] overflow-hidden z-50"
                    >
                      {/* User Info */}
                      <div className="px-5 py-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <Image
                            src={
                              user?.image ||
                              `https://ui-avatars.com/api/?background=0f172a&color=fff&name=${encodeURIComponent(
                                user?.name || "User",
                              )}`
                            }
                            alt={user?.name}
                            width={48}
                            height={48}
                            className="rounded-full border border-white/10"
                          />

                          <div className="flex-1 overflow-hidden">
                            <h3 className="text-white font-semibold truncate">
                              {user.name}
                            </h3>

                            <p className="text-xs text-white/50 truncate">
                              {user.email}
                            </p>

                            <span className="inline-block mt-2 px-2 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {user.role === "admin"
                                ? "👑 Admin"
                                : user.role === "lawyer"
                                  ? "⚖️ Lawyer"
                                  : "👤 Client"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Menu */}
                      <div className="p-2">
                        <Link
                          href="/dashboard/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition"
                        >
                          <FaUser  className="text-emerald-400 text-sm"  />
                          <span>Profile</span>
                        </Link>

                        {user.role === "user" && (
                          <Link
                            href="/dashboard/profile"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition"
                          >
                            <FaThLarge className="text-emerald-400 text-sm" />
                            <span>Dashboard</span>
                          </Link>
                        )}

                        {user.role === "lawyer" && (
                          <Link
                            href="/dashboard/profile"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition"
                          >
                            <FaThLarge className="text-emerald-400 text-sm" />
                            <span>Dashboard</span>
                          </Link>
                        )}

                        {user.role === "admin" && (
                          <Link
                            href="/dashboard/profile"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition"
                          >
                            <FaThLarge className="text-emerald-400 text-sm" />
                            <span>Dashboard</span>
                          </Link>
                        )}

                        <div className="my-2 border-t border-white/10" />

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
                        >
                          <FaSignOutAlt />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Unauthenticated user actions container block */
            <div className="flex items-center gap-3">
              <Link
                href="/auth/signin"
                className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-emerald-400 to-purple-500 text-slate-900 font-bold hover:opacity-90 shadow-md transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 📱 Mobile Accordion Dropdown Drawer Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[#0B0F1A]/95 border-b border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              {/* Ultra-mobile form search entry */}

              {/* Standard core navigation anchor list */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 px-3 text-sm rounded-xl ${pathname === link.path ? "text-emerald-400 bg-white/5" : "text-white/70"}`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Dynamically integrated mobile dashboard ecosystem sub-links */}
              {isLoggedIn && user && (
                <div className="pt-2 border-t border-white/5 space-y-1">
                  <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-emerald-400/60">
                    Dashboard ({user.role})
                  </p>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 px-3 text-sm text-white/70 rounded-xl hover:bg-white/5"
                  >
                    Profile
                  </Link>

                  {user.role === "user" && (
                    <>
                      <Link
                        href="/dashboard/hiring-history"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-3 text-sm text-white/70 rounded-xl hover:bg-white/5"
                      >
                        Hiring History
                      </Link>
                      <Link
                        href="/dashboard/my-comments"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-3 text-sm text-white/70 rounded-xl hover:bg-white/5"
                      >
                        My Comments
                      </Link>
                    </>
                  )}

                  {user.role === "lawyer" && (
                    <>
                      <Link
                        href="/dashboard/hiring-requests"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-3 text-sm text-white/70 rounded-xl hover:bg-white/5"
                      >
                        Hiring Requests
                      </Link>
                      <Link
                        href="/dashboard/manage-services"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-3 text-sm text-white/70 rounded-xl hover:bg-white/5"
                      >
                        Manage Services
                      </Link>
                    </>
                  )}

                  {user.role === "admin" && (
                    <>
                      <Link
                        href="/dashboard/manage-users"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-3 text-sm text-white/70 rounded-xl hover:bg-white/5"
                      >
                        Manage Users
                      </Link>
                      <Link
                        href="/dashboard/transactions"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-3 text-sm text-white/70 rounded-xl hover:bg-white/5"
                      >
                        Transactions
                      </Link>
                      <Link
                        href="/dashboard/analytics"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-3 text-sm text-white/70 rounded-xl hover:bg-white/5"
                      >
                        Analytics
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
