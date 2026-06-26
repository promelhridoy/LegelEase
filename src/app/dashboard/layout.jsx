import DashboardSide from "@/components/dashbord/DashboardSide";

export default function DashboardLayout({ children }) {
  return (
    // 💡 relative positioned container to anchor everything perfectly
    <div className="min-h-screen bg-[#0B0F1A] text-white relative">
      
      {/* FIXED SIDEBAR NAVIGATION ELEMENT */}
      <DashboardSide />

      {/* 🚀 FIXED LOGIC: Added 'lg:ml-64' margin to beautifully offset the fixed sidebar flow */}
      <main className="lg:ml-64 mt-[-20] pt-24 min-h-screen transition-all duration-300">
        <div className="px-4 md:px-8 pb-12 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>

    </div>
  );
}