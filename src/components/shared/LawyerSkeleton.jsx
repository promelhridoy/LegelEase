"use client";

const LawyerSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#090b0e] text-white py-16 px-6 sm:px-12 font-sans flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto animate-pulse">
        
        {/* BACK BUTTON SKELETON */}
        <div className="h-4 w-32 bg-slate-800 rounded-lg mb-8" />

        {/* MAIN DISPLAY FLEX LAYOUT CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#11141c]/90 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-xl">
          
          {/* LEFT SIDE: IMAGE CONTAINER SKELETON */}
          <div className="lg:col-span-5 w-full aspect-square sm:max-w-md lg:max-w-none mx-auto bg-slate-800 rounded-2xl" />

          {/* RIGHT SIDE: METADATA DETAILS SKELETON */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 py-2">
            
            <div className="space-y-5">
              {/* BADGES ROW SKELETON */}
              <div className="flex gap-3">
                <div className="h-7 w-28 bg-slate-800 rounded-lg" />
                <div className="h-7 w-24 bg-slate-800 rounded-lg" />
              </div>

              {/* LAWYER NAME TITLE SKELETON */}
              <div className="space-y-2 mt-4">
                <div className="h-10 w-3/4 bg-slate-800 rounded-xl" />
              </div>

              {/* BIO DESCRIPTION PARAGRAPH SKELETON */}
              <div className="space-y-3 pt-2">
                <div className="h-4 w-full bg-slate-800 rounded-md" />
                <div className="h-4 w-full bg-slate-800 rounded-md" />
                <div className="h-4 w-2/3 bg-slate-800 rounded-md" />
              </div>

              {/* GRID INFO ROWS SKELETON */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-slate-800/60 py-5 mt-6">
                <div className="h-16 bg-[#090b0e]/50 border border-slate-800/40 rounded-xl" />
                <div className="h-16 bg-[#090b0e]/50 border border-slate-800/40 rounded-xl" />
                <div className="h-16 bg-[#090b0e]/50 border border-slate-800/40 rounded-xl sm:col-span-2" />
              </div>
            </div>

            {/* ACTION HIRE BUTTON SKELETON */}
            <div className="h-14 w-full sm:w-48 bg-slate-800 rounded-xl mt-4" />

          </div>
        </div>

      </div>
    </div>
  );
};

export default LawyerSkeleton;