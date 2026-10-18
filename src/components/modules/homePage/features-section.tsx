import { HomeSectionHeader } from "@/components/shared/home-section-header";
import { ShieldCheck, Clock, MapPin, BarChart3 } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure & Verified Reporting",
    description:
      "Submit civic issues safely with secure user authentication and instant verification, ensuring legitimate community complaints are prioritized.",
      bg: "bg-sky-400"
  },
  {
    icon: Clock,
    title: "Real-time Status Tracking",
    description:
      "Track your reported issues live from 'Pending' to 'In Progress' and finally 'Resolved' with transparent timeline updates.",
      bg: "bg-red-300"
  },
  {
    icon: MapPin,
    title: "Location-Based Mapping",
    description:
      "Pinpoint exact location coordinates for issues like road damage, broken streetlights, or water leakage for faster field response.",
      bg: "bg-green-500"
  },
  {
    icon: BarChart3,
    title: "Role-Based Dashboards",
    description:
      "Dedicated, powerful dashboards for Citizens, Staff, and Administrators to manage, assign, and analyze municipal services efficiently.",
      bg: "bg-red-500"
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          title="Designed for Smart & Efficient City Management"
          badge="Core Features"
          subtitle=" Empowering citizens and municipal authorities with modern tools to resolve community problems faster than ever."
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`group ${feature.bg ?? "bg-white"} dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
              >
                <div className="pl-14 pr-7 pb-8  pt-2">
                  {/* Icon Box */}
                  <div className="w-14 h-14 rounded-xl  bg-green-400 dark:bg-emerald-950/80 flex items-center justify-center text-white dark:text-emerald-400 mb-2 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className=" text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
