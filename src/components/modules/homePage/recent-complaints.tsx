"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComplaintCard } from "@/components/card/complaint-card";
import { useGetAllServiceRequests } from "@/hooks/service-request.hook";
import { IServiceRequestUI } from "@/types/services-request.type";
import { error } from "console";
import { da } from "zod/locales";
import { CardSkeleton } from "@/components/ui/card-skeleton";
import SectionHeader from "@/components/shared/section-header";

export function RecentComplaints() {
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllServiceRequests({
    limit: "6",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const complaints = data?.data || data?.result || [];

  return (
    <section className="py-16 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="container px-4 md:px-8 mx-auto space-y-8">
        <div className="p-6">
          <SectionHeader
            title="Recent Public Complains"
            description="Monitor and track critical city issues in real-time."
            badgeText="Comunity Feed"
          />
        </div>

        {/* Complaints Grid */}
        {isLoading && <CardSkeleton />}
        {isError && (
          <div className="flex items-center justify-center h-32">
            <p className="font-bold text-2xl text-red-600 ">
              Failed to load complaints. ! ! !
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((item: IServiceRequestUI) => (
            <ComplaintCard
              key={item.id}
              complaint={item}
              onClick={() => router.push(`/requests?id=${item.id}`)}
            />
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => router.push("/public-requests")}
            className="rounded-xl ml-auto bg-green-500 text-white font-semibold shrink-0"
          >
            See All Complaints
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
