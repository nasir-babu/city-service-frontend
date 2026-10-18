"use client";

import {
  CheckCircle2,
  Users,
  FileText,
  FolderTree,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { HomeSectionHeader } from "@/components/shared/home-section-header";
import { useGetPublicStats } from "@/hooks/public.hooks";

export function StatsSection() {
  const { data: statsResponse, isLoading, isError } = useGetPublicStats();

  if (isLoading) {
    return (
      <section className="py-20 bg-slate-50/70 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-44 bg-slate-200/60 dark:bg-slate-800/60 rounded-3xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !statsResponse?.data) {
    return (
      <section className="py-12 bg-rose-50/50 dark:bg-rose-950/20 text-center">
        <div className="flex items-center justify-center gap-2 text-rose-600 text-xs font-medium">
          <AlertCircle className="size-4" />
          <span>Failed to load live platform analytics.</span>
        </div>
      </section>
    );
  }

  const rawStats = statsResponse.data;

  const publicStats = [
    {
      id: "01",
      label: "Issues Resolved",
      value: rawStats.serviceRequests.resolvedRequests?.toLocaleString() || "0",
      description: "Civic complaints successfully fixed by field teams.",
      icon: CheckCircle2,
      color:
        "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800",
    },
    {
      id: "02",
      label: "Active Citizens",
      value: rawStats.users.totalCitizens?.toLocaleString() || "0",
      description: "Registered community members submitting reports.",
      icon: Users,
      color:
        "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800",
    },
    {
      id: "03",
      label: "Total Submissions",
      value: rawStats.serviceRequests.totalRequests?.toLocaleString() || "0",
      description: "Total municipal requests logged in system.",
      icon: FileText,
      color:
        "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800",
    },
    {
      id: "04",
      label: "Service Categories",
      value: rawStats.categories.totalCategories?.toLocaleString() || "0",
      description: "Active civic maintenance departments.",
      icon: FolderTree,
      color:
        "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800",
    },
  ];

  return (
    <section className="py-20 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <HomeSectionHeader
              badge="Platform Impact Metrics"
              title="Trusted Real-Time Service Statistics"
              subtitle="Live transparency data tracked directly from municipal department operations."
              align="left"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs self-start md:self-auto">
            <ShieldCheck className="size-4 text-emerald-500" />
            <span>Public API Stream</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {publicStats.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-white dark:bg-slate-900/90 rounded-3xl p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`size-12 rounded-2xl border flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform duration-300 ${item.color}`}
                    >
                      <IconComponent className="size-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-300 dark:text-slate-700">
                      #{item.id}
                    </span>
                  </div>

                  <div className=" text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.value}+
                  </div>

                  <h3 className=" text-base font-bold text-slate-800 dark:text-slate-200 mb-2">
                    {item.label}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-medium text-slate-400">
                  <span>Live Database Sync</span>
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
