"use client";
import React from "react";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function SectionHeader({
  title = "Recent Public Complaints",
  description = "Check real-time updates on reported issues around the city.",
  badgeText = "Community Feed",
  icon: Icon = FileText,
}) {
  return (
    <div className="w-full relative pb-4">
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 px-5 py-5 sm:px-6 sm:py-4">
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-1/3 sm:w-2/5 overflow-hidden">
          <motion.div
            animate={{
              y: [0, -18, 0],
              rotate: [45, 70, 45],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-6 -top-10 h-36 w-36 sm:h-48 sm:w-48 bg-amber-500/35 rounded-3xl backdrop-blur-3xl"
            style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
          />

          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [12, -22, 12],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            className="absolute right-12 top-4 h-28 w-28 sm:h-36 sm:w-36 bg-emerald-500/40 rounded-2xl"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />

          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [-12, 25, -12],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
            className="absolute -right-4 -bottom-8 h-32 w-32 sm:h-44 sm:w-44 bg-rose-400/35 rounded-2xl"
            style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
          />

          <div className="absolute -right-10 top-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-gradient-to-br from-amber-400/30 via-emerald-400/30 to-rose-400/30 blur-2xl" />
        </div>

        <div className="relative z-10 max-w-2xl">
          {badgeText && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-2.5 py-1 border border-emerald-500/20">
              {Icon && (
                <Icon className="size-4 text-emerald-600" strokeWidth={1.7} />
              )}
              <span className="text-xs tracking-wide uppercase">
                {badgeText}
              </span>
            </div>
          )}

          <h2 className="text-[32px] tracking-tight  leading-[1.2] sm:text-[40px]">
            {title}
          </h2>

          {description && (
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-secondary-foreground sm:text-base">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="absolute right-16 bottom-0 translate-y-full w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[24px] border-t-gray-500/40 z-20 pointer-events-none" />
    </div>
  );
}
