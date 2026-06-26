"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Dynamically catch any route starting with /dashboard to keep layouts clean
  const isDashboard = pathname ? pathname.startsWith("/dashboard") : false;

  return (
    <>
      {children}

      {!isDashboard && <Footer />}
    </>
  );
}