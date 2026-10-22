"use client";

import { 
  PhoneCall, 
  Siren, 
  ShieldAlert 
} from "lucide-react";
import { motion } from "framer-motion";

const helplines = [
  {
    id: "999",
    title: "National Emergency",
    number: "999",
    description: "Toll-free 24/7 service for immediate police, fire, or ambulance assistance.",
    badge: "Police / Fire / Ambulance",
    color: "border-rose-200 dark:border-rose-500/30 bg-rose-50/80 dark:bg-rose-500/5 text-rose-700 dark:text-rose-400",
    buttonBg: "bg-rose-600 hover:bg-rose-700 dark:hover:bg-rose-500 text-white shadow-sm",
  },
  {
    id: "333",
    title: "National Information & Civic Services",
    number: "333",
    description: "Official helpline for public utility complaints, government info, and relief.",
    badge: "Government Services",
    color: "border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-amber-500/5 text-amber-700 dark:text-amber-400",
    buttonBg: "bg-amber-600 hover:bg-amber-700 dark:hover:bg-amber-500 text-white shadow-sm",
  },
  {
    id: "16106",
    title: "Municipal Control Room",
    number: "16106",
    description: "Direct line for urgent drainage blockage, severe road collapses & fallen trees.",
    badge: "City Rapid Response",
    color: "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400",
    buttonBg: "bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-500 text-white shadow-sm",
  },
];

export function EmergencyCtaSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300 border-t border-slate-200/80 dark:border-slate-800">
      
      {/* Background Soft Mesh Glow */}
      <div className="absolute top-0 left-1/3 size-96 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 size-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section with Fade-Down Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Siren className="size-4 animate-pulse" /> Urgent Public Support
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-3">
            Emergency Hotlines & Rapid Response
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Immediate 24/7 hotline numbers for life-threatening emergencies, urgent infrastructure hazard reporting, and municipal assistance.
          </p>
        </motion.div>

        {/* Emergency Helpline Cards Grid with Staggered Fade-Up Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {helplines.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
              className={`rounded-3xl p-6 sm:p-7 border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl flex flex-col justify-between ${item.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-2xs">
                    {item.badge}
                  </span>
                  <ShieldAlert className="size-5 opacity-80" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {item.title}
                </h3>

                <div className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white my-3 flex items-center gap-2">
                  <PhoneCall className="size-7 text-slate-700 dark:text-slate-300" />
                  <span>{item.number}</span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <a
                href={`tel:${item.number}`}
                className={`w-full py-3 rounded-xl font-semibold text-xs tracking-wider uppercase text-center inline-flex items-center justify-center gap-2 transition-colors ${item.buttonBg}`}
              >
                <PhoneCall className="size-4" /> Call Hotline Now
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}