"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, AlertCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetMe } from "@/hooks/auth.hook";
import { toast } from "sonner";
import { CreateServiceRequestForm } from "@/components/form/create-service-request-form";

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/public-complaint?search=${encodeURIComponent(searchQuery.trim())}`,
      );
    }
  };

  const { data: userResponse } = useGetMe();

  const role = userResponse?.data?.role;

  const handleCreateRequest = () => {
    if (!role) {
      router.push("/login");
      return;
    }
    if (role === "STAFF") {
      toast.error(
        "Staff members cannot submit requests. Please log in as a Citizen.",
      );
      return;
    }

    if (role === "ADMIN" || role === "SUPER_ADMIN") {
      router.push("/admin-dashboard/create-request");
    }
    if (role === "CITIZEN") {
      router.push("/citizen-dashboard/create-request");
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-32 md:pt-5 md:pb-40 bg-slate-950">
      {/* Background Image */}
      <Image
        src="/hero-section.jpg"
        alt="Hero Background"
        fill
        priority
        className="object-cover opacity-45 pointer-events-none"
      />

      {/* Dark Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/50 pointer-events-none" />

      {/* Content Container */}
      <div className="container relative z-10 py-8 px-4 md:px-8 mx-auto flex flex-col items-center text-center space-y-6 max-w-4xl">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
          Report City Issues, <br className="hidden sm:inline" />
          <span className="text-emerald-400">Track Progress Together</span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed">
          Submit public complaints or request premium municipal services in a
          few clicks. Help us build a cleaner, safer, and smarter city
          environment for everyone.
        </p>

        {/* Quick Search Bar */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-xl flex items-center gap-2 pt-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-700 dark:text-slate-300" />
            <Input
              type="text"
              placeholder="Search public complaints (e.g. Broken streetlight, Garbage)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-12 bg-white/95 dark:bg-gray-900 border border-transparent dark:border-slate-800 dark:text-white text-slate-900 placeholder:text-slate-700 dark:placeholder:text-slate-400 shadow-lg rounded-2xl focus-visible:ring-2 focus-visible:ring-emerald-500"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-12 rounded-2xl px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md"
          >
            Search
          </Button>
        </form>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {role ? (
            <Button
              size="lg"
              onClick={handleCreateRequest}
              className="rounded-2xl font-semibold gap-2 shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <AlertCircle className="size-4" />
              Submit Complaint / Request
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleCreateRequest}
              className="rounded-2xl font-semibold gap-2 shadow-lg bg-red-400 hover:bg-emerald-700 text-white"
            >
              <LogIn className="size-4" />
              Please Login To Submit Complaint
            </Button>
          )}

          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/public-complaint")}
            className="rounded-2xl font-semibold bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md shadow-md"
          >
            View Public Complaints
          </Button>
        </div>
      </div>

      {/* Modern Wave SVG at the Bottom (Dark/Light mode adaptive using CSS variable) */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          className="relative block w-full h-12 md:h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="var(--background)"
            d="M0,96L30,112C60,128,120,160,180,192C240,224,300,256,360,240C420,224,480,160,540,149.3C600,139,660,181,720,192C780,203,840,181,900,149.3C960,117,1020,75,1080,96C1140,117,1200,203,1260,202.7C1320,203,1380,117,1410,74.7L1440,32L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
