import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navber";
import { Toaster } from "sonner";
import LayoutWrapper from "@/components/shared/LayoutWrapper";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 👑 Global SEO metadata configuration for Server Side Rendering (SSR)
export const metadata = {
  title: "LegalEase | Connect with Vetted Lawyers",
  description: "Secure, verified, and transparent legal platform to hire top legal expert professionals.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${plusJakartaSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-base-100 text-base-content">
        {/* Persistent global navigation header component */}
        <Navbar />
        
        {/* ⚡ Client context wrapper handling layout routing rules */}
        <LayoutWrapper>
          <main className="flex-grow pt-16 sm:pt-20">
            {children}
            <Toaster richColors position="top-right" />
          </main>
        </LayoutWrapper>
      </body>
    </html>
  );
}