"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, KeyRound, HardHat, ShieldAlert, Mail } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useForgotPassword } from "@/hooks/auth.hook";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    forgotPassword(
      { email },
      {
        onSuccess: (res: any) => {
          if (!res?.success) {
            toast.error("Request Failed", {
              description: res?.message || "Failed to send OTP code.",
            });
            return;
          }

          toast.success("OTP Sent Successfully!", {
            description: "Please check your email for the 6-digit OTP code.",
          });

          // ইমেইল সহ সরাসরি রিসেট পাসওয়ার্ড পেজে রিডাইরেক্ট
          router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        },
        onError: (err: any) => {
          toast.error("Error", {
            description: err?.data?.message || err?.message || "Something went wrong.",
          });
        },
      }
    );
  };

  return (
    <div className="w-full max-w-md space-y-6 mx-auto">

      {/* Form Card UI */}
      <Card className="border shadow-sm bg-white dark:bg-slate-900 dark:border-slate-800">
        <CardHeader className="text-center space-y-2 pb-4 border-b bg-slate-50/40 dark:bg-slate-900/40 dark:border-slate-800">
          <div className="size-12 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-1 border border-indigo-100 dark:border-indigo-900">
            <KeyRound className="size-6" />
          </div>
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Forgot Your Password?
          </CardTitle>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            Enter your registered email address below to receive password reset instructions.
          </p>
        </CardHeader>

        <CardContent className="pt-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Registered Email Address
              </Label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className="h-10 text-xs pl-9"
                  required
                />
                <Mail className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {error && <p className="text-[11px] text-rose-500 mt-1">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs h-10 transition-colors"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner /> Sending OTP...
                </>
              ) : (
                "Send Reset Link & OTP"
              )}
            </Button>
          </form>

          {/* Helper Alert */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-lg flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <ShieldAlert className="size-4 text-indigo-500 flex-shrink-0" />
            <span>Enter your email to receive a secure verification code instantly.</span>
          </div>

          {/* Back to Login Link */}
          <div className="text-center pt-2">
            <Link
              href="/login"
              className="inline-flex items-center text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <ArrowLeft className="size-3.5 mr-1.5" /> Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}