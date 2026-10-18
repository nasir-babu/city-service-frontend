import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { ServiceRequestsContent } from "@/components/modules/publicRequestPage/service-requests-content";
import SectionHeader from "@/components/shared/section-header";

export default function PublicComplaintPage() {
  return (
    <main className="container min-h-screen px-4 md:px-8 mx-auto py-8 space-y-8">
      {/* Header & Hero Info Section */}
      <SectionHeader
        title="Public Complaints"
        description=" Explore, filter, and track all community-reported city issues in real time."
        badgeText="Comunity Feed"
      />

      {/* Content Area with Suspense SSG Guard */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-32">
            <Spinner />
          </div>
        }
      >
        <ServiceRequestsContent />
      </Suspense>
    </main>
  );
}
