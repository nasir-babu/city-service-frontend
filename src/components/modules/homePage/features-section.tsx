"use client";

import { HomeSectionHeader } from "@/components/shared/home-section-header";
import { ShieldCheck, Clock, MapPin, BarChart3, Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const workflowSteps = [
  {
    step: "01",
    icon: ShieldCheck,
    title: "Secure & Verified Reporting",
    description: "Submit civic issues safely with secure user authentication and instant verification, ensuring legitimate community complaints are prioritized.",
    highlight: "Encrypted & Authenticated",
    gradient: "from-sky-500 to-blue-600",
    badgeBg: "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300",
  },
  {
    step: "02",
    icon: MapPin,
    title: "Location-Based Mapping",
    description: "Pinpoint exact location coordinates for issues like road damage, broken streetlights, or water leakage for faster field response.",
    highlight: "Precise GIS Tracking",
    gradient: "from-emerald-500 to-teal-600",
    badgeBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  },
  {
    step: "03",
    icon: Clock,
    title: "Real-time Status Tracking",
    description: "Track your reported issues live from 'Pending' to 'In Progress' and finally 'Resolved' with transparent timeline updates.",
    highlight: "Live Status Sync",
    gradient: "from-amber-500 to-orange-600",
    badgeBg: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Role-Based Dashboards",
    description: "Dedicated, powerful dashboards for Citizens, Staff, and Administrators to manage, assign, and analyze municipal services efficiently.",
    highlight: "Multi-Role Control",
    gradient: "from-rose-500 to-pink-600",
    badgeBg: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
  },
];

export function FeaturesSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative py-24 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/60 dark:bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-50/50 dark:bg-emerald-950/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Section Header with Fade-Down Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <HomeSectionHeader
            title="Designed for Smart & Efficient City Management"
            badge="Interactive Workflow"
            subtitle="Empowering citizens and municipal authorities with modern tools to resolve community problems faster than ever."
          />
        </motion.div>

        {/* Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-16">
          
          {/* Left Side: Interactive Step Items */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {workflowSteps.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeStep === index;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  onClick={() => setActiveStep(index)}
                  className={`group text-left p-5 rounded-2xl transition-all duration-300 flex items-center gap-4 border cursor-pointer ${
                    isActive
                      ? "bg-slate-50 dark:bg-slate-900 border-indigo-500/40 shadow-lg shadow-indigo-500/5 translate-x-2"
                      : "bg-white/60 dark:bg-slate-950 border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-50/80 hover:border-slate-300 dark:hover:bg-slate-900/50 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">{item.step}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.badgeBg}`}>
                        {item.highlight}
                      </span>
                    </div>
                    <h4 className={`text-base font-bold transition-colors duration-300 ${
                      isActive ? "text-slate-900 dark:text-slate-50" : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900"
                    }`}>
                      {item.title}
                    </h4>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right Side: Spotlight Dynamic Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="relative p-8 sm:p-12 rounded-3xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl overflow-hidden">
              
              {/* Top Accent Badge */}
              <div className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1 rounded-full bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 border border-slate-200 dark:border-slate-700 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" /> Feature Spotlight
              </div>

              {/* Dynamic Content with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="space-y-6 pt-2"
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${workflowSteps[activeStep].gradient} flex items-center justify-center text-white shadow-lg shadow-indigo-500/15`}>
                    {(() => {
                      const ActiveIcon = workflowSteps[activeStep].icon;
                      return <ActiveIcon className="w-10 h-10" />;
                    })()}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
                    {workflowSteps[activeStep].title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
                    {workflowSteps[activeStep].description}
                  </p>

                  {/* Key Benefits List */}
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-300 border-t border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Instant City Verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Transparent Audit Trail</span>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}