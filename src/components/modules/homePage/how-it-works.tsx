"use client";

import { useState, useEffect } from "react";
import {
  FileEdit,
  UserCheck,
  Clock,
  CheckCircle2,
  ArrowRight,
  MapPin,
  ShieldCheck,
  AlertCircle,
  Play,
  Pause,
} from "lucide-react";
import { HomeSectionHeader } from "@/components/shared/home-section-header";

const steps = [
  {
    id: "01",
    title: "1. Submit & Location Pinpoint",
    subtitle: "Instant Geo-tagged Reporting",
    description:
      "Citizens snap a picture of the civic problem (road damage, water leaks, lighting) and auto-detect location coordinates with Zod-validated input forms.",
    icon: FileEdit,
    tag: "Citizen Action",
    mockup: {
      status: "Submitted",
      statusBg: "bg-blue-50 text-blue-700 border-blue-200",
      location: "Mirpur Sector 10, Dhaka",
      category: "Road Infrastructure Repair",
      progress: 25,
      detailText: "Uploading high-res image & verifying GPS location data...",
    },
  },
  {
    id: "02",
    title: "2. Admin Verification & Dispatch",
    subtitle: "AI-Assigned Priority Routing",
    description:
      "Municipal admins review the complaint severity on their dashboard and assign specialized field officers or maintenance contractors in seconds.",
    icon: UserCheck,
    tag: "Admin Dispatch",
    mockup: {
      status: "In Review / Assigned",
      statusBg: "bg-amber-50 text-amber-700 border-amber-200",
      location: "Zone 4 Municipal Sector",
      category: "Assigned to: Eng. Rafiq Ahmed",
      progress: 50,
      detailText:
        "Field officer notified via Staff Dashboard push notifications.",
    },
  },
  {
    id: "03",
    title: "3. Live Field Resolution",
    subtitle: "Real-time Work Tracking",
    description:
      "Citizens track the repair journey with live status bar updates and worker arrival notifications directly on their personalized dashboard feed.",
    icon: Clock,
    tag: "Live Execution",
    mockup: {
      status: "In Progress",
      statusBg: "bg-purple-50 text-purple-700 border-purple-200",
      location: "Work Crew On-Site",
      category: "Repair Material Dispatched",
      progress: 75,
      detailText: "Field team currently fixing damaged asphalt layers.",
    },
  },
  {
    id: "04",
    title: "4. Verification & Feedback",
    subtitle: "Transparent Closure",
    description:
      "Once completed, citizens inspect before-and-after resolution photos, rate municipal field staff service, and mark the issue officially closed.",
    icon: CheckCircle2,
    tag: "Quality Audit",
    mockup: {
      status: "Resolved & Verified",
      statusBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      location: "Issue Successfully Closed",
      category: "Rating Given: ★★★★★ (5.0)",
      progress: 100,
      detailText: "Inspection verified. Digital certificate generated.",
    },
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-run effect every 1 second (1000ms) when isAutoPlay is true
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const current = steps[activeStep];
  const IconComp = current.icon;

  return (
    <section
      className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative overflow-hidden transition-colors duration-300"
      onClick={() => setIsAutoPlay(!isAutoPlay)} // Pause on mouse click
    >
      {/* Background Soft Modern Glow */}
      <div className="absolute top-1/3 -left-32 size-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 size-96 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Auto-play Indicator Control */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <HomeSectionHeader
            badge="Interactive Workflow"
            title="How City Service Operates"
            subtitle="Watch the live automated simulator below or click any phase to explore manually."
            align="center"
          />

          {/* Auto-play status pill */}
          <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 shadow-2xs">
            <span
              className={`size-2 rounded-full ${isAutoPlay ? "bg-emerald-500 animate-ping" : "bg-amber-500"}`}
            />
            <span>
              {isAutoPlay
                ? "Auto-Playing (1s Interval) "
                : "Paused (Manual Control Active)"}
            </span>
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="ml-2 pl-2 border-l border-slate-300 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 hover:underline"
            >
              {isAutoPlay ? (
                <Pause className="size-3" />
              ) : (
                <Play className="size-3" />
              )}
              {isAutoPlay ? "Pause" : "Resume"}
            </button>
          </div>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Timeline Steps (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.id}
                  onClick={() => {
                    setIsAutoPlay(false); // Switch to manual when clicked
                    setActiveStep(idx);
                  }}
                  className={`group relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-slate-50 dark:bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/5 translate-x-2"
                      : "bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-emerald-600 rounded-r-full shadow-md shadow-emerald-500/30" />
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className={`size-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-emerald-600 text-white font-bold scale-110 shadow-md shadow-emerald-600/30"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-slate-800 dark:group-hover:text-slate-200"
                      }`}
                    >
                      <StepIcon className="size-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs font-semibold uppercase tracking-wider ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}
                        >
                          {step.tag}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          PHASE {step.id}
                        </span>
                      </div>

                      <h3
                        className={` text-lg font-bold transition-colors ${isActive ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}
                      >
                        {step.title}
                      </h3>

                      {isActive && (
                        <p className="font-sans text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed animate-fadeIn">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Interactive Mockup Simulator (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-slate-900 text-white border border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Window Controls Decorator */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-rose-500" />
                  <div className="size-3 rounded-full bg-amber-500" />
                  <div className="size-3 rounded-full bg-emerald-500" />
                  <span className="ml-3 text-xs font-mono text-slate-400">
                    live-tracking-engine.v2.6
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full">
                  <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{isAutoPlay ? "Auto-Running..." : "Manual Mode"}</span>
                </div>
              </div>

              {/* Dynamic Live Widget Display */}
              <div className="space-y-6">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      Active Category Issue
                    </span>
                    <h4 className=" text-xl font-bold text-slate-100 flex items-center gap-2">
                      <IconComp className="size-5 text-emerald-400" />
                      {current.mockup.category}
                    </h4>
                  </div>
                  <div
                    className={`self-start sm:self-auto text-xs font-semibold px-3.5 py-1.5 rounded-xl border ${current.mockup.statusBg}`}
                  >
                    {current.mockup.status}
                  </div>
                </div>

                {/* Progress Visualizer Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Process Lifecycle Completion</span>
                    <span className="text-emerald-400 font-bold">
                      {current.mockup.progress}%
                    </span>
                  </div>
                  <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700 ease-out shadow-lg shadow-emerald-500/30"
                      style={{ width: `${current.mockup.progress}%` }}
                    />
                  </div>
                </div>

                {/* Location & Log Stream */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <MapPin className="size-3.5 text-rose-400" /> Location
                      Coordinates
                    </div>
                    <p className="text-sm font-semibold text-slate-200">
                      {current.mockup.location}
                    </p>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <ShieldCheck className="size-3.5 text-emerald-400" />{" "}
                      Security Clearance
                    </div>
                    <p className="text-sm font-semibold text-slate-200">
                      256-Bit Encrypted Log
                    </p>
                  </div>
                </div>

                {/* Simulated Live System Message */}
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/50 flex items-start gap-3">
                  <AlertCircle className="size-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-emerald-300">
                      System Notification
                    </p>
                    <p className="text-xs text-emerald-400/90 leading-relaxed">
                      {current.mockup.detailText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Step Switch Buttons at Bottom */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsAutoPlay(false);
                    setActiveStep((prev) => Math.max(0, prev - 1));
                  }}
                  disabled={activeStep === 0}
                  className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ← Previous Phase
                </button>

                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setIsAutoPlay(false);
                        setActiveStep(i);
                      }}
                      className={`h-2 rounded-full cursor-pointer transition-all ${
                        activeStep === i
                          ? "w-6 bg-emerald-400"
                          : "w-2 bg-slate-700"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    setIsAutoPlay(false);
                    setActiveStep((prev) =>
                      Math.min(steps.length - 1, prev + 1),
                    );
                  }}
                  disabled={activeStep === steps.length - 1}
                  className="text-xs font-semibold px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  Next Phase <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
