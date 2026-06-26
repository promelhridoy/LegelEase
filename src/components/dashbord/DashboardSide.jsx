"use client";

import React from 'react';
import { useSession } from "@/lib/auth-client"; 
import { 
  FaUser, FaHistory, FaCommentDots, FaBriefcase, 
  FaThLarge, FaUsers, FaExchangeAlt, FaChartPie, FaHome 
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

function DashboardSide() {
    const pathname = usePathname();
    const { data: session, isPending } = useSession();
    const user = session?.user;

    // 🔄 Unified Skeleton Loader Framework matching layout constraints
    if (isPending) {
        return (
            <aside className="hidden lg:block w-64 shrink-0 border-r border-white/5 p-5 bg-[#090D16] h-screen fixed left-0 top-0 pt-24 z-20 animate-pulse">
                <div className="h-8 bg-white/5 rounded-lg mb-8 w-3/4" />
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-11 bg-white/5 rounded-xl w-full" />
                    ))}
                </div>
            </aside>
        );
    }

    // Role-based dynamic menu items
    const menuItems = {
        user: [
            { name: "Profile Overview", path: "/dashboard/profile", icon: <FaUser /> },
            { name: "Hiring History", path: "/dashboard/hiring-history", icon: <FaHistory /> },
            { name: "My Comments", path: "/dashboard/my-comments", icon: <FaCommentDots /> },
        ],
        lawyer: [
            { name: "Profile Overview", path: "/dashboard/profile", icon: <FaUser /> },
            { name: "Hiring Requests", path: "/dashboard/hiring-requests", icon: <FaBriefcase /> },
            { name: "Manage Services", path: "/dashboard/manage-services", icon: <FaThLarge /> },
        ],
        admin: [
            { name: "Profile Overview", path: "/dashboard/profile", icon: <FaUser /> },
            { name: "Manage Users", path: "/dashboard/manage-users", icon: <FaUsers /> },
            { name: "Transactions", path: "/dashboard/transactions", icon: <FaExchangeAlt /> },
            { name: "Analytics Overview", path: "/dashboard/analytics", icon: <FaChartPie /> },
        ],
    };

    const currentMenu = menuItems[user?.role] || menuItems["user"];

    return (
        /* 🖥️ Fixed Dashboard Core Sidebar Window */
        /* Changed 'hidden md:block' to 'hidden lg:block' to cleanly match layout architecture boundaries */
        <aside className="hidden lg:block w-64 shrink-0 border-r border-white/5 p-5 bg-[#090D16] fixed left-0 top-0 h-screen pt-24 z-20">
            <div className="flex flex-col justify-between h-full pb-4">
                <div className="space-y-6">
                    {/* Active Role Badge */}
                    <div className="px-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 py-1.5 px-3 rounded-full border border-emerald-500/10 inline-block">
                            {user?.role || "user"} Panel
                        </span>
                    </div>

                    {/* Dashboard Navigation Links */}
                    <nav className="flex flex-col gap-1">
                        {currentMenu.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 group ${
                                        isActive 
                                            ? "bg-gradient-to-r from-emerald-500/15 to-emerald-500/0 text-emerald-400 border-l-4 border-emerald-500 shadow-sm" 
                                            : "text-white/60 hover:text-white hover:bg-white/[0.02]"
                                    }`}
                                    href={item.path}
                                >
                                    <span className={`text-base transition-transform duration-200 group-hover:scale-105 ${isActive ? "text-emerald-400" : "text-white/30 group-hover:text-white/60"}`}>
                                        {item.icon}
                                    </span>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Section: User Profile Card and Back to Home Link */}
                <div className="pt-4 border-t border-white/5 space-y-3 mt-auto">
                    {user && (
                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.01] border border-white/5">
                            <div className="relative shrink-0 w-9 h-9">
                                {user?.image ? (
                                    <Image 
                                        src={user.image} 
                                        alt={user.name || "User"} 
                                        width={36}
                                        height={36}
                                        className="rounded-full object-cover ring-2 ring-emerald-500/30"
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold text-xs">
                                        {user?.name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                )}
                                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#090D16]" />
                            </div>

                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-semibold text-white/95 truncate">{user?.name}</span>
                                <span className="text-[10px] text-white/40 truncate">{user?.email}</span>
                            </div>
                        </div>
                    )}
                    
                    <Link href="/" className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-white/40 hover:text-white/80 rounded-xl transition-colors">
                        <FaHome className="text-sm" /> Back to Home
                    </Link>
                </div>
            </div>
        </aside>
    );
}

export default DashboardSide;