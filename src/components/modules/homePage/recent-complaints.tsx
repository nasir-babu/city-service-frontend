"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, FileText, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ComplaintCard } from "@/components/card/complaint-card";
import { useGetAllServiceRequests } from "@/hooks/service-request.hook";
import { IServiceRequestUI } from "@/types/services-request.type";
import { CardSkeleton } from "@/components/ui/card-skeleton";
import { HomeSectionHeader } from "@/components/shared/home-section-header";

export function RecentComplaints() {
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllServiceRequests({
    limit: "6",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const complaints = data?.data || data?.result || [];

  return (
    <section className="py-16 dark:bg-slate-950/50">
      <div className="container px-4 md:px-8 mx-auto space-y-8">
        
        {/* Header Section with Fade-Down Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <HomeSectionHeader
            title="Recent Public Complains"
            badge="Comunity Feed"
            subtitle="Monitor and track critical city issues in real-time."
          />
        </motion.div>

        {/* Complaints Grid */}
        {isLoading && <CardSkeleton />}
        {isError && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center h-32"
          >
            <p className="font-bold text-2xl text-red-600">
              Failed to load complaints. ! ! !
            </p>
          </motion.div>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 bg-gray-100 dark:bg-gray-900 rounded-md p-10 md:grid-cols-2 lg:grid-cols-3 gap-11">
            {complaints.map((item: IServiceRequestUI, idx: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              >
                <ComplaintCard
                  complaint={item}
                  onClick={() => router.push(`/requests?id=${item.id}`)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom Button with Fade-Up Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-end"
        >
          <Button
            variant="outline"
            onClick={() => router.push("/public-requests")}
            className="rounded-xl ml-auto bg-green-500 text-white font-semibold shrink-0 cursor-pointer"
          >
            See All Complaints
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>

      </div>
    </section>
  );
}