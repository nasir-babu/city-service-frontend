import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
  Globe,
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa6";

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Social Links List with React Icons and Hover Names
  const socialLinks = [
    { name: "Portfolio", icon: Globe, href: "https://nasirullah.vercel.app" },
    { name: "GitHub", icon: FaGithub, href: "https://github.com/nasir-babu" },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      href: "https://linkedin.com/in/nasir-babu",
    },
    {
      name: "Facebook",
      icon: FaFacebookF,
      href: "https://www.facebook.com/profile.php?id=61595642755938",
    },
  ];

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-slate-200/70 dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-sans transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Col 1: Brand Info & Status */}
        <div className="lg:col-span-4 space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-bold text-lg text-slate-900 dark:text-slate-100 group"
          >
            <Image
              src="/logo.jpg"
              alt="City Service Portal"
              width={36}
              height={36}
              className="rounded-xl object-contain shadow-2xs group-hover:scale-105 transition-transform"
            />
            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xl tracking-tight">
              City Service
            </span>
          </Link>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
            Empowering citizens to report issues, request municipal services,
            and build a cleaner, safer, and smarter city together.
          </p>

          {/* System Status Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All Systems Operational</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="lg:col-span-2 space-y-3.5">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight uppercase">
            Quick Navigation
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            {[
              { label: "Home", href: "/" },
              { label: "All Services", href: "/services" },
              { label: "Public Complaints", href: "/public-requests" },
              { label: "About Smart City", href: "/about" },
            ].map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.href}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 group"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-600 dark:text-emerald-400" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Key Municipal Services */}
        <div className="lg:col-span-3 space-y-3.5">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight uppercase">
            Key Services
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            <li className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span>Waste Management</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400">
                Free
              </span>
            </li>
            <li className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span>Street Light Maintenance</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400">
                Free
              </span>
            </li>
            <li className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span>Road Defect Repair</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400">
                Free
              </span>
            </li>
            <li className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span>Plumbing & Drainage</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400">
                Paid / Permit
              </span>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & Support */}
        <div className="lg:col-span-3 space-y-3.5">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight uppercase">
            Helpline & Support
          </h4>

          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex items-start gap-2.5">
              <Phone className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-200 block">
                  Hotline: 16108
                </span>
                <span className="text-[11px] text-slate-500">
                  Toll Free 24/7 Citizen Line
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <a
                href="mailto:support@cityservice.gov.bd"
                className="hover:underline hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                support@cityservice.gov.bd
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Nagar Bhaban, Smart City HQ</span>
            </div>
          </div>

          {/* React Icons with Tooltips / Hover Names */}
          <div className="pt-2 flex items-center gap-2">
            {socialLinks.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="relative group/tooltip">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="size-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 hover:scale-105 transition-all shadow-2xs"
                  >
                    <IconComp className="size-4" />
                  </a>

                  {/* Hover Name Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all duration-200 bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 text-[10px] font-bold px-2 py-1 rounded-md shadow-md whitespace-nowrap z-20">
                    {item.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200/80 dark:border-slate-800/80 py-6 bg-slate-100/50 dark:bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span>
              © {currentYear} City Service Portal. Official Municipal Portal.
            </span>
          </div>

          {/* <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/citizen-charter"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Citizen Charter
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
