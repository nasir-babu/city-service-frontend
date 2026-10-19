"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, LoaderCircle, Send, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

const quickPrompts = [
  "How to submit a complaint?",
  "Payment methods",
  "Track issue status",
];

const SYSTEM_INSTRUCTION = `You are an expert AI Assistant for "City Service Portal" (a municipal issue reporting and tracking web application in Bangladesh).
Your job is to assist citizens with:
1. How to submit complaints/service requests (logging in, going to Service Requests, filling issue details, location pin, photo submission).
2. Tracking request status (Pending, In Progress, Resolved status in Citizen Dashboard).
3. Payment methods and bill clearance for municipal services.
4. Profile updates and account settings.

Rules:
- Be polite, helpful, and concise.
- Answer in the same language as the user (Bangla or English). If the user asks in Bangla, reply in natural Bangla.
- Never hallucinate non-existent features. Stick to municipal city services.`;

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content:
        "Hello! I'm your City Service AI Assistant. Ask me about city services, requests, or your account.",
    },
  ]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const nextMessageIdRef = useRef(1);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  async function sendMessage(messageText: string) {
    const content = messageText.trim();
    if (!content || isSending) return;

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const userMessageId = nextMessageIdRef.current++;
    const conversation = [
      ...messages,
      { id: userMessageId, role: "user" as const, content },
    ];
    setMessages(conversation);
    setInput("");
    setIsSending(true);

    if (!apiKey) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: nextMessageIdRef.current++,
          role: "assistant",
          content:
            "API key is missing in .env.local file. Please set NEXT_PUBLIC_GEMINI_API_KEY.",
        },
      ]);
      setIsSending(false);
      return;
    }

    let failureMessage =
      "I couldn't connect to the AI assistant. Please try again in a moment.";

    try {
      // Map chat messages to Gemini's expected contents format
      const contents = conversation
        .filter((msg) => msg.id !== 0) // exclude welcome message
        .slice(-10) // keep last 10 messages for context
        .map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        }));

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents: contents,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        failureMessage =
          data.error?.message || "The assistant couldn't respond right now.";
        throw new Error(failureMessage);
      }

      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (!reply) {
        failureMessage =
          "The assistant returned an empty response. Please try again.";
        throw new Error(failureMessage);
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: nextMessageIdRef.current++,
          role: "assistant",
          content: reply,
        },
      ]);
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: nextMessageIdRef.current++,
          role: "assistant",
          content: failureMessage,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          id="city-service-ai-chat"
          aria-label="City Service AI Assistant"
          role="dialog"
          className="flex h-[min(680px,calc(100dvh_-_6.5rem))] w-[min(24rem,calc(100vw_-_2.5rem))] flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/95 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl dark:border-slate-700/80 dark:bg-slate-950/95 dark:shadow-black/40"
        >
          <header className="flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white/70 px-4 py-3.5 dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm shadow-emerald-900/15">
                <Bot className="size-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                  City Service AI Assistant
                </h2>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  Online · City services guide
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
              className="shrink-0 text-slate-600 dark:text-slate-300"
            >
              <X aria-hidden="true" />
            </Button>
          </header>

          <div
            aria-live="polite"
            aria-relevant="additions text"
            className="flex-1 space-y-4 overflow-y-auto bg-slate-50/70 px-4 py-5 text-left dark:bg-slate-950/70"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-end gap-2",
                  message.role === "user" && "justify-end",
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    <Sparkles className="size-3.5" aria-hidden="true" />
                  </div>
                )}
                <p
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-left text-sm leading-relaxed",
                    message.role === "user"
                      ? "rounded-br-md bg-emerald-700 text-white"
                      : "rounded-bl-md border border-slate-200 bg-white text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200",
                  )}
                >
                  {message.content}
                </p>
              </div>
            ))}

            {isSending && (
              <div
                className="flex items-end gap-2"
                role="status"
                aria-label="Assistant is typing"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                  <span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-slate-400" />
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          <div className="space-y-3 border-t border-slate-200/80 bg-white/90 px-3.5 py-3.5 dark:border-slate-800 dark:bg-slate-900/90">
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    disabled={isSending}
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-1.5 text-left text-xs font-medium text-emerald-900 transition-colors hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-emerald-400/20 dark:bg-emerald-950/60 dark:text-emerald-200 dark:hover:bg-emerald-900/70"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <label htmlFor="city-service-ai-input" className="sr-only">
                Ask about city services
              </label>
              <input
                id="city-service-ai-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about city services..."
                autoComplete="off"
                disabled={isSending}
                className="h-11 min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus-visible:border-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-600/20 placeholder:text-slate-500 disabled:opacity-70 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus-visible:border-emerald-500 dark:placeholder:text-slate-400"
              />
              <Button
                type="submit"
                size="icon"
                aria-label={isSending ? "Sending message" : "Send message"}
                disabled={isSending || !input.trim()}
                className="size-11 shrink-0 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                {isSending ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </Button>
            </form>
            <p className="text-center text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
              AI guidance can make mistakes. Verify important details with the
              city.
            </p>
          </div>
        </section>
      )}

      <Button
        type="button"
        aria-label={
          isOpen
            ? "Close city service assistant"
            : "Open city service assistant"
        }
        aria-expanded={isOpen}
        aria-controls="city-service-ai-chat"
        onClick={() => setIsOpen((open) => !open)}
        className="size-14 rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-950/25 transition-transform hover:scale-105 hover:bg-emerald-800 focus-visible:ring-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500"
      >
        {isOpen ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <Sparkles className="size-6" aria-hidden="true" />
        )}
      </Button>
    </div>
  );
}
