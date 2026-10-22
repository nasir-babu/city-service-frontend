import React from "react";

// .    (     --  )
export function CategoryCardSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm animate-pulse flex flex-col justify-between min-h-[210px]">
      <div>
        {/* .      (Eye, Edit, Trash) */}
        <div className="flex items-center justify-between gap-2">
          {/* Title Placeholder */}
          <div className="h-5 w-1/2 bg-slate-200 rounded-md"></div>

          {/* 3 Action Icons Placeholder */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
            <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
            <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
          </div>
        </div>

        {/* . 'Type: FREE' / 'Type: PAID'   */}
        <div className="mt-3">
          <div className="h-6 w-24 bg-amber-100/70 rounded-full"></div>
        </div>

        {/* .     */}
        <div className="mt-6 space-y-2">
          <div className="h-3.5 w-full bg-slate-200 rounded-md"></div>
          <div className="h-3.5 w-2/3 bg-slate-200 rounded-md"></div>
        </div>
      </div>

      {/* .  , 'Unit: N/A'  'Free / $500'   */}
      <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
        {/* Unit Text Placeholder */}
        <div className="h-4 w-20 bg-slate-200 rounded-md"></div>

        {/* Price / Free Status Placeholder */}
        <div className="h-4 w-12 bg-slate-200 rounded-md"></div>
      </div>
    </div>
  );
}

// .   (        )
export default function ServiceGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-slate-50 min-h-screen">
      {Array.from({ length: 9 }).map(function (_, index) {
        return <CategoryCardSkeleton key={index} />;
      })}
    </div>
  );
}
