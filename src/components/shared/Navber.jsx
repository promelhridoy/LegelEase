"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaSignOutAlt,
  FaThLarge,
  FaChevronDown,
  FaSearch,
  FaHistory,
  FaCommentDots,
  FaBriefcase,
  FaUsers,
  FaExchangeAlt,
  FaChartPie,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";
import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";

export default function NavbarComponent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: session, isPending } = useSession();
  const user = session?.user;
  const isLoggedIn = !!session;

  // URL থেকে সার্চ কুয়েরি ধরে রাখা
  useEffect(() => {
    const currentSearch = searchParams.get("search");
    if (currentSearch) {
      setSearchQuery(currentSearch);
    } else if (pathname !== "/lawyers") {
      setSearchQuery("");
    }
  }, [searchParams, pathname]);

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
  ];

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
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-emerald-400/5 to-pink-500/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* লোগো ও মোবাইল বাটন */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white text-xl focus:outline-none hover:text-emerald-400 transition-colors"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
          <Logo />
        </div>

        {/* গ্লোবাল সার্চ বার */}
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex items-center relative max-w-xs w-full"
        >
          <input
            type="text"
            placeholder="Search lawyers or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs rounded-xl pl-4 pr-9 py-2 focus:outline-none focus:border-emerald-400/40"
          />
          <button
            type="submit"
            className="absolute right-3 text-white/40 hover:text-emerald-400 text-xs"
          >
            <FaSearch />
          </button>
        </form>

        {/* ডেস্কটপ লিংকসমূহ */}
        <div className="hidden md:flex items-center gap-8">
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

          {isLoggedIn && (
            <motion.div whileHover={{ y: -1 }} className="relative py-1">
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  pathname.startsWith("/dashboard")
                    ? "text-emerald-400"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
              {pathname.startsWith("/dashboard") && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-purple-500 rounded-full"
                />
              )}
            </motion.div>
          )}
        </div>

        {/* ডান পাশের অংশ: প্রোফাইল ড্রপডাউন (রোল ভিত্তিক মেনু সহ) */}
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
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsDropdownOpen(false)}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-64 bg-[#111827]/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
                    >
                      <div className="p-4 bg-white/[0.02] border-b border-white/5">
                        <p className="text-emerald-400 text-[9px] font-bold uppercase tracking-wider">
                          {user.role === "admin"
                            ? "👑 Admin"
                            : user.role === "lawyer"
                              ? "⚖️ Lawyer"
                              : "👤 Client"}{" "}
                          Account
                        </p>
                        <p className="text-white font-semibold text-sm truncate">
                          {user.name}
                        </p>
                        <p className="text-white/40 text-xs truncate">
                          {user.email}
                        </p>
                      </div>

                      <div className="p-1.5 space-y-0.5 max-h-[300px] overflow-y-auto">
                        <Link
                          href="/dashboard"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition"
                        >
                          <FaUser className="text-xs text-white/40" /> Profile
                          Overview
                        </Link>

                        {user.role === "user" && (
                          <>
                            <Link
                              href="/dashboard/user/hiring-history"
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition"
                            >
                              <FaHistory className="text-xs text-white/40" />{" "}
                              Hiring History
                            </Link>
                            <Link
                              href="/dashboard/user/comments"
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition"
                            >
                              <FaCommentDots className="text-xs text-white/40" />{" "}
                              My Comments
                            </Link>
                          </>
                        )}

                        {user.role === "lawyer" && (
                          <>
                            <Link
                              href="/dashboard/lawyer/hiring-history"
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition"
                            >
                              <FaBriefcase className="text-xs text-white/40" />{" "}
                              Hiring Requests
                            </Link>
                            <Link
                              href="/dashboard/lawyer/manage-legal-profile"
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition"
                            >
                              <FaThLarge className="text-xs text-white/40" />{" "}
                              Manage Services
                            </Link>
                          </>
                        )}

                        {user.role === "admin" && (
                          <>
                            <Link
                              href="/dashboard/admin/manage-users"
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition"
                            >
                              <FaUsers className="text-xs text-white/40" />{" "}
                              Manage Users
                            </Link>
                            <Link
                              href="/dashboard/admin/all-transactions"
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition"
                            >
                              <FaExchangeAlt className="text-xs text-white/40" />{" "}
                              Transactions
                            </Link>
                            <Link
                              href="/dashboard/admin/analytics"
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition"
                            >
                              <FaChartPie className="text-xs text-white/40" />{" "}
                              Analytics Overview
                            </Link>
                          </>
                        )}

                        <hr className="border-white/5 my-1" />

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition text-left"
                        >
                          <FaSignOutAlt className="text-xs" /> Logout
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#0B0F1A]/95 border-b border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              <form
                onSubmit={handleSearch}
                className="flex items-center relative w-full mb-4 sm:hidden"
              >
                <input
                  type="text"
                  placeholder="Search lawyers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs rounded-xl pl-4 pr-9 py-2.5"
                />
                <button
                  type="submit"
                  className="absolute right-3 text-white/40"
                >
                  <FaSearch />
                </button>
              </form>

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

              {isLoggedIn && user && (
                <div className="pt-2 border-t border-white/5 space-y-1">
                  <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-emerald-400/60">
                    Dashboard ({user.role})
                  </p>

                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 px-3 text-sm text-white/70 rounded-xl hover:bg-white/5"
                  >
                    Profile
                  </Link>

                  {user.role === "user" && (
                    <>
                      <Link
                        href="/dashboard/user/hiring-history"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-3 text-sm text-white/70 rounded-xl hover:bg-white/5"
                      >
                        Hiring History
                      </Link>
                      <Link
                        href="/dashboard/user/comments"
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
                        href="/dashboard/lawyer/hiring-history"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-3 text-sm text-white/70 rounded-xl hover:bg-white/5"
                      >
                        Hiring Requests
                      </Link>
                      <Link
                        href="/dashboard/lawyer/manage-legal-profile"
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
                        href="/dashboard/admin/manage-users"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-3 text-sm text-white/70 rounded-xl hover:bg-white/5"
                      >
                        Manage Users
                      </Link>
                      <Link
                        href="/dashboard/admin/all-transactions"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-3 text-sm text-white/70 rounded-xl hover:bg-white/5"
                      >
                        Transactions
                      </Link>
                      <Link
                        href="/dashboard/admin/analytics"
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
