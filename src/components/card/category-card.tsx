"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Tag, 
  ShieldCheck, 
  CreditCard, 
  ArrowUpRight, 
  Layers, 
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGetMe } from "@/hooks/auth.hook";
import { toast } from "sonner";

export interface CategoryProps {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  isPaid?: boolean;
  type?: "FREE" | "PAID";
  price?: number;
  requestCount?: number;
}

export function CategoryCard({ category }: { category: CategoryProps }) {
  const router = useRouter();
  const { data: userResponse } = useGetMe();

  const isPaid = category.isPaid || category.type === "PAID";
  const user = userResponse?.data;
  const role = user?.role;

  const handleSelectCategory = () => {
    if (!role) {
      toast.info("Login Required", {
        description: "Please login as a citizen to create a service request.",
      });
    } else if (role === "CITIZEN") {
      router.push(`/citizen-dashboard/create-request?categoryId=${category.id}`);
    } else if (role === "ADMIN") {
      router.push(`/admin-dashboard/create-request?categoryId=${category.id}`);
    } else if (role === "STAFF") {
      toast.warning("Access Restricted", {
        description: "Only Citizens and Admins can create service requests.",
      });
    }
  };

  return (
    <div
      onClick={handleSelectCategory}
      className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 transition-all duration-500 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -right-12 -top-12 size-36 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500" />

      <div>
        {/* Card Header: Icon/Image + Badges */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="relative">
            {category.imageUrl ? (
              <div className="relative size-14 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="size-14 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/20 dark:from-emerald-950/80 dark:to-teal-900/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/60 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <Tag className="size-6" />
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-1.5">
            {/* Paid / Free Badge */}
            <Badge
              className={
                isPaid
                  ? "bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60 font-medium text-[11px] px-2.5 py-0.5 rounded-full shadow-2xs"
                  : "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60 font-medium text-[11px] px-2.5 py-0.5 rounded-full shadow-2xs"
              }
            >
              {isPaid ? (
                <span className="flex items-center gap-1">
                  <CreditCard className="size-3" /> Paid Service
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <ShieldCheck className="size-3" /> Free Service
                </span>
              )}
            </Badge>

            {/* Price Badge if applicable */}
            {isPaid && category.price !== undefined && (
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md">
                ৳{category.price}
              </span>
            )}
          </div>
        </div>

        {/* Category Title */}
        <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 mb-2.5 flex items-center justify-between">
          <span>{category.name}</span>
        </h3>

        {/* Category Description */}
        <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">
          {category.description ||
            "Submit issue details, monitor status, and track municipal field team responses in real-time."}
        </p>
      </div>

      {/* Card Footer Info & CTA */}
      <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <CheckCircle2 className="size-3.5 text-emerald-500" />
          <span>{category.requestCount ?? "100+"} Active Requests</span>
        </div>

        <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all duration-300">
          <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}