import DashboardSide from "@/components/dashbord/DashboardSide";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen mt-[-20]  bg-[#0B0F1A] text-white overflow-x-hidden relative">
      
      <DashboardSide />

      <main className="lg:pl-64 pt-24 min-h-screen w-full transition-all duration-300">
        <div className="px-4 md:px-8 pb-12 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>

    </div>
  );
}