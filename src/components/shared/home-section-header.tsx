"use client"
interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export function HomeSectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div className={`max-w-3xl mb-12 ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
        {badge}
      </span>
      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mt-3 mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-slate-600 dark:text-slate-400 text-base sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}