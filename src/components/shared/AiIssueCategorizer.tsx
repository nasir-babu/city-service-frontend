"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, Check, LoaderCircle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export type IssuePriority = "HIGH" | "MEDIUM" | "LOW";

export type IssueAnalysis = {
  category: string;
  priority: IssuePriority;
  summary: string;
  tags: string[];
};

type AiIssueCategorizerProps = {
  onApply?: (analysis: IssueAnalysis) => void;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: {
    message?: string;
  };
};

const systemInstruction = `You are an expert municipal issue categorizer for the City Service Portal in Bangladesh. Analyze the citizen's issue description, which may be in Bangla or English.

You MUST choose and return the "category" field EXACTLY as one of these exact English strings, even if the user describes the issue in Bangla:
- "Road Repair & Footpaths"
- "Tree Cutting Service"
- "Private Tree Pruning"
- "Private Drain Unblocking"
- "Private Waste Removal"
- "Public Park & Tree Trimming"
- "Drainage & Sewerage"
- "Street Lighting 1"
- "Waste Management"

Never translate the category name into Bangla. The summary can be in the user's language, but the category MUST strictly be one of the above exact string values.

Return only valid JSON with exactly these fields: "category", "priority" (exactly HIGH, MEDIUM, or LOW), "summary" (one concise sentence in the user's language), and "tags" (an array of 2 or 3 short relevant hashtags). Assign priority based on the described urgency and public safety risk. Do not include markdown fences or any text outside the JSON object.`;

function parseAnalysis(text: string): IssueAnalysis {
  const jsonText = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  const result: unknown = JSON.parse(jsonText);

  if (typeof result !== "object" || result === null) {
    throw new Error("The AI returned an invalid analysis.");
  }

  const fields = result as Record<string, unknown>;
  const category =
    typeof fields.category === "string" ? fields.category.trim() : "";
  const priority =
    typeof fields.priority === "string"
      ? fields.priority.trim().toUpperCase()
      : "";
  const summary =
    typeof fields.summary === "string" ? fields.summary.trim() : "";
  const tags = Array.isArray(fields.tags)
    ? fields.tags
        .filter((tag): tag is string => typeof tag === "string")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 3)
    : [];

  if (
    !category ||
    !summary ||
    !["HIGH", "MEDIUM", "LOW"].includes(priority) ||
    tags.length < 2
  ) {
    throw new Error("The AI returned incomplete analysis. Please try again.");
  }

  return {
    category,
    priority: priority as IssuePriority,
    summary,
    tags,
  };
}

const priorityStyles: Record<IssuePriority, string> = {
  HIGH: "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950/60 dark:text-rose-200",
  MEDIUM:
    "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-200",
  LOW: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200",
};

export function AiIssueCategorizer({
  onApply,
}: AiIssueCategorizerProps) {
  const [description, setDescription] = useState("");
  const [analysis, setAnalysis] = useState<IssueAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function analyzeIssue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const issueDescription = description.trim();
    if (!issueDescription || isAnalyzing) return;

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      setError(
        "AI analysis is not configured. Please contact the site administrator.",
      );
      setAnalysis(null);
      return;
    }

    setIsAnalyzing(true);
    setError("");
    setNotice("");
    setAnalysis(null);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: systemInstruction }],
            },
            contents: [
              {
                role: "user",
                parts: [{ text: issueDescription }],
              },
            ],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.2,
            },
          }),
          signal: AbortSignal.timeout(30_000),
        },
      );

      let data: GeminiResponse;
      try {
        data = (await response.json()) as GeminiResponse;
      } catch {
        throw new Error("The AI service returned an unreadable response.");
      }

      if (!response.ok) {
        throw new Error(
          data.error?.message ||
            "The AI service could not analyze this issue. Please try again.",
        );
      }

      const responseText = data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim();

      if (!responseText) {
        throw new Error("The AI service returned an empty analysis.");
      }

      setAnalysis(parseAnalysis(responseText));
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to analyze the issue right now. Please try again.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  function applySuggestions() {
    if (!analysis) return;
    onApply?.(analysis);
    setNotice(
      onApply
        ? "AI suggestions applied to your form."
        : "Suggestions are ready. Connect the onApply callback to fill your form.",
    );
  }

  return (
    <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200">
            <Sparkles className="size-4" aria-hidden="true" />
          </div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            AI Smart Issue Categorizer
          </h2>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Describe the issue in Bangla or English to get a suggested category,
          priority, summary, and tags.
        </p>
      </div>

      <form onSubmit={analyzeIssue} className="space-y-3">
        <label
          htmlFor="ai-issue-description"
          className="block text-sm font-medium text-slate-800 dark:text-slate-200"
        >
          Describe the municipal issue
        </label>
        <textarea
          id="ai-issue-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Example: A large pothole near the school is causing traffic and putting cyclists at risk."
          rows={4}
          maxLength={2000}
          required
          disabled={isAnalyzing}
          className="w-full resize-y rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-500 focus-visible:border-violet-600 focus-visible:ring-2 focus-visible:ring-violet-600/20 disabled:opacity-70 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus-visible:border-violet-400"
        />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {description.length}/2000
          </span>
          <Button
            type="submit"
            disabled={isAnalyzing || !description.trim()}
            className="gap-2 bg-violet-700 text-white hover:bg-violet-800 dark:bg-violet-600 dark:hover:bg-violet-500"
          >
            {isAnalyzing ? (
              <LoaderCircle
                className="size-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Sparkles className="size-4" aria-hidden="true" />
            )}
            {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
          </Button>
        </div>
      </form>

      {error && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm leading-relaxed text-rose-800 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-200"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}

      {analysis && (
        <div
          aria-live="polite"
          className="animate-in fade-in slide-in-from-bottom-2 space-y-4 rounded-2xl border border-violet-200 bg-violet-50/70 p-4 duration-300 dark:border-violet-900 dark:bg-violet-950/30 sm:p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Suggested analysis
            </h3>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold tracking-wide ${priorityStyles[analysis.priority]}`}
            >
              {analysis.priority} PRIORITY
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Category
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                {analysis.category}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Summary
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {analysis.summary}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="rounded-full border border-violet-200 bg-white/80 px-2.5 py-1 text-xs font-medium text-violet-800 dark:border-violet-800 dark:bg-slate-900/80 dark:text-violet-200"
                >
                  {tag.startsWith("#") ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-violet-200 pt-3 dark:border-violet-900 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={applySuggestions}
              className="gap-2 border-violet-300 bg-white text-violet-900 hover:bg-violet-100 dark:border-violet-800 dark:bg-slate-900 dark:text-violet-200 dark:hover:bg-violet-950"
            >
              <Check className="size-4" aria-hidden="true" />
              Apply Suggestions
            </Button>
            {notice && (
              <p
                role="status"
                className="text-xs leading-relaxed text-slate-600 dark:text-slate-400"
              >
                {notice}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
