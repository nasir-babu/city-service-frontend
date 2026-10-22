"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  HelpCircle, 
  Sparkles 
} from "lucide-react";
import { HomeSectionHeader } from "@/components/shared/home-section-header";

const faqs = [
  {
    id: "faq-1",
    question: "How do I submit a new civic service request or complaint?",
    answer:
      "To submit a report, sign in to your Citizen Account, click 'New Service Request', choose the relevant category (e.g., Road Repair, Waste Management), upload photos with automatic GPS coordinates, and hit submit. Your request will be instantly assigned a tracking ID.",
    category: "General",
  },
  {
    id: "faq-2",
    question: "Is there any service fee required to log a complaint?",
    answer:
      "No! Logging civic issues and public maintenance requests is completely free of cost for all citizens. However, specific premium or private municipal requests (if applicable) will display pricing beforehand transparently via Stripe checkout.",
    category: "Pricing & Payments",
  },
  {
    id: "faq-3",
    question: "How can I track the live status of my reported issue?",
    answer:
      "You can monitor the exact lifecycle of your request right from your Citizen Dashboard. Status updates transition smoothly from 'Pending' to 'In Progress' with real-time field staff notes and estimated resolution times.",
    category: "Tracking",
  },
  {
    id: "faq-4",
    question: "Who reviews my complaint and assigns field workers?",
    answer:
      "Designated Municipal Admins and Department Supervisors verify each submission based on priority and location. Once approved, specialized field staff or contractors are assigned to address the problem directly.",
    category: "Operations",
  },
  {
    id: "faq-5",
    question: "What should I do if my reported issue gets rejected?",
    answer:
      "If a request is rejected, the admin team will provide a clear reason in your dashboard (e.g., duplicate entry or out-of-jurisdiction location). You can review the admin notes and re-submit with necessary corrections.",
    category: "Support",
  },
  {
    id: "faq-6",
    question: "Can I provide feedback after an issue is resolved?",
    answer:
      "Yes! Transparency is our priority. Once a field team completes the work and marks it as resolved, you can inspect the completion photos, give a star rating, and share feedback on staff performance.",
    category: "Feedback",
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative overflow-hidden transition-colors duration-300">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/2 left-0 size-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 size-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HomeSectionHeader Component */}
        <div className="mb-14 text-center">
          <HomeSectionHeader
            badge="Frequently Asked Questions"
            title="Everything You Need to Know"
            subtitle="Got questions about reporting issues, tracking progress, or municipal services? We've got answers."
            align="center"
          />
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-slate-50/80 dark:bg-slate-900/80 border-emerald-500/80 shadow-md shadow-emerald-500/5"
                    : "bg-white dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`size-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      <HelpCircle className="size-5" />
                    </div>

                    <span className=" text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`size-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 text-slate-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border-emerald-200" : ""
                    }`}
                  >
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                {/* Accordion Body Content */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-slate-200/50 dark:border-slate-800/80 animate-fadeIn">
                    <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-12">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Support Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-heading text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="size-4 text-emerald-500" />
              Still have questions?
            </h4>
            <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Can’t find the answer you’re looking for? Reach out to our municipal support team.
            </p>
          </div>

          <a
            href="mailto:support@cityservice.gov"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors shrink-0 inline-flex items-center gap-2"
          >
            Contact Support
          </a>
        </div>

      </div>
    </section>
  );
}
