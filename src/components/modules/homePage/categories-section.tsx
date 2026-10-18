"use client";

import Link from "next/link";
import { ArrowRight, Layers, AlertCircle } from "lucide-react";
import { useGetCategories } from "@/hooks/category.hook";
import { CardSkeleton } from "@/components/ui/card-skeleton";
import { CategoryCard } from "@/components/card/category-card";
import { HomeSectionHeader } from "@/components/shared/home-section-header";

export function CategoriesSection() {
  const { data: categoriesResponse, isLoading, error } = useGetCategories();
  const categories = categoriesResponse?.data || [];
  const featuredCategories = categories.slice(0, 6);

  return (
    <section className="py-20 bg-blue-200/25 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <HomeSectionHeader
          badge="Municipal Services"
          title="Explore Services by Category"
          subtitle="Select an official civic category below to request immediate support, track progress, or get municipal permits."
          align="center"
        />

        {isLoading && <CardSkeleton />}

        {error && !isLoading && (
          <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-8 rounded-2xl text-center space-y-2 max-w-xl mx-auto">
            <AlertCircle className="size-8 text-rose-500 mx-auto" />
            <h3 className="font-bold text-rose-800 dark:text-rose-300 text-base">
              Failed to Load Categories
            </h3>
            <p className="text-xs text-rose-600 dark:text-rose-400">
              Please check your backend API server.
            </p>
          </div>
        )}

        {!isLoading && !error && categories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCategories.map((category: any) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}

        <div className="text-center mt-14">
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-sm hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Explore All Categories & Services
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </section>
  );
}