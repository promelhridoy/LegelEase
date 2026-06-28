"use client";

// import CreateLawyerModal from "@/components/dashboard/CreateLawyerModal";
import DashboardSide from "@/components/dashboard/DashboardSide";

export default function DashboardLayout({ children }) {

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white relative">
      <DashboardSide />

      <main className="lg:ml-64 mt-[-20] pt-24 min-h-screen">
        <div className="px-4 md:px-8 pb-12 max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* {showModal && (
        <CreateLawyerModal
          user={user}
          onSuccess={() => setShowModal(false)}
        />
      )} */}
    </div>
  );
}