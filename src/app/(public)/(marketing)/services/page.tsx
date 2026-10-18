"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, AlertCircle, Layers } from "lucide-react";
import { useGetCategories } from "@/hooks/category.hook";
import { CardSkeleton } from "@/components/ui/card-skeleton";
import { CategoryCard } from "@/components/card/category-card";
import { HomeSectionHeader } from "@/components/shared/home-section-header";


export default function ServicesPage() {
  const { data: categoriesResponse, isLoading, error } = useGetCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "FREE" | "PAID">("ALL");

  const categories = categoriesResponse?.data || [];

  // Filter Logic (Search & Tabs)
  const filteredCategories = categories.filter((cat: any) => {
    const matchesSearch =
      cat.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const isPaid = cat.isPaid || cat.type === "PAID";

    if (filterType === "FREE") return matchesSearch && !isPaid;
    if (filterType === "PAID") return matchesSearch && isPaid;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 space-y-10 transition-colors duration-300">
      
      {/* 1. Header Section */}
      <HomeSectionHeader
        badge="Municipal Citizen Services"
        title="Explore All Civic Services"
        subtitle="Select a service category below to request immediate assistance, municipal maintenance, or city infrastructure support."
        align="center"
      />

      {/* 2. Search & Filter Controls */}
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search services by name or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 text-xs bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900"
          />
        </div>

        {/* Filter Tabs */}
        <Tabs
          defaultValue="ALL"
          onValueChange={(val) => setFilterType(val as "ALL" | "FREE" | "PAID")}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3 h-10 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <TabsTrigger value="ALL" className="text-xs font-medium">
              All Services
            </TabsTrigger>
            <TabsTrigger value="FREE" className="text-xs font-medium">
              Free
            </TabsTrigger>
            <TabsTrigger value="PAID" className="text-xs font-medium">
              Paid
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 3. Category Grid Area */}
      <div className="max-w-7xl mx-auto">
        {/* Loading State */}
        {isLoading && <CardSkeleton />}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-8 rounded-2xl text-center space-y-2 max-w-xl mx-auto">
            <AlertCircle className="size-8 text-rose-500 mx-auto" />
            <h3 className="font-bold text-rose-800 dark:text-rose-300 text-base">
              Failed to Load Services
            </h3>
            <p className="text-xs text-rose-600 dark:text-rose-400">
              Please refresh the page or try again later.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredCategories.length === 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 rounded-3xl text-center space-y-3 shadow-sm max-w-xl mx-auto">
            <Layers className="size-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-base">
              No Services Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Try adjusting your search query or switching tabs.
            </p>
          </div>
        )}

        {/* Dynamic Category Grid */}
        {!isLoading && !error && filteredCategories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category: any) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}