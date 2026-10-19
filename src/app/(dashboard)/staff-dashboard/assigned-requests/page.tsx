"use client";

import { useGetStaffAssignedRequests } from "@/hooks/service-request.hook";
import StaffAssignedRequestsTable from "@/components/modules/staff/staff-assigned-requests-table";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import SectionHeader from "@/components/shared/section-header";

export default function StaffAssignedRequestsPage() {
  const {
    data: requestsData,
    isLoading,
    refetch,
  } = useGetStaffAssignedRequests();

  if (isLoading) {
    return <TableSkeleton />;
  }

  const requests = requestsData?.data || [];

  return (
    <div className="space-y-12">
      <SectionHeader
        title={
          <>
            Assigned <span className="text-blue-400">Requests</span>
          </>
        }
        description="  Manage and update the progress of service requests assigned to you."
      />

      <StaffAssignedRequestsTable
        requests={requests}
        onSuccessUpdate={refetch}
      />
    </div>
  );
}
