import { CreateServiceRequestForm } from "@/components/form/create-service-request-form";
import SectionHeader from "./section-header";

export default function CreateRequestPage() {
  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <SectionHeader
        title={
          <>
            Create Service <span className="text-blue-400">Request</span>
          </>
        }
        description="Submit a new service request or complaint to get assistance. "
      />

      <div className="w-full mt-10">
        <CreateServiceRequestForm />
      </div>
    </div>
  );
}
