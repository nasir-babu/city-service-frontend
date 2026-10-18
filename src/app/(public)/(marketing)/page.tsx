
import { HeroSection } from "@/components/modules/homePage/hero-section";
import { FeaturesSection } from "@/components/modules/homePage/features-section";
import { CategoriesSection } from "@/components/modules/homePage/categories-section";
import { HowItWorksSection } from "@/components/modules/homePage/how-it-works";
import { StatsSection } from "@/components/modules/homePage/stats-section"; // নতুন ইমপোর্ট
import { RecentComplaints } from "@/components/modules/homePage/recent-complaints";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <HowItWorksSection />
      <StatsSection /> 
      <RecentComplaints />
    </main>
  );
}
