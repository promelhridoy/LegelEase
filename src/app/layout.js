import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navber";
import Footer from "@/components/shared/Footer";
import { Toaster } from "sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        
          
          <Navbar />
          
          <main className="flex-grow pt-16 sm:pt-20">
            {children}
            <Toaster richColors position="top-right" />
          </main>
          
          <Footer />
      </body>
    </html>
  );
}
