"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isDashboard =
    pathname.startsWith("/dashboard/recruter") ||
    pathname.startsWith("/dashboard/profile");

  return (
    <>
      {children}

      {!isDashboard && <Footer />}
    </>
  );
}