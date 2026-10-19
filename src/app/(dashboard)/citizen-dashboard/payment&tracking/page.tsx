"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import AuthLoading from "@/components/auth/auth-loading";
import { useGetMyRequests } from "@/hooks/service-request.hook";
import CitizenRequestsTable from "@/components/modules/citizen/citizen-requests-table";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import SectionHeader from "@/components/shared/section-header";

export default function PaymentAndTrakingPage() {
  const [statusFilter, setStatusFilter] = useState<string | null>("ALL");
  const { data: requestsData, isLoading } = useGetMyRequests();

  if (isLoading) {
    return <TableSkeleton />;
  }

  const rawRequests = requestsData?.data || [];

  const requests =
    statusFilter === "ALL"
      ? rawRequests
      : rawRequests.filter((item: any) => item.status === statusFilter);

  return (
    <div className="space-y-6">
      {/* Header & Status Filter */}
      <SectionHeader
        title={
          <>
            Payment & <span className="text-blue-400">Tracking</span>
          </>
        }
        description="Track your service request statuses and complete secure Stripe payments for accepted requests."
      />

      {/* Status Filter Dropdown */}
      <div className="flex items-center gap-2">
        <Filter className="size-4 text-slate-500" />
        <span className="text-sm text-slate-600 font-medium">Filter:</span>
        <Select
          value={statusFilter}
          onValueChange={(val) => setStatusFilter(val)}
        >
          <SelectTrigger className="w-[160px] h-9 text-xs">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Requests</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="ASSIGNED">Assigned</SelectItem>
            <SelectItem value="ACCEPTED">Accepted</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="RESOLVED">Resolved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CitizenRequestsTable requests={requests} />
    </div>
  );
}
